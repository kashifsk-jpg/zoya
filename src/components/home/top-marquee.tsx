// Scrolling trust-badge ticker, shown above the header. Pure CSS marquee
// (duplicated content track, animated via transform) — no JS/library needed,
// respects prefers-reduced-motion via the .marquee-track rule in globals.css.
const BADGES = [
  "Free UAE-Wide Delivery",
  "Cash on Delivery Available",
  "Genuine Product Photos",
  "WhatsApp Order Support",
  "Easy Exchange on Sizing Issues",
  "Handcrafted Embroidery",
];

export function TopMarquee() {
  const track = [...BADGES, ...BADGES];

  return (
    <div className="overflow-hidden border-b border-alabaster/10 bg-ink py-2 text-alabaster">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {track.map((badge, i) => (
          <span key={i} className="flex items-center gap-8 text-micro uppercase tracking-[0.14em]">
            <span className="text-gold">★</span>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
