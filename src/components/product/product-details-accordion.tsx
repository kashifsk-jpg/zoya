import type { ReactNode } from "react";
import { getFabric } from "@/lib/fabrics";
import type { Product } from "@/lib/types";

function AccordionItem({ title, children, defaultOpen }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-ink/10 py-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-body">
        {title}
        <span className="text-stone transition-transform group-open:rotate-45" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="mt-3 text-body text-stone">{children}</div>
    </details>
  );
}

export function ProductDetailsAccordion({ product }: { product: Product }) {
  const fabric = getFabric(product.fabricId);
  const fabricLabel = product.collectionSlug === "fine-jewelry" ? "Material" : "Fabric";

  return (
    <div className="mt-10">
      <AccordionItem title="Description" defaultOpen>
        <p>{product.description}</p>
        {fabric && (
          <p className="mt-2">
            <span className="text-ink">{fabricLabel}:</span> {fabric.name}
          </p>
        )}
      </AccordionItem>
      <AccordionItem title={product.collectionSlug === "fine-jewelry" ? "Material & Care" : "Fabric & Care"}>
        <p>{fabric?.name} — {fabric?.texture}</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          {product.care.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ul>
      </AccordionItem>
      <AccordionItem title="Construction">
        <ul className="list-inside list-disc space-y-1">
          {product.constructionDetails.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </AccordionItem>
      {product.embroideryType !== "None" && (
        <AccordionItem title="Embroidery &amp; Embellishment">
          <p>{product.embroideryType}</p>
          {product.embellishmentType !== "None" && <p className="mt-1">{product.embellishmentType}</p>}
        </AccordionItem>
      )}
      <AccordionItem title="Measurements">
        <p>{product.modelMeasurements}</p>
        <p className="mt-1">{product.productMeasurements}</p>
      </AccordionItem>
    </div>
  );
}
