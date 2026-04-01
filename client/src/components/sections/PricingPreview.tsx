/**
 * PricingPreview — Landing page pricing teaser
 * Free / Pro / Enterprise tiers
 * Per CC brief: Free tier prominently displayed, self-host callout
 */
import { Check } from 'lucide-react';
import { Link } from 'wouter';
import Reveal from '@/components/Reveal';

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
    ],
    cta: 'Start Free',
    href: '/signup',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For teams and professionals who need more power.',
    features: [
      'Higher quotas',
      'Bring your own LLM key',
      'Multiple projects',
      'Priority support',
      'Advanced analytics',
    ],
    cta: 'Start Pro Trial',
    href: '/signup',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: '$149',
    period: '/month',
    description: 'Dedicated infrastructure with compliance guarantees.',
    features: [
      'Dedicated instance',
      'Region selection (EU/US/Asia)',
      'SOC 2 infrastructure',
      'SLA guarantee',
      'Custom integrations',
    ],
    cta: 'Contact Us',
    href: '/signup',
    highlighted: false,
    badge: null,
  },
];

export default function PricingPreview() {
  return (
    <section id="pricing" className="relative py-32 sm:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
              Pricing
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 max-w-2xl">
            Start free.{' '}
            <span className="gradient-text">Scale when ready.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted-foreground text-lg max-w-xl mb-16 leading-relaxed">
            Every tier includes full API access and Semantic Memory. Upgrade when your collective grows.
          </p>
        </Reveal>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={0.1 + i * 0.1}>
              <div
                className={`relative group rounded-2xl p-8 h-full flex flex-col transition-all duration-500 ${
                  tier.highlighted
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
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-4 py-1 rounded-full bg-primary text-white">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(108, 92, 231, 0.05) 0%, transparent 60%)',
                  }}
                />

                <div className="relative flex-1 flex flex-col">
                  {/* Tier name */}
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-foreground tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground font-mono">
                      {tier.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={tier.href}
                    className={`block text-center py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${
                      tier.highlighted
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
        <Reveal delay={0.5}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
              </svg>
              <span className="text-sm text-muted-foreground">
                Prefer to self-host?{' '}
                <a
                  href="https://github.com/OHACO-LABS/collab-memory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Deploy with Docker Compose
                </a>
                {' '}— always free, always yours.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
