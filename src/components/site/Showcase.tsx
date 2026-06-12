import { Asterisk, CurlyUnderline, HandArrow } from "./Sketch";
import showcaseVideo from "@/assets/showcase-3d.mp4.asset.json";

const steps = [
  {
    n: "01",
    t: "Write the brief",
    d: "A single prompt — silhouette, fabric, fit, season. No CAD, no modeling.",
  },
  {
    n: "02",
    t: "Get an editable 3D garment",
    d: "Clean quad-topology mesh with named seams, opened straight in Blender.",
  },
  {
    n: "03",
    t: "Cut it in Lectra",
    d: "Auto-graded 2D patterns export to Lectra as production-ready pieces.",
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="hairline border-b">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <Asterisk aria-hidden className="hidden md:block absolute top-20 right-16 w-6 h-6 text-accent" />

        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-6 fade-up">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              <span>Flagship Capability — Prompt to 3D</span>
            </div>
            <h2 className="relative mt-6 font-serif text-4xl md:text-6xl tracking-[-0.03em] leading-[0.98] text-foreground reveal-item">
              One prompt.
              <br />
              <span className="relative inline-block">
                <em className="italic font-normal text-muted-foreground">A real 3D garment.</em>
                <CurlyUnderline
                  aria-hidden
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 w-full h-3 text-accent"
                />
              </span>
            </h2>
            <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
              We turn a written description into a production-ready 3D garment — fully
              editable in Blender and cut in Lectra. It collapses a week-long sampling
              loop into an afternoon, so brands ship more drops with less waste.
            </p>

            <div className="mt-10 hairline border-t">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="hairline border-b py-5 flex items-start gap-5 reveal-item"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-accent pt-1">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl tracking-[-0.01em] text-foreground">
                      {s.t}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {s.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#work"
              className="mt-8 relative inline-flex items-center gap-3 text-[13px] font-medium text-foreground"
            >
              See it inside the case study
              <HandArrow aria-hidden className="w-10 h-4 text-foreground" />
            </a>
          </div>

          <div className="md:col-span-6 fade-up">
            <figure className="relative hairline border bg-[var(--surface)] p-2 md:p-3 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.35)]">
              <div className="aspect-[16/10] overflow-hidden bg-foreground">
                <video
                  src={showcaseVideo.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between px-2 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>r2studio.dev — 3D garment pipeline</span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block size-1.5 rounded-full bg-accent" />
                  Live render
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
