"use client";

import { useEffect, useRef, useState } from "react";
import { TextileStudy, type TextileTone } from "@/components/editorial/textile-study";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Slide {
  id: string;
  imageSeed: string;
  imageAlt: string;
  tone: TextileTone;
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
}

// No licensed campaign photography exists yet (see public/models/README.md and
// the README's "3D asset workflow" section) — these use the same deterministic
// TextileStudy placeholder as product imagery elsewhere on the site. Swap
// imageSeed usage for a real <Image> once real campaign photos are sourced.
const SLIDES: Slide[] = [
  {
    id: "signature-abayas",
    imageSeed: "hero-signature-abayas",
    imageAlt: "A woman in a black embroidered abaya with a matching scarf",
    tone: "obsidian",
    eyebrow: "Everyday and occasion abayas",
    title: "Signature Abayas",
    ctaLabel: "Shop the Edit",
    ctaHref: "/collections/signature-abayas",
  },
  {
    id: "three-piece-sets",
    imageSeed: "hero-three-piece-sets",
    imageAlt: "A three-piece abaya set: outer abaya, inner dress and matching hijab",
    tone: "gold",
    eyebrow: "Outer abaya, inner dress, matching hijab",
    title: "Three-Piece Sets",
    ctaLabel: "Shop the Sets",
    ctaHref: "/collections/three-piece-sets",
  },
  {
    id: "atelier",
    imageSeed: "hero-atelier",
    imageAlt: "A woman in sunglasses and an olive headscarf wearing a red and green patterned jacket",
    tone: "sand",
    eyebrow: "Compose your own",
    title: "The Atelier",
    ctaLabel: "Enter the Atelier",
    ctaHref: "/atelier",
  },
];

const AUTO_ROTATE_MS = 5500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reducedMotion || paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reducedMotion, paused]);

  const slide = SLIDES[index];

  function goTo(i: number) {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }

  return (
    <section
      className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-warm-ivory"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <TextileStudy
            seed={s.imageSeed}
            alt={s.imageAlt}
            tone={s.tone}
            aspect="landscape"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ))}

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(13,13,13,0.6), transparent 55%)" }}
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 text-alabaster sm:px-10 lg:px-16">
        <p className="text-label uppercase tracking-[0.14em] text-thread-silver">{slide.eyebrow}</p>
        <h1 className="mt-3 max-w-xl font-serif text-display-l">{slide.title}</h1>
        <Button href={slide.ctaHref} variant="primary-light" showArrow className="mt-8 w-fit">
          {slide.ctaLabel}
        </Button>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
            aria-current={i === index ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-6 bg-alabaster" : "w-1.5 bg-alabaster/40 hover:bg-alabaster/70",
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-alabaster/40 text-alabaster transition-colors hover:bg-alabaster/10 sm:left-6"
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-alabaster/40 text-alabaster transition-colors hover:bg-alabaster/10 sm:right-6"
      >
        →
      </button>
    </section>
  );
}
