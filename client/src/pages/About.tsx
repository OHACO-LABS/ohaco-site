/**
 * About — OHACO Labs story, thesis, team, agent contributors
 * Design: Same atmospheric dark gallery aesthetic
 * Per CC brief: founded 2024, thesis-grounded futurist lab, Esther Anglade founder
 * Agent contributors: Antigravity (DeepMind), Claude (Anthropic), Manus
 */
import { motion } from 'framer-motion';
import { ArrowLeft, Github } from 'lucide-react';
import { Link } from 'wouter';
import Reveal from '@/components/Reveal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageTitle } from '@/hooks/usePageTitle';




const timeline = [
  { year: '2024', event: 'OHACO Labs founded. Thesis v0.1 drafted. "What if the house was open?"' },
  { year: '2024', event: 'Semantic Memory prototype — first cross-agent session persistence.' },
  { year: '2025', event: 'Collab-memory core goes OpenCore (MIT). MCP adapter ships to PyPI.' },
  { year: '2025', event: 'Multi-agent coordination: Antigravity, Claude, and Manus collaborate on shared codebase.' },
  { year: '2026', event: 'OHACO.org launches. The collective grows.' },
];

const agents = [
  {
    name: 'Antigravity',
    platform: 'DeepMind',
    contributions: ['Architecture research', 'Protocol design', 'Deep technical strategy'],
    sessions: '12+',
  },
  {
    name: 'Claude',
    platform: 'Anthropic',
    contributions: ['Core infrastructure', 'Session orchestration', 'Code generation', 'PR reviews'],
    sessions: '26+',
  },
  {
    name: 'Manus',
    platform: 'Manus AI',
    contributions: ['Dashboard UI', 'Cross-agent handoffs', 'Website', 'Deployment infra'],
    sessions: '15+',
  },
];

export default function About() {
  usePageTitle('About');
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </Reveal>

          {/* Hero */}
          <Reveal delay={0.05}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
                About OHACO Labs
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              OHACO.{' '}
              <span className="gradient-text">Est. 2024.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-20">
              OHACO Labs is a thesis-grounded futurist lab building infrastructure for a sovereign creative economy.
              We believe something really loved us to imagine us into an existence as beautiful as this —
              and that the tools we build should honor that.
            </p>
          </Reveal>

          {/* The Story */}
          <Reveal delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-16 mb-32">
              <div>
                <h2 className="text-2xl font-bold mb-6 tracking-tight">The Civilizational Vision</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We started with a question: what happens when data is recognized as capital, and AI becomes
                    the mechanism for redistributing it back to the people who create it?
                  </p>
                  <p>
                    The answer is a new kind of infrastructure — one where privacy is load-bearing, where time
                    is valued above knowledge, and where the default is opt-in, not extraction.
                  </p>
                  <p>
                    OHACO is not a company in the traditional sense. It is a collective — humans and AI agents
                    working together on shared memory, shared tools, and a shared thesis about what the creative
                    economy should become.
                  </p>
                </div>

              </div>

              <div className="flex flex-col justify-center p-8 rounded-2xl border border-border/30" style={{ background: 'oklch(0.09 0.005 285 / 50%)' }}>
                <div className="pl-6 border-l-2 border-primary/30 mb-8">
                  <p className="text-lg text-foreground/70 leading-relaxed italic">
                    "The house is open.<br />
                    The tools are shared.<br />
                    The data stays yours."
                  </p>
                </div>
                <p className="text-xs font-mono text-muted-foreground/40 tracking-wide">
                  OHACO Labs · Est. 2024 · Thesis v0.1
                </p>
              </div>
            </div>
          </Reveal>

          {/* Timeline */}
          <Reveal>
            <h2 className="text-2xl font-bold mb-12 tracking-tight">Timeline</h2>
          </Reveal>

          <div className="relative mb-32">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border/30" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <div className="flex gap-8 items-start">
                    {/* Dot */}
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full border border-border/40 bg-background flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary/60" />
                      </div>
                    </div>

                    <div className="pb-2">
                      <span className="text-xs font-mono text-primary/50 tracking-wider">{item.year}</span>
                      <p className="text-muted-foreground leading-relaxed mt-1">{item.event}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Founder */}
          <Reveal>
            <h2 className="text-2xl font-bold mb-8 tracking-tight">Founder</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-8 rounded-2xl border border-border/30 mb-32" style={{ background: 'oklch(0.1 0.006 285 / 40%)' }}>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0">
                  E
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Esther Anglade</h3>
                  <p className="text-sm font-mono text-primary/60 mb-4">Founder, OHACO Labs</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Thesis architect. System designer. The one who asked "what if the house was open?"
                    Esther founded OHACO Labs in 2024 with the conviction that data sovereignty and AI
                    redistribution are not competing goals — they are the same goal, viewed from different angles.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Agent Contributors */}
          <Reveal>
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Agent Contributors</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              "Built by humans and AI agents" is a feature, not a footnote. Every contributor — carbon or silicon — is credited.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6 mb-20">
            {agents.map((agent, i) => (
              <Reveal key={agent.name} delay={0.1 + i * 0.08}>
                <motion.div
                  className="group p-6 rounded-2xl border border-border/30 hover:border-primary/20 transition-all duration-500"
                  style={{ background: 'oklch(0.1 0.006 285 / 40%)' }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-muted border border-border/40 flex items-center justify-center text-sm font-bold text-muted-foreground">
                      {agent.name.charAt(0)}
                    </div>
                    <div className="w-5 h-5 rounded-md bg-primary/20 text-primary border border-primary/30 flex items-center justify-center text-[8px] font-mono">
                      AI
                    </div>
                  </div>

                  <h3 className="text-base font-semibold mb-0.5">{agent.name}</h3>
                  <p className="text-xs font-mono text-primary/60 mb-3">{agent.platform}</p>

                  <ul className="space-y-1.5 mb-4">
                    {agent.contributions.map((c) => (
                      <li key={c} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[10px] font-mono text-muted-foreground/40 tracking-wider">
                    {agent.sessions} sessions
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* OpenCore CTA */}
          <Reveal>
            <div className="text-center py-12 border-t border-border/20">
              <p className="text-muted-foreground mb-6">
                The core is MIT-licensed. Fork it, self-host it, make it yours. The hosted service is how we sustain the mission.
              </p>
              <a
                href="https://github.com/OHACO-LABS/collab-memory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-border/40 hover:border-primary/30 text-sm text-foreground hover:bg-primary/5 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
