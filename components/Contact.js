"use client";

import { useState } from "react";

const initial = { name: "", email: "", message: "", company: "" };

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid";
  if (message.trim().length < 10) errors.message = "Too short";
  return errors;
}

function Field({ label, name, value, onChange, error, type = "text", as, rows }) {
  const Tag = as || "input";
  return (
    <label className="field">
      <div className="field__row">
        <span className="field__label">{label}</span>
        {error && <span className="field__err">{error}</span>}
      </div>
      <Tag
        type={as ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </label>
  );
}

const socials = [
  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/mohammad-aazim" },
  { label: "GitHub ↗", href: "https://www.github.com/aazimsheikh9" },
  { label: "AS Cricket ↗", href: "https://ascricketgears.vercel.app/" },
];

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus({ state: "sending", msg: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send");
      setStatus({
        state: "success",
        msg: "Thanks — message landed. I'll reply within a couple of days.",
      });
      setForm(initial);
    } catch (err) {
      setStatus({
        state: "error",
        msg: err.message || "Something went wrong. Try emailing me directly.",
      });
    }
  };

  return (
    <section className="band band--night contact" id="contact">
      <div className="contact__glow" />
      <div className="shell">
        <div className="srow">
          <span>(Contact)</span>
          <span>Say hi</span>
        </div>

        <h2 className="contact__t">
          Got a project in mind?
          <br />
          <em>Let&apos;s talk.</em>
        </h2>

        <div className="contact__grid">
          <form onSubmit={onSubmit} noValidate className="form">
            {/* Honeypot — bots fill it, humans never see it. */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={onChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <Field
              label="Your name"
              name="name"
              value={form.name}
              onChange={onChange}
              error={errors.name}
            />
            <Field
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              error={errors.email}
            />
            <Field
              label="What's on your mind?"
              name="message"
              as="textarea"
              rows={4}
              value={form.message}
              onChange={onChange}
              error={errors.message}
            />

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="btn"
                disabled={status.state === "sending"}
              >
                {status.state === "sending" ? "Sending…" : "Send message"}
              </button>
              <a
                className="btn btn--ghost"
                href="/Mohammad_Aazim_Resume_2026_1.pdf"
                download
              >
                Resume <span className="glyph">↓</span>
              </a>
            </div>

            {status.msg && (
              <p
                role="status"
                className={`form__status ${
                  status.state === "success"
                    ? "form__status--ok"
                    : "form__status--err"
                }`}
              >
                {status.msg}
              </p>
            )}
          </form>

          <aside className="contact__aside">
            <div>
              <p className="contact__label">Email</p>
              <a className="contact__big" href="mailto:sheikhaazim13@gmail.com">
                sheikhaazim13@gmail.com
              </a>
            </div>
            <div>
              <p className="contact__label">Phone</p>
              <a className="contact__big" href="tel:+918533990022">
                +91 85339 90022
              </a>
            </div>
            <div className="pills">
              {socials.map((s) => (
                <a
                  className="pill"
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </aside>
        </div>

        <div className="pagefoot">
          <span>© {new Date().getFullYear()} Mohammad Aazim</span>
          <span>Built with Next.js · GSAP · Tailwind</span>
          <a href="#top">
            Back to top <span className="glyph">↑</span>
          </a>
        </div>
      </div>
    </section>
  );
}
