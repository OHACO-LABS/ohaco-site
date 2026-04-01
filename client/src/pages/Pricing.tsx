/**
 * Pricing — Full pricing page with three tiers, FAQ, and self-host callout
 * Design: Atmospheric Dark Gallery, same aesthetic as landing page
 * Per CC brief: Free / Pro / Enterprise tiers, FAQ, self-host callout
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import Reveal from '@/components/Reveal';
import { usePageTitle } from '@/hooks/usePageTitle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for students, individuals, and exploration.',
    features: [
      'Shared instance',
      '1 project',
      'OHACO-managed LLM',
      'Community support',
      'Full API access',
      'MCP adapter included',
      '1,000 memory operations/month',
    ],
    cta: 'Start Free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For teams and professionals who need more power.',
    features: [
      'Everything in Free, plus:',
      'Higher quotas (50K ops/month)',
      'Bring your own LLM key',
      'Up to 10 projects',
      'Priority support',
      'Advanced analytics',
      'Agent Teams (up to 5 agents)',
      'Custom memory schemas',
    ],
    cta: 'Start Pro Trial',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$149',
    period: '/month',
    description: 'Dedicated infrastructure with compliance guarantees.',
    features: [
      'Everything in Pro, plus:',
      'Dedicated instance',
      'Region selection (EU/US/Asia)',
      'SOC 2 infrastructure',
      'SLA guarantee (99.9%)',
      'Custom integrations',
      'Unlimited agents',
      'SSO / SAML support',
      'Dedicated support engineer',
    ],
    cta: 'Contact Us',
    href: '/signup',
    highlighted: false,
  },
];

const faqs = [
  {
    q: 'Can I self-host for free?',
    a: 'Yes. The collab-memory core is MIT-licensed — that\'s the OpenCore model. Clone the repo, run Docker Compose, and you have your own instance. The managed service adds convenience, scale, and support — but the core is always free.',
  },
  {
    q: 'What does "Bring Your Own Key" mean?',
    a: 'On the Pro and Enterprise tiers, you can connect your own LLM API key (OpenAI, Anthropic, etc.) instead of using OHACO-managed access. This gives you full control over costs, model selection, and data routing.',
  },
  {
    q: 'How does the MCP Adapter work?',
    a: 'The MCP Adapter is a universal bridge that connects any MCP-compatible client (Claude Desktop, Cursor, Windsurf, Cline) to your Semantic Memory instance. Install via pip, configure your client, and your AI agent has persistent memory.',
  },
  {
    q: 'Is my data encrypted?',
    a: 'Yes. All data in transit uses TLS. Vault provides end-to-end encryption at rest with zero-knowledge architecture — we cannot read your data even if we wanted to. Your keys, your data.',
  },
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. Upgrade or downgrade at any time. When downgrading, your data is preserved but access to premium features is paused until you re-upgrade.',
  },
  {
    q: 'What happens to my data if I leave?',
    a: 'Your data is yours. Export everything via the API at any time. If you delete your account, all data is permanently purged within 30 days. No data hostage situations.',
  },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/20 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors pr-4">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground leading-relaxed pb-5">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Pricing() {
  usePageTitle('Pricing');
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </Reveal>

          {/* Header */}
          <Reveal delay={0.05}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
                Pricing
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Start free.{' '}
              <span className="gradient-text">Scale when ready.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-20">
              Every tier includes full API access and Semantic Memory. No credit card required to start.
              Self-host anytime — the core is always MIT-licensed.
            </p>
          </Reveal>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-32">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={0.1 + i * 0.1}>
                <div
                  className={`relative group rounded-2xl p-8 h-full flex flex-col transition-all duration-500 ${tier.highlighted
                      ? 'border-2 border-primary/40 hover:border-primary/60'
                      : 'border border-border/40 hover:border-primary/20'
                    }`}
                  style={{
                    background: tier.highlighted
                      ? 'linear-gradient(180deg, oklch(0.13 0.015 285 / 80%) 0%, oklch(0.09 0.006 285 / 60%) 100%)'
                      : 'oklch(0.1 0.006 285 / 60%)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-[10px] font-mono tracking-widest uppercase px-4 py-1 rounded-full bg-primary text-white">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%, rgba(108, 92, 231, 0.05) 0%, transparent 60%)',
                    }}
                  />

                  <div className="relative flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground mb-4">{tier.name}</h3>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-5xl font-bold text-foreground tracking-tight">{tier.price}</span>
                      <span className="text-sm text-muted-foreground font-mono">{tier.period}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">{tier.description}</p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={tier.href}
                      className={`block text-center py-3.5 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${tier.highlighted
                          ? 'bg-primary text-white hover:shadow-[0_0_24px_rgba(108,92,231,0.3)] hover:scale-[1.02]'
                          : 'border border-border/50 text-foreground hover:border-primary/30 hover:bg-primary/5'
                        }`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Self-host callout */}
          <Reveal>
            <div className="p-8 rounded-2xl border border-border/30 mb-32" style={{ background: 'oklch(0.1 0.006 285 / 40%)' }}>
              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Prefer to self-host?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The collab-memory core is MIT-licensed. Clone the repo, run <code className="text-xs font-mono text-primary/70 px-1.5 py-0.5 rounded bg-primary/5">docker compose up</code>,
                    and you have your own instance. Always free, always yours.
                  </p>
                </div>
                <a
                  href="https://github.com/OHACO-LABS/collab-memory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/40 hover:border-primary/30 text-sm text-foreground hover:bg-primary/5 transition-all duration-300 whitespace-nowrap"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </Reveal>

          {/* FAQ */}
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 tracking-tight">Frequently Asked Questions</h2>
              <div className="rounded-2xl border border-border/30 p-6 sm:p-8" style={{ background: 'oklch(0.1 0.006 285 / 40%)' }}>
                {faqs.map((faq, i) => (
                  <FAQItem key={i} faq={faq} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
