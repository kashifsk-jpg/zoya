import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  active?: boolean;
}

export function IconButton({ label, children, active, className, ...rest }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-current transition-all duration-200 hover:border-current/30 hover:scale-105 active:scale-95",
        active && "border-current/40",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
