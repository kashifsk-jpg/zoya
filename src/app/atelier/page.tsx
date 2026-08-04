import type { Metadata } from "next";
import { AtelierExperience } from "@/components/atelier/atelier-experience";

export const metadata: Metadata = {
  title: "The Atelier",
  description: "Compose a made-to-measure abaya: silhouette, fabric, colour, sleeve, trim, embroidery and embellishment.",
};

export default function AtelierPage() {
  return <AtelierExperience />;
}
