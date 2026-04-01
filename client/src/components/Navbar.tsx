/**
 * Navbar — Floating glass navigation bar
 * Design: Atmospheric Dark Gallery / OHACO purple accent
 * Micro-interactions: backdrop blur reveal on scroll, link hover glow, mobile drawer
 * Fixed: Smart navigation — anchor links on homepage, full-path navigation from other pages
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github } from 'lucide-react';
import { Link, useLocation } from 'wouter';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663075749204/amstX3XdXJM3AMGdoXYXU5/ohaco-logo-polished-FoUhtuG8DbsxNyEKWvMJ4c.png';

const navLinks = [
  { label: 'Thesis', href: '/#thesis', anchor: '#thesis' },
  { label: 'Products', href: '/#products', anchor: '#products' },
  { label: 'Pricing', href: '/pricing', anchor: '#pricing' },
  { label: 'About', href: '/about', anchor: '/about' },
  { label: 'Docs', href: '/docs', anchor: '/docs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[number]) => {
    // If it's a page link (starts with /), use wouter
    if (!link.anchor.startsWith('#')) return;

    // If on homepage, just scroll to anchor
    if (isHome) {
      e.preventDefault();
      const el = document.querySelector(link.anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // If not on homepage, the href will navigate to /#section, then we scroll
  };

  const getNavHref = (link: typeof navLinks[number]) => {
    // Page links always go to their route
    if (!link.anchor.startsWith('#')) return link.href;
    // Anchor links: use anchor on homepage, full path otherwise
    return isHome ? link.anchor : link.href;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
              scrolled
                ? 'glass-card glow-purple'
                : 'bg-transparent'
            }`}
          >
            {/* Logo — proper SPA routing */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                <img
                  src={LOGO_URL}
                  alt="OHACO"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 12px rgba(108, 92, 231, 0.4)' }}
                />
              </div>
              <span className="font-semibold text-sm tracking-wider text-foreground/90 group-hover:text-foreground transition-colors">
                OHACO
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isPageLink = !link.anchor.startsWith('#');
                const isActive = isPageLink && location === link.href;

                if (isPageLink) {
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`relative px-4 py-2 text-sm transition-colors duration-300 group ${
                        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/8 transition-all duration-300" />
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-px bg-primary transition-all duration-300 ${
                        isActive ? 'w-6' : 'w-0 group-hover:w-6'
                      }`} />
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.label}
                    href={getNavHref(link)}
                    onClick={(e) => handleNavClick(e, link)}
                    className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/8 transition-all duration-300" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-primary group-hover:w-6 transition-all duration-300" />
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA + GitHub */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/OHACO-LABS"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/8 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <Link
                href="/signup"
                className="relative px-5 py-2 text-sm font-medium rounded-lg overflow-hidden group"
              >
                <span className="absolute inset-0 bg-primary/15 group-hover:bg-primary/25 transition-all duration-300 rounded-lg" />
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 20px rgba(108, 92, 231, 0.15)' }}
                />
                <span className="relative text-foreground/90 group-hover:text-foreground transition-colors">
                  Get Started
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/8 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 pt-24 px-4 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative glass-card rounded-2xl p-6 space-y-2">
              {navLinks.map((link, i) => {
                const isPageLink = !link.anchor.startsWith('#');
                
                if (isPageLink) {
                  return (
                    <motion.div key={link.label}>
                      <Link
                        href={link.href}
                        className="block px-4 py-3 text-lg text-foreground/80 hover:text-foreground hover:bg-primary/8 rounded-xl transition-all"
                      >
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.a
                    key={link.label}
                    href={getNavHref(link)}
                    onClick={(e) => {
                      handleNavClick(e, link);
                      setMobileOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="block px-4 py-3 text-lg text-foreground/80 hover:text-foreground hover:bg-primary/8 rounded-xl transition-all"
                  >
                    {link.label}
                  </motion.a>
                );
              })}
              <div className="pt-4 border-t border-border/50 space-y-2">
                <Link
                  href="/signup"
                  className="block px-4 py-3 text-center text-sm font-medium text-primary-foreground bg-primary/90 rounded-xl hover:bg-primary transition-all"
                >
                  Get Started
                </Link>
                <a
                  href="https://github.com/OHACO-LABS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
