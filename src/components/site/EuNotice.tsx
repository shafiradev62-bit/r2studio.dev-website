import { Bracket } from "./Sketch";

const points = [
  {
    k: "GDPR & EU data residency",
    v: "Customer data architected for EU residency, with right-to-be-forgotten automation and consent logging built in from day one.",
  },
  {
    k: "VAT, OSS & local payments",
    v: "Multi-currency local pricing, VAT/OSS handling, SEPA, iDEAL, Bancontact, Giropay and Klarna wired to the storefront.",
  },
  {
    k: "Accessibility & DSA",
    v: "EU Accessibility Act and WCAG 2.2 AA compliance, plus Digital Services Act and Digital Product Passport readiness.",
  },
  {
    k: "Sustainability & EPR",
    v: "Carbon-aware delivery, EPR reporting and country-specific returns flows for the German, French and Nordic markets.",
  },
];

export function EuNotice() {
  return (
    <section id="europe" className="hairline border-b">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
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
            <p className="mt-8 text-base leading-relaxed text-muted-foreground max-w-md">
              Selling into the EU is a compliance problem before it's a commerce one.
              We design for it from the schema up — so legal, finance and ops sign off
              without slowing the launch.
            </p>
            <div className="mt-10 inline-flex items-center gap-3 hairline border bg-[var(--surface)] px-4 py-3">
              <span className="font-serif text-2xl text-accent">★</span>
              <span className="text-[12px] leading-snug text-muted-foreground">
                GDPR-compliant by design · EU data residency · 24 local languages
              </span>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 relative">
            <Bracket
              aria-hidden
              side="left"
              className="hidden md:block absolute -left-6 top-0 h-full w-5 text-foreground/30"
            />
            <div className="hairline border-t">
              {points.map((p) => (
                <div key={p.k} className="hairline border-b py-6 reveal-item">
                  <h3 className="font-serif text-xl tracking-[-0.01em] text-foreground">
                    {p.k}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-xl">
                    {p.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
