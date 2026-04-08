/**
 * ThesisSection — "The Declaration"
 * Asymmetric 2-column layout: axiom number + statement on left,
 * body text on right. Staggered reveals. Feels spatial, not listy.
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
    <section id="thesis" className="relative py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — left-aligned with version tag */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-20 mb-16 lg:mb-24">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
                  The Thesis
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/40 font-mono ml-1 border border-border/30 px-2 py-0.5 rounded-full">
                  v0.1
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                Five axioms for a{' '}
                <span className="gradient-text">sovereign creative economy.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:pt-12">
            <Reveal delay={0.1}>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed mb-6">
                Something really loved us to imagine us into an existence as beautiful as this.
                We make it hard on each other — and in time, we will get it right again.
                These are the principles we build from.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="pl-6 border-l border-primary/30">
                <p className="text-xs font-mono text-foreground/50 leading-relaxed italic">
                  "The house is open.<br />
                  The tools are shared.<br />
                  The data stays yours."
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Axioms — asymmetric 2-column per row */}
        <div className="space-y-0">
          {axioms.map((axiom, i) => (
            <Reveal key={axiom.number} delay={0.1 + i * 0.06}>
              <motion.div
                className="group grid lg:grid-cols-[240px_1fr] gap-4 lg:gap-12 py-8 sm:py-10 border-b border-border/15 last:border-b-0"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Left: number + statement */}
                <div className="flex items-baseline gap-4 lg:block">
                  <span className="font-mono text-[11px] text-primary/40 group-hover:text-primary/80 transition-colors duration-500 tracking-widest block mb-2">
                    {axiom.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-glow transition-all duration-500">
                    {axiom.statement}
                  </h3>
                </div>

                {/* Right: body */}
                <p className="text-muted-foreground/80 leading-relaxed text-sm sm:text-[15px] lg:pt-6 max-w-xl">
                  {axiom.body}
                </p>
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
