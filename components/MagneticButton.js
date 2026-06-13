"use client";

import useMagnetic from "../hooks/useMagnetic";
import clsx from "clsx";

export default function MagneticButton({
  as: Tag = "button",
  children,
  className,
  strength = 0.3,
  variant = "outline",
  ...props
}) {
  const ref = useMagnetic(strength);

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm uppercase tracking-[0.15em] overflow-hidden transition-colors duration-300";

  const variants = {
    // outline: transparent → white pill on hover, text flips to bg-dark
    outline:
      "border border-white/30 text-white hover:text-bg hover:border-white",
    // solid: white pill default
    solid: "bg-white text-bg border border-white hover:bg-fg/90",
    ghost:
      "border border-transparent text-fg hover:border-white/30 hover:bg-white/[0.04]",
  };

  return (
    <Tag
      ref={ref}
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {/* sliding fill: only used by outline variant */}
      {variant === "outline" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-0 bg-white rounded-full origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Tag>
  );
}
