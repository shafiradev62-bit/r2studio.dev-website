import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Showcase } from "@/components/site/Showcase";
import { Gallery3D } from "@/components/site/Gallery3D";
import { IsometricPipeline } from "@/components/site/IsometricPipeline";
import { Matrix } from "@/components/site/Matrix";
import { Results } from "@/components/site/Results";
import { Studio } from "@/components/site/Studio";
import { EuGlobe } from "@/components/site/EuGlobe";
import { Capabilities } from "@/components/site/Capabilities";
import { Contact } from "@/components/site/Contact";
import { useReveal } from "@/components/site/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "r2studio.dev — Enterprise Shopify Plus & Web3 Engineering Studio" },
      { name: "description", content: "r2studio.dev is a senior engineering studio building high-scale Shopify Plus integrations and decentralized commerce for global enterprise brands." },
      { property: "og:title", content: "r2studio.dev — Enterprise Shopify Plus & Web3 Engineering" },
      { property: "og:description", content: "High-scale commerce. Decentralized tech. Built for global brands." },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Showcase />
      <Gallery3D />
      <IsometricPipeline />
      <Matrix />
      <Results />
      <Studio />
      <EuGlobe />
      <Capabilities />
      <Contact />
    </main>
  );
}
