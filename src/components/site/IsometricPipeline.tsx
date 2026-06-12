/* Isometric 3D pipeline visualization — pure SVG, no libraries.
   Shows the 4-stage garment pipeline as stacked isometric boxes with
   connecting flow lines. Designed for European B2B clients who want to
   see "engineering rigor" in a visual language they trust (technical drawing). */

import { useEffect, useRef } from "react";
import { Asterisk } from "./Sketch";

const stages = [
  {
    label: "01 — Brief",
    sub: "Written prompt",
    accent: true,
    detail: "Silhouette, fabric, fit, season",
  },
  {
    label: "02 — Mesh",
    sub: "Quad topology",
    accent: false,
    detail: "Named seams · Blender-ready",
  },
  {
    label: "03 — Pattern",
    sub: "2D graded pieces",
    accent: false,
    detail: "DXF / AAMA export",
  },
  {
    label: "04 — Production",
    sub: "Lectra cut file",
    accent: true,
    detail: "Zero rework · same day",
  },
];

/* Single isometric box drawn with SVG paths.
   origin = top-left corner of the top face in screen space.
   w, h, d = width, height (Y), depth (Z) in iso units.
   1 iso unit ≈ 24px. */
function IsoBox({
  x,
  y,
  w,
  h,
  d,
  fill,
  stroke,
  label,
  sub,
  detail,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  d: number;
  fill: string;
  stroke: string;
  label: string;
  sub: string;
  detail: string;
  accent: boolean;
}) {
  // Isometric projection: x-axis goes right-down, z-axis goes left-down, y-axis goes up.
  // ISO_X and ISO_Z are the 2D vectors for 1 unit along each axis.
  const IX = { x: Math.cos((-30 * Math.PI) / 180), y: Math.sin((-30 * Math.PI) / 180) }; // right-forward
  const IZ = { x: -Math.cos((-30 * Math.PI) / 180), y: Math.sin((-30 * Math.PI) / 180) }; // left-forward
  const IY = { x: 0, y: -1 }; // straight up

  const s = 24; // scale factor

  function pt(ix: number, iy: number, iz: number) {
    return {
      x: x + (ix * IX.x + iy * IY.x + iz * IZ.x) * s,
      y: y + (ix * IX.y + iy * IY.y + iz * IZ.y) * s,
    };
  }

  function p(ix: number, iy: number, iz: number) {
    const c = pt(ix, iy, iz);
    return `${c.x.toFixed(1)},${c.y.toFixed(1)}`;
  }

  // Top face: corners at y=h
  const top = [
    p(0, h, 0),
    p(w, h, 0),
    p(w, h, d),
    p(0, h, d),
  ].join(" ");

  // Right face: x=w, y 0→h, z 0→d
  const right = [
    p(w, 0, 0),
    p(w, h, 0),
    p(w, h, d),
    p(w, 0, d),
  ].join(" ");

  // Left face: z=d, y 0→h, x 0→w
  const left = [
    p(0, 0, d),
    p(w, 0, d),
    p(w, h, d),
    p(0, h, d),
  ].join(" ");

  // Label position: center of top face
  const topCenter = pt(w / 2, h + 0.2, d / 2);
  const subPos = pt(w / 2, h + 0.2, d / 2);

  return (
    <g>
      {/* left face (darkest) */}
      <polygon points={left} fill={accent ? "oklch(0.62 0.17 30 / 0.18)" : "oklch(0.18 0.01 260 / 0.1)"} stroke={stroke} strokeWidth="0.8" />
      {/* right face */}
      <polygon points={right} fill={accent ? "oklch(0.62 0.17 30 / 0.12)" : "oklch(0.18 0.01 260 / 0.06)"} stroke={stroke} strokeWidth="0.8" />
      {/* top face (lightest) */}
      <polygon points={top} fill={accent ? "oklch(0.62 0.17 30 / 0.22)" : fill} stroke={stroke} strokeWidth="0.8" />

      {/* label on top face */}
      <text
        x={topCenter.x}
        y={topCenter.y - 12}
        textAnchor="middle"
        fontSize="5.5"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.08em"
        fill={accent ? "oklch(0.55 0.17 30)" : "oklch(0.18 0.01 260 / 0.75)"}
        fontWeight="500"
      >
        {label.toUpperCase()}
      </text>
      <text
        x={subPos.x}
        y={subPos.y - 4}
        textAnchor="middle"
        fontSize="4.5"
        fontFamily="Playfair Display, serif"
        fontStyle="italic"
        fill="oklch(0.18 0.01 260 / 0.5)"
      >
        {sub}
      </text>
      <text
        x={subPos.x}
        y={subPos.y + 4}
        textAnchor="middle"
        fontSize="3.8"
        fontFamily="JetBrains Mono, monospace"
        fill="oklch(0.18 0.01 260 / 0.35)"
        letterSpacing="0.06em"
      >
        {detail}
      </text>
    </g>
  );
}

export function IsometricPipeline() {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          ref.current.style.opacity = "1";
          ref.current.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Layout: 4 boxes side by side in iso space, connected by arrows
  // Each box: w=5, h=2.5, d=4, spaced 6 units apart
  const boxes = [
    { ox: 10, oy: 148, ...stages[0] },
    { ox: 74, oy: 120, ...stages[1] },
    { ox: 138, oy: 148, ...stages[2] },
    { ox: 202, oy: 120, ...stages[3] },
  ];

  return (
    <section className="hairline border-b overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <Asterisk aria-hidden className="hidden md:block absolute top-20 left-12 w-5 h-5 text-accent" />

        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground reveal-item">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              <span>The Pipeline — Four Stages</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl tracking-[-0.03em] leading-[1] text-foreground reveal-item">
              From text to
              <br />
              <em className="italic font-normal text-muted-foreground">factory floor.</em>
            </h2>
            <p className="mt-8 text-sm md:text-base leading-relaxed text-muted-foreground max-w-md reveal-item">
              Four deterministic stages. No hand-offs, no approval loops. The same brief
              that goes in on Monday becomes a Lectra cut file by Tuesday — without a
              single sketch, scan, or sample.
            </p>

            <div className="mt-10 hairline border-t">
              {stages.map((s) => (
                <div key={s.label} className="hairline border-b py-4 flex items-start gap-4 reveal-item">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-accent pt-1">
                    {s.label.split(" — ")[0]}
                  </span>
                  <div>
                    <div className="font-serif text-[15px] tracking-[-0.01em] text-foreground">
                      {s.label.split(" — ")[1]}
                    </div>
                    <div className="mt-0.5 text-[12px] text-muted-foreground">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 fade-up flex items-center justify-center">
            <div className="w-full max-w-[560px]">
              <svg
                viewBox="0 0 280 180"
                aria-hidden
                style={{ width: "100%", overflow: "visible" }}
              >
                <g
                  ref={ref}
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "opacity 1s ease, transform 1s ease",
                  }}
                >
                  {/* connector lines between boxes */}
                  <g stroke="oklch(0.65 0.18 30 / 0.4)" strokeWidth="0.7" strokeDasharray="3 2" fill="none">
                    {/* Brief → Mesh */}
                    <path d="M 46 112 L 74 100" />
                    {/* Mesh → Pattern */}
                    <path d="M 110 100 L 138 112" />
                    {/* Pattern → Production */}
                    <path d="M 174 112 L 202 100" />
                  </g>

                  {/* Arrow heads */}
                  <g fill="oklch(0.65 0.18 30 / 0.55)" stroke="none">
                    <polygon points="74,100 70,96 70,104" />
                    <polygon points="138,112 134,108 134,116" />
                    <polygon points="202,100 198,96 198,104" />
                  </g>

                  {/* Isometric boxes */}
                  <IsoBox
                    x={boxes[0].ox} y={boxes[0].oy}
                    w={5} h={2.5} d={4}
                    fill="oklch(1 0 0 / 0.9)"
                    stroke="oklch(0.18 0.01 260 / 0.25)"
                    label={boxes[0].label}
                    sub={boxes[0].sub}
                    detail={boxes[0].detail}
                    accent={boxes[0].accent}
                  />
                  <IsoBox
                    x={boxes[1].ox} y={boxes[1].oy}
                    w={5} h={3.5} d={4}
                    fill="oklch(1 0 0 / 0.9)"
                    stroke="oklch(0.18 0.01 260 / 0.25)"
                    label={boxes[1].label}
                    sub={boxes[1].sub}
                    detail={boxes[1].detail}
                    accent={boxes[1].accent}
                  />
                  <IsoBox
                    x={boxes[2].ox} y={boxes[2].oy}
                    w={5} h={2.5} d={4}
                    fill="oklch(1 0 0 / 0.9)"
                    stroke="oklch(0.18 0.01 260 / 0.25)"
                    label={boxes[2].label}
                    sub={boxes[2].sub}
                    detail={boxes[2].detail}
                    accent={boxes[2].accent}
                  />
                  <IsoBox
                    x={boxes[3].ox} y={boxes[3].oy}
                    w={5} h={3.5} d={4}
                    fill="oklch(1 0 0 / 0.9)"
                    stroke="oklch(0.18 0.01 260 / 0.25)"
                    label={boxes[3].label}
                    sub={boxes[3].sub}
                    detail={boxes[3].detail}
                    accent={boxes[3].accent}
                  />

                  {/* Dimension lines — technical drawing aesthetic */}
                  <g stroke="oklch(0.18 0.01 260 / 0.18)" strokeWidth="0.5" fill="none">
                    <line x1="8" y1="155" x2="240" y2="155" strokeDasharray="2 1.5" />
                    <line x1="8" y1="152" x2="8" y2="158" />
                    <line x1="240" y1="152" x2="240" y2="158" />
                  </g>
                  <text x="124" y="162" textAnchor="middle" fontSize="3.5"
                    fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em"
                    fill="oklch(0.18 0.01 260 / 0.3)">
                    BRIEF → PRODUCTION · 1 BUSINESS DAY
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
