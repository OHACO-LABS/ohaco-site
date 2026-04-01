/**
 * ThesisSection — "The Declaration" — Five Axioms for a Sovereign Creative Economy
 * 
 * Design: Manifesto-style numbered axioms, not bullet points.
 * Each axiom: one sentence that hits, one paragraph that earns it.
 * Versioned as v0.1 — a living document, inviting contribution.
 * Poetry on the site, math in the PDF.
 */
import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';

const THESIS_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663075749204/amstX3XdXJM3AMGdoXYXU5/ohaco-thesis-visual-6P9465kogU4UoRWLaHxa95.webp';

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mb-16 leading-relaxed">
            Something really loved us to imagine us into an existence as beautiful as this.
            We make it hard on each other — and in time, we will get it right again.
            These are the principles we build from.
          </p>
        </Reveal>

        {/* Two-column: visual left, axioms right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column: visual + closing */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] group mb-8">
                <img
                  src={THESIS_IMG}
                  alt="Light refracting through a prism — data transformed into value"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute inset-0 rounded-2xl border border-primary/10" />

                {/* Overlay quote */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-mono text-foreground/60 leading-relaxed">
                    "The house is open.<br />
                    The tools are shared.<br />
                    The data stays yours."
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href="https://d2xsxph8kpxj0f.cloudfront.net/310519663075749204/amstX3XdXJM3AMGdoXYXU5/ohaco-thesis-v0.1_776ab4d8.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="OHACO-Thesis-v0.1.pdf"
                className="group inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="w-8 h-8 rounded-lg border border-border/50 group-hover:border-primary/40 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </span>
                <span className="font-mono text-xs tracking-wide">Read the full thesis (PDF)</span>
              </a>
            </Reveal>
          </div>

          {/* Right column: axioms */}
          <div className="lg:col-span-8">
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
                    <p className="text-xs font-mono text-muted-foreground/40 tracking-wide">
                      OHACO Labs · Est. 2024 · Thesis v0.1
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
