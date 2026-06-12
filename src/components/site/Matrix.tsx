import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Asterisk, HandArrow, Squiggle, Star } from "./Sketch";
import showcaseVideo from "@/assets/showcase-3d.mp4.asset.json";

type Project = {
  n: string;
  tag: string;
  title: string;
  desc: string;
  client: string;
  stack: string[];
  span: string;
  video?: string;
  flagship?: boolean;
  year: string;
  duration: string;
  team: string;
  outcome: { k: string; v: string }[];
  brief: string;
  challenge: string;
  approach: string[];
};

const projects: Project[] = [
  {
    n: "F",
    tag: "AI · 3D · Lectra",
    title: "One prompt → production-ready 3D garment, editable in Blender",
    desc: "A text-to-3D garment pipeline: type a brief, get a parametric 3D garment with real sewing patterns — exported clean to Blender and synced into Lectra for production.",
    client: "Maison Albini — Milan & London",
    stack: ["Lectra", "Blender", "USD / glTF", "Lovable AI"],
    span: "md:col-span-12 md:row-span-2",
    video: showcaseVideo.url,
    flagship: true,
    year: "2025",
    duration: "Ongoing",
    team: "5 engineers + 1 3D artist",
    outcome: [
      { k: "1 prompt", v: "To editable 3D" },
      { k: "−86%", v: "Sampling cost" },
      { k: "4 days", v: "Concept → showroom" },
    ],
    brief:
      "A fashion house wanted to collapse the gap between a creative brief and a production-ready garment. The ask: type a description, get a real 3D garment a designer can edit in Blender and a pattern team can cut in Lectra — no week-long sampling loop.",
    challenge:
      "AI mesh generators produce pretty but un-manufacturable blobs: no seam allowances, no graded sizes, no clean topology. Production needs DXF/AAMA patterns Lectra understands and quad-based meshes an artist can actually edit.",
    approach: [
      "One prompt drives a constrained 3D pipeline that emits clean, quad-topology garments with named seams.",
      "Auto-generated 2D sewing patterns export straight into Lectra as graded, production-ready pieces.",
      "Designers refine drape, fabric, and fit live in Blender; changes round-trip back to the pattern set without re-modeling.",
    ],
  },
  {
    n: "01",
    tag: "ERP Sync",
    title: "SAP S/4HANA real-time inventory orchestration",
    desc: "Multi-location warehouse synchronization across 12 European DCs for a Milan-based fashion house, with sub-second stock truth at checkout.",
    client: "Maison Albini — Milan",
    stack: ["SAP S/4HANA", "Shopify Plus", "Kafka"],
    span: "md:col-span-8 md:row-span-2",
    year: "2024",
    duration: "9 months",
    team: "4 engineers",
    outcome: [
      { k: "−92%", v: "Oversell incidents" },
      { k: "780ms", v: "Stock truth latency" },
      { k: "12 DCs", v: "Synchronized live" },
    ],
    brief:
      "A Milan-based fashion house with 12 European distribution centers was running monthly stock reconciliation against SAP S/4HANA — leaking 7-figure GMV per quarter to oversell on hype releases.",
    challenge:
      "SAP IDocs in batch, Shopify locations in webhooks, and a 200ms checkout SLA. The legacy middleware was a Java cron job with no observability and a habit of failing silently during peak.",
    approach: [
      "Built an event-driven sync on Kafka with idempotent reducers per SKU/location.",
      "Replaced batch IDocs with a change-data-capture stream off SAP S/4HANA.",
      "Cut over 12 DCs in three weekend waves, zero downtime, zero oversells in post-launch quarter.",
    ],
  },
  {
    n: "02",
    tag: "Web3 Loyalty",
    title: "Token-gated checkout for NFT holders",
    desc: "Custom checkout extension that verifies Bored Ape and partner NFTs on-chain, unlocking exclusive physical drops and members-only pricing.",
    client: "Confidential — NYC",
    stack: ["Checkout UI", "Alchemy", "wagmi"],
    span: "md:col-span-4",
    year: "2024",
    duration: "6 weeks",
    team: "2 engineers",
    outcome: [
      { k: "11k+", v: "Wallets verified" },
      { k: "100%", v: "Sell-through" },
      { k: "0", v: "Failed claims" },
    ],
    brief:
      "A confidential streetwear collaboration needed checkout-time NFT verification for a 4,000-piece physical drop, with strict no-bot, no-double-claim guarantees.",
    challenge:
      "Shopify Checkout Functions had a 5ms compute budget. Wallet signature, RPC verify, and collection lookup had to happen inside Shopify's serverless edge — not on a custom backend.",
    approach: [
      "Pre-warmed collection ownership snapshots cached at the edge.",
      "Wallet challenge signed pre-checkout, verified in a Checkout Function.",
      "Per-wallet claim quotas enforced atomically in the function runtime.",
    ],
  },
  {
    n: "03",
    tag: "Subscriptions",
    title: "GraphQL subscription engine with adaptive cadence",
    desc: "A custom subscription platform handling skip, swap, gifting, and pause logic for a US wellness brand shipping perishables.",
    client: "Wellness DTC — Austin",
    stack: ["GraphQL", "Shopify Functions", "Temporal"],
    span: "md:col-span-4",
    year: "2023",
    duration: "5 months",
    team: "3 engineers",
    outcome: [
      { k: "+38%", v: "Retention M12" },
      { k: "−61%", v: "Support tickets" },
      { k: "47k", v: "Active subscribers" },
    ],
    brief:
      "A US wellness brand ships perishables on a 7-day cadence. Their off-the-shelf subscription app couldn't model skip, swap, gift, or pause without billing edge cases.",
    challenge:
      "Perishable inventory means cadence has to flex with the warehouse, not the customer. Existing apps treated subscriptions as recurring invoices, not as a supply-chain primitive.",
    approach: [
      "Modeled subscriptions as a Temporal workflow with deterministic state transitions.",
      "Wrote a custom GraphQL surface tightly coupled to Shopify Customer Accounts.",
      "Hand-off to brand team with full runbooks and dashboards on day one.",
    ],
  },
  {
    n: "04",
    tag: "Crypto Checkout",
    title: "Native Solana & Ethereum payments",
    desc: "Gas-optimized payment gateway with automated fiat settlement via Stripe Crypto and Coinbase Prime, reconciling to Shopify orders in real time.",
    client: "Web3 Marketplace",
    stack: ["Anchor", "Solidity", "Stripe Crypto"],
    span: "md:col-span-4",
    year: "2025",
    duration: "4 months",
    team: "3 engineers",
    outcome: [
      { k: "$18M", v: "GMV processed" },
      { k: "−72%", v: "Avg. gas cost" },
      { k: "T+0", v: "Fiat settlement" },
    ],
    brief:
      "A Web3-native marketplace wanted to take SOL and ETH at checkout without exposing their treasury to volatility — settling instantly to fiat through Stripe Crypto and Coinbase Prime.",
    challenge:
      "Gas spikes at peak, multi-chain reconciliation, and an order-of-magnitude difference between on-chain confirmation time and Shopify's checkout SLA.",
    approach: [
      "Custom Anchor program on Solana for atomic payment + receipt.",
      "Gas-optimized Solidity escrow batched across 1-minute windows.",
      "Automated fiat conversion and reconciliation back to Shopify Order IDs.",
    ],
  },
  {
    n: "05",
    tag: "Logistics",
    title: "Cross-border 3PL with automated customs",
    desc: "FedEx and DHL integration generating customs documentation, HS codes, and duty pre-payment for cross-border luxury shipments.",
    client: "Luxury House — Paris",
    stack: ["FedEx API", "DHL", "Node"],
    span: "md:col-span-4",
    year: "2023",
    duration: "7 months",
    team: "3 engineers",
    outcome: [
      { k: "−4.2 days", v: "Avg. delivery" },
      { k: "100%", v: "DDP coverage" },
      { k: "63 countries", v: "Shipped" },
    ],
    brief:
      "A Parisian luxury house was losing customers at international checkout to surprise duties and 2-week delivery windows on six-figure orders.",
    challenge:
      "HS-code classification for one-of-one couture pieces. Real-time duty calculation across 63 jurisdictions. White-glove DDP without breaking checkout flow.",
    approach: [
      "Built a classification service over a curated HS-code taxonomy specific to couture.",
      "Integrated FedEx and DHL APIs with a unified booking abstraction.",
      "Auto-generated commercial invoices and customs docs at order capture.",
    ],
  },
  {
    n: "06",
    tag: "PIM",
    title: "Akeneo PIM at 100k+ SKU scale",
    desc: "Architected the PIM-to-Shopify pipeline syncing 100,000+ SKUs across five localized Shopify Plus expansion stores with locale-aware enrichment.",
    client: "Global Apparel Group",
    stack: ["Akeneo", "Shopify Plus", "Workers"],
    span: "md:col-span-8",
    year: "2024",
    duration: "11 months",
    team: "5 engineers",
    outcome: [
      { k: "102k", v: "SKUs synced" },
      { k: "5", v: "Markets live" },
      { k: "<3min", v: "PIM → store" },
    ],
    brief:
      "A global apparel group operating five regional Shopify Plus stores needed Akeneo PIM as the single source of product truth, with locale-aware enrichment per market.",
    challenge:
      "Akeneo's bulk export pattern doesn't scale past ~10k SKUs without locking. Shopify's GraphQL mutation limits don't survive a naive fan-out of 100k+ products in five locales.",
    approach: [
      "Streamed Akeneo changes via a custom CDC connector.",
      "Sharded sync workers on Cloudflare Workers with per-market rate budgets.",
      "Locale enrichment as a deterministic pipeline — auditable per-field per-market.",
    ],
  },
  {
    n: "07",
    tag: "POS Sync",
    title: "Oracle POS to Shopify POS Pro middleware",
    desc: "A bidirectional middleware bridging legacy Oracle retail systems with Shopify POS Pro across 50 UK locations — zero downtime cutover.",
    client: "UK Heritage Retailer",
    stack: ["Oracle", "Shopify POS", "Kotlin"],
    span: "md:col-span-5",
    year: "2024",
    duration: "8 months",
    team: "4 engineers",
    outcome: [
      { k: "50 stores", v: "Cutover" },
      { k: "0 hours", v: "Downtime" },
      { k: "+22%", v: "Staff NPS" },
    ],
    brief:
      "A heritage UK retailer with 50 high-street locations was running 18-year-old Oracle POS terminals. Replatforming to Shopify POS Pro without downtime was the brief.",
    challenge:
      "Tender types, gift cards, layaways, and bespoke pricing rules had to round-trip between systems during a 14-week cutover window where both stacks were authoritative.",
    approach: [
      "Built a Kotlin middleware running in-store on existing hardware.",
      "Dual-write with conflict resolution and operator-visible diff tooling.",
      "Phased cutover: read-only → shadow-write → authoritative across 14 weeks.",
    ],
  },
  {
    n: "08",
    tag: "DAO Commerce",
    title: "DAO governance dictates production",
    desc: "On-chain voting weight directly drives manufacturing queues via the Shopify backend — the first commerce stack run by its community.",
    client: "DAO Collective",
    stack: ["Snapshot", "Solidity", "Admin API"],
    span: "md:col-span-7",
    year: "2025",
    duration: "3 months",
    team: "2 engineers",
    outcome: [
      { k: "2,300", v: "DAO members" },
      { k: "14", v: "Drops governed" },
      { k: "$0", v: "Inventory risk" },
    ],
    brief:
      "A creator-owned collective wanted on-chain governance — Snapshot votes — to drive what gets manufactured and stocked in their Shopify backend, with zero speculative inventory.",
    challenge:
      "Manufacturing lead times don't care about block times. We had to build a deterministic bridge between Snapshot outcomes and Shopify product publication.",
    approach: [
      "Snapshot proposals scoped to a SKU manifest with manufacturing constraints.",
      "On-chain quorum triggers a Shopify Admin API publish + manufacturing kickoff.",
      "Members can see, vote, and track every drop from proposal to delivery.",
    ],
  },
  {
    n: "09",
    tag: "Personalization",
    title: "Headless AI personalization on Hydrogen",
    desc: "AI-driven personalization engine using Shopify Hydrogen and Sanity.io. Lifted AOV by 34% within a single quarter for a global cosmetics brand.",
    client: "Global Cosmetics — Seoul",
    stack: ["Hydrogen", "Sanity", "OpenAI"],
    span: "md:col-span-6",
    year: "2024",
    duration: "6 months",
    team: "4 engineers",
    outcome: [
      { k: "+34%", v: "AOV lift" },
      { k: "+58%", v: "PDP engagement" },
      { k: "12 locales", v: "Live" },
    ],
    brief:
      "A Seoul-headquartered global cosmetics brand wanted headless personalization across 12 locales without giving up Sanity-authored editorial.",
    challenge:
      "Editorial-quality storytelling and ML-driven personalization usually fight each other. We had to make them collaborate without diluting either.",
    approach: [
      "Hydrogen + Oxygen as the rendering layer, Sanity as the authoring layer.",
      "Custom personalization engine ranking Sanity-authored modules per session.",
      "Editorial guardrails: ML never overrides editor-pinned hero content.",
    ],
  },
  {
    n: "10",
    tag: "Fraud Prevention",
    title: "ML risk layer for hype drops",
    desc: "Custom machine-learning risk assessment built into Shopify Checkout Functions, blocking high-velocity bot attacks during global product drops.",
    client: "Streetwear Label",
    stack: ["Checkout Fns", "Python", "AWS"],
    span: "md:col-span-6",
    year: "2025",
    duration: "4 months",
    team: "3 engineers",
    outcome: [
      { k: "−98.4%", v: "Bot orders" },
      { k: "<8ms", v: "Risk decision" },
      { k: "0", v: "False positives" },
    ],
    brief:
      "A global streetwear label was hemorrhaging hype-drop inventory to scalper bots, with downstream brand damage and angry real customers on every release.",
    challenge:
      "Risk decisions had to live inside the Shopify Checkout Function with a sub-10ms budget, with zero tolerance for blocking a legitimate purchase.",
    approach: [
      "Custom ML risk model trained on 18 months of drop telemetry.",
      "Feature extraction at the edge — no round-trip to a Python backend at checkout.",
      "Per-drop threshold tuning with brand-side override controls.",
    ],
  },
];

export function Matrix() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" className="hairline border-b bg-[var(--surface)]">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <Star aria-hidden className="hidden md:block absolute top-20 right-16 w-7 h-7 text-accent" />
        <Squiggle aria-hidden className="hidden md:block absolute top-32 right-32 w-40 text-foreground/30" />

        <div className="flex items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              <span>Selected Work / 011</span>
            </div>
            <h2 className="relative mt-6 font-serif text-4xl md:text-6xl tracking-[-0.03em] text-foreground max-w-3xl reveal-item">
              The Integration <span className="relative inline-block italic font-normal">
                Matrix
                <Squiggle
                  aria-hidden
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 w-full h-3 text-accent"
                />
              </span>.
            </h2>
          </div>
          <div className="hidden md:flex items-start gap-4 max-w-sm">
            <Asterisk aria-hidden className="shrink-0 w-5 h-5 mt-1 text-accent" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              A flagship AI pipeline and ten engagements that defined the studio. <em className="font-serif">Tap any tile</em>{" "}
              for the brief, the challenge, and the receipts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[minmax(220px,auto)] gap-px bg-[var(--hairline)] hairline border">
          {projects.map((p) => (
            <button
              type="button"
              key={p.n}
              onClick={() => setOpen(p)}
              className={`group relative bg-background text-left p-8 md:p-10 flex flex-col justify-between reveal-item transition-colors hover:bg-[var(--surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground overflow-hidden ${p.span}`}
            >
              {/* flagship 3D render — live & relevant; no stock photography elsewhere */}
              {p.video && (
                <div className="absolute inset-0 -z-0">
                  <video
                    src={p.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/80" />
                </div>
              )}
              {/* large index numeral as editorial graphic */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -right-2 font-serif text-[7rem] md:text-[9rem] leading-none text-foreground/[0.04] select-none"
              >
                {p.n}
              </span>




              <div className="relative">
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
                  {p.n} — {p.tag.toUpperCase()}
                </span>
                <HandArrow
                  aria-hidden
                  className="w-10 h-4 text-foreground/70 transition-transform group-hover:translate-x-1"
                />
              </div>

              <div className="mt-10 max-w-[78%]">
                <h3 className="font-serif text-2xl md:text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-foreground">
                  {p.title}
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
              </div>

              <div className="relative mt-8 pt-6 hairline border-t flex flex-wrap items-center justify-between gap-4 max-w-[78%]">
                <span className="text-[12px] text-foreground/70">{p.client}</span>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground hairline border px-2 py-1 bg-background"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <CaseStudyModal project={open} onClose={() => setOpen(null)} />
      </div>
    </section>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-5xl w-[96vw] p-0 gap-0 rounded-none border-0 bg-background data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
      >
        {project && (
          <div className="grid md:grid-cols-12 max-h-[88vh] overflow-y-auto">
            <div className="md:col-span-5 bg-[var(--surface)] text-foreground p-8 md:p-10 relative">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Case Study {project.n} — {project.tag}
              </div>
              <DialogTitle asChild>
                <h3 className="mt-6 font-serif text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05]">
                  {project.title}
                </h3>
              </DialogTitle>

              <div className="mt-8 hairline border-t border-border pt-6 grid grid-cols-2 gap-y-5 text-sm">
                <div>
                  <div className="text-muted-foreground text-[11px] uppercase tracking-wider">Client</div>
                  <div className="mt-1">{project.client}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[11px] uppercase tracking-wider">Year</div>
                  <div className="mt-1">{project.year}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[11px] uppercase tracking-wider">Duration</div>
                  <div className="mt-1">{project.duration}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[11px] uppercase tracking-wider">Team</div>
                  <div className="mt-1">{project.team}</div>
                </div>
              </div>

              <div className="mt-8 hairline border-t border-border pt-6">
                <div className="text-muted-foreground text-[11px] uppercase tracking-wider mb-3">Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="font-mono text-[10px] tracking-wider uppercase border border-border px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 hairline border-t border-border pt-6 grid grid-cols-3 gap-3">
                {project.outcome.map((o) => (
                  <div key={o.v}>
                    <div className="font-serif text-2xl tracking-tight">{o.k}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground leading-tight">{o.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 bg-background">
              {project.video ? (
                <div className="aspect-[16/10] overflow-hidden hairline border-b">
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] overflow-hidden hairline border-b bg-[var(--surface)] relative flex items-end p-8">
                  <span aria-hidden className="absolute -top-4 right-2 font-serif text-[8rem] leading-none text-foreground/[0.05] select-none">
                    {project.n}
                  </span>
                  <div className="relative">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{project.tag}</div>
                    <div className="mt-2 font-serif text-2xl tracking-[-0.02em] text-foreground">{project.client}</div>
                  </div>
                </div>
              )}

              <div className="p-8 md:p-10 space-y-8">
                <Section label="The Brief" body={project.brief} />
                <Section label="The Challenge" body={project.challenge} />
                <div>
                  <SectionHeader label="The Approach" />
                  <ol className="mt-4 space-y-3">
                    {project.approach.map((a, i) => (
                      <li key={i} className="flex gap-4 text-[14px] leading-relaxed text-foreground/85">
                        <span className="font-serif italic text-accent shrink-0 w-6">{String(i + 1).padStart(2, "0")}</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Asterisk aria-hidden className="w-3.5 h-3.5 text-accent" />
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
    </div>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <SectionHeader label={label} />
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}