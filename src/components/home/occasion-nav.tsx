import Link from "next/link";
import { TextileStudy, type TextileTone } from "@/components/editorial/textile-study";
import type { Occasion } from "@/lib/types";

const OCCASIONS: { name: Occasion; tone: TextileTone }[] = [
  { name: "Everyday", tone: "sand" },
  { name: "Work", tone: "stone" },
  { name: "Evening", tone: "burgundy" },
  { name: "Wedding", tone: "ivory" },
  { name: "Ramadan", tone: "gold" },
  { name: "Eid", tone: "gold" },
  { name: "Travel", tone: "stone" },
];

export function OccasionNav() {
  return (
    <section className="bg-warm-ivory py-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <span className="text-label uppercase tracking-[0.14em] text-stone">Shop by Occasion</span>
        <h2 className="mt-4 font-serif text-display-l">Dressed for where you&rsquo;re going.</h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {OCCASIONS.map((occasion) => (
            <Link key={occasion.name} href={`/collections?occasion=${occasion.name}`} className="group block">
              <TextileStudy
                seed={`occasion-${occasion.name}`}
                alt={`${occasion.name} occasion`}
                aspect="detail"
                tone={occasion.tone}
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <p className="mt-2 text-center text-caption uppercase tracking-[0.08em]">{occasion.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
