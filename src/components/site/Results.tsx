const stats = [
  { k: "$240M+", v: "GMV engineered" },
  { k: "63", v: "Countries shipped" },
  { k: "11", v: "Enterprise builds" },
  { k: "0", v: "Failed cutovers" },
];

const clients = [
  "Milan Fashion House",
  "US Wellness Leader",
  "UK Heritage Retailer",
  "Web3 Marketplace",
  "Global Apparel Group",
  "Paris Luxury House",
];

export function Results() {
  return (
    <section className="hairline border-b bg-[var(--surface)]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--hairline)] hairline border">
          {stats.map((s) => (
            <div key={s.v} className="bg-background p-8 md:p-10 reveal-item">
              <div className="font-serif text-4xl md:text-5xl tracking-[-0.03em] text-foreground">{s.k}</div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Trusted by teams at
          </span>
          {clients.map((c) => (
            <span key={c} className="font-serif italic text-lg text-foreground/75">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
