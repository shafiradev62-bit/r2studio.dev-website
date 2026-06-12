import { useState } from "react";

type Lead = {
  name: string;
  company: string;
  email: string;
  budget: string;
  scope: string;
  timeline: string;
  brief: string;
  createdAt: string;
};

const scopes = ["Shopify Plus", "Web3 / On-chain", "3D / Lectra pipeline", "Infrastructure", "Not sure yet"];
const timelines = ["ASAP", "This quarter", "Next quarter", "Exploring"];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [scope, setScope] = useState("");
  const [timeline, setTimeline] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lead: Lead = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      budget: String(fd.get("budget") || ""),
      scope,
      timeline,
      brief: String(fd.get("brief") || ""),
      createdAt: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("r2_leads") || "[]");
      localStorage.setItem("r2_leads", JSON.stringify([lead, ...prev]));
    } catch {
      /* ignore storage errors */
    }
    setSent(true);
  }

  return (
    <section id="contact" className="bg-[var(--surface)] hairline border-t">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-foreground/40" />
              <span>Lead Capture — Selective Engagements</span>
            </div>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl tracking-[-0.03em] leading-[0.98] text-foreground">
              Brief us on what
              <br />
              <em className="italic font-normal text-muted-foreground">you're building.</em>
            </h2>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground max-w-md">
              We take on a small number of engagements each quarter. Tell us about the
              scope and the stakes — we typically respond within two business days.
            </p>
            <dl className="mt-12 space-y-4 text-sm">
              <div className="flex justify-between border-b hairline pb-3">
                <dt className="text-muted-foreground">Studio</dt>
                <dd className="text-foreground">Lisbon / Remote</dd>
              </div>
              <div className="flex justify-between border-b hairline pb-3">
                <dt className="text-muted-foreground">Inquiries</dt>
                <dd className="text-foreground">hello@r2studio.dev</dd>
              </div>
              <div className="flex justify-between border-b hairline pb-3">
                <dt className="text-muted-foreground">Press</dt>
                <dd className="text-foreground">press@r2studio.dev</dd>
              </div>
            </dl>
          </div>

          {sent ? (
            <div className="md:col-span-7 flex items-center">
              <div className="w-full hairline border bg-background p-10 md:p-14">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Brief received
                </div>
                <h3 className="mt-5 font-serif text-3xl md:text-4xl tracking-[-0.02em] text-foreground">
                  Thank you — we've got it.
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-md">
                  Your brief is captured. A founding engineer will review it personally and
                  reply within two business days. For anything urgent, email{" "}
                  <span className="text-foreground">hello@r2studio.dev</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 inline-flex items-center gap-3 hairline border px-6 py-3.5 text-[13px] font-medium tracking-tight text-foreground hover:bg-[var(--surface)] transition-colors"
                >
                  Submit another brief
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          ) : (
            <form
              className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8"
              onSubmit={handleSubmit}
            >
              {[
                { l: "Name", n: "name", t: "text", ph: "Your full name" },
                { l: "Company", n: "company", t: "text", ph: "Brand or organization" },
                { l: "Work Email", n: "email", t: "email", ph: "you@company.com" },
                { l: "Budget", n: "budget", t: "text", ph: "USD range" },
              ].map((f) => (
                <label key={f.n} className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {f.l}
                  </span>
                  <input
                    required
                    type={f.t}
                    name={f.n}
                    placeholder={f.ph}
                    className="mt-3 w-full bg-transparent border-b hairline pb-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
                  />
                </label>
              ))}

              <div className="block sm:col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Scope
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {scopes.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setScope(s)}
                      className={`text-[12px] px-3 py-2 hairline border transition-colors ${
                        scope === s
                          ? "bg-foreground text-background"
                          : "text-foreground hover:bg-background"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="block sm:col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Timeline
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {timelines.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTimeline(t)}
                      className={`text-[12px] px-3 py-2 hairline border transition-colors ${
                        timeline === t
                          ? "bg-foreground text-background"
                          : "text-foreground hover:bg-background"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block sm:col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Project Brief
                </span>
                <textarea
                  required
                  name="brief"
                  rows={4}
                  placeholder="Architecture, scope, timing, success metrics…"
                  className="mt-3 w-full bg-transparent border-b hairline pb-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </label>
              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-6 pt-4">
                <p className="text-[12px] text-muted-foreground max-w-sm">
                  By submitting, you agree we may contact you about your engagement.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 text-[13px] font-medium tracking-tight hover:bg-foreground/90 transition-colors"
                >
                  Submit Brief
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          )}
        </div>

        <footer className="mt-24 pt-8 border-t hairline flex flex-wrap items-center justify-between gap-4 text-[12px] text-muted-foreground">
          <span>© {new Date().getFullYear()} r2studio.dev — All rights reserved.</span>
          <span className="font-mono tracking-[0.2em] uppercase">Engineered in 38.7°N</span>
        </footer>
      </div>
    </section>
  );
}
