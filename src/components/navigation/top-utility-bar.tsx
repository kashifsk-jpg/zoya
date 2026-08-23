"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WHATSAPP_DISPLAY, WHATSAPP_HREF } from "@/lib/constants";
import { InstagramGlyph, FacebookGlyph, PinterestGlyph, TikTokGlyph } from "@/components/navigation/social-glyphs";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/zoya.fashion.1990", Glyph: InstagramGlyph },
  { label: "TikTok", href: "https://www.tiktok.com/@kkzwolrd", Glyph: TikTokGlyph },
  { label: "Facebook", href: "https://www.facebook.com/zaini.khan.308359/", Glyph: FacebookGlyph },
  { label: "Pinterest", href: "https://www.pinterest.com/cravesave/", Glyph: PinterestGlyph },
];

const MESSAGES = [
  "Free UAE delivery when you buy 2+ abayas",
  "Premium fabrics. Exquisite design.",
  "Refer a friend — flat AED 25 off your next order",
  "Your style, delivered to your doorstep",
];

const INTERVAL_MS = 4500;

function WhatsAppGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 2.6a6.4 6.4 0 0 0-5.5 9.6L2.6 15.4l3.3-.9A6.4 6.4 0 1 0 9 2.6Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6.7 6.4c.1-.3.3-.3.5-.3h.4c.1 0 .3 0 .4.3.2.4.6 1.3.6 1.4.1.1.1.3 0 .4l-.3.4c-.1.1-.2.2-.1.4.2.3.6.9 1.2 1.4.6.5 1 .6 1.2.7.2 0 .3 0 .4-.1l.4-.5c.1-.2.3-.2.4-.1l1.2.6c.1.1.2.1.2.3 0 .8-.3 1.3-1 1.5-.6.2-1.3.3-2.9-.6-1.5-.9-2.4-2.4-2.5-2.5-.1-.1-.8-1.1-.8-2.1s.5-1.5.6-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TopUtilityBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % MESSAGES.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    timerRef.current = setInterval(advance, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reducedMotion, advance]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-between gap-3 bg-burgundy px-5 text-alabaster md:px-10"
    >
      <div className="hidden shrink-0 items-center gap-3 sm:flex">
        {SOCIALS.map(({ label, href, Glyph }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <Glyph />
          </a>
        ))}
      </div>

      <div role="status" aria-live="polite" className="relative min-w-0 flex-1 overflow-hidden text-center sm:text-left">
        {MESSAGES.map((message, i) => (
          <span
            key={message}
            aria-hidden={i !== index}
            className="absolute inset-0 flex items-center justify-center truncate text-micro uppercase tracking-[0.08em] transition-opacity duration-500 ease-out motion-reduce:transition-none sm:justify-start"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            {message}
          </span>
        ))}
        {/* Reserves layout height without depending on the absolutely-positioned spans above. */}
        <span className="invisible text-micro uppercase tracking-[0.08em]">{MESSAGES[0]}</span>
      </div>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        className="flex shrink-0 items-center gap-1.5 text-micro uppercase tracking-[0.1em]"
      >
        <WhatsAppGlyph />
        <span className="hidden md:inline">WhatsApp: {WHATSAPP_DISPLAY}</span>
        <span className="md:hidden">WhatsApp Us</span>
      </a>
    </div>
  );
}
