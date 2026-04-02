/**
 * ThesisSection — "The Declaration" — Five Axioms for a Sovereign Creative Economy
 * 
 * Design: Manifesto-style numbered axioms. Text floating in space.
 * Each axiom: one sentence that hits, one paragraph that earns it.
 * Versioned as v0.1 — a living document, inviting contribution.
 * No decorative images. Pure typography.
 */
import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';

const axioms = [
  {
    number: 'I',
    statement: 'Data is capital.',
    body: 'Every interaction, every preference, every creative impulse generates data. In the current paradigm, that value flows upward to platforms. We believe it belongs to the people who create it — and that recognizing data as capital is the first step toward redistributing the creative economy.',
  },
  {
    number: 'II',
    statement: 'AI redistributes it.',
    body: 'Artificial intelligence is not just a tool — it is an economic force. When wielded collectively, it can redistribute the value of data back to creators, artists, and communities. The question is not whether AI will reshape the economy, but who will hold the levers when it does.',
  },
  {
    number: 'III',
    statement: 'Privacy is load-bearing.',
    body: 'Privacy is not a feature or a toggle. It is the structural foundation upon which trust, autonomy, and creative freedom are built. Remove it, and the entire architecture collapses. Without it, the collective cannot stand.',
  },
  {
    number: 'IV',
    statement: 'Time is the only thing more valuable than knowledge.',
    body: 'Systems designed to increase efficiency over time have compounding value. We are building for the knowledge market — one that gives back time, energy, and compute demand. Everyone, including the most advanced AI models, benefits when refined data flows freely through systems that respect the hours it took to create.',
  },
  {
    number: 'V',
    statement: 'Opt-in is the only ethical default.',
    body: 'The voluntary contribution of highly refined data creates a marketplace built on consent, not extraction. Users should always have the option to elect to participate. A market that assumes opt-in as its default is not just more ethical — it produces better data, better models, and better outcomes for everyone.',
  },
];

export default function ThesisSection() {
  return (
    <section id="thesis" className="relative py-32 sm:py-40">
      {/* Architectural line */}
      <div className="arch-line mb-20 mx-auto max-w-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
              The Thesis
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/40 font-mono ml-2 border border-border/30 px-2 py-0.5 rounded-full">
              v0.1
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] mb-4 max-w-2xl">
            Five axioms for a{' '}
            <span className="gradient-text">sovereign creative economy.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
            Something really loved us to imagine us into an existence as beautiful as this.
            We make it hard on each other — and in time, we will get it right again.
            These are the principles we build from.
          </p>
        </Reveal>

        {/* Opening quote — replaces decorative image */}
        <Reveal delay={0.15}>
          <div className="mb-16 pl-6 border-l border-primary/30">
            <p className="text-xs font-mono text-foreground/50 leading-relaxed italic">
              "The house is open.<br />
              The tools are shared.<br />
              The data stays yours."
            </p>
          </div>
        </Reveal>

        {/* Axioms — full width, text floating in space */}
        <div className="space-y-0">
          {axioms.map((axiom, i) => (
            <Reveal key={axiom.number} delay={0.15 + i * 0.08}>
              <motion.div
                className="group relative py-10 border-b border-border/20 last:border-b-0"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Axiom number */}
                <div className="flex items-start gap-6 sm:gap-8">
                  <div className="flex-shrink-0 pt-1">
                    <span className="font-mono text-xs text-primary/40 group-hover:text-primary/80 transition-colors duration-500 tracking-widest">
                      {axiom.number}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Statement — the one sentence that hits */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight group-hover:text-glow transition-all duration-500">
                      {axiom.statement}
                    </h3>

                    {/* Body — the paragraph that earns it */}
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl">
                      {axiom.body}
                    </p>
                  </div>
                </div>

                {/* Hover glow line */}
                <motion.div
                  className="absolute left-0 bottom-0 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Closing — the invitation */}
        <Reveal delay={0.7}>
          <div className="mt-16 pt-8 border-t border-border/20">
            <div className="flex items-start gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-primary/60 to-primary/0 rounded-full flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4 max-w-lg">
                  This thesis is a living document. It will evolve as the collective grows,
                  as contributors challenge assumptions, and as the tools we build reveal
                  what we haven't yet imagined.
                </p>

                <p className="text-xs font-mono text-muted-foreground/40 tracking-wide mt-4">
                  OHACO Labs · Est. 2024 · Thesis v0.1
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
