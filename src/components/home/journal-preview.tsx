import Link from "next/link";
import { TextileStudy } from "@/components/editorial/textile-study";
import { journalArticles } from "@/lib/journal";

export function JournalPreview() {
  return (
    <section className="bg-alabaster py-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-label uppercase tracking-[0.14em] text-stone">Journal</span>
            <h2 className="mt-4 font-serif text-display-l">Notes from the atelier.</h2>
          </div>
          <Link href="/journal" className="hidden text-label uppercase tracking-[0.14em] underline decoration-1 underline-offset-4 md:inline">
            All articles
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {journalArticles.map((article) => (
            <Link key={article.id} href={`/journal/${article.slug}`} className="group block">
              <TextileStudy
                seed={article.id}
                alt={article.title}
                aspect="landscape"
                tone={article.category === "Craft" ? "gold" : article.category === "Material" ? "sand" : "stone"}
                className="transition-opacity group-hover:opacity-90"
              />
              <p className="mt-4 text-caption uppercase tracking-[0.08em] text-stone">
                {article.category} · {article.readingTime}
              </p>
              <h3 className="mt-2 font-serif text-h3">{article.title}</h3>
              <p className="mt-2 text-body text-stone">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
