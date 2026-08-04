import type { Metadata } from "next";
import Link from "next/link";
import { TextileStudy } from "@/components/editorial/textile-study";
import { journalArticles } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on craft, material and the Atelier from Zoya Fashion.",
};

export default function JournalPage() {
  return (
    <div className="bg-alabaster pt-24">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <span className="text-label uppercase tracking-[0.14em] text-stone">Journal</span>
        <h1 className="mt-4 max-w-2xl font-serif text-display-l">Notes from the atelier.</h1>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3">
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
              <h2 className="mt-2 font-serif text-h3">{article.title}</h2>
              <p className="mt-2 text-body text-stone">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
