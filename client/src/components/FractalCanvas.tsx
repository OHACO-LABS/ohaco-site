/**
 * FractalCanvas — Space + Fusion Particle Engine
 *
 * Ported from collab-memory's dashboard space-canvas.
 * Features:
 *   1. Twinkling star field — ambient depth layer
 *   2. Particle connections — constellation lines between nearby particles
 *   3. Particle fusion — collision detection, merge with burst animation
 *   4. Mouse gravity — cursor attracts particles with gravitational pull
 *   5. Radial glow — each particle has a soft bloom core
 *
 * Design: deep purple/cyan palette, theme-aware, minimal and elegant.
 */
import { useEffect, useRef } from 'react';

// ── Constants ──
const IS_MOBILE = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

const PARTICLE_COUNT = IS_MOBILE ? 45 : 70;
const STAR_COUNT = IS_MOBILE ? 100 : 180;
const CONNECT_DIST = IS_MOBILE ? 100 : 130;
const FUSION_DIST = 14;
const FUSION_CHANCE = 0.003;
const MOUSE_RADIUS = 200;
const MOUSE_FORCE = 0.06;

// ── Types ──
interface Star {
  x: number; y: number;
  r: number;
  alpha: number;
  twinkle: number;
  speed: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number;
  color: string;
  mass: number;
}

interface FusionBurst {
  x: number; y: number;
  r: number;
  maxR: number;
  alpha: number;
  color: string;
  speed: number;
}

// ── Palette ──
const PALETTES = {
  dark: ['#7c3aed', '#06b6d4', '#a78bfa', '#22d3ee'],
  light: ['#6d28d9', '#0891b2', '#8b5cf6', '#0ea5e9'],
};

function getColors(): string[] {
  // Detect theme from document
  const theme = typeof document !== 'undefined'
    ? document.documentElement.getAttribute('data-theme') || 'dark'
    : 'dark';
  return theme === 'light' ? PALETTES.light : PALETTES.dark;
}

// ── Main Component ──
export default function FractalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef<{
    particles: Particle[];
    stars: Star[];
    bursts: FusionBurst[];
    mouseX: number; mouseY: number;
    w: number; h: number;
  }>({
    particles: [],
    stars: [],
    bursts: [],
    mouseX: -9999, mouseY: -9999,
    w: 0, h: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const state = stateRef.current;

    // ── Resize ──
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.w = w;
      state.h = h;
    };
    resize();

    // ── Init stars ──
    const initStars = () => {
      const { w, h } = state;
      state.stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + Math.random() * 0.8,
        alpha: 0.1 + Math.random() * 0.5,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.02,
      }));
    };

    // ── Init particles ──
    const initParticles = () => {
      const { w, h } = state;
      const colors = getColors();
      state.particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1.5 + Math.random() * 2.5,
        alpha: 0.4 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        mass: 1,
      }));
    };

    initStars();
    initParticles();

    // ── Input ──
    const onMove = (e: MouseEvent | TouchEvent) => {
      const pos = 'touches' in e ? e.touches[0] : e;
      state.mouseX = pos.clientX;
      state.mouseY = pos.clientY;
    };
    const onLeave = () => {
      state.mouseX = -9999;
      state.mouseY = -9999;
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', () => {
      resize();
      // Reposition any off-screen particles
      for (const p of state.particles) {
        if (p.x > state.w) p.x = Math.random() * state.w;
        if (p.y > state.h) p.y = Math.random() * state.h;
      }
      for (const s of state.stars) {
        if (s.x > state.w) s.x = Math.random() * state.w;
        if (s.y > state.h) s.y = Math.random() * state.h;
      }
    });

    // ══════════════════════════════
    // ANIMATION LOOP
    // ══════════════════════════════
    const animate = () => {
      const { w, h, particles, stars, bursts } = state;
      if (!w || !h) { animRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, w, h);

      // ── Stars ──
      for (const s of stars) {
        s.twinkle += s.speed;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,255,${a})`;
        ctx.fill();
      }

      // ── Update particles ──
      const toFuse: [number, number][] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse gravity
        const dx = state.mouseX - p.x;
        const dy = state.mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const f = MOUSE_FORCE / dist;
          p.vx += dx * f;
          p.vy += dy * f;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.5) {
          p.vx *= 1.5 / spd;
          p.vy *= 1.5 / spd;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Check fusion
        if (p.mass > 0) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            if (q.mass <= 0) continue;
            const fx = p.x - q.x;
            const fy = p.y - q.y;
            const fd = Math.sqrt(fx * fx + fy * fy);
            if (fd < FUSION_DIST && Math.random() < FUSION_CHANCE) {
              toFuse.push([i, j]);
            }
          }
        }
      }

      // ── Execute fusions ──
      for (const [i, j] of toFuse) {
        const a = particles[i];
        const b = particles[j];
        if (!a || !b || a.mass <= 0 || b.mass <= 0) continue;

        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;

        // Burst effect
        bursts.push({
          x: mx, y: my,
          r: 0,
          maxR: 30 + Math.random() * 20,
          alpha: 0.9,
          color: a.color,
          speed: 1.4 + Math.random(),
        });

        // Merge b into a
        a.r = Math.min(a.r + b.r * 0.4, 7);
        a.vx = (a.vx + b.vx) / 2;
        a.vy = (a.vy + b.vy) / 2;
        a.x = mx;
        a.y = my;

        // Respawn b
        const colors = getColors();
        b.x = Math.random() * w;
        b.y = Math.random() * h;
        b.vx = (Math.random() - 0.5) * 0.3;
        b.vy = (Math.random() - 0.5) * 0.3;
        b.r = 1.5 + Math.random() * 2;
        b.alpha = 0.4 + Math.random() * 0.5;
        b.color = colors[Math.floor(Math.random() * colors.length)];

        // Slowly shrink a back
        setTimeout(() => {
          if (a.r > 4) a.r -= 1.5;
        }, 2000);
      }

      // ── Draw connections ──
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(160,120,255,${alpha})`;
            ctx.stroke();
          }
        }
      }

      // ── Draw particles ──
      for (const p of particles) {
        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grd.addColorStop(0, p.color + 'aa');
        grd.addColorStop(1, p.color + '00');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── Draw fusion bursts ──
      state.bursts = bursts.filter(b => b.alpha > 0.01);
      for (const b of state.bursts) {
        b.r += b.speed;
        b.alpha *= 0.88;
        const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grd.addColorStop(0, b.color + 'ff');
        grd.addColorStop(0.3, b.color + '88');
        grd.addColorStop(1, b.color + '00');
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.globalAlpha = b.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
      role="presentation"
    />
  );
}
