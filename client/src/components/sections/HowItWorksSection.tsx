/**
 * HowItWorksSection — 3-step onboarding flow
 * Sign up → Connect your agent → Memory persists
 * Design: Horizontal timeline with numbered steps, code snippets, Railway-inspired clarity
 */
import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';

const steps = [
  {
    number: '01',
    title: 'Create a workspace',
    description: 'Sign up for free. Get your API key and project ID in under a minute.',
    code: `curl -X POST https://api.ohaco.org/signup \\
  -d '{"email": "you@studio.com"}'`,
    label: 'Terminal',
  },
  {
    number: '02',
    title: 'Connect your agent',
    description: 'Point any MCP-compatible client — Claude, Cursor, Windsurf, Cline — at your Semantic Memory instance.',
    code: `pip install collab-memory
# or
uvx --from collab-memory \\
  collab-memory-mcp`,
    label: 'Install',
  },
  {
    number: '03',
    title: 'Memory persists',
    description: 'Every decision, preference, and constraint is captured. Your AI never starts from zero again.',
    code: `GET /memory/context
  ?role=developer
  &since=7d
  &project=my-app`,
    label: 'Query',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 sm:py-40">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
              How It Works
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 max-w-2xl">
            Three steps to{' '}
            <span className="gradient-text">persistent intelligence</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted-foreground text-lg max-w-xl mb-20 leading-relaxed">
            From zero to collective memory in under five minutes. No vendor lock-in. Self-host anytime.
          </p>
        </Reveal>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={0.1 + i * 0.1}>
              <div className="group relative">
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary/30 to-primary/5"
                      initial={{ width: '0%' }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.3, ease: 'easeOut' }}
                    />
                  </div>
                )}

                {/* Step number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <span className="text-4xl sm:text-5xl font-bold text-primary/15 font-mono">
                      {step.number}
                    </span>
                    {/* Glow dot */}
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-[0_0_12px_rgba(108,92,231,0.5)] transition-all duration-500" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Code block */}
                <div className="relative rounded-xl overflow-hidden border border-border/30 group-hover:border-primary/20 transition-colors duration-500">
                  {/* Code header */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20" style={{ background: 'oklch(0.08 0.004 285)' }}>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/40" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                      <div className="w-2 h-2 rounded-full bg-green-500/40" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/50 ml-2 tracking-wider uppercase">
                      {step.label}
                    </span>
                  </div>

                  {/* Code body */}
                  <div className="p-4" style={{ background: 'oklch(0.06 0.004 285)' }}>
                    <pre className="text-xs sm:text-sm font-mono text-foreground/70 leading-relaxed whitespace-pre-wrap overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.5}>
          <div className="mt-20 text-center">
            <a
              href="/signup"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 bg-primary text-white hover:shadow-[0_0_30px_rgba(108,92,231,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <p className="text-xs text-muted-foreground/50 mt-4 font-mono">
              No credit card required · Self-host anytime
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
