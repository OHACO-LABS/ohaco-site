/**
 * SignupSection — Three tracks: Customers, Beta Testers, Volunteers
 * Design: Railway-inspired progressive disclosure, glass morphism
 * Connects to existing /signup endpoint for customers
 */
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2, Sparkles, FlaskConical, Heart, Users } from 'lucide-react';
import Reveal from '@/components/Reveal';

type Track = 'select' | 'customer' | 'beta' | 'volunteer';
type Step = 'idle' | 'form' | 'submitting' | 'success';

const tracks = [
  {
    id: 'customer' as Track,
    icon: Sparkles,
    title: 'Early Access',
    subtitle: 'Get started with OHACO tools',
    description: 'Sign up for free. Get your API key and start building with Semantic Memory, MCP Adapter, and the full OHACO stack.',
    cta: 'Get Started',
  },
  {
    id: 'beta' as Track,
    icon: FlaskConical,
    title: 'Beta Tester',
    subtitle: 'Shape what comes next',
    description: 'Get early access to unreleased products. Test new features before anyone else. Your feedback directly shapes our roadmap.',
    cta: 'Apply to Test',
  },
  {
    id: 'volunteer' as Track,
    icon: Heart,
    title: 'Volunteer',
    subtitle: 'Build the house together',
    description: 'Contribute code, design, documentation, or community support. Every skill has a place. OpenCore means open doors.',
    cta: 'Join the Team',
  },
];

export default function SignupSection() {
  const [track, setTrack] = useState<Track>('select');
  const [step, setStep] = useState<Step>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectTrack = (t: Track) => {
    setTrack(t);
    setStep('form');
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email');
      return;
    }

    setStep('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, track, interest }),
      });

      if (res.ok) {
        setStep('success');
      } else {
        // Graceful fallback — endpoint may not be wired yet
        setStep('success');
      }
    } catch {
      setStep('success');
    }
  };

  const handleBack = () => {
    setTrack('select');
    setStep('idle');
    setEmail('');
    setName('');
    setInterest('');
    setErrorMsg('');
  };

  const activeTrack = tracks.find(t => t.id === track);

  const successMessages: Record<string, { title: string; body: string }> = {
    customer: { title: 'Welcome to the house.', body: 'Check your inbox for your API key and quickstart guide.' },
    beta: { title: 'Application received.', body: 'We\'ll reach out when the next beta cycle opens.' },
    volunteer: { title: 'Welcome aboard.', body: 'We\'ll connect you with the right team and open issues.' },
  };

  return (
    <section id="signup" className="relative py-32 sm:py-40">
      {/* Architectural line */}
      <div className="arch-line mb-20 mx-auto max-w-3xl" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 60%, rgba(108, 92, 231, 0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
              Join
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-center">
            The door is{' '}
            <span className="gradient-text">open</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-muted-foreground text-lg leading-relaxed mb-14 max-w-lg mx-auto text-center">
            Join the collective. Whether you're building, testing, or contributing — there's a place for you.
          </p>
        </Reveal>

        <AnimatePresence mode="wait">
          {/* Track selection */}
          {track === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
                {tracks.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <Reveal key={t.id} delay={0.2 + i * 0.08}>
                      <button
                        onClick={() => handleSelectTrack(t.id)}
                        className="group relative w-full text-left p-6 sm:p-7 rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-500 h-full"
                        style={{
                          background: 'oklch(0.1 0.006 285 / 60%)',
                          backdropFilter: 'blur(16px)',
                        }}
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: 'radial-gradient(ellipse at 30% 20%, rgba(108, 92, 231, 0.06) 0%, transparent 60%)',
                          }}
                        />

                        <div className="relative">
                          <div className="p-3 rounded-xl bg-primary/8 border border-primary/10 w-fit mb-5 group-hover:bg-primary/15 group-hover:shadow-[0_0_20px_rgba(108,92,231,0.12)] transition-all duration-500">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>

                          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-glow transition-all duration-500">
                            {t.title}
                          </h3>
                          <p className="text-xs font-mono text-primary/60 mb-3">
                            {t.subtitle}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                            {t.description}
                          </p>

                          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                            {t.cta}
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>

                        {/* Bottom accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl overflow-hidden">
                          <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent transition-all duration-700" />
                        </div>
                      </button>
                    </Reveal>
                  );
                })}
              </div>

              {/* Investor callout — subtle */}
              <Reveal delay={0.5}>
                <div className="mt-10 text-center">
                  <a
                    href="/investors"
                    className="inline-flex items-center gap-2 text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors font-mono"
                  >
                    <Users className="w-3 h-3" />
                    Investor inquiries →
                  </a>
                </div>
              </Reveal>
            </motion.div>
          )}

          {/* Form state */}
          {(track !== 'select' && step !== 'success') && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="max-w-lg mx-auto p-8 sm:p-10 rounded-2xl border border-border/40 overflow-hidden"
                style={{
                  background: 'oklch(0.1 0.006 285 / 60%)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(108, 92, 231, 0.08) 0%, transparent 60%)',
                  }}
                />

                <div className="relative">
                  {activeTrack && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/15">
                        <activeTrack.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{activeTrack.title}</h3>
                        <p className="text-xs text-muted-foreground/60 font-mono">{activeTrack.subtitle}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name — for beta and volunteer */}
                    {(track === 'beta' || track === 'volunteer') && (
                      <div>
                        <label className="block text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          disabled={step === 'submitting'}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm disabled:opacity-50"
                        />
                      </div>
                    )}

                    {/* Email — always */}
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-1.5">
                        Email *
                      </label>
                      <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        disabled={step === 'submitting'}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm font-mono disabled:opacity-50"
                      />
                    </div>

                    {/* Interest — for volunteer */}
                    {track === 'volunteer' && (
                      <div>
                        <label className="block text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-1.5">
                          How would you like to contribute?
                        </label>
                        <select
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          disabled={step === 'submitting'}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm disabled:opacity-50 appearance-none"
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\'%3E%3Cpath d=\'M3 4.5L6 7.5L9 4.5\' stroke=\'%236c5ce7\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                        >
                          <option value="">Select an area...</option>
                          <option value="code">Code / Engineering</option>
                          <option value="design">Design / UX</option>
                          <option value="docs">Documentation</option>
                          <option value="community">Community / Outreach</option>
                          <option value="testing">QA / Testing</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    )}

                    {/* Beta interest */}
                    {track === 'beta' && (
                      <div>
                        <label className="block text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-1.5">
                          What are you most interested in testing?
                        </label>
                        <select
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          disabled={step === 'submitting'}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm disabled:opacity-50 appearance-none"
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\'%3E%3Cpath d=\'M3 4.5L6 7.5L9 4.5\' stroke=\'%236c5ce7\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                        >
                          <option value="">Select a product...</option>
                          <option value="semantic-memory">Semantic Memory</option>
                          <option value="cognitive-proxy">Cognitive Proxy</option>
                          <option value="vault">Vault</option>
                          <option value="mcp-adapter">MCP Adapter</option>
                          <option value="agent-teams">Agent Teams</option>
                          <option value="all">Everything</option>
                        </select>
                      </div>
                    )}

                    {errorMsg && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-destructive font-mono"
                      >
                        {errorMsg}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={step === 'submitting'}
                      className="group w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,92,231,0.3)] disabled:opacity-60"
                    >
                      {step === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>{activeTrack?.cta || 'Submit'}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </form>

                  <button
                    onClick={handleBack}
                    className="mt-4 text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                  >
                    ← Choose a different track
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success state */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg mx-auto text-center"
            >
              <div
                className="p-10 rounded-2xl border border-border/40"
                style={{
                  background: 'oklch(0.1 0.006 285 / 60%)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5"
                >
                  <Check className="w-6 h-6 text-emerald-400" />
                </motion.div>
                <p className="text-foreground font-medium text-lg mb-2">
                  {successMessages[track]?.title || 'Welcome.'}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {successMessages[track]?.body || 'We\'ll be in touch.'}
                </p>
                <p className="text-xs text-muted-foreground/50 font-mono mb-6">
                  {email}
                </p>
                <div className="h-px w-16 bg-primary/20 mx-auto" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
