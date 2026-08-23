"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = {
  id: string;
  src: string;
  alt: string;
};

const SLIDES: Slide[] = [
  {
    id: "delivery",
    src: "/images/marketing/announcement/panel-delivery.png",
    alt: "Free UAE delivery when you buy 2 or more abayas",
  },
  {
    id: "fabrics",
    src: "/images/marketing/announcement/panel-fabrics.png",
    alt: "Premium fabrics, exquisite design — our promise of durability at the best price",
  },
  {
    id: "refer",
    src: "/images/marketing/announcement/panel-refer.png",
    alt: "Refer a friend and get a flat AED 25 off your next order",
  },
  {
    id: "style",
    src: "/images/marketing/announcement/panel-style.png",
    alt: "Your style, delivered — get your Zoya Fashion favourites at your doorstep",
  },
];

const INTERVAL_MS = 5000;

export function HomeHeroBanner() {
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

  return (
    <div
      role="region"
      aria-label="Promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative aspect-[1705/221] w-full overflow-hidden bg-warm-ivory"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show promotion ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="h-1.5 rounded-full bg-alabaster transition-all duration-300"
            style={{ opacity: i === index ? 0.95 : 0.5, width: i === index ? "1.25rem" : "0.375rem" }}
          />
        ))}
      </div>
    </div>
  );
}
