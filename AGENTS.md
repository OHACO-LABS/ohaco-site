# OHACO Site — Agent Context

## What This Repo Is
Marketing site for **Our House Arts Collective**. React + Vite + TypeScript.
Deployed to: TBD

## What This Repo Is NOT
- **NOT** the collab-memory API → that's `OHACO-LABS/collab-memory`
- **NOT** the investor site → that's `ohaco-org`

## Brand Rules
- **Business model**: OpenCore (MIT-licensed core + hosted revenue service)
- **Name**: "Our House Arts Collective" (not "AI Collective")
- **Aesthetic**: clean, minimalistic, elegant, accessible, sophisticated
- **No decorative images** (no crystals, stock photos, or filler imagery)
- **Accessibility**: WCAG compliant, aria labels, keyboard navigable

## Tech Stack
- React 18 + TypeScript
- Vite (build + dev server)
- Framer Motion (animations)
- Lucide React (icons)
- Sonner (toasts)
- Vanilla CSS with oklch color system

## Key Files
| File | Purpose |
|------|---------|
| `client/src/components/FractalCanvas.tsx` | Nebula physics engine (Clifford + Perlin + magnetic cursor) |
| `client/src/components/sections/` | Page section components |
| `client/src/pages/` | Route pages (About, Pricing, Docs, Investors, Signup) |
| `client/src/components/ui/` | Shared UI primitives (Reveal, CodeBlock, etc.) |
| `vite.config.ts` | Build config |

## Commit Convention
Use conventional commits: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`, `brand:`, `test:`
