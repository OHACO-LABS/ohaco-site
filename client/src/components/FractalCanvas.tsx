/**
 * FractalCanvas — Living Nebula Engine
 *
 * A clean, flowing particle simulation:
 *   1. Clifford Attractors — particles trace chaotic orbits that form
 *      beautiful organic structures from pure mathematics.
 *   2. Perlin Flow Fields — ambient particles drift through noise-based
 *      vector fields, creating soft, organic movement.
 *   3. Magnetic Cursor — the pointer warps the flow field, creating a
 *      gravitational lens effect that draws particles in smooth spirals.
 *
 * Design: deep nebula colors (indigo → violet → magenta), smooth ribbon
 * trails, layered depth, subtle bloom glow. No shapes, no lightning —
 * just flowing light.
 */
import { useEffect, useRef, useCallback } from 'react';

// ── Perlin Noise ──
class PerlinNoise {
  private perm: number[];
  constructor() {
    const p = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    this.perm = [...p, ...p];
  }
  private fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  private lerp(a: number, b: number, t: number) { return a + t * (b - a); }
  private grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
  noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x), yf = y - Math.floor(y);
    const u = this.fade(xf), v = this.fade(yf);
    const aa = this.perm[this.perm[X] + Y];
    const ab = this.perm[this.perm[X] + Y + 1];
    const ba = this.perm[this.perm[X + 1] + Y];
    const bb = this.perm[this.perm[X + 1] + Y + 1];
    return this.lerp(
      this.lerp(this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf), u),
      this.lerp(this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1), u),
      v
    );
  }
}

// ── Constants ──
const TAU = Math.PI * 2;
const IS_MOBILE = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

// Particle counts — tuned for performance
const ATTRACTOR_COUNT = IS_MOBILE ? 80 : 200;
const FLOW_COUNT = IS_MOBILE ? 60 : 150;
const TOTAL = ATTRACTOR_COUNT + FLOW_COUNT;

// Cursor interaction
const CURSOR_RADIUS = IS_MOBILE ? 160 : 260;
const CURSOR_STRENGTH = 0.12;

// Deep nebula palette (indigo → violet → magenta)
const PALETTE = [
  [88, 60, 210],    // deep indigo
  [120, 80, 230],   // violet
  [160, 70, 220],   // purple
  [180, 60, 180],   // magenta
  [100, 100, 240],  // periwinkle
];

// Clifford attractor parameter sets
const ATTRACTORS = [
  { a: -1.4, b: 1.6, c: 1.0, d: 0.7 },
  { a: 1.7, b: 1.7, c: 0.6, d: 1.2 },
  { a: -1.7, b: 1.8, c: -1.9, d: -0.4 },
];

// ── Types ──
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  ax: number; ay: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: number[];
  layer: number;
  type: 'attractor' | 'flow';
  trail: { x: number; y: number }[];
  trailLen: number;
  age: number;
  phase: number;
}

// ── Main Component ──
export default function FractalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const noiseRef = useRef<PerlinNoise>(new PerlinNoise());
  const timeRef = useRef(0);
  const dimRef = useRef({ w: 0, h: 0 });

  // Cursor state
  const cursorRef = useRef({
    x: -9999, y: -9999,
    active: false,
    velocity: 0,
    prevX: -9999, prevY: -9999,
  });

  // Attractor morphing
  const attrRef = useRef({ ...ATTRACTORS[0] });
  const attrTargetRef = useRef({ ...ATTRACTORS[0] });

  // Offscreen buffer for bloom
  const bloomRef = useRef<HTMLCanvasElement | null>(null);

  // ── Clifford step ──
  const cliffordStep = useCallback((ax: number, ay: number, p: typeof ATTRACTORS[0]) => {
    return {
      nx: Math.sin(p.a * ay) + p.c * Math.cos(p.a * ax),
      ny: Math.sin(p.b * ax) + p.d * Math.cos(p.b * ay),
    };
  }, []);

  // ── Create particles ──
  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];

    for (let i = 0; i < ATTRACTOR_COUNT; i++) {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const layer = Math.random() < 0.2 ? 0 : Math.random() < 0.6 ? 1 : 2;
      particles.push({
        x: w * 0.3 + Math.random() * w * 0.4,
        y: h * 0.3 + Math.random() * h * 0.4,
        vx: 0, vy: 0,
        ax: (Math.random() - 0.5) * 4,
        ay: (Math.random() - 0.5) * 4,
        size: 0.8 + Math.random() * 1.5,
        alpha: 0, // fade in
        baseAlpha: 0.15 + Math.random() * 0.3,
        color,
        layer,
        type: 'attractor',
        trail: [],
        trailLen: IS_MOBILE ? 10 : 22,
        age: Math.random() * 100,
        phase: Math.random() * TAU,
      });
    }

    for (let i = 0; i < FLOW_COUNT; i++) {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const layer = Math.random() < 0.35 ? 0 : Math.random() < 0.65 ? 1 : 2;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0, vy: 0,
        ax: 0, ay: 0,
        size: 0.4 + Math.random() * 1.2,
        alpha: 0,
        baseAlpha: 0.06 + Math.random() * 0.18,
        color,
        layer,
        type: 'flow',
        trail: [],
        trailLen: IS_MOBILE ? 5 : 12,
        age: Math.random() * 100,
        phase: Math.random() * TAU,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Create bloom buffer
    const bloom = document.createElement('canvas');
    bloomRef.current = bloom;
    const bCtx = bloom.getContext('2d', { alpha: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bloom.width = Math.ceil(w / 2);
      bloom.height = Math.ceil(h / 2);

      dimRef.current = { w, h };
      if (particlesRef.current.length === 0) initParticles(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Input ──
    const onMove = (e: MouseEvent | TouchEvent) => {
      const pos = 'touches' in e ? e.touches[0] : e;
      const c = cursorRef.current;
      c.prevX = c.x; c.prevY = c.y;
      c.x = pos.clientX; c.y = pos.clientY;
      c.velocity = Math.sqrt((c.x - c.prevX) ** 2 + (c.y - c.prevY) ** 2);
      c.active = true;
    };
    const onLeave = () => { cursorRef.current.active = false; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    // Morph attractor every 18s
    const morphTimer = setInterval(() => {
      const target = ATTRACTORS[Math.floor(Math.random() * ATTRACTORS.length)];
      attrTargetRef.current = {
        a: target.a + (Math.random() - 0.5) * 0.25,
        b: target.b + (Math.random() - 0.5) * 0.25,
        c: target.c + (Math.random() - 0.5) * 0.25,
        d: target.d + (Math.random() - 0.5) * 0.25,
      };
    }, 18000);

    // ══════════════════════════════
    // ANIMATION LOOP
    // ══════════════════════════════
    const animate = () => {
      const { w, h } = dimRef.current;
      if (!w || !h) { animRef.current = requestAnimationFrame(animate); return; }

      const noise = noiseRef.current;
      const time = timeRef.current;
      timeRef.current += 0.003;

      const cursor = cursorRef.current;
      const particles = particlesRef.current;
      const attr = attrRef.current;
      const target = attrTargetRef.current;

      // Smooth attractor morphing
      const morphRate = 0.002;
      attr.a += (target.a - attr.a) * morphRate;
      attr.b += (target.b - attr.b) * morphRate;
      attr.c += (target.c - attr.c) * morphRate;
      attr.d += (target.d - attr.d) * morphRate;

      // ── Update particles ──
      for (const p of particles) {
        p.age += 0.005;

        // Fade in
        if (p.alpha < p.baseAlpha) {
          p.alpha += 0.001;
        }

        if (p.type === 'attractor') {
          // Clifford attractor orbit
          const { nx, ny } = cliffordStep(p.ax, p.ay, attr);
          p.ax += (nx - p.ax) * 0.006;
          p.ay += (ny - p.ay) * 0.006;

          const scale = Math.min(w, h) * 0.17;
          const targetX = w / 2 + p.ax * scale;
          const targetY = h / 2 + p.ay * scale;
          p.vx += (targetX - p.x) * 0.01;
          p.vy += (targetY - p.y) * 0.01;
        } else {
          // Perlin flow field
          const angle = noise.noise2D(p.x * 0.0025, p.y * 0.0025 + time) * TAU;
          p.vx += Math.cos(angle) * 0.06;
          p.vy += Math.sin(angle) * 0.06;

          // Gentle center pull to prevent edge clustering
          p.vx += (w / 2 - p.x) * 0.00003;
          p.vy += (h / 2 - p.y) * 0.00003;
        }

        // ── Magnetic cursor interaction ──
        if (cursor.active) {
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CURSOR_RADIUS && dist > 1) {
            const layerScale = p.layer === 2 ? 1.3 : p.layer === 1 ? 0.7 : 0.25;
            const force = (CURSOR_STRENGTH * layerScale) / (dist * 0.06 + 1);

            // Orbital: tangential + radial for smooth spiraling
            const nx = dx / dist, ny = dy / dist;
            const tx = -ny, ty = nx;
            const tangential = force * 0.65 * (1 + cursor.velocity * 0.003);
            const radial = force * 0.35;

            p.vx += nx * radial + tx * tangential;
            p.vy += ny * radial + ty * tangential;

            // Brighten near cursor
            p.alpha = Math.min(p.alpha + 0.008, 0.85);
          }
        }

        // Damping
        const damp = p.type === 'attractor' ? 0.987 : 0.993;
        p.vx *= damp;
        p.vy *= damp;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpd = p.type === 'attractor' ? 2.5 : 1.5;
        if (spd > maxSpd) {
          const ratio = maxSpd / spd;
          p.vx *= ratio;
          p.vy *= ratio;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Soft wrap
        const margin = 50;
        if (p.x < -margin) p.x = w + margin;
        if (p.x > w + margin) p.x = -margin;
        if (p.y < -margin) p.y = h + margin;
        if (p.y > h + margin) p.y = -margin;

        // Pulsing size
        p.size = (p.type === 'attractor' ? 1.2 : 0.7) +
          Math.sin(p.age * 1.5 + p.phase) * 0.35;

        // Decay alpha toward base
        const alphaTarget = p.baseAlpha;
        p.alpha += (alphaTarget - p.alpha) * 0.004;

        // Record trail
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > p.trailLen) p.trail.pop();
      }

      // ══════════════════════════════
      // RENDER
      // ══════════════════════════════
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'screen';

      // Render back-to-front by layer
      for (let layer = 0; layer <= 2; layer++) {
        const layerAlpha = layer === 0 ? 0.25 : layer === 1 ? 0.55 : 1.0;

        for (const p of particles) {
          if (p.layer !== layer) continue;
          const [r, g, b] = p.color;
          const a = p.alpha * layerAlpha;

          // ── Ribbon trail ──
          if (p.trail.length >= 2) {
            ctx.beginPath();
            ctx.moveTo(p.trail[0].x, p.trail[0].y);

            // Smooth curve through trail points
            for (let t = 1; t < p.trail.length - 1; t++) {
              const xc = (p.trail[t].x + p.trail[t + 1].x) / 2;
              const yc = (p.trail[t].y + p.trail[t + 1].y) / 2;
              ctx.quadraticCurveTo(p.trail[t].x, p.trail[t].y, xc, yc);
            }

            // Opacity fades along trail
            const trailAlpha = a * (p.type === 'attractor' ? 0.3 : 0.12);
            ctx.strokeStyle = `rgba(${r},${g},${b},${trailAlpha})`;
            ctx.lineWidth = p.size * 0.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
          }

          // ── Soft glow ──
          const glowSize = p.size * 5;
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
          grd.addColorStop(0, `rgba(${r},${g},${b},${a * 0.4})`);
          grd.addColorStop(0.35, `rgba(${r},${g},${b},${a * 0.08})`);
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowSize, 0, TAU);
          ctx.fillStyle = grd;
          ctx.fill();

          // ── Core dot ──
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, TAU);
          ctx.fillStyle = `rgba(${Math.min(r + 50, 255)},${Math.min(g + 50, 255)},${Math.min(b + 30, 255)},${a})`;
          ctx.fill();
        }
      }

      // ── Bloom layer (soft ambient glow) ──
      if (bCtx && bloomRef.current) {
        const bw = bloomRef.current.width;
        const bh = bloomRef.current.height;
        bCtx.clearRect(0, 0, bw, bh);

        // Draw scaled-down version of main canvas
        bCtx.globalCompositeOperation = 'source-over';
        bCtx.drawImage(canvas, 0, 0, bw, bh);

        // Overlay bloom back at low opacity for glow
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.15;
        ctx.drawImage(bloomRef.current, 0, 0, w, h);
        ctx.globalAlpha = 1;
      }

      // ── Cursor ambient glow ──
      if (cursor.active) {
        ctx.globalCompositeOperation = 'source-over';
        const cursorGrd = ctx.createRadialGradient(
          cursor.x, cursor.y, 0,
          cursor.x, cursor.y, CURSOR_RADIUS * 0.35,
        );
        cursorGrd.addColorStop(0, 'rgba(100, 80, 220, 0.035)');
        cursorGrd.addColorStop(0.5, 'rgba(100, 80, 220, 0.01)');
        cursorGrd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, CURSOR_RADIUS * 0.35, 0, TAU);
        ctx.fillStyle = cursorGrd;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(morphTimer);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [initParticles, cliffordStep]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
