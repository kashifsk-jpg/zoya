import { seededRandom } from "@/lib/seeded-random";
import { cn } from "@/lib/utils";

export type TextileTone = "obsidian" | "ivory" | "sand" | "burgundy" | "stone" | "gold";

const TONE_STOPS: Record<TextileTone, [string, string, string]> = {
  obsidian: ["#050505", "#171717", "#0d0d0d"],
  ivory: ["#efe9dd", "#f7f4ec", "#e3dccb"],
  sand: ["#c9b8a8", "#e2d3c3", "#b7a290"],
  burgundy: ["#2d0c14", "#4a1420", "#170709"],
  stone: ["#524d47", "#6e6963", "#403c37"],
  gold: ["#8a6d3c", "#ad8a54", "#5f4a29"],
};

const ASPECT_CLASSES: Record<string, string> = {
  portrait: "aspect-[3/4]",
  detail: "aspect-square",
  landscape: "aspect-[16/9]",
};

interface TextileStudyProps {
  seed: string;
  alt: string;
  aspect?: "portrait" | "detail" | "landscape";
  tone?: TextileTone;
  showStitching?: boolean;
  className?: string;
}

/**
 * Deterministic, generated stand-in for garment photography — an abstract
 * draped-textile composition, not a raster asset. Replace with photography
 * per docs/ASSET replacement guide once licensed imagery exists.
 */
export function TextileStudy({
  seed,
  alt,
  aspect = "portrait",
  tone = "obsidian",
  showStitching = false,
  className,
}: TextileStudyProps) {
  const rand = seededRandom(seed);
  const [c1, c2, c3] = TONE_STOPS[tone];
  const angle = Math.floor(rand() * 360);
  const folds = Array.from({ length: 4 + Math.floor(rand() * 3) }, (_, i) => {
    const y = 10 + i * (80 / 6) + rand() * 8;
    const curve = 20 + rand() * 40;
    const opacity = 0.06 + rand() * 0.1;
    return { y, curve, opacity, key: i };
  });
  const stitches = showStitching
    ? Array.from({ length: 10 }, (_, i) => ({
        x: 20 + rand() * 60,
        y: 20 + rand() * 60,
        r: 0.6 + rand() * 0.8,
        key: i,
      }))
    : [];

  const gradientId = `g-${seed}`;

  return (
    <figure
      className={cn("relative w-full overflow-hidden bg-ink", ASPECT_CLASSES[aspect], className)}
      role="img"
      aria-label={alt}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} gradientTransform={`rotate(${angle} 0.5 0.5)`}>
            <stop offset="0%" stopColor={c1} />
            <stop offset="55%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${gradientId})`} />
        {folds.map((f) => (
          <path
            key={f.key}
            d={`M -10 ${f.y} Q 50 ${f.y - f.curve} 110 ${f.y}`}
            fill="none"
            stroke="#ffffff"
            strokeOpacity={f.opacity}
            strokeWidth={0.6}
          />
        ))}
        {stitches.map((s) => (
          <circle key={s.key} cx={s.x} cy={s.y} r={s.r} fill="#ad8a54" fillOpacity={0.55} />
        ))}
      </svg>
      <span className="sr-only">{alt}</span>
    </figure>
  );
}
