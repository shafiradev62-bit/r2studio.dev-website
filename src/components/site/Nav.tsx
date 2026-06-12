export function Nav() {
  return (
    <header className="hairline border-b sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-serif text-xl tracking-tight text-foreground">
          r2studio<span className="text-accent">.</span>dev
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[13px] font-medium text-muted-foreground">
          <a href="#showcase" className="hover:text-foreground transition-colors">Showcase</a>
          <a href="#gallery" className="hover:text-foreground transition-colors">3D Gallery</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#studio" className="hover:text-foreground transition-colors">Studio</a>
          <a href="#europe" className="hover:text-foreground transition-colors">Europe</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-[13px] font-medium tracking-tight hover:bg-foreground/90 transition-colors"
        >
          Book a Brief
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}