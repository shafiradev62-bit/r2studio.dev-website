import { Squiggle, HandArrow } from "./Sketch";

const credentials = [
  { k: "07", v: "Years building enterprise commerce" },
  { k: "EU · US · UK", v: "Markets shipped into" },
  { k: "Senior-only", v: "No juniors, no offshore handoff" },
  { k: "Shopify Plus", v: "Certified Plus partner stack" },
];

const stack = [
  "Shopify Plus",
  "Hydrogen",
  "Lectra",
  "Blender",
  "ERC-721 / 4337",
  "AWS",
  "Next.js",
  "PostgreSQL",
];

export function Studio() {
  return (
    <section id="studio" className="hairline border-b bg-[var(--surface)]">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <Squiggle aria-hidden className="hidden md:block absolute top-16 right-16 w-32 text-accent/70" />

        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground reveal-item">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              <span>The Studio — Credibility / 003</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl tracking-[-0.03em] leading-[1] text-foreground reveal-item">
              A small team that
              <br />
              <em className="italic font-normal text-muted-foreground">enterprise trusts.</em>
            </h2>
            <p className="mt-8 font-serif italic text-xl md:text-2xl leading-[1.3] text-foreground reveal-item">
              "We've cut over nine-figure storefronts without a single failed launch
              window. That track record is the whole pitch."
            </p>
            <div className="mt-6 flex items-center gap-3 text-[12px] text-muted-foreground">
              <span className="inline-block h-px w-6 bg-foreground/40" />
              <span>Rahmi Vina S — Founding Engineer</span>
            </div>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-3 text-[13px] font-medium text-foreground"
            >
              Talk through your roadmap
              <HandArrow aria-hidden className="w-10 h-4 text-foreground" />
            </a>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="grid grid-cols-2 gap-px bg-[var(--hairline)] hairline border">
              {credentials.map((c) => (
                <div key={c.v} className="bg-background p-7 md:p-8 reveal-item">
                  <div className="font-serif text-3xl md:text-4xl tracking-[-0.03em] text-foreground">
                    {c.k}
                  </div>
                  <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground leading-relaxed">
                    {c.v}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                — Core stack
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="hairline border px-3 py-1.5 text-[12px] text-foreground/80 bg-background"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
