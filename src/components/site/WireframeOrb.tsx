/* Spinning wireframe orb — pure CSS 3D, zero canvas, zero AI gimmick.
   A rotating geodesic sphere drawn with SVG ellipses rendered in 3D CSS space.
   Communicates "precision engineering" without looking generative. */

import { useEffect, useRef } from "react";

export function WireframeOrb({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let raf: number;
    let paused = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);

    function tick() {
      if (!paused) {
        frame += 0.3;
        if (ref.current) {
          ref.current.style.transform = `rotateX(${frame * 0.4}deg) rotateY(${frame}deg)`;
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  // 8 longitudinal rings at different latitudes
  const rings = [
    { ry: 4, opacity: 0.18 },
    { ry: 14, opacity: 0.28 },
    { ry: 28, opacity: 0.38 },
    { ry: 44, opacity: 0.48 },
    { ry: 44, opacity: 0.48 },
    { ry: 28, opacity: 0.38 },
    { ry: 14, opacity: 0.28 },
    { ry: 4, opacity: 0.18 },
  ];

  const meridians = Array.from({ length: 9 }, (_, i) => i * 20);

  return (
    <div
      className={`${className}`}
      style={{ perspective: "600px", perspectiveOrigin: "50% 50%" }}
      aria-hidden
    >
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeLinecap="round"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* equator + latitude rings */}
          {rings.map((r, i) => {
            const cy = 50 + i * (100 / (rings.length - 1));
            const scale = Math.sin((i / (rings.length - 1)) * Math.PI);
            const rx = 50 * scale;
            return (
              <ellipse
                key={`lat-${i}`}
                cx="100"
                cy={cy}
                rx={rx}
                ry={r.ry * scale}
                opacity={r.opacity}
              />
            );
          })}

          {/* meridian arcs */}
          {meridians.map((angle, i) => (
            <ellipse
              key={`mer-${i}`}
              cx="100"
              cy="100"
              rx={50 * Math.abs(Math.cos((angle * Math.PI) / 180))}
              ry="50"
              opacity={0.25}
              transform={`rotate(${angle} 100 100)`}
            />
          ))}

          {/* outer circle */}
          <circle cx="100" cy="100" r="50" opacity="0.55" />

          {/* cross-hair ticks at poles */}
          <line x1="97" y1="50" x2="103" y2="50" opacity="0.7" />
          <line x1="97" y1="150" x2="103" y2="150" opacity="0.7" />
          <line x1="50" y1="97" x2="50" y2="103" opacity="0.7" />
          <line x1="150" y1="97" x2="150" y2="103" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
}
