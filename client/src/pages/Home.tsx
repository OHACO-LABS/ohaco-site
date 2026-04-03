/**
 * Home — OHACO Landing Page
 * 
 * Design Philosophy: Atmospheric Dark Gallery
 * - Deep charcoal-black canvas with purple (#6c5ce7) as singular luminous accent
 * - Touch-sensitive fractal physics engine as living background
 * - Cinematic full-width sections with generous breathing room
 * - Slow, graceful scroll-triggered reveals
 * - Glass morphism cards, architectural lines, monospace accents
 */
import { lazy, Suspense, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ThesisSection from '@/components/sections/ThesisSection';
import StatsBar from '@/components/sections/StatsBar';
import ProductsSection from '@/components/sections/ProductsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';

import BuiltBySection from '@/components/sections/BuiltBySection';
import OpenSourceSection from '@/components/sections/OpenSourceSection';
import SignupSection from '@/components/sections/SignupSection';
import Footer from '@/components/sections/Footer';
import CustomCursor from '@/components/CustomCursor';
import { usePageTitle } from '@/hooks/usePageTitle';

const FractalCanvas = lazy(() => import('@/components/FractalCanvas'));

export default function Home() {
  usePageTitle();

  // Handle hash fragment scrolling (from cross-page anchor links like /about → /#thesis)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Slight delay to let sections render
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Living fractal background */}
      <Suspense fallback={null}>
        <FractalCanvas />
      </Suspense>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Content layer */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ThesisSection />
        <StatsBar />
        <ProductsSection />
        <HowItWorksSection />

        <BuiltBySection />
        <OpenSourceSection />
        <SignupSection />
        <Footer />
      </div>
    </div>
  );
}
