# Alex Rivera — Developer Portfolio

React + Vite one-page portfolio with GSAP ScrollTrigger animations and
Locomotive Scroll (v5, built on Lenis) for smooth-scroll.

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

- `src/components/Navbar.jsx` — sticky nav, mobile menu.
- `src/components/Hero.jsx` — hero section ("Full Stack Developer"), custom
  SVG portrait illustration, status card, "Develop with Me" CTA, praise card.
- `src/components/ProjectCarousel.jsx` — fanned project carousel, 70% width,
  driven by GSAP ScrollTrigger (auto-scrolls with page scroll) **and** free
  mouse drag/scroll.
- `src/components/SkillsScroller.jsx` — full-page sticky-stack scroller, one
  panel per skill, image-filled type treatment.
- `src/components/MetaverseSection.jsx` — closing CTA section, fully data
  driven via the `CONTENT` object at the top of the file (or pass a
  `content` prop).

## Things to personalize

1. **Hero portrait** — `Hero.jsx` currently ships an original abstract
   SVG illustration (no real photo was supplied to trace). Swap the
   `<svg className="hero__figure">` block for an `<img>` of your own
   photo, or drop your own SVG file into `src/assets` and import it.
2. **Praise card avatar** — swap the Unsplash URL in `Hero.jsx` for your
   testimonial's real photo.
3. **Projects** — edit the `PROJECTS` array in `ProjectCarousel.jsx`
   (title, tag, cover image).
4. **Skill panel backgrounds** — edit the `SKILLS` array in
   `SkillsScroller.jsx`; swap the placeholder `picsum.photos` URLs for
   your own textures/photos.
5. **Closing section copy** — edit the `CONTENT` object in
   `MetaverseSection.jsx` (headline, taglines, stats, CTA links).

## Theme

All colors live as CSS variables in `src/index.css` (`--orange-500`,
`--amber-300`, `--bg-void`, etc.) so the palette stays consistent across
every section — change them there to re-theme the whole site.
