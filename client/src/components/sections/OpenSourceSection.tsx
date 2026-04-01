/**
 * OpenSourceSection — OpenCore story + GitHub link
 * Design: Atmospheric background, code-inspired typography, community emphasis
 */
import { Github, GitBranch, Star, Users } from 'lucide-react';
import Reveal from '@/components/Reveal';

const OPENSOURCE_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663075749204/amstX3XdXJM3AMGdoXYXU5/ohaco-opensource-bg-QdMTwQVkpmiXz4mUpywjLD.webp';

const principles = [
  {
    icon: GitBranch,
    title: 'Fork Everything',
    text: 'Every tool we build ships with source. Fork it, extend it, make it yours. The collective grows when knowledge flows freely.',
  },
  {
    icon: Users,
    title: 'Build Together',
    text: 'Open issues, open PRs, open conversations. Our roadmap is shaped by the people who use what we make.',
  },
  {
    icon: Star,
    title: 'Own Your Stack',
    text: 'Self-host any OHACO product. No vendor lock-in, no data hostage. Your infrastructure, your rules.',
  },
];

export default function OpenSourceSection() {
  return (
    <section id="opensource" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url(${OPENSOURCE_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
        }}
      />

      {/* Architectural line */}
      <div className="arch-line mb-20 mx-auto max-w-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
              OpenCore
            </span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: narrative */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
                Built in the open.{' '}
                <span className="gradient-text">By design.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                OHACO is not a company that happens to open-source some code. Our core intelligence — the schema, encoder, and classifier — is MIT-licensed. The hosted service is what sustains us. That's the OpenCore model, and the distinction matters.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-muted-foreground leading-relaxed mb-10">
                When we say "our house," we mean it literally. The codebase is the house. The contributors are the residents. The MIT license is the deed. Every creative who walks through the door has equal claim to the core tools inside.
              </p>
            </Reveal>

            {/* GitHub CTA */}
            <Reveal delay={0.3}>
              <a
                href="https://github.com/OHACO-LABS"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                <div>
                  <span className="block text-sm font-medium text-foreground group-hover:text-glow transition-all duration-300">
                    OHACO-LABS
                  </span>
                  <span className="block text-xs text-muted-foreground font-mono">
                    github.com/OHACO-LABS
                  </span>
                </div>
                <span className="ml-2 text-muted-foreground/40 group-hover:text-primary/60 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </a>
            </Reveal>
          </div>

          {/* Right: principles */}
          <div className="lg:col-span-6 space-y-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={0.15 + i * 0.1} direction="left">
                  <div className="group relative p-6 rounded-2xl border border-border/30 hover:border-primary/20 transition-all duration-500"
                    style={{
                      background: 'oklch(0.09 0.005 285 / 50%)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(ellipse at 20% 50%, rgba(108, 92, 231, 0.04) 0%, transparent 60%)',
                      }}
                    />

                    <div className="relative flex gap-5">
                      <div className="shrink-0 p-2.5 rounded-lg bg-primary/8 border border-primary/10 h-fit group-hover:bg-primary/12 transition-all duration-500">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-glow transition-all duration-500">
                          {p.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}

            {/* Code snippet accent */}
            <Reveal delay={0.5}>
              <div className="p-4 rounded-xl bg-void-light/30 border border-border/20 font-mono text-xs text-muted-foreground/60 leading-relaxed">
                <span className="text-primary/50">$</span> git clone https://github.com/OHACO-LABS/collab-memory
                <br />
                <span className="text-primary/50">$</span> cd collab-memory && npm start
                <br />
                <span className="text-emerald-400/50">✓</span> <span className="text-muted-foreground/40">semantic memory running on localhost:3000</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
