/**
 * Signup — Links to the existing API signup flow
 * Per CC brief: existing signup has a 4-step wizard
 * Design: Railway-inspired, magical, inviting
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { toast } from 'sonner';
import { usePageTitle } from '@/hooks/usePageTitle';
import Navbar from '@/components/Navbar';

export default function Signup() {
  usePageTitle('Sign Up');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    // Redirect to the existing signup flow with email pre-filled
    const apiUrl = 'https://collab-memory.onrender.com';
    window.location.href = `${apiUrl}/signup?email=${encodeURIComponent(email)}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
        <div className="w-full max-w-md">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
                  Join the Collective
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Create your workspace
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Start free. Get your API key in under a minute. No credit card required.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-border/40 bg-card/30 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm"
                  autoFocus
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-sm font-medium bg-primary text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,92,231,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Continue to workspace setup
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-border/20" />
              <span className="text-xs text-muted-foreground/40 font-mono">or</span>
              <div className="flex-1 h-px bg-border/20" />
            </div>

            {/* Alternative actions */}
            <div className="space-y-3">
              <a
                href="https://collab-memory.onrender.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
              >
                Go to existing signup wizard
              </a>
              <a
                href="https://github.com/OHACO-LABS/collab-memory"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
              >
                Self-host instead (free forever)
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-10 pt-8 border-t border-border/10">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-mono text-muted-foreground/30 tracking-wider uppercase">
                <span>OpenCore</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                <span>Zero-knowledge encryption</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                <span>No credit card</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
