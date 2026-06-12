import { ScribbleCircle, HandArrow, CurlyUnderline, Asterisk, Squiggle } from "./Sketch";
import { WireframeOrb } from "./WireframeOrb";

export function Hero() {
  return (
    <section id="top" className="hairline border-b overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-20 md:pt-32 pb-20 md:pb-28">
        {/* hand-drawn margin notes */}
        <Asterisk className="hidden md:block absolute top-24 right-12 w-6 h-6 text-foreground/60" />
        <Squiggle className="hidden md:block absolute top-44 right-24 w-32 text-accent/70" />

        {/* Wireframe orb — top-right corner, large decorative */}
        <div
          className="hidden lg:block absolute top-6 right-6 w-56 h-56 text-foreground/[0.12] pointer-events-none select-none"
          style={{ animation: "orb-drift 22s linear infinite" }}
          aria-hidden
        >
          <WireframeOrb className="w-full h-full" />
        </div>

        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground reveal-item">
          <span className="inline-block h-px w-8 bg-foreground/40" />
          <span>Est. 2019 — A Senior Engineering Studio</span>
        </div>

        <h1 className="relative mt-10 font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] tracking-[-0.035em] text-foreground reveal-item">
          Commerce,{" "}
          <span className="relative inline-block">
            <em className="italic font-normal text-muted-foreground">re-engineered</em>
            <ScribbleCircle
              aria-hidden
              className="absolute -inset-x-4 -inset-y-3 w-[calc(100%+2rem)] h-[calc(100%+1.5rem)] text-accent/70 pointer-events-none"
              preserveAspectRatio="none"
            />
          </span>
          <br />
          for the world's
          <br />
          <span className="relative inline-block">
            most ambitious brands.
            <CurlyUnderline
              aria-hidden
              className="absolute -bottom-3 left-0 w-full h-3 text-foreground/50"
              preserveAspectRatio="none"
            />
          </span>
        </h1>

        <div className="relative mt-16 grid md:grid-cols-12 gap-10 md:gap-8 hairline border-t pt-10">
          <div className="md:col-span-5 fade-up">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              — Note from the studio
            </div>
            <p className="mt-4 font-serif italic text-2xl md:text-3xl leading-[1.2] tracking-[-0.01em] text-foreground">
              "We don't ship dashboards.
              <br /> We ship the unglamorous
              <br /> parts of commerce that
              <br /> decide whether a launch
              <br /> goes live at 9am — or eight
              <br /> hours late."
            </p>
            <div className="mt-6 flex items-center gap-3 text-[12px] text-muted-foreground">
              <span className="inline-block h-px w-6 bg-foreground/40" />
              <span>Rahmi Vina S — Founding Engineer</span>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 fade-up">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
              r2studio.dev is a small senior engineering studio building high-scale
              Shopify Plus architectures and decentralized commerce systems for global
              enterprise brands — from European fashion houses to US wellness leaders
              and Web3-native marketplaces.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-[12px] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                Taking 2 engagements / Q3 2026
              </span>
              <a href="#work" className="relative inline-flex items-center gap-2 text-foreground">
                See selected work
                <HandArrow aria-hidden className="w-10 h-4 text-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}