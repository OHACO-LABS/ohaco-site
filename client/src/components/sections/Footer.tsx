/**
 * Footer — Minimal, architectural footer
 * Design: Fine lines, monospace accents, breathing space
 */
import { Github } from 'lucide-react';



export default function Footer() {
  return (
    <footer className="relative py-16 sm:py-20">
      {/* Top line */}
      <div className="arch-line mb-16 mx-auto max-w-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-12 gap-10 sm:gap-8 mb-16">
          {/* Brand column */}
          <div className="sm:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs text-primary"
                style={{
                  border: '1.5px solid oklch(0.55 0.18 275)',
                  background: 'oklch(0.12 0.02 275 / 60%)',
                }}
              >
                O
              </div>
              <span className="font-semibold text-sm tracking-wider text-foreground/80">
                OHACO
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
              Our House Arts Collective. An open space for all creatives. Building the infrastructure for a sovereign creative economy.
            </p>
            <p className="text-xs text-muted-foreground/50 font-mono">
              Est. 2024 · OHACO Labs
            </p>
          </div>

          {/* Links */}
          <div className="sm:col-span-3 sm:col-start-7">
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60 font-mono mb-4">
              Navigate
            </h4>
            <div className="space-y-2.5">
              {[
                { label: 'Thesis', href: '#thesis' },
                { label: 'Products', href: '#products' },
                { label: 'OpenCore', href: '#opensource' },
                { label: 'About', href: '/about' },
                { label: 'Docs', href: '/docs' },
                { label: 'Join', href: '#signup' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="sm:col-span-3">
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60 font-mono mb-4">
              Connect
            </h4>
            <div className="space-y-2.5">
              <a
                href="https://github.com/OHACO-LABS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href="https://ohaco.org"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                ohaco.org
              </a>
              <a
                href="/investors"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Investors
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <p className="text-xs text-muted-foreground/40 font-mono">
            © {new Date().getFullYear()} OHACO Labs. OpenCore · MIT licensed.
          </p>
          <p className="text-xs text-muted-foreground/30 font-mono">
            Data is capital · AI redistributes it · Privacy is load-bearing
          </p>
        </div>
      </div>
    </footer>
  );
}
