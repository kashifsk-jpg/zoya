import type { Metadata } from "next";
import { TextileStudy } from "@/components/editorial/textile-study";
import { collections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "About",
  description: "Zoya Fashion — modesty, shaped by movement. Our approach to cut, fabric and craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="bg-alabaster pt-24">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-10">
        <span className="text-label uppercase tracking-[0.14em] text-stone">About</span>
        <h1 className="mt-4 font-serif text-display-l">Modesty, shaped by movement.</h1>
        <p className="mt-6 text-editorial text-stone">
          Zoya Fashion is a study in restraint — contemporary abayas built from considered cut, honest fabric
          and craftsmanship that rewards a second look. We work in cut, drape and construction because a
          garment that moves well says more than one that shouts.
        </p>
      </div>

      <TextileStudy seed="about-hero" alt="Abstract composition representing the Zoya Fashion studio" aspect="landscape" tone="burgundy" className="h-[50vh]" showStitching />

      <section className="mx-auto max-w-3xl px-5 py-20 md:px-10">
        <h2 className="font-serif text-h2">What we believe</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-label uppercase tracking-[0.14em] text-stone">Restraint over ornament</h3>
            <p className="mt-2 text-body text-stone">
              Regional luxury, represented through material quality, space and precise construction — not
              literal ornament or imagery.
            </p>
          </div>
          <div>
            <h3 className="text-label uppercase tracking-[0.14em] text-stone">Fabric first</h3>
            <p className="mt-2 text-body text-stone">
              Every silhouette begins as a question of cloth. Weight, drape and hand determine the construction
              that follows, not the other way around.
            </p>
          </div>
          <div>
            <h3 className="text-label uppercase tracking-[0.14em] text-stone">Honest craftsmanship</h3>
            <p className="mt-2 text-body text-stone">
              Hand-guided embroidery is allowed to vary piece to piece. We treat that variation as a feature of
              the process, not a flaw to standardize away.
            </p>
          </div>
          <div>
            <h3 className="text-label uppercase tracking-[0.14em] text-stone">Modern, not derivative</h3>
            <p className="mt-2 text-body text-stone">
              We avoid literal cultural imagery in favour of proportion, light and shadow — modesty expressed
              through construction rather than decoration.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-warm-ivory py-20">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <h2 className="font-serif text-h2">Five collections, one idea each</h2>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {collections.map((c) => (
              <li key={c.id}>
                <p className="text-label uppercase tracking-[0.14em] text-stone">{c.index}</p>
                <p className="mt-2 font-serif text-h3">{c.title}</p>
                <p className="mt-2 text-caption text-stone">{c.statement}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center md:px-10">
        <p className="text-caption text-stone">
          Zoya Fashion is an educational visualization project built from publicly available information. It is
          not an operating storefront, and no purchase made here is processed for payment.
        </p>
      </section>
    </div>
  );
}
