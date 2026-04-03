/**
 * SignupSection — CTA that links to the collab-memory product for signup
 * Marketing site stays a marketing site. Auth lives on the product.
 */
import { ArrowRight, Github } from 'lucide-react';
import Reveal from '@/components/Reveal';

const PRODUCT_URL = 'https://collab-memory.onrender.com';

export default function SignupSection() {
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

      <div className="relative max-w-md mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
              Get Started
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
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg mx-auto text-center">
            Create your workspace. Get API keys instantly — no credit card required.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="p-8 sm:p-10 rounded-2xl border border-border/40 relative overflow-hidden"
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

            <div className="relative flex flex-col gap-4">
              {/* GitHub OAuth — primary CTA */}
              <a
                href={`${PRODUCT_URL}/signup`}
                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-[#24292f] hover:bg-[#2f363d] text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
              >
                <Github className="w-5 h-5" />
                <span>Continue with GitHub</span>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border/20" />
                <span className="text-xs text-muted-foreground/40 font-mono">or</span>
                <div className="flex-1 h-px bg-border/20" />
              </div>

              {/* Email signup — links to product */}
              <a
                href={`${PRODUCT_URL}/signup`}
                className="group w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,92,231,0.3)]"
              >
                <span>Sign up with email</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              {/* Trust signals */}
              <div className="mt-4 pt-5 border-t border-border/10">
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[10px] font-mono text-muted-foreground/30 tracking-wider uppercase">
                  <span>OpenCore</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                  <span>No credit card</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                  <span>Self-host free forever</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
