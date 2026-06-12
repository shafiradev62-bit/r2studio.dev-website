import { Asterisk, CurlyUnderline } from "./Sketch";

const groups = [
  {
    g: "Shopify Plus Engineering",
    items: [
      "GraphQL Admin & Storefront API",
      "Hydrogen + Remix headless builds",
      "Checkout Extensibility & Functions",
      "Markets Pro multi-market expansion",
      "B2B / Wholesale catalogs",
      "Custom Shopify apps (embedded)",
      "Metaobjects & metafield modeling",
      "Subscription engines (skip / swap / pause)",
      "Bundles & complex product configs",
      "Theme performance & Core Web Vitals",
      "ERP ↔ Shopify real-time sync",
      "PIM integration at 100k+ SKU scale",
    ],
  },
  {
    g: "Web3 & Decentralized",
    items: [
      "Solidity — ERC-20 / 721 / 1155",
      "Rust + Anchor programs on Solana",
      "Token-gated checkout & pricing",
      "On-chain ↔ Shopify reconciliation",
      "Native SOL & ETH payments",
      "DAO governance & treasury tooling",
      "Wallet auth (wagmi / SIWE)",
      "NFT-backed loyalty & memberships",
      "Smart-contract audits & gas tuning",
      "Stablecoin settlement to fiat",
      "On-chain provenance & authenticity",
      "Multi-chain bridging & indexing",
    ],
  },
  {
    g: "3D, AI & Product Pipeline",
    items: [
      "Prompt → editable 3D garment",
      "Blender round-trip workflows",
      "Lectra pattern export (DXF / AAMA)",
      "USD / glTF asset pipelines",
      "Auto-graded 2D sewing patterns",
      "AI product imagery & try-on",
      "Configurator & live 3D viewer",
      "Real-time WebGL render pipelines",
      "Generative copy & PDP enrichment",
      "ML recommendations & ranking",
      "Semantic & vector search",
      "Digital-twin sampling workflows",
    ],
  },
  {
    g: "Infrastructure & Operations",
    items: [
      "AWS — ECS, Lambda, EventBridge",
      "Cloudflare Workers & edge compute",
      "Event-driven pipelines on Kafka",
      "Zero-downtime cutover playbooks",
      "Observability — Datadog & Sentry",
      "Cross-border 3PL & customs automation",
      "ML fraud / bot defense at checkout",
      "CI/CD & infra-as-code (Terraform)",
      "Load & chaos testing for drops",
      "Data warehousing & analytics (BigQuery)",
      "Headless CMS (Sanity / Contentful)",
      "Search & merchandising (Algolia)",
    ],
  },
  {
    g: "European Market & Compliance",
    items: [
      "GDPR-compliant data architecture",
      "EU data residency (Frankfurt hosting)",
      "Cookie consent & CMP (Cookiebot / OneTrust)",
      "VAT / OSS multi-country tax handling",
      "Multi-currency local pricing (EUR / GBP / CHF / SEK)",
      "Localization across 24 EU languages",
      "SEPA, iDEAL, Bancontact & Giropay",
      "Klarna & buy-now-pay-later (EU)",
      "PSD2 Strong Customer Authentication",
      "EU Accessibility Act / WCAG 2.2 AA",
      "Digital Services Act (DSA) readiness",
      "Digital Product Passport (DPP)",
      "EPR & packaging compliance reporting",
      "Right-to-be-forgotten automation",
      "Carbon-aware delivery & sustainability",
      "Country-specific returns & consumer rights",
    ],
  },
];


export function Capabilities() {
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  let idx = 0;

  return (
    <section id="capabilities" className="hairline border-b">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <Asterisk aria-hidden className="hidden md:block absolute top-24 right-20 w-6 h-6 text-accent" />
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-block h-px w-8 bg-foreground/40" />
            <span>Core Competencies — {total} Capabilities</span>
          </div>
          <h2 className="relative mt-6 font-serif text-4xl md:text-6xl tracking-[-0.03em] text-foreground reveal-item">
            Everything we ship,
            <br />
            <span className="relative inline-block">
              <em className="italic font-normal text-muted-foreground">in one studio.</em>
              <CurlyUnderline
                aria-hidden
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 w-full h-3 text-accent"
              />
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-xl">
            {total} production capabilities across commerce, Web3, 3D, and the
            unglamorous infrastructure that decides whether a launch ships on time.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hairline)] hairline border">
          {groups.map((group) => (
            <div key={group.g} className="bg-background p-8 md:p-10 reveal-item">
              <h3 className="font-serif text-2xl tracking-[-0.02em] text-foreground">
                {group.g}
              </h3>
              <ul className="mt-6 hairline border-t">
                {group.items.map((it) => {
                  idx += 1;
                  return (
                    <li
                      key={it}
                      className="hairline border-b py-3 text-[13px] text-foreground/85 flex items-center gap-4"
                    >
                      <span className="font-mono text-[10px] tracking-wider text-muted-foreground w-7 shrink-0">
                        {String(idx).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{it}</span>
                      <span aria-hidden className="text-muted-foreground">+</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
