/**
 * Signup page — Redirects to collab-memory product signup
 * Marketing site doesn't handle auth. The product does.
 */
import { useEffect } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';

const PRODUCT_URL = 'https://collab-memory.onrender.com';

export default function Signup() {
  usePageTitle('Sign Up — OHACO');

  useEffect(() => {
    // Redirect to the product's signup page
    window.location.href = `${PRODUCT_URL}/signup`;
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground text-sm font-mono animate-pulse">
        Redirecting to signup...
      </p>
    </div>
  );
}
