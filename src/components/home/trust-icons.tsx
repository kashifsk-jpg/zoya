// Three-point trust row for the homepage, adapted from the voguesuq-style
// "why choose us" band the user referenced — Zoya-specific claims only
// (no fabricated guarantees).
const POINTS = [
  {
    title: "Handcrafted Detail",
    body: "Embroidery and embellishment finished by hand on every abaya and prayer dress.",
  },
  {
    title: "Cash on Delivery",
    body: "Pay when your order arrives — available UAE-wide, no card required.",
  },
  {
    title: "WhatsApp Support",
    body: "Real replies from our team on sizing, fabric and order status — not a bot.",
  },
] as const;

export function TrustIcons() {
  return (
    <section className="border-y border-ink/10 bg-warm-ivory py-16">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:grid-cols-3 md:px-10">
        {POINTS.map((p) => (
          <div key={p.title} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
              <span className="text-h3 font-serif">✦</span>
            </div>
            <h3 className="mt-4 text-label uppercase tracking-[0.1em] text-ink">{p.title}</h3>
            <p className="mt-2 text-caption text-stone">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
