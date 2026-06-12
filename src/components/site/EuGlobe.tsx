/* EU market visualization — SVG-based "network map" of European client cities.
   Drawn as a schematic dot-and-line diagram, not a real map projection.
   Feels like an engineering topology diagram rather than a marketing graphic. */

import { useEffect, useRef } from "react";
import { Squiggle } from "./Sketch";

// Approximate relative positions on a 300×220 canvas, Northern Europe at top
const nodes: { id: string; x: number; y: number; label: string; sub: string; active?: boolean }[] = [
  { id: "lon", x: 88, y: 62, label: "London", sub: "UK", active: true },
  { id: "ams", x: 148, y: 50, label: "Amsterdam", sub: "NL" },
  { id: "par", x: 118, y: 90, label: "Paris", sub: "FR", active: true },
  { id: "ber", x: 178, y: 68, label: "Berlin", sub: "DE" },
  { id: "zur", x: 158, y: 108, label: "Zürich", sub: "CH" },
  { id: "mln", x: 155, y: 128, label: "Milan", sub: "IT", active: true },
  { id: "mad", x: 92, y: 138, label: "Madrid", sub: "ES" },
  { id: "lis", x: 68, y: 150, label: "Lisbon", sub: "PT", active: true },
  { id: "sto", x: 192, y: 28, label: "Stockholm", sub: "SE" },
  { id: "cop", x: 172, y: 40, label: "Copenhagen", sub: "DK" },
  { id: "fra", x: 165, y: 85, label: "Frankfurt", sub: "DE" },
  { id: "war", x: 210, y: 72, label: "Warsaw", sub: "PL" },
];

// Edges: pairs of node ids that draw connection lines
const edges: [string, string][] = [
  ["lon", "ams"],
  ["lon", "par"],
  ["ams", "ber"],
  ["ams", "cop"],
  ["cop", "sto"],
  ["ber", "war"],
  ["ber", "fra"],
  ["par", "fra"],
  ["par", "mad"],
  ["fra", "zur"],
  ["zur", "mln"],
  ["mad", "lis"],
  ["par", "lis"],
  ["mln", "fra"],
  ["sto", "ber"],
];

const eu27Stats = [
  { k: "27", v: "EU member states" },
  { k: "24", v: "Languages supported" },
  { k: "GDPR", v: "By design, not afterthought" },
  { k: "Frankfurt", v: "EU data residency" },
];

export function EuGlobe() {
  const svgRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && linesRef.current) {
          // Animate each edge line drawing in
          const lines = linesRef.current.querySelectorAll<SVGLineElement>("line, path");
          lines.forEach((line, i) => {
            const len = 200; // approximate
            line.style.strokeDasharray = `${len}`;
            line.style.strokeDashoffset = `${len}`;
            line.style.transition = `stroke-dashoffset ${0.6 + i * 0.08}s ease ${i * 0.05}s`;
            requestAnimationFrame(() => {
              line.style.strokeDashoffset = "0";
            });
          });
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (svgRef.current) obs.observe(svgRef.current);
    return () => obs.disconnect();
  }, []);

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <section id="europe" className="hairline border-b bg-[var(--surface)]">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <Squiggle aria-hidden className="hidden md:block absolute top-16 right-20 w-32 text-accent/50" />

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">

          {/* Text column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground reveal-item">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              <span>For the European Market</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl tracking-[-0.03em] leading-[1] text-foreground reveal-item">
              Built to ship across
              <br />
              <em className="italic font-normal text-muted-foreground">all 27 member states.</em>
            </h2>
            <p className="mt-8 text-sm md:text-base leading-relaxed text-muted-foreground max-w-md reveal-item">
              Selling into the EU is a compliance problem before it's a commerce one.
              We design for it from the schema up — so legal, finance and ops sign off
              without slowing the launch.
            </p>

            {/* stat grid */}
            <div className="mt-10 grid grid-cols-2 gap-px bg-[var(--hairline)] hairline border reveal-item">
              {eu27Stats.map((s) => (
                <div key={s.k} className="bg-background p-5">
                  <div className="font-serif text-2xl md:text-3xl tracking-[-0.03em] text-foreground">
                    {s.k}
                  </div>
                  <div className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground leading-snug">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

            {/* compliance bullets */}
            <ul className="mt-10 space-y-3 text-[13px] text-muted-foreground">
              {[
                "VAT / OSS · SEPA · iDEAL · Bancontact · Giropay · Klarna",
                "PSD2 Strong Customer Authentication",
                "WCAG 2.2 AA · EU Accessibility Act",
                "Digital Product Passport (DPP) readiness",
                "Carbon-aware delivery · EPR reporting",
                "Right-to-be-forgotten automation",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 hairline border-b pb-3">
                  <span className="text-accent mt-0.5 shrink-0">+</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visualization column */}
          <div className="md:col-span-7 fade-up">
            <div className="relative hairline border bg-background p-6 md:p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
                — Active client nodes · European network
              </div>

              <svg
                ref={svgRef}
                viewBox="40 18 210 148"
                aria-hidden
                style={{ width: "100%", overflow: "visible" }}
              >
                {/* Grid lines — technical drawing aesthetic */}
                <g stroke="oklch(0.925 0.005 255 / 0.6)" strokeWidth="0.3" fill="none">
                  {Array.from({ length: 8 }, (_, i) => (
                    <line key={`h${i}`} x1="40" y1={18 + i * 22} x2="250" y2={18 + i * 22} />
                  ))}
                  {Array.from({ length: 10 }, (_, i) => (
                    <line key={`v${i}`} x1={40 + i * 24} y1="18" x2={40 + i * 24} y2="166" />
                  ))}
                </g>

                {/* Edges */}
                <g ref={linesRef}>
                  {edges.map(([a, b]) => {
                    const na = nodeMap[a];
                    const nb = nodeMap[b];
                    if (!na || !nb) return null;
                    const isActive = na.active || nb.active;
                    return (
                      <line
                        key={`${a}-${b}`}
                        x1={na.x} y1={na.y}
                        x2={nb.x} y2={nb.y}
                        stroke={isActive ? "oklch(0.65 0.18 30 / 0.45)" : "oklch(0.18 0.01 260 / 0.18)"}
                        strokeWidth={isActive ? "0.9" : "0.5"}
                      />
                    );
                  })}
                </g>

                {/* Nodes */}
                {nodes.map((n) => (
                  <g key={n.id}>
                    {/* outer pulse ring for active nodes */}
                    {n.active && (
                      <circle cx={n.x} cy={n.y} r="6" fill="none"
                        stroke="oklch(0.65 0.18 30 / 0.2)" strokeWidth="1" />
                    )}
                    {/* dot */}
                    <circle
                      cx={n.x} cy={n.y} r={n.active ? "3" : "1.8"}
                      fill={n.active ? "oklch(0.65 0.18 30)" : "oklch(0.18 0.01 260 / 0.55)"}
                    />
                    {/* label */}
                    <text
                      x={n.x + 5} y={n.y - 3}
                      fontSize="5"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight={n.active ? "600" : "400"}
                      fill={n.active ? "oklch(0.18 0.01 260)" : "oklch(0.18 0.01 260 / 0.55)"}
                    >
                      {n.label}
                    </text>
                    <text
                      x={n.x + 5} y={n.y + 4}
                      fontSize="3.8"
                      fontFamily="JetBrains Mono, monospace"
                      fill="oklch(0.18 0.01 260 / 0.35)"
                      letterSpacing="0.08em"
                    >
                      {n.sub}
                    </text>
                  </g>
                ))}

                {/* Studio origin marker */}
                <g>
                  <line x1={68} y1={150} x2={68} y2={162} stroke="oklch(0.65 0.18 30 / 0.5)" strokeWidth="0.6" />
                  <text x="55" y="168" fontSize="3.8" fontFamily="JetBrains Mono, monospace"
                    fill="oklch(0.65 0.18 30 / 0.8)" letterSpacing="0.1em">
                    STUDIO ORIGIN
                  </text>
                </g>
              </svg>

              {/* legend */}
              <div className="mt-5 flex items-center gap-6 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-accent/80" />
                  Active client
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-foreground/30" />
                  Network node
                </span>
                <span className="inline-flex items-center gap-2 ml-auto font-mono tracking-wider uppercase">
                  EU / EEA coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
