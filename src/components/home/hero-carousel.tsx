"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Slide {
  id: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
}

const SLIDES: Slide[] = [
  {
    id: "evening-light",
    imageSrc: "/images/campaigns/evening-light.jpg",
    imageAlt: "A woman in a deep burgundy hijab and floral dress standing beneath garden trees",
    eyebrow: "For evenings that ask for more light",
    title: "Evening Light",
    ctaLabel: "Shop the Edit",
    ctaHref: "/collections/evening-light",
  },
  {
    id: "obsidian-edit",
    imageSrc: "/images/campaigns/obsidian-edit.jpg",
    imageAlt: "A woman in a black abaya and black hijab seated at a table in a warm, architectural interior",
    eyebrow: "Architectural black, quietly constructed",
    title: "The Obsidian Edit",
    ctaLabel: "Explore the Collection",
    ctaHref: "/collections/the-obsidian-edit",
  },
  {
    id: "embroidered-atelier",
    imageSrc: "/images/campaigns/embroidered-atelier.jpg",
    imageAlt: "A woman in a maroon embroidered outfit with gold thread detail and a sheer dupatta",
    eyebrow: "Hand-guided thread, piece by piece",
    title: "The Embroidered Atelier",
    ctaLabel: "Discover the Craft",
    ctaHref: "/collections/the-embroidered-atelier",
  },
  {
    id: "quiet-structure",
    imageSrc: "/images/campaigns/quiet-structure.jpg",
    imageAlt: "Three women in modest dress in a garden, in burgundy, patterned and white hijabs",
    eyebrow: "Structure for the working day",
    title: "Quiet Structure",
    ctaLabel: "Shop Workwear",
    ctaHref: "/collections/quiet-structure",
  },
  {
    id: "atelier",
    imageSrc: "/images/campaigns/atelier.jpg",
    imageAlt: "A woman in sunglasses and an olive headscarf wearing a red and green patterned jacket",
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
          <Image
            src={s.imageSrc}
            alt={s.imageAlt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
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
