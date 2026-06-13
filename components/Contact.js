"use client";

import { useState } from "react";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import Marquee from "./Marquee";

const initial = { name: "", email: "", message: "", company: "" };

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email";
  if (message.trim().length < 10) errors.message = "Tell me a bit more";
  return errors;
}

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
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send");
      }
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
    <section
      id="contact"
      className="relative px-6 sm:px-10 pt-24 sm:pt-32 lg:pt-40 pb-8 border-t border-line"
    >
      <div className="flex items-baseline justify-between mb-8 sm:mb-12 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>(Contact)</span>
        <span>Say hi</span>
      </div>

      <RevealText
        as="h2"
        type="lines"
        className="font-display text-[14vw] sm:text-7xl lg:text-[9vw] leading-[0.93] max-w-6xl tracking-tight"
      >
        Got a project in mind?
        <br />
        <span className="text-fg/50">Let&apos;s talk.</span>
      </RevealText>

      <div className="mt-12 sm:mt-20 grid grid-cols-12 gap-8 lg:gap-12">
        <form
          onSubmit={onSubmit}
          className="col-span-12 lg:col-span-7 flex flex-col gap-6"
          noValidate
        >
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
            value={form.message}
            onChange={onChange}
            error={errors.message}
            rows={5}
          />

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <MagneticButton
              type="submit"
              disabled={status.state === "sending"}
              variant="outline"
              className="disabled:opacity-50"
              data-cursor="Send →"
            >
              {status.state === "sending" ? "Sending…" : "Send message"}
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/Mohammad_Aazim_Resume_2026.pdf"
              download
              variant="ghost"
              data-cursor="Download"
            >
              Resume ↓
            </MagneticButton>
            {status.msg && (
              <p
                className={`text-sm w-full ${
                  status.state === "success"
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {status.msg}
              </p>
            )}
          </div>
        </form>

        <aside className="col-span-12 lg:col-span-5 lg:pl-8 flex flex-col gap-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Email
            </div>
            <a
              href="mailto:sheikhaazim13@gmail.com"
              className="mt-2 inline-block font-display text-xl sm:text-2xl lg:text-3xl break-all hover:text-fg/70 transition-colors"
              data-cursor="Send"
            >
              sheikhaazim13@gmail.com
            </a>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Phone
            </div>
            <a
              href="tel:+918533990022"
              className="mt-2 inline-block font-display text-xl sm:text-2xl lg:text-3xl"
            >
              +91 85339 90022
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/mohammad-aazim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-bg transition-colors"
              data-cursor="LinkedIn ↗"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://www.github.com/aazimsheikh9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-bg transition-colors"
              data-cursor="GitHub ↗"
            >
              GitHub ↗
            </a>
            <a
              href="https://ascricketgears.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-bg transition-colors"
              data-cursor="AS ↗"
            >
              AS Cricket ↗
            </a>
          </div>
        </aside>
      </div>

      <div className="mt-20 sm:mt-32 -mx-6 sm:-mx-10 border-t border-line pt-8 sm:pt-10 font-display text-[16vw] sm:text-[14vw] leading-none">
        <Marquee
          items={[
            "Mohammad Aazim",
            "Front-End Developer",
            "Next.js · React · GSAP",
            "Open to Global Opportunities",
          ]}
          speed={120}
        />
      </div>

      <footer className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>© {new Date().getFullYear()} Mohammad Aazim</span>
        <span className="hidden sm:inline">
          Built with Next.js · GSAP · Lenis · Tailwind
        </span>
        <a href="#top" className="hover:text-fg" data-cursor="Top ↑">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}

function Field({ label, name, value, onChange, error, type = "text", as, rows }) {
  const Tag = as || "input";
  return (
    <label className="group block border-b border-line pb-3">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {label}
        </span>
        {error && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-400">
            {error}
          </span>
        )}
      </div>
      <Tag
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full bg-transparent text-fg text-base sm:text-lg lg:text-xl outline-none resize-none placeholder:text-fg/30 min-h-[44px]"
        placeholder=" "
      />
    </label>
  );
}
