"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

const STITCH_PATH =
  "M40,220 C90,60 210,60 260,140 C300,205 220,260 170,220 C130,188 160,120 220,120 C270,120 290,170 260,200";

const BEADS = [
  { x: 220, y: 120 },
  { x: 244, y: 132 },
  { x: 260, y: 158 },
  { x: 258, y: 188 },
  { x: 238, y: 204 },
];

export function CraftedInDetail() {
  const [ref, progress] = useScrollProgress<HTMLDivElement>();

  const drawProgress = clamp(map(progress, 0.05, 0.55, 0, 1));
  const beadProgress = clamp(map(progress, 0.5, 0.7, 0, 1));
  const sweepProgress = clamp(map(progress, 0.65, 0.9, 0, 1));
  const pullBack = clamp(map(progress, 0.8, 1, 0, 1));

  return (
    <section ref={ref} className="relative bg-warm-ivory py-24 text-ink md:py-32">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 px-5 md:px-10 lg:grid-cols-2">
        <div>
          <span className="text-label uppercase tracking-[0.14em] text-stone">Crafted in Detail</span>
          <h2 className="mt-4 font-serif text-display-l">A single line, followed by hand.</h2>
          <p className="mt-4 max-w-md text-editorial text-stone">
            A faint guide line is drawn onto the cloth before a single stitch is placed. From there, an
            embroiderer works in short controlled passes — thread first, beadwork after, light last.
          </p>
          <p className="mt-4 max-w-md text-caption text-stone">
            Read more in the Journal: &ldquo;The Thread That Moves With You.&rdquo;
          </p>
        </div>

        <div
          className="relative mx-auto aspect-square w-full max-w-md border border-ink/10 transition-transform duration-700"
          style={{ transform: `scale(${1 + pullBack * 0.08})` }}
        >
          <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
            <rect width="320" height="320" fill="#0d0d0d" />
            <path
              d={STITCH_PATH}
              fill="none"
              stroke="#3a352c"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={0.5}
            />
            <path
              d={STITCH_PATH}
              fill="none"
              stroke="#ad8a54"
              strokeWidth="2.2"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - drawProgress}
            />
            {BEADS.map((bead, i) => {
              const threshold = i / BEADS.length;
              const visible = beadProgress > threshold;
              return (
                <circle
                  key={i}
                  cx={bead.x}
                  cy={bead.y}
                  r={visible ? 4.5 : 0}
                  fill="#f4f0e9"
                  className="transition-all duration-500"
                />
              );
            })}
            <rect
              x={-40 + sweepProgress * 400}
              y="0"
              width="60"
              height="320"
              fill="url(#sweepGradient)"
              opacity={0.5}
              style={{ mixBlendMode: "screen" }}
            />
            <defs>
              <linearGradient id="sweepGradient" x1="0" x2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}

function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}
function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}
