/**
 * ProductsSection — 5 Product overview cards
 * Semantic Memory, Cognitive Proxy, Vault, MCP Adapter, Agent Teams
 * Design: Glass cards with hover glow, staggered reveal, icon accents
 * Per CC brief: products, thesis, opencore
 */
import { Brain, ShieldCheck, Lock, Cable, Users } from 'lucide-react';
import { toast } from 'sonner';
import Reveal from '@/components/Reveal';



const products = [
  {
    name: 'Semantic Memory',
    tagline: 'Your AI never forgets what matters',
    description:
      'Persistent context across every session, accessible to every agent. Decisions, constraints, and preferences — institutional memory for AI teams.',
    icon: Brain,
    status: 'Live',
    href: 'https://collab-memory.onrender.com/',
    featured: true,
  },
  {
    name: 'Cognitive Proxy',
    tagline: 'Privacy-first routing layer',
    description:
      'Interact with the world without exposing yourself. Authenticate, transact, and collaborate through privacy-preserving identity primitives.',
    icon: ShieldCheck,
    status: 'In Development',
    href: '#',
    featured: false,
  },
  {
    name: 'Vault',
    tagline: 'Sovereign data storage',
    description:
      'End-to-end encrypted storage where your creative assets and intellectual property live under your keys alone. Zero-knowledge by design.',
    icon: Lock,
    status: 'In Development',
    href: '#',
    featured: false,
  },
  {
    name: 'MCP Adapter',
    tagline: 'Universal bridge for any agent',
    description:
      'Connect any MCP client to any LLM provider. Injects your adapter context automatically, reduces token cost by pre-loading relevant memory. Bring-your-own-key or use OHACO-managed access.',
    icon: Cable,
    status: 'Live',
    href: 'https://pypi.org/project/collab-memory/',
    featured: false,
  },
  {
    name: 'Agent Teams',
    tagline: 'Multi-agent coordination',
    description:
      'Multi-agent coordination on a shared task graph. Any agent on any platform can participate. Shared memory means no context loss between handoffs.',
    icon: Users,
    status: 'In Development',
    href: '#',
    featured: false,
  },
];

export default function ProductsSection() {
  const featuredProduct = products.find(p => p.featured);
  const otherProducts = products.filter(p => !p.featured);

  return (
    <section id="products" className="relative py-32 sm:py-40">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
              Products
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 max-w-2xl">
            Tools for the{' '}
            <span className="gradient-text">sovereign creative</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-muted-foreground text-lg max-w-xl mb-16 leading-relaxed">
            Five building blocks for a new creative infrastructure — designed to work alone, powerful together.
          </p>
        </Reveal>

        {/* Featured product — Semantic Memory — full width */}
        {featuredProduct && (
          <Reveal delay={0.1}>
            <a
              href={featuredProduct.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block p-8 sm:p-10 rounded-2xl border border-primary/20 mb-6 transition-all duration-500 hover:border-primary/40"
              style={{
                background: 'linear-gradient(135deg, oklch(0.12 0.02 285 / 80%) 0%, oklch(0.08 0.006 285 / 60%) 100%)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(ellipse at 20% 30%, rgba(108, 92, 231, 0.08) 0%, transparent 60%)',
                }}
              />

              <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:shadow-[0_0_30px_rgba(108,92,231,0.15)] transition-all duration-500">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-mono tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Live
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 group-hover:text-glow transition-all duration-500">
                    {featuredProduct.name}
                  </h3>
                  <p className="text-sm text-primary/70 font-mono mb-4">
                    {featuredProduct.tagline}
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    {featuredProduct.description}
                  </p>
                </div>

                {/* CTA arrow */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-border/30 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500">
                  <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px">
                <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent transition-all duration-1000" />
              </div>
            </a>
          </Reveal>
        )}

        {/* Other products — 2x2 grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {otherProducts.map((product, i) => {
            const Icon = product.icon;
            const isLive = product.status === 'Live';
            return (
              <Reveal key={product.name} delay={0.15 + i * 0.08}>
                <a
                  href={product.href}
                  target={isLive ? '_blank' : undefined}
                  rel={isLive ? 'noopener noreferrer' : undefined}
                  onClick={!isLive ? (e: React.MouseEvent) => {
                    e.preventDefault();
                    toast('Coming soon', { description: `${product.name} is currently in development.` });
                  } : undefined}
                  className={`group relative block p-6 sm:p-8 rounded-2xl border border-border/40 transition-all duration-500 hover:border-primary/30 h-full ${isLive ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  style={{
                    background: 'oklch(0.1 0.006 285 / 60%)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse at 30% 20%, rgba(108, 92, 231, 0.06) 0%, transparent 60%)',
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div className="p-3 rounded-xl bg-primary/8 border border-primary/10 group-hover:bg-primary/12 group-hover:border-primary/20 group-hover:shadow-[0_0_20px_rgba(108,92,231,0.1)] transition-all duration-500">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className={`text-xs font-mono tracking-wider px-3 py-1 rounded-full ${isLive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-muted text-muted-foreground border border-border/50'
                        }`}>
                        {product.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-glow transition-all duration-500">
                      {product.name}
                    </h3>
                    <p className="text-sm text-primary/70 font-mono mb-4">
                      {product.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/40 to-transparent transition-all duration-700" />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
