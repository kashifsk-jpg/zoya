"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = {
  id: string;
  src: string;
  alt: string;
  bg: string;
};

const SLIDES: Slide[] = [
  {
    id: "delivery",
    src: "/images/marketing/announcement/panel-delivery.png",
    alt: "Free UAE delivery when you buy 2 or more abayas",
    bg: "#3a0f19",
  },
  {
    id: "fabrics",
    src: "/images/marketing/announcement/panel-fabrics.png",
    alt: "Premium fabrics, exquisite design — our promise of durability at the best price",
    bg: "#efe6d8",
  },
  {
    id: "refer",
    src: "/images/marketing/announcement/panel-refer.png",
    alt: "Refer a friend and get a flat AED 25 off your next order",
    bg: "#141414",
  },
  {
    id: "style",
    src: "/images/marketing/announcement/panel-style.png",
    alt: "Your style, delivered — get your Zoya Fashion favourites at your doorstep",
    bg: "#e9cfc9",
  },
];

const INTERVAL_MS = 5500;

export function AnnouncementCarousel() {
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
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    timerRef.current = setInterval(advance, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reducedMotion, advance]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const active = SLIDES[index];

  return (
    <div
      role="region"
      aria-label="Promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="fixed inset-x-0 top-0 z-[60] h-20 overflow-hidden transition-colors duration-700 ease-out sm:h-24 lg:h-28"
      style={{ backgroundColor: active.bg }}
    >
      <div className="relative mx-auto h-full max-w-[1600px]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className="absolute inset-0 flex items-center justify-center px-4 transition-opacity duration-700 ease-out motion-reduce:transition-none"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <div className="relative h-full w-full">
              <Image
                src={slide.src}
                alt={i === index ? slide.alt : ""}
                fill
                sizes="(min-width: 1600px) 1600px, 100vw"
                className="object-cover object-left sm:object-contain"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-1.5 flex items-center justify-center gap-1.5 sm:bottom-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show promotion ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="h-1.5 w-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: "currentColor",
              opacity: i === index ? 0.9 : 0.35,
              color: active.id === "fabrics" || active.id === "style" ? "#151515" : "#fbfbf9",
              width: i === index ? "1rem" : "0.375rem",
            }}
          />
        ))}
      </div>
    </div>
  );
}
