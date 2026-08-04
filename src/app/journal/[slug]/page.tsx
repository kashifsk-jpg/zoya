import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TextileStudy } from "@/components/editorial/textile-study";
import { JsonLd } from "@/components/seo/json-ld";
import { getArticle, journalArticles } from "@/lib/journal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const otherArticles = journalArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="bg-alabaster pt-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          articleSection: article.category,
        }}
      />
      <div className="mx-auto max-w-2xl px-5 py-12 md:px-10">
        <Link href="/journal" className="text-caption uppercase tracking-[0.08em] text-stone underline">
          Journal
        </Link>
        <p className="mt-6 text-caption uppercase tracking-[0.08em] text-stone">
          {article.category} · {article.readingTime}
        </p>
        <h1 className="mt-3 font-serif text-display-l">{article.title}</h1>
        <p className="mt-3 text-caption text-stone">
          {new Date(article.publishedAt).toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <TextileStudy seed={article.id} alt={article.title} aspect="landscape" tone="gold" className="mt-8" />

        <div className="mt-10 space-y-6">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-editorial text-stone">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {otherArticles.length > 0 && (
        <div className="mx-auto max-w-2xl border-t border-ink/10 px-5 py-12 md:px-10">
          <p className="text-label uppercase tracking-[0.14em] text-stone">Continue Reading</p>
          <div className="mt-4 flex flex-col gap-4">
            {otherArticles.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="font-serif text-h3 hover:opacity-70">
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
