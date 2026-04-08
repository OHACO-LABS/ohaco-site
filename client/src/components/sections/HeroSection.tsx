/**
 * HeroSection — Immersive split-panel hero
 * Left: brand + thesis hook + CTA (fixed feel, always accessible)
 * Right: floating signal cards that hint at what OHACO does
 * Asymmetric, spatial, non-centered. Particles live behind everything.
 */
import { motion } from 'framer-motion';
import { ArrowRight, Brain, ShieldCheck, Sparkles } from 'lucide-react';

const signals = [
  { icon: Brain, label: 'Semantic Memory', detail: 'Persistent context', delay: 1.4 },
  { icon: ShieldCheck, label: 'Privacy-first', detail: 'Zero-knowledge vault', delay: 1.7 },
  { icon: Sparkles, label: 'Cognitive Dreams', detail: 'Memory that learns', delay: 2.0 },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Asymmetric gradient accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 60% at 15% 50%, rgba(108, 92, 231, 0.08) 0%, transparent 70%), radial-gradient(ellipse 30% 40% at 85% 30%, rgba(6, 182, 212, 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20 items-center">
          {/* ── Left: Brand + Hook ── */}
          <div>
            {/* Establishment */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-12 bg-primary/40" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-mono">
                Est. 2024
              </span>
            </motion.div>

            {/* Headline — left-aligned, large */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.92] mb-6"
            >
              <span className="block gradient-text">OHACO</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-foreground/80 leading-relaxed mb-3 max-w-lg"
            >
              Memory-native AI for creators, teams,
              <br className="hidden sm:block" />
              and agent collectives.
            </motion.p>

            {/* Thesis line — monospace accent */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-xs font-mono text-muted-foreground/60 tracking-wide mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              Data is capital
              <span className="w-1 h-1 rounded-full bg-border/60" />
              AI redistributes it
              <span className="w-1 h-1 rounded-full bg-border/60" />
              Privacy is load-bearing
            </motion.div>

            {/* CTAs — horizontal, left-aligned */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4"
            >
              <a
                href="#signup"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm overflow-hidden"
              >
                <span className="absolute inset-0 bg-primary rounded-xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(108,92,231,0.3)]" />
                <span className="relative text-primary-foreground">Join the Collective</span>
                <ArrowRight className="relative w-4 h-4 text-primary-foreground/80 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#thesis"
                className="group px-6 py-3.5 rounded-xl font-medium text-sm text-muted-foreground hover:text-foreground border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                Read the Thesis
              </a>
            </motion.div>

            {/* Cursor hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="mt-12 text-[11px] text-muted-foreground/30 font-mono"
            >
              {typeof window !== 'undefined' && window.innerWidth < 768 ? 'touch to interact' : 'move cursor to interact with particles'}
            </motion.p>
          </div>

          {/* ── Right: Floating signal cards ── */}
          <div className="hidden lg:block relative h-[420px]">
            {signals.map((sig, i) => {
              const Icon = sig.icon;
              // Stagger vertically with slight horizontal offset for depth
              const top = 20 + i * 130;
              const left = i % 2 === 0 ? 24 : 60;
              return (
                <motion.div
                  key={sig.label}
                  initial={{ opacity: 0, x: 40, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: sig.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.03, x: -4 }}
                  className="absolute group"
                  style={{ top, left }}
                >
                  <div
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-border/30 backdrop-blur-xl transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_40px_rgba(108,92,231,0.08)]"
                    style={{
                      background: 'color-mix(in srgb, var(--background) 70%, transparent)',
                      minWidth: 260,
                    }}
                  >
                    <div className="p-2.5 rounded-xl bg-primary/8 border border-primary/15 group-hover:bg-primary/12 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground/90">{sig.label}</p>
                      <p className="text-xs text-muted-foreground/70 font-mono">{sig.detail}</p>
                    </div>
                    {/* Accent line on hover */}
                    <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              );
            })}

            {/* Ambient glow behind cards */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(108, 92, 231, 0.04) 0%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom left instead of center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-8 sm:left-12"
      >
        <motion.a
          href="#thesis"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors text-xs font-mono"
        >
          <span className="w-px h-6 bg-current" />
          scroll
        </motion.a>
      </motion.div>
    </section>
  );
}
