import { Button } from "@/components/ui/button";
import { TextileStudy } from "@/components/editorial/textile-study";

const STEPS = ["Silhouette", "Fabric", "Colour", "Sleeve", "Trim", "Embroidery", "Embellishment"];

export function AtelierInvitation() {
  return (
    <section className="bg-warm-ivory text-ink">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center lg:grid-cols-2">
        <div className="px-5 py-24 md:px-10 lg:py-32">
          <span className="text-label uppercase tracking-[0.14em] text-stone">The Atelier</span>
          <h2 className="mt-4 font-serif text-display-l">Compose your abaya.</h2>
          <p className="mt-4 max-w-md text-editorial text-stone">
            Choose a silhouette, a fabric, a placement for embroidery — build a piece that exists nowhere
            else, priced transparently at every step.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {STEPS.map((step, i) => (
              <li key={step} className="text-caption uppercase tracking-[0.08em] text-stone">
                {String(i + 1).padStart(2, "0")} {step}
              </li>
            ))}
          </ul>
          <Button href="/atelier" variant="primary" showArrow className="mt-10">
            Enter the Atelier
          </Button>
        </div>
        <TextileStudy
          seed="atelier-invitation"
          alt="Abstract composition of layered fabric samples used in the Atelier"
          aspect="landscape"
          tone="gold"
          showStitching
          className="h-[50vh] lg:h-full"
        />
      </div>
    </section>
  );
}
