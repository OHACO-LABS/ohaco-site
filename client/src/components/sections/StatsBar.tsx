/**
 * StatsBar — Animated counter strip between sections
 * Design: Architectural lines, monospace numbers, subtle glow
 * Reinforces the thesis with meaningful signals, not vanity metrics
 */
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatProps {
  value: string;
  label: string;
  delay: number;
}

function AnimatedStat({ value, label, delay }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayed, setDisplayed] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setDisplayed(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <div ref={ref} className="text-center group">
      <div
        className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight transition-all duration-700 ${displayed ? 'opacity-100 translate-y-0 text-glow' : 'opacity-0 translate-y-2'
          }`}
        style={{ color: 'oklch(0.546 0.245 275.75)' }}
      >
        {displayed ? value : '—'}
      </div>
      <div
        className={`text-xs text-muted-foreground/60 font-mono tracking-wider uppercase mt-2 transition-all duration-700 delay-200 ${displayed ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const stats = [
    { value: '5', label: 'Axioms' },
    { value: '100%', label: 'OpenCore' },
    { value: '0', label: 'Data Sold' },
    { value: 'Opt-In', label: 'By Default' },
  ];

  return (
    <div className="relative py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-card rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={0.1 + i * 0.15}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
