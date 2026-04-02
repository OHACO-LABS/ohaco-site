/**
 * HeroSection — Full-viewport immersive hero
 * Design: Atmospheric Dark Gallery
 * The fractal canvas lives behind this; content floats above it.
 * Cinematic typography, breathing rhythm, subtle light interaction hint.
 */
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(108, 92, 231, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Establishment tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="h-px w-8 bg-primary/40" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono"
          >
            Est. 2024
          </span>
          <span className="h-px w-8 bg-primary/40" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          style={{ textShadow: '0 0 60px rgba(108, 92, 231, 0.15), 0 2px 20px rgba(0,0,0,0.5)' }}
        >
          <span className="block text-white">Our House</span>
          <span className="block gradient-text">Arts Collective</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-4"
        >
          An open space for all creatives.
        </motion.p>

        {/* Thesis line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm text-foreground/50 font-mono tracking-wide max-w-xl mx-auto mb-12"
        >
          Data is capital&ensp;·&ensp;AI redistributes it&ensp;·&ensp;Privacy is load-bearing
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#signup"
            className="group relative px-8 py-3.5 rounded-xl font-medium text-sm overflow-hidden"
          >
            <span className="absolute inset-0 bg-primary rounded-xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(108,92,231,0.3)]" />
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-light to-primary bg-[length:200%_100%] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_3s_linear_infinite]"
              style={{ '--color-purple-light': 'oklch(0.65 0.22 275.75)' } as React.CSSProperties}
            />
            <span className="relative text-primary-foreground">Join the Collective</span>
          </a>
          <a
            href="#thesis"
            className="group px-8 py-3.5 rounded-xl font-medium text-sm text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
          >
            Read the Thesis
          </a>
        </motion.div>

        {/* Interaction hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 text-xs text-muted-foreground/40 font-mono"
        >
          {typeof window !== 'undefined' && window.innerWidth < 768 ? 'touch to interact' : 'move your cursor to interact'}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <a href="#thesis" className="text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors" >
            <ArrowDown className="w-5 h-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
