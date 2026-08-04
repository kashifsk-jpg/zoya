"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, type ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy: string;
  className?: string;
  /** Visual placement — center dialog vs. edge-anchored drawer. */
  placement?: "center" | "right" | "bottom" | "fullscreen";
}

const placementClasses: Record<NonNullable<DialogProps["placement"]>, string> = {
  center: "m-auto w-full max-w-lg",
  right: "ml-auto mr-0 h-dvh max-h-none w-full max-w-md",
  bottom: "mt-auto mb-0 w-full max-w-none",
  fullscreen: "m-0 h-dvh max-h-none w-full max-w-none",
};

/**
 * Accessible modal built on native <dialog> — gives us focus trapping,
 * Escape-to-close and a11y semantics without a heavy dependency.
 */
export function Dialog({ open, onClose, children, labelledBy, className, placement = "center" }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open && !node.open) {
      node.showModal();
    } else if (!open && node.open) {
      node.close();
    }
  }, [open]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    const handleClick = (event: MouseEvent) => {
      if (event.target === node) onClose();
    };
    node.addEventListener("cancel", handleCancel);
    node.addEventListener("click", handleClick);
    return () => {
      node.removeEventListener("cancel", handleCancel);
      node.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      className={cn(
        "fixed inset-0 max-h-none max-w-none bg-transparent p-0 backdrop:bg-obsidian/50 open:flex",
        placementClasses[placement],
        className,
      )}
    >
      {children}
    </dialog>
  );
}
