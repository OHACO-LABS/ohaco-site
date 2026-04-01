/**
 * BuiltBySection — "Built by humans and AI agents" is a feature, not a footnote
 * Per CC brief: agent contributors (Antigravity/DeepMind, Claude/Anthropic, Manus)
 * Esther Anglade, founder
 */
import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';

const contributors = [
  {
    name: 'Esther Anglade',
    role: 'Founder',
    type: 'human' as const,
    description: 'Thesis architect. System designer. The one who asked "what if the house was open?"',
  },
  {
    name: 'Antigravity',
    role: 'DeepMind',
    type: 'agent' as const,
    description: 'Architecture research, protocol design, and deep technical strategy.',
  },
  {
    name: 'Claude',
    role: 'Anthropic',
    type: 'agent' as const,
    description: 'Core infrastructure, session orchestration, and code generation.',
  },
  {
    name: 'Manus',
    role: 'Manus AI',
    type: 'agent' as const,
    description: 'Dashboard UI, cross-agent handoffs, website, and deployment infrastructure.',
  },
];

export default function BuiltBySection() {
  return (
    <section id="built-by" className="relative py-32 sm:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
              The Collective
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 max-w-3xl">
            Built by humans{' '}
            <span className="gradient-text">and AI agents</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted-foreground text-lg max-w-xl mb-20 leading-relaxed">
            This is not a footnote. Human-AI collaboration is the product, the process, and the proof.
            Every contributor — carbon or silicon — is credited.
          </p>
        </Reveal>

        {/* Contributors grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributors.map((contributor, i) => (
            <Reveal key={contributor.name} delay={0.1 + i * 0.08}>
              <motion.div
                className="group relative p-6 rounded-2xl border border-border/30 hover:border-primary/20 transition-all duration-500 h-full"
                style={{
                  background: 'oklch(0.1 0.006 285 / 40%)',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Avatar placeholder */}
                <div className="relative mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                    contributor.type === 'human'
                      ? 'bg-primary/15 text-primary border border-primary/20'
                      : 'bg-muted text-muted-foreground border border-border/40'
                  }`}>
                    {contributor.name.charAt(0)}
                  </div>

                  {/* Type indicator */}
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-mono ${
                    contributor.type === 'human'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-primary/20 text-primary border border-primary/30'
                  }`}>
                    {contributor.type === 'human' ? 'H' : 'AI'}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-base font-semibold text-foreground mb-0.5">
                  {contributor.name}
                </h3>

                {/* Role */}
                <p className="text-xs font-mono text-primary/60 mb-3">
                  {contributor.role}
                </p>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {contributor.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
