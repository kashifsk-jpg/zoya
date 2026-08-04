import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "primary-light" | "secondary" | "text";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-label uppercase tracking-[0.14em] transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "border border-ink bg-ink text-alabaster px-8 py-3.5 hover:bg-obsidian",
  "primary-light": "border border-alabaster bg-alabaster text-ink px-8 py-3.5 hover:bg-warm-ivory",
  secondary: "border border-ink/30 text-ink px-8 py-3.5 hover:border-ink",
  text: "text-ink px-0 py-1",
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

interface ButtonAsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  onClick?: () => void;
}

function ArrowGlyph({ variant }: { variant: Variant }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block transition-transform duration-300 group-hover:translate-x-1",
        variant === "text" && "translate-y-px",
      )}
    >
      →
    </span>
  );
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", children, className, showArrow, ...rest } = props;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={cn(base, variants[variant], className)}>
        {children}
        {showArrow && <ArrowGlyph variant={variant} />}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cn(base, variants[variant], className)} {...buttonRest}>
      {children}
      {showArrow && <ArrowGlyph variant={variant} />}
    </button>
  );
}
