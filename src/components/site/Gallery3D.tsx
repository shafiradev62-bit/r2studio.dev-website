import { Asterisk, Plus } from "./Sketch";
import { WireframeOrb } from "./WireframeOrb";
import coat from "@/assets/g3d-coat.jpg";
import dress from "@/assets/g3d-dress.jpg";
import jacket from "@/assets/g3d-jacket.jpg";
import pattern from "@/assets/g3d-pattern.jpg";
import p11 from "@/assets/p11-lectra3d.jpg";

const pieces = [
  {
    img: coat,
    title: "Tailored wool coat",
    meta: "Quad mesh · named seams · Blender-ready",
    stage: "01 — Prompt to mesh",
    span: "",
  },
  {
    img: jacket,
    title: "Structured blazer",
    meta: "Subdivision surface · editable topology",
    stage: "02 — Refine in Blender",
    span: "",
  },
  {
    img: dress,
    title: "Pleated midi dress",
    meta: "Draped simulation · seam-accurate",
    stage: "03 — Drape & fit",
    span: "",
  },
  {
    img: pattern,
    title: "Auto-graded patterns",
    meta: "2D nesting · Lectra export",
    stage: "04 — Cut in Lectra",
    span: "",
  },
  {
    img: p11,
    title: "Lectra 3D pipeline",
    meta: "Full-stack 3D → production integration",
    stage: "05 — Full pipeline",
    span: "sm:col-span-2",
  },
];

/* Inline wireframe card — purely CSS 3D, no image required.
   Used for the sixth slot as a "live" technical graphic. */
function WireframeCard() {
  return (
    <figure className="group relative bg-[var(--surface)] reveal-item sm:col-span-1">
      <div className="aspect-[4/3] overflow-hidden flex items-center justify-center">
        <div className="relative w-40 h-40">
          {/* outer cube — CSS 3D */}
          <div
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              perspective: "500px",
              animation: "spin3d 12s linear infinite",
            }}
          >
            <WireframeOrb className="w-full h-full text-foreground/40" />
          </div>
        </div>
      </div>
      <figcaption className="flex items-start justify-between gap-4 p-5 md:p-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            06 — Mesh topology
          </div>
          <h3 className="mt-2 font-serif text-xl tracking-[-0.01em] text-foreground">
            Geodesic wireframe
          </h3>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Parametric surface · export-ready
          </p>
        </div>
        <Plus aria-hidden className="w-4 h-4 text-foreground/40 mt-1 shrink-0" />
      </figcaption>
    </figure>
  );
}

export function Gallery3D() {
  return (
    <section id="gallery" className="hairline border-b bg-[var(--surface)]">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <Asterisk aria-hidden className="hidden md:block absolute top-16 left-12 w-6 h-6 text-accent" />

        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground reveal-item">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              <span>3D Pipeline — Selected Renders / 006</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl tracking-[-0.03em] leading-[0.98] text-foreground reveal-item">
              Real garments,
              <br />
              <em className="italic font-normal text-muted-foreground">modeled in minutes.</em>
            </h2>
          </div>
          <div className="md:col-span-4 fade-up">
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Every piece below started as one written brief, then opened straight into
              Blender for art-direction and pushed to Lectra as production patterns.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--hairline)] hairline border">
          {pieces.map((p) => (
            <figure
              key={p.title}
              className={`group relative bg-background reveal-item ${p.span}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="flex items-start justify-between gap-4 p-5 md:p-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {p.stage}
                  </div>
                  <h3 className="mt-2 font-serif text-xl tracking-[-0.01em] text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-muted-foreground">{p.meta}</p>
                </div>
                <Plus aria-hidden className="w-4 h-4 text-foreground/40 mt-1 shrink-0" />
              </figcaption>
            </figure>
          ))}
          <WireframeCard />
        </div>
      </div>
    </section>
  );
}
