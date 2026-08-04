import { Button } from "@/components/ui/button";
import { TextileStudy } from "@/components/editorial/textile-study";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-5 py-24 text-center">
      <TextileStudy seed="not-found" alt="An abstract study, representing a page that could not be found" aspect="landscape" tone="stone" className="w-full" />
      <p className="text-label uppercase tracking-[0.14em] text-stone">404</p>
      <h1 className="font-serif text-h1">This page isn&rsquo;t part of the collection.</h1>
      <p className="text-body text-stone">The page you&rsquo;re looking for may have moved or no longer exists.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button href="/">Return Home</Button>
        <Button href="/collections" variant="secondary">
          Browse the Collection
        </Button>
      </div>
    </div>
  );
}
