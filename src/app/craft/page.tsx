import type { Metadata } from "next";
import Link from "next/link";
import { TextileStudy, type TextileTone } from "@/components/editorial/textile-study";
import { fabrics } from "@/lib/fabrics";

export const metadata: Metadata = {
  title: "Craft",
  description: "Fabric, embroidery and construction — how Zoya Fashion pieces are made, and how to care for them.",
};

const TONES: TextileTone[] = ["obsidian", "stone", "sand", "burgundy", "gold", "ivory"];

export default function CraftPage() {
  return (
    <div className="bg-alabaster pt-24">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center md:px-10">
        <span className="text-label uppercase tracking-[0.14em] text-stone">Craft</span>
        <h1 className="mt-4 font-serif text-display-l">Fabric, thread and construction.</h1>
        <p className="mt-6 text-editorial text-stone">
          Every piece begins as a decision about cloth. What follows — cut, seam, embroidery, embellishment — is
          built to serve that fabric&rsquo;s weight and drape, not to disguise it.
        </p>
      </div>

      <section className="bg-warm-ivory py-20 text-ink">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <h2 className="font-serif text-display-l">Fabric families</h2>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {fabrics.map((fabric, i) => (
              <div key={fabric.id}>
                <TextileStudy seed={fabric.id} alt={`${fabric.name} fabric study`} aspect="detail" tone={TONES[i % TONES.length]} />
                <h3 className="mt-3 font-serif text-h3">{fabric.name}</h3>
                <p className="mt-1 text-caption text-stone">{fabric.weight} · {fabric.texture}</p>
                <p className="mt-2 text-caption text-stone">{fabric.drape}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 md:px-10">
        <span className="text-label uppercase tracking-[0.14em] text-stone">Process</span>
        <h2 className="mt-4 font-serif text-display-l">A single line, followed by hand.</h2>
        <p className="mt-6 text-editorial text-stone">
          A faint guide line is drawn directly onto the cloth before a single stitch is placed. From there, an
          embroiderer works in short, controlled passes — thread density is adjusted by hand depending on how
          light will fall across that section of the finished garment.
        </p>
        <p className="mt-4 text-editorial text-stone">
          Beadwork, where used, is set after the thread is complete, anchored individually rather than in a
          continuous run. The final step is a light press with steam only — direct heat on finished embroidery
          is avoided entirely, since it flattens the dimensional quality the thread was built to create.
        </p>
        <Link href="/journal/the-thread-that-moves-with-you" className="mt-6 inline-block text-label uppercase tracking-[0.14em] underline">
          Read the full story in the Journal
        </Link>
      </section>

      <section id="size-guide" className="scroll-mt-24 border-t border-ink/10 bg-warm-ivory py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <h2 className="font-serif text-h2">Size Guide</h2>
          <p className="mt-4 text-body text-stone">
            All sizing runs XS–XXL, with three standard lengths (Petite 54&Prime;, Standard 56&Prime;, Tall 58&Prime;).
            Every product page includes garment-specific measurements alongside the general size chart — open
            &ldquo;Size Guide&rdquo; from any product to see the full table. Atelier pieces can be measured to your
            own specification.
          </p>
        </div>
      </section>

      <section id="care" className="scroll-mt-24 border-t border-ink/10 py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <h2 className="font-serif text-h2">Care Guide</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-body text-stone">
            <li>Embroidered and embellished pieces: dry clean only, by a cleaner experienced with embellished garments.</li>
            <li>Matte Nida and linen-blend pieces: cool machine wash, low iron, do not tumble dry.</li>
            <li>Satin and silk crepe: dry clean recommended; steam rather than press to preserve sheen.</li>
            <li>Store on a padded hanger, away from direct sunlight, in a breathable garment bag.</li>
          </ul>
        </div>
      </section>

      <section id="delivery" className="scroll-mt-24 border-t border-ink/10 bg-warm-ivory py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <h2 className="font-serif text-h2">Delivery</h2>
          <p className="mt-4 text-body text-stone">
            In-stock pieces ship within 1–2 business days, arriving in 3–5 business days across the UAE metro
            area. GCC and international delivery is available on request — message our styling team on WhatsApp
            for an estimate to your location. Made-to-order and Atelier pieces ship in 3–4 weeks.
          </p>
        </div>
      </section>

      <section id="returns" className="scroll-mt-24 border-t border-ink/10 py-16">
        <div className="mx-auto max-w-3xl px-5 pb-4 md:px-10">
          <h2 className="font-serif text-h2">Returns</h2>
          <p className="mt-4 text-body text-stone">
            Unworn, unaltered pieces in original condition may be returned within 14 days of delivery.
            Made-to-order and Atelier compositions are final sale, given their custom construction.
          </p>
        </div>
      </section>
    </div>
  );
}
