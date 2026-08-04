import type { JournalArticle } from "./types";

export const journalArticles: JournalArticle[] = [
  {
    id: "j-thread-that-moves",
    slug: "the-thread-that-moves-with-you",
    title: "The Thread That Moves With You",
    excerpt:
      "Inside the hand-guided embroidery process behind The Embroidered Atelier — from guide line to finished cuff.",
    category: "Craft",
    readingTime: "6 min read",
    publishedAt: "2026-05-04",
    body: [
      "A finished embroidered cuff represents several hours of work that begin long before a single stitch is placed. A faint guide line is drawn directly onto the cloth, tracing the path the thread will eventually follow.",
      "From there, an embroiderer works in short, controlled passes — thread density is adjusted by hand depending on how the light in the final garment will fall across that section of fabric. No two cuffs are identical, and that is treated as a feature of the process rather than a flaw to correct.",
      "Beadwork, where used, is set after the thread is complete, anchored individually rather than in a continuous run. The final step is a light press with steam only — direct heat on finished embroidery is avoided entirely, since it flattens the dimensional quality the thread was built to create.",
    ],
  },
  {
    id: "j-weight-of-nida",
    slug: "the-weight-of-nida",
    title: "The Weight of Nida",
    excerpt:
      "Why a fabric with almost no surface decoration is the hardest one to get right — a look at Essential Nida.",
    category: "Material",
    readingTime: "5 min read",
    publishedAt: "2026-04-18",
    body: [
      "Matte Nida is often treated as a default choice, but it is one of the least forgiving fabrics to cut well. With no embroidery or embellishment to draw attention elsewhere, every seam and proportion decision is fully visible.",
      "The weight of the cloth determines how a silhouette reads at rest and in motion — too light, and a straight cut collapses without structure; too heavy, and movement disappears entirely. Essential Nida was refined across several seasons specifically around this balance.",
      "The collection carries no applied decoration by design. Cut, drape and proportion are the only tools available, which is precisely the constraint the collection is built around.",
    ],
  },
  {
    id: "j-composing-in-the-atelier",
    slug: "composing-in-the-atelier",
    title: "Composing in the Atelier",
    excerpt: "A guide to using the Zoya Atelier customizer — from silhouette to final embellishment.",
    category: "Atelier",
    readingTime: "4 min read",
    publishedAt: "2026-03-22",
    body: [
      "The Atelier customizer follows the same sequence a private consultation would: silhouette first, then fabric, then the details that sit on top of both. Each choice narrows the ones that follow, so the composition stays coherent rather than arbitrary.",
      "Embroidery placement is deliberately limited to a small number of positions — cuff, sleeve, shoulder, front edge, back, hem or a full composition — because restraint at this stage is what keeps a highly customized piece from reading as busy.",
      "A saved design can be revisited at any time before it moves to consultation, and every combination is priced transparently as you build it, so there is never a surprise at the review step.",
    ],
  },
];

export function getArticle(slug: string) {
  return journalArticles.find((a) => a.slug === slug);
}
