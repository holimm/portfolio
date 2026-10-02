# Portfolio — Design & Context Handoff

A handoff for anyone (human or AI) continuing work on Ho Lim's portfolio. It captures the visual
direction the owner wants, the design system that implements it, how the motion works, the
decisions behind it, and the gotchas already paid for. Read it before changing the landing page.

- **Live:** https://holim-portfolio.vercel.app/
- **Repo:** `holimm/portfolio` — work on `develop`, PR into `main` (Vercel deploys `main`)
- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP 3
  (ScrollTrigger + ScrollSmoother via `@gsap/react`) · React Three Fiber / three.js (globe)

---

## 1. The style the owner wants

**A minimal, editorial, interactive creative-developer portfolio** — it should read as one
cohesive piece, not a set of independently designed sections. The globe intro and the first
landing screen are the reference for everything else.

The owner's direction, distilled from feedback:

- **Editorial, not "template".** Small parenthesised labels, tight medium-weight headlines,
  hairline rules, generous whitespace. No giant centred all-caps headings, no rounded "card"
  chrome, no bracket labels like `[ About me ]`.
- **Monochrome.** Black / white / greys from the design tokens; grayscale photography that warms
  to colour on hover. The only accent is the green status dot (`bg-success`).
- **Sections are attached and flow into each other.** No gaps between a section and the next.
  Transitions are "sheets stacking": the next section slides *over* the current one.
- **Motion is scroll-driven and purposeful.** Lines rise out of clips, supporting content fades
  up, images unmask. Nothing should feel slow, stuck, or require extra scrolling.
- **Reference site for the hero/marquee:** https://benjamincreative.me/ — the owner wants its
  *mechanics* (layer speeds, attached marquee band, next section sliding over), adapted to this
  site's light, monochrome look. Match the reference's behaviour closely when asked.
- **Variety within the system.** Each section has its own layout (grid, list, staggered columns,
  horizontal panels) but shares the same typography, spacing, borders, buttons and motion.

### Working preferences

- Implement directly when asked — **don't write specs/plans first** ("just implement").
- **Verify visually** in the browser at desktop and phone sizes before claiming something works;
  the owner notices layout and timing issues immediately.
- Fix root causes; measure before changing (several "obvious" fixes were wrong — see §8).
- Don't touch the globe/hero unless needed; keep unrelated changes out.

---

## 2. Page structure (top → bottom)

| # | Section | Theme | Notes |
|---|---|---|---|
| — | `PageLoader` | dark | Covers the page until fonts, images and the globe are ready |
| — | `Header` | blend | Fixed, `mix-blend-difference`; logo "HO LIM" + About / Work / Contact |
| 0 | `Hero` | dark → light | Pinned globe intro (scroll-scrubbed) → white bloom → landing screen + marquee band |
| 01 | `About` | light | Horizontal scroll, 2 panels (intro, "Outside of work") |
| 02 | `TechStack` | light | Hairline 3-col grid of tools |
| 03 | `Projects` | dark | Two staggered columns of project frames |
| 04 | `Contact` | light | Details list + underline form |
| — | `Footer` | dark | Parallax reveal from under Contact; giant "HO LIM" |

Stacking: each section sits above the previous (`About z-10`, `TechStack z-20`, `Projects z-30`,
`Contact z-40` in `Homepage.tsx`) so it can scroll over it. `SubHero.tsx` exists but is no longer
used.

---

## 3. Design system

Shared kit lives in **`src/components/sections/common/`** — use it for any new section.

### Layout
- `CONTAINER` = `max-w-screen-3xl mx-auto w-full px-5 md:px-10 2xl:px-14` (lines up with the header)
- `SECTION_SPACING` = `py-24 md:py-32 2xl:py-40` for normally scrolling sections
- Grid: **3 columns on `md+`**; headlines start in column 2 (`md:col-span-2 md:col-start-2`)
- Full-screen panels clear the fixed header with `pt-24 md:pt-32`

### Typography
- Body font: Oldschool Grotesk (`font-oldschool-grotesk-normal`); display: `-compact` (logo),
  `-compressed` (giant numerals/name)
- **Section title** (`SectionHeader`): medium, `leading-[0.95]`, `tracking-[-0.045em]`,
  `text-[2.25rem] md:text-6xl 2xl:text-7xl`, `text-balance`, `max-w-[24ch]`
- **Hero headline:** medium, `text-[2rem] md:text-5xl 2xl:text-6xl`, same tracking/leading
- **Labels:** `(Hello there)`, `(01) About`, `(Outside of work)` — `text-sm md:text-base text-contrast-medium`
- **Meta keys:** `META_LABEL` = `text-contrast-medium text-xs tracking-wider uppercase`
- Indices: `formatIndex(i)` → `(01)`, always `tabular-nums`
- Use non-breaking spaces to stop orphans (e.g. `Viet Nam` — inside a JSX *expression*,
  string attributes don't process escapes)

### Colour tokens (Tailwind v4, `src/styles/globals.css`)
- Page background is **`bg-background`** (not `bg-background-base` — that class doesn't exist and
  renders transparent). Also `bg-background-lightest` (white).
- Text/lines: `text-contrast-{highest…lowest}`, `border-contrast-lowest` for hairlines;
  inverted: `text-invert-*`
- Scope themes with `data-theme="light" | "dark" | "default"`; the band uses `data-theme="dark"`
  so tokens invert inside it.

### Components
- **`SectionHeader`** — hairline row with `(index) Label` + optional `aside`, then the title.
- **`ArrowPill`** — the only CTA style: outlined pill, uppercase `text-sm`, filled arrow disc;
  renders `<a>` with `href`, else `<button>`.
- **`RevealLine`** — `overflow-hidden` clip around a `[data-reveal]` line.
- **`LocalTime`** (Ho Chi Minh time, ticking) and **`Availability`** (green pulse + "Open for freelance").
- Meta lists: `dl` items with `border-t pt-3`, `dt` = `META_LABEL`, `dd` = `text-sm md:text-base`.
- Forms: underline fields (border-b only, transparent, `text-lg md:text-xl`) built as plain
  `input`/`textarea` inside the shared `Form` primitives — the shared `Input` can't be restyled
  (it concatenates classes without merging).

---

## 4. Motion system

All motion is GSAP. Shared hooks in `common/useScrollMotion.ts`:

### Reveal vocabulary (mark up elements, the hook animates them)
| Attribute | Effect | Values |
|---|---|---|
| `[data-reveal]` (via `RevealLine`) | line rises out of its clip | `yPercent 110→0`, 1.2s, `power3.out`, stagger 0.12 |
| `[data-reveal-fade]` | fades up | `autoAlpha 0→1`, `y 24→0`, 1s, `power2.out`, stagger 0.08 |
| `[data-reveal-image]` | frame unmasks from bottom, image drifts inside | `clipPath inset(100% 0 0 0)→0`, 1.4s, `power3.inOut`; image `yPercent -6→6` scrubbed at scale 1.14 |
| `[data-reveal-group]` | everything inside reveals **as one sequence** when the group's top hits 85% | for one-screen panels (About intro) |
| `[data-reveal-manual]` | hook skips it; the section reveals it itself (`createRevealTimeline`) | used for About's off-screen panel 2 |

- `useScrollReveal(ref)` — individual elements trigger at `clamp(top 90%)`, once, batched.
- `useStackedExit(ref)` — while the next section scrolls over, `[data-exit-content]` lags
  (`y` up to `0.4 × viewport`) and `[data-exit-shade]` fades to 0.6 (black before a dark section,
  white before a light one). Requires the next section stacked above.
- Reduced motion: everything is gated by `MOTION_OK` (`prefers-reduced-motion: no-preference`).
- `getScrub()` / `getPinType()` in `Gsap.Config.ts`: touch devices use native scroll
  (`scrub: 0.6`, `pinType: 'fixed'`); desktop uses ScrollSmoother (`scrub: true`, `transform` pins).

### Hero (`Hero.tsx`)
- Pinned for `INTRO_SCROLL_LENGTH` = desktop **4.2** / mobile **3.05** / reduced **1.9** viewports.
  One scrubbed timeline: globe travels east → zooms to Viet Nam → dives → white "bloom" mask
  opens → landing content reveals. **No hold at the end** — the pin releases as soon as content
  settles (the owner disliked dead scroll).
- **Landing screen:** faint grayscale mountain photo (`opacity-40`, top fade only, bottom anchored)
  behind a hero area (portrait, `(Hello there)`, headline, meta row, bottom row with CTA) and a
  **marquee band** flush at the bottom: dark gradient, inner hairline, medium sans text at
  `max(3.25rem, min(9vw, 13svh))`, ringed "C" separators, items
  `Ho Lim ⓒ Creative Developer ⓒ Ho Lim ⓒ Based in Saigon ⓒ`, loop 32s.
- **Band entrance:** the band slides up from the bottom *over the photo* (photo extends behind
  the band, so there's never a gap); its text rises a beat later.
- **Exit (reference mechanics, normalised to the next section at 1×):** layers lag the page by
  `EXIT_LAG = { hero: 0.44, photo: 0.33, band: 0.17 }` over one viewport, so About slides over
  the band and the band over the hero — always attached.

### About horizontal scroll
- Pinned, one viewport per panel plus `END_HOLD = 0.5` viewports resting on the last panel;
  `anticipatePin: 1` to avoid the late-pin jump on touch.

### Globe (`src/components/interactions/globe`)
- Scroll-driven `GlobeJourneyScene` renders **on demand** (no idle loop) — keep it that way.
- **Starfield** (`GlobeStars.tsx`): seeded, two layers (5000 dust @1.1px, 520 bright @1.9px) in a
  45–90 unit shell, hidden behind the planet by the depth-only occluder, turns with 40% of the
  globe's journey rotation. **Twinkle** via a point shader (per-star depth, 2–6s period, phase);
  on-demand redraws throttled to 30fps and stopped once the bloom covers the sky
  (`starsHiddenAtZoom: 1.55`). Static under reduced motion.

### Loader (`src/components/sections/loader/PageLoader.tsx`)
- Server-rendered overlay (hero-dark, header-aligned "HO LIM", giant compressed `000→100`
  counter, hairline bar). Waits for `document.fonts.ready`, **every `<img>`** (forced eager), and
  registered tasks (`createAssetTask` / `useAssetTask(ready)` — the globe registers via
  `LazyGlobe`). Min 0.9s, max 15s. Locks scroll, `ScrollTrigger.clearScrollMemory('manual')` +
  scroll to top, refreshes ScrollTrigger on exit, then slides up. `<noscript>` hides it.

---

## 5. Section specs (current)

- **About (01):** panel 1 = `SectionHeader` ("I'm Ho Lim, a web developer based in Ho Chi Minh
  City, Viet Nam."), paragraph + "My resume" pill (first in markup), facts dl (Education,
  Experience, Off the clock — last hidden on phones), bottom row "Get to know me / Keep scrolling →".
  Panel 2 = "(Outside of work)" hairline, statement, two figures (coffee-shop top-left, forest
  bottom-right; side by side on phones) with `Fig. 01 — …` captions. No portrait here (the hero has it).
- **Stack (02):** 3-col hairline grid (2-col on phones, last cell spans), each cell: index,
  hover arrow, icon, name, role (`TECH_STACK[].role`); hover inverts to black.
- **Work (03):** dark; 2 columns, right column offset `md:mt-40`; `aspect-[4/3]` grayscale frames
  with hover arrow disc; caption hairline: index, title, "Live site" (green dot) + "GitHub ↗",
  tags joined with ` / ` in `META_LABEL`.
- **Contact (04):** aside = `Availability`; left dl (Email link, Location, Local time, Elsewhere
  links); right underline form (name + email side by side, message), submit = `ArrowPill`.
- **Footer:** statement (col 1), "(Navigate)" and "(Elsewhere)" link columns, copyright row with
  "Back to top ↑", giant left-aligned compressed "HO LIM" with Local time / Availability beside it.

---

## 6. Key files

```
src/app/layout.tsx                         PageLoader, Header, SmoothScrollProvider, Footer
src/components/sections/common/            design kit + motion hooks (start here)
src/components/sections/homepage/          Hero, About, TechStack, Projects, Contact, Homepage
src/components/sections/loader/            PageLoader
src/components/sections/header|footer/
src/components/interactions/globe/         globe scenes, stars, config (Globe.Config.ts)
src/components/interactions/horizontal-scroll/
src/config/animations/Gsap.Config.ts       gsap setup, getPinType, getScrub, smoothScrollTo
src/utils/Asset.Util.ts, src/hooks/useAssetTask.ts   loader task registry
src/types/Constant.Type.ts                 nav, socials, TECH_STACK, SELECTED_PROJECTS
src/styles/tokens/colors.css, globals.css  design tokens
```

---

## 7. Verification checklist

- `npx tsc --noEmit -p .` · `npx next lint` · `npx prettier --check <files>`
- Production build: run `next build` in a **copy** of the repo (e.g. rsync to a temp dir and
  symlink `node_modules`) so it doesn't clobber a running dev server's `.next`.
- Browser checks at **1440×900, 1024×768, 768×1024, 375×812**: loader → intro → landing → About
  handoff → horizontal panels → Stack/Work/Contact handoffs → footer at true bottom.

---

## 8. Gotchas already learned (don't repeat these)

1. **GSAP mutates vars objects.** Passing a shared `to` object into `timeline.fromTo` wrote
   `parent: <timeline>` into it; later spreads adopted every reveal into a paused timeline and
   stalled them. Always hand GSAP fresh copies (`{ ...vars }`).
2. **CSS transitions fight GSAP.** `Typography` has `transition-all duration-200`; animating it
   directly makes it lag. Put `data-reveal*` on a plain wrapper.
3. **Measure reveals by the clip, not the line.** A line hidden at `yPercent: 110` measured itself
   lower and could push its trigger past the page end. Also use `clamp()` starts.
4. **Attachment needs overlap, not adjacency.** A band sliding in from below opened a gap; the fix
   was extending the photo *behind* the band. When layers move at different speeds, give the
   faster one something underneath it.
5. **No dead scroll.** An empty hold at the end of the pinned intro felt like being stuck.
6. **Horizontal scroll needs a rest** on the last panel, or it only "arrives" while leaving.
7. Use registered Tailwind tokens (`bg-background`, not `bg-background-base`); check
   `globals.css` `@theme` when a colour renders transparent.
8. **Browser-pane testing caveats:** the in-app preview only produces animation frames around
   screenshots, and scripted `scrollTo` fights ScrollSmoother catch-up and the loader's scroll
   lock. Wait for the loader to finish, keep frames alive with screenshots, and sample state via
   JS rather than trusting a single frame.
9. `middleware.ts` sits at the repo root but the app uses `src/`, so Next ignores it (it's a no-op
   anyway).

---

## 9. Open items

- `SubHero.tsx` unused; `react-fast-marquee` now unused; `Testimonials` commented out — candidates
  for removal (ask first).
- The hero portrait is reused nowhere else now; About's photos are coffee-shop and forest.
- A 404 on first load of the live site was reported but couldn't be reproduced (server and fresh
  browser both served the page). Likely a stale cached copy around the #23/#24 deploys — confirm
  with a private window or redeploy; get a screenshot + device if it recurs.
- iOS Safari wasn't tested on a real device (the iOS Simulator needs a full Xcode install).
