import { HeroCarousel } from "@/components/home/hero-carousel";
import { CollectionStatement } from "@/components/home/collection-statement";
import { FabricConstellation } from "@/components/home/fabric-constellation";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CraftedInDetail } from "@/components/home/crafted-in-detail";
import { CollectionsRunway } from "@/components/home/collections-runway";
import { AtelierInvitation } from "@/components/home/atelier-invitation";
import { OccasionNav } from "@/components/home/occasion-nav";
import { BrandPhilosophy } from "@/components/home/brand-philosophy";
import { JournalPreview } from "@/components/home/journal-preview";
import { ClientServices } from "@/components/home/client-services";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <CollectionStatement />
      <FabricConstellation />
      <FeaturedProducts />
      <CraftedInDetail />
      <CollectionsRunway />
      <AtelierInvitation />
      <OccasionNav />
      <BrandPhilosophy />
      <JournalPreview />
      <ClientServices />
    </>
  );
}
