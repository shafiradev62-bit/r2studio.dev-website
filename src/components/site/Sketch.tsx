/* Hand-drawn SVG marginalia. Stroke uses currentColor.
   All paths are intentionally wobbly — drawn freehand, not generated. */

type P = React.SVGProps<SVGSVGElement> & { className?: string };

export function ScribbleCircle(props: P) {
  return (
    <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M30 62 C 28 30, 70 14, 110 14 c 50 0, 70 26, 64 50 c -4 28, -50 44, -90 42 c -36 -2, -62 -18, -64 -38 c -1 -16, 16 -32, 44 -38" />
      <path d="M44 70 c 14 18, 64 24, 100 14" opacity="0.55" />
    </svg>
  );
}

export function HandArrow(props: P) {
  return (
    <svg viewBox="0 0 200 80" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 44 C 40 18, 90 12, 150 30 c 14 4, 24 10, 36 18" />
      <path d="M168 30 l 18 18 l -22 8" />
    </svg>
  );
}

export function CurlyUnderline(props: P) {
  return (
    <svg viewBox="0 0 300 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" {...props}>
      <path d="M4 14 C 30 4, 60 22, 90 12 S 150 4, 180 14 S 240 22, 296 10" />
    </svg>
  );
}

export function Asterisk(props: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" {...props}>
      <path d="M20 4 v32 M6 12 l28 16 M6 28 l28 -16 M4 20 h32" />
    </svg>
  );
}

export function Star(props: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 4 l4 12 l13 1 l-10 8 l3 13 l-10 -7 l-10 7 l3 -13 l-10 -8 l13 -1 z" />
    </svg>
  );
}

export function Squiggle(props: P) {
  return (
    <svg viewBox="0 0 200 30" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" {...props}>
      <path d="M2 16 C 14 2, 26 30, 40 16 S 70 2, 84 16 S 114 30, 128 16 S 158 2, 172 16 S 198 28, 198 16" />
    </svg>
  );
}

export function Bracket({ side = "left", ...props }: P & { side?: "left" | "right" }) {
  const d = side === "left"
    ? "M28 4 C 18 6, 10 18, 8 60 c -2 42, 6 56, 20 64"
    : "M4 4 C 14 6, 22 18, 24 60 c 2 42, -6 56, -20 64";
  return (
    <svg viewBox="0 0 32 128" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" {...props}>
      <path d={d} />
    </svg>
  );
}

export function CrossOut(props: P) {
  return (
    <svg viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" {...props}>
      <path d="M4 30 C 30 8, 70 26, 116 6" />
      <path d="M4 14 C 32 32, 78 6, 116 28" opacity="0.7" />
    </svg>
  );
}

export function Plus(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" {...props}>
      <path d="M12 3 v18 M3 12 h18" />
    </svg>
  );
}

export function NumberCircle({ n, ...props }: P & { n: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" {...props}>
      <path d="M10 30 C 8 14, 26 6, 36 6 c 16 0, 22 12, 22 22 c 0 14, -10 28, -28 28 c -14 0, -22 -8, -22 -20" />
      <text x="32" y="40" fontFamily="serif" fontStyle="italic" fontSize="22"
        textAnchor="middle" fill="currentColor" stroke="none">{n}</text>
    </svg>
  );
}