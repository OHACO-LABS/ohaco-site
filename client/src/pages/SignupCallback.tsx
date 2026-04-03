/**
 * SignupCallback — Handles OAuth redirect from GitHub/Google
 * Reads token from URL hash fragment, stores in localStorage, shows success
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { usePageTitle } from '@/hooks/usePageTitle';
import { saveAuth } from '@/lib/auth';
import Navbar from '@/components/Navbar';

const API_BASE = 'https://collab-memory.onrender.com';

export default function SignupCallback() {
  usePageTitle('Welcome');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('token');
    const provider = params.get('provider');
    const socialStatus = params.get('social');

    if (socialStatus === 'success' && token) {
      // Fetch user profile with the token
      fetch(`${API_BASE}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Failed to fetch profile');
        })
        .then(profile => {
          saveAuth(token, {
            email: profile.email || '',
            user_id: profile.user_id || '',
            tenant_id: profile.tenant_id || '',
            plan: profile.plan || 'free',
          });
          setEmail(profile.email || '');
          setStatus('success');
          // Clean hash from URL
          window.history.replaceState(null, '', '/signup/callback');
        })
        .catch(() => {
          // Even if profile fetch fails, save what we have
          saveAuth(token, {
            email: '',
            user_id: '',
            tenant_id: '',
            plan: 'free',
          });
          setStatus('success');
          window.history.replaceState(null, '', '/signup/callback');
        });
    } else if (hash.includes('error')) {
      setError(params.get('error') || 'Authentication failed');
      setStatus('error');
    } else {
      setError('No authentication data received.');
      setStatus('error');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
        <div className="w-full max-w-md text-center">
          {status === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground text-sm">Setting up your workspace...</p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-7 h-7 text-emerald-400" />
              </motion.div>

              <h1 className="text-3xl font-bold tracking-tight mb-3">Welcome to OHACO.</h1>
              {email && (
                <p className="text-muted-foreground text-sm mb-2">Signed in as <span className="text-foreground font-medium">{email}</span></p>
              )}
              <p className="text-muted-foreground text-sm mb-8">
                Your workspace is ready. Access your API keys and dashboard below.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={`${API_BASE}/dashboard`}
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
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm text-muted-foreground/60 hover:text-muted-foreground transition-all duration-300"
                >
                  Back to home
                </Link>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl font-bold tracking-tight mb-3">Something went wrong</h1>
              <p className="text-muted-foreground text-sm mb-6">{error}</p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-primary text-white transition-all duration-300"
              >
                Try again
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
