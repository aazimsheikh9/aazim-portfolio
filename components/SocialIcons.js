// Shared social lockup for the nav pill and the footer. The concept pointed
// every icon at #contact because it was a static mockup; here they go to the
// real destinations from the Person JSON-LD in app/layout.js.

export const socials = [
  { label: "GitHub", href: "https://www.github.com/aazimsheikh9", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-aazim",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:sheikhaazim13@gmail.com", icon: "mail" },
];

const paths = {
  github: (
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21H9z" />
  ),
};

export function SocialIcon({ icon }) {
  if (icon === "mail") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="m3 6 9 6.5L21 6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      {paths[icon]}
    </svg>
  );
}

export function SocialLinks({ className }) {
  return (
    <div className={className}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          {...(s.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <SocialIcon icon={s.icon} />
        </a>
      ))}
    </div>
  );
}
