/**
 * NotFound — 404 page in the Atmospheric Dark Gallery style
 * Quiet, elegant, on-brand
 */
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-md"
      >
        {/* Glow accent */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />
          <div className="relative w-full h-full rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center">
            <span className="text-3xl font-bold font-mono text-primary/60">404</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 tracking-tight">
          Page not found
        </h1>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          The page you're looking for doesn't exist — it may have been moved or is still being built.
        </p>

        <Link
          href="/"
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 text-sm text-foreground/80 hover:text-foreground"
        >
          <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Back to home</span>
        </Link>

        <p className="mt-12 text-xs text-muted-foreground/30 font-mono tracking-wide">
          OHACO Labs · Est. 2024
        </p>
      </motion.div>
    </div>
  );
}
