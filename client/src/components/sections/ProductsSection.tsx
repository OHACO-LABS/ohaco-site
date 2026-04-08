/**
 * ProductsSection — Horizontal-scroll product rail
 * Each product is a tall card that reveals detail on hover.
 * Horizontal overflow with snap scrolling. Header stays left-aligned.
 * Breaks the centered vertical monotony.
 */
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, ShieldCheck, Lock, Cable, Users, ChevronRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import Reveal from '@/components/Reveal';

const products = [
  {
    name: 'Semantic Memory',
    tagline: 'Your AI never forgets what matters',
    description:
      'Persistent context across every session, accessible to every agent. Decisions, constraints, and preferences — institutional memory for AI teams.',
    icon: Brain,
    status: 'Live' as const,
    href: 'https://collab-memory.onrender.com/',
    accent: 'from-purple-500/20 to-cyan-500/10',
  },
  {
    name: 'Cognitive Dreams',
    tagline: 'Memory that graduates and refines',
    description:
      'The permanent layer. Details become preferences become rules become hard rules. Your cognitive fingerprint, stored in your Vault.',
    icon: Sparkles,
    status: 'Building' as const,
    href: '#',
    accent: 'from-fuchsia-500/15 to-purple-500/10',
  },
  {
    name: 'Vault',
    tagline: 'Sovereign data storage',
    description:
      'End-to-end encrypted storage where your creative assets and intellectual property live under your keys alone. Zero-knowledge by design.',
    icon: Lock,
    status: 'Building' as const,
    href: '#',
    accent: 'from-amber-500/15 to-orange-500/10',
  },
  {
    name: 'Cognitive Proxy',
    tagline: 'Privacy-first routing layer',
    description:
      'Interact with the world without exposing yourself. Authenticate, transact, and collaborate through privacy-preserving identity primitives.',
    icon: ShieldCheck,
    status: 'Building' as const,
    href: '#',
    accent: 'from-emerald-500/15 to-teal-500/10',
  },
  {
    name: 'MCP Adapter',
    tagline: 'Universal bridge for any agent',
    description:
      'Connect any MCP client to any LLM provider. Injects your adapter context automatically, reduces token cost by pre-loading relevant memory. Bring-your-own-key or use OHACO-managed access.',
    icon: Cable,
    status: 'Live' as const,
    href: 'https://pypi.org/project/collab-memory/',
    accent: 'from-cyan-500/15 to-blue-500/10',
  },
  {
    name: 'Agent Teams',
    tagline: 'Multi-agent coordination',
    description:
      'Multi-agent coordination on a shared task graph. Any agent on any platform can participate. Shared memory means no context loss between handoffs.',
    icon: Users,
    status: 'Building' as const,
    href: '#',
    accent: 'from-sky-500/15 to-indigo-500/10',
  },
];

export default function ProductsSection() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    railRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section id="products" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between gap-8">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
                  Products
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-lg">
                Six building blocks for{' '}
                <span className="gradient-text">sovereign AI</span>
              </h2>
            </Reveal>
          </div>

          {/* Scroll hint — desktop only */}
          <Reveal delay={0.2}>
            <button
              onClick={scrollRight}
              className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground/50 hover:text-muted-foreground transition-colors group"
            >
              scroll
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>
        </div>
      </div>

      {/* ── Horizontal product rail ── */}
      <div
        ref={railRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 sm:px-6 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]"
        style={{ scrollbarWidth: 'none' }}
      >
        {products.map((product, i) => {
          const Icon = product.icon;
          const isLive = product.status === 'Live';
          return (
            <motion.a
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              href={isLive ? product.href : undefined}
              target={isLive ? '_blank' : undefined}
              rel={isLive ? 'noopener noreferrer' : undefined}
              onClick={!isLive ? (e: React.MouseEvent) => {
                e.preventDefault();
                toast('Coming soon', { description: `${product.name} is in development.` });
              } : undefined}
              className={`group relative flex-shrink-0 w-[280px] sm:w-[300px] snap-start rounded-2xl border border-border/30 p-6 sm:p-7 transition-all duration-500 hover:border-primary/30 ${
                isLive ? 'cursor-pointer' : 'cursor-default'
              }`}
              style={{
                background: 'color-mix(in srgb, var(--background) 80%, transparent)',
                backdropFilter: 'blur(16px)',
              }}
              whileHover={{ y: -4 }}
            >
              {/* Gradient accent — top edge */}
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${product.accent} opacity-60 rounded-t-2xl`} />

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(ellipse at 30% 20%, rgba(108, 92, 231, 0.06) 0%, transparent 60%)',
                }}
              />

              <div className="relative flex flex-col h-full min-h-[260px]">
                <div className="flex items-start justify-between mb-5">
                  <div className="p-3 rounded-xl bg-primary/8 border border-primary/12 group-hover:bg-primary/14 group-hover:border-primary/25 group-hover:shadow-[0_0_24px_rgba(108,92,231,0.1)] transition-all duration-500">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full ${
                    isLive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-muted/50 text-muted-foreground/60 border border-border/30'
                  }`}>
                    {product.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-glow transition-all duration-500">
                  {product.name}
                </h3>
                <p className="text-xs text-primary/60 font-mono mb-4">
                  {product.tagline}
                </p>

                <p className="text-sm text-muted-foreground/80 leading-relaxed flex-1">
                  {product.description}
                </p>

                {/* Bottom accent on hover */}
                <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/30 to-transparent transition-all duration-700" />
              </div>
            </motion.a>
          );
        })}

        {/* Spacer for right padding */}
        <div className="flex-shrink-0 w-4 lg:w-8" />
      </div>
    </section>
  );
}
