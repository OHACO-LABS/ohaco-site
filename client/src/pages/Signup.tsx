/**
 * Signup — Real registration against collab-memory API
 * Calls /auth/signup, returns real API keys
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, Copy, CheckCheck, Check } from 'lucide-react';
import { Link } from 'wouter';
import { usePageTitle } from '@/hooks/usePageTitle';
import Navbar from '@/components/Navbar';

const API_BASE = 'https://collab-memory.onrender.com';

interface TenantKeys {
  api_key_write: string;
  api_key_read: string;
  tenant_id: string;
}

export default function Signup() {
  usePageTitle('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keys, setKeys] = useState<TenantKeys | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || email.split('@')[0],
          email,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setKeys({
          api_key_write: data.api_key_write || data.write_key || '',
          api_key_read: data.api_key_read || data.read_key || '',
          tenant_id: data.tenant_id || data.id || '',
        });
      } else {
        const err = await res.json().catch(() => null);
        const raw = err?.detail || err?.error || `Registration failed (${res.status})`;
        const lower = raw.toLowerCase();
        if (lower.includes('registration is disabled') || lower.includes('use post')) {
          setError('Registration is temporarily closed. Please try again later.');
        } else if (lower.includes('already exists') || lower.includes('duplicate')) {
          setError('An account with this email already exists.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      }
    } catch {
      setError('Network error — the API may be waking up. Try again in a moment.');
    } finally {
      setLoading(false);
    }
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
            {!keys ? (
              <>
                {/* Header */}
                <div className="mb-8">
                  <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
                    Get Started
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 mt-3">
                    Create your workspace
                  </h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Sign up for free. Get your API keys instantly — no credit card required.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3.5 rounded-xl border border-border/40 bg-card/30 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@studio.com"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-border/40 bg-card/30 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-2">
                      Password *
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                      className="w-full px-4 py-3.5 rounded-xl border border-border/40 bg-card/30 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm"
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive font-mono"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-sm font-medium bg-primary text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,92,231,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating workspace...
                      </>
                    ) : (
                      <>
                        Create workspace
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Alt actions */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-border/20" />
                  <span className="text-xs text-muted-foreground/40 font-mono">or</span>
                  <div className="flex-1 h-px bg-border/20" />
                </div>

                <div className="space-y-3">
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
              </>
            ) : (
              /* Success — show real API keys */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
                  >
                    <Check className="w-6 h-6 text-emerald-400" />
                  </motion.div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2">Welcome to the house.</h2>
                <p className="text-sm text-muted-foreground text-center mb-8">
                  Save your API keys — they won't be shown again.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="rounded-xl border border-border/40 bg-card/30 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">Write Key</span>
                      <button
                        onClick={() => copyToClipboard(keys.api_key_write, 'write')}
                        className="text-muted-foreground/50 hover:text-primary transition-colors"
                        aria-label="Copy write key"
                      >
                        {copiedKey === 'write' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <code className="text-xs font-mono text-foreground/80 break-all">{keys.api_key_write}</code>
                  </div>

                  {keys.api_key_read && (
                    <div className="rounded-xl border border-border/40 bg-card/30 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">Read Key</span>
                        <button
                          onClick={() => copyToClipboard(keys.api_key_read, 'read')}
                          className="text-muted-foreground/50 hover:text-primary transition-colors"
                          aria-label="Copy read key"
                        >
                          {copiedKey === 'read' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <code className="text-xs font-mono text-foreground/80 break-all">{keys.api_key_read}</code>
                    </div>
                  )}

                  {keys.tenant_id && (
                    <div className="rounded-xl border border-border/40 bg-card/30 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">Tenant ID</span>
                        <button
                          onClick={() => copyToClipboard(keys.tenant_id, 'tenant')}
                          className="text-muted-foreground/50 hover:text-primary transition-colors"
                          aria-label="Copy tenant ID"
                        >
                          {copiedKey === 'tenant' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <code className="text-xs font-mono text-foreground/80 break-all">{keys.tenant_id}</code>
                    </div>
                  )}
                </div>

                {/* Quick start actions */}
                <div className="flex flex-col gap-3">
                  <a
                    href={`${API_BASE}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-primary text-white hover:shadow-[0_0_30px_rgba(108,92,231,0.3)] transition-all duration-300"
                  >
                    Open Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`${API_BASE}/docs`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all duration-300"
                  >
                    API Documentation
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
