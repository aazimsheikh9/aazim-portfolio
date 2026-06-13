import nodemailer from "nodemailer";

const rateMap = new Map();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 4;

function rateLimit(key) {
  const now = Date.now();
  const hits = (rateMap.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateMap.set(key, hits);
  return hits.length <= RATE_MAX;
}

function validEmail(s) {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    if (!rateLimit(ip)) {
      return Response.json(
        { ok: false, error: "Too many requests. Try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return Response.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const { name, email, message, company } = body;

    // honeypot
    if (company && String(company).trim() !== "") {
      return Response.json({ ok: true });
    }

    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.length > 200
    ) {
      return Response.json(
        { ok: false, error: "Name is required." },
        { status: 400 }
      );
    }
    if (!validEmail(email)) {
      return Response.json(
        { ok: false, error: "Valid email required." },
        { status: 400 }
      );
    }
    if (
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.length > 5000
    ) {
      return Response.json(
        { ok: false, error: "Message is too short or too long." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || user;

    if (!host || !user || !pass || !to) {
      return Response.json(
        {
          ok: false,
          error:
            "Mail server is not configured. Please email sheikhaazim13@gmail.com directly.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMsg = escapeHtml(message).replace(/\n/g, "<br/>");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to,
      replyTo: email,
      subject: `New portfolio enquiry — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <h2 style="font-size: 18px; margin: 0 0 16px;">New portfolio enquiry</h2>
          <p style="margin: 0 0 8px;"><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
          <p style="line-height:1.6;color:#222;white-space:pre-wrap;">${safeMsg}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return Response.json(
      { ok: false, error: "Could not send message. Try again." },
      { status: 500 }
    );
  }
}
