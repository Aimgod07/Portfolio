import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectStories.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    slug: "valodesignz", number: "07", label: "FASHION SHOWCASE / INTERACTIVE WEB",
    title: "ValoDesignz",
    intro: "An image-led fashion experience with glass surfaces, expressive typography and fluid motion, from collection discovery to personal styling.",
    video: "/media/valodesignz/walkthrough.mp4", poster: "/media/valodesignz/screen-1.png",
    screenshots: [1,2,3,4].map(n => `/media/valodesignz/screen-${n}.png`),
    captions: ["IDENTITY / INTERACTIVE HERO", "COLLECTION / CATEGORY DISCOVERY", "LOOKBOOK / EDITORIAL DIRECTION", "CAMPAIGN / EVERYDAY EXPRESSION"],
    features: ["Responsive Next.js frontend", "GSAP, ScrollTrigger & Lenis motion", "Collections, saved pieces & shopping bag", "Interactive atelier styling"],
    url: "https://valodesignz.pages.dev",
  },

  {
    slug: "aura", number: "06", label: "AURA STORE / FASHION COMMERCE",
    title: "Aura Store",
    intro: "An expressive fashion storefront with bold art direction, curated collections and a clear path from discovery to bag.",
    video: "/media/aura/walkthrough-1.mp4", poster: "/media/aura/screen-1.png",
    screenshots: [1,2,3,4,5].map(n => `/media/aura/screen-${n}.png`),
    captions: ["BRAND / HERO EXPERIENCE", "DISCOVERY / SHOP BY FEELING", "PRODUCTS / FEATURED PIECES", "COLLECTIONS / EDITORIAL STORIES", "CAMPAIGN / SEASONAL DROP"],
    features: ["Curated collections & category discovery", "Product cards, wishlist & shopping bag", "Editorial campaigns & bold visual identity"],
  },
  {
    slug: "anayra",
    number: "02",
    label: "FASHION COMMERCE / WEB EXPERIENCE",
    title: "Anayra Fashion",
    intro: "A calm, editorial storefront that lets the clothing lead—combining expressive collections with quick, familiar shopping flows.",
    video: "/media/anayra-fashion.mp4",
    poster: "/media/anayra-02.jpg",
    screenshots: ["/media/anayra-01.jpg", "/media/anayra-03.jpg"],
    captions: ["FEATURED PICKS / QUICK ADD", "COLLECTION / FILTERED DISCOVERY"],
    features: ["Editorial collections", "Product filtering", "Wishlist & quick add"],
  },
  {
    slug: "grofit",
    number: "03",
    label: "FITNESS COMPANION / MOBILE PRODUCT",
    title: "Grofit",
    intro: "A focused training companion for moving from inspiration to action, with guided exercises, live workout states and social accountability.",
    video: "/media/grofit.mp4",
    poster: "/media/grofit-01.jpg",
    screenshots: ["/media/grofit-02.jpg", "/media/grofit-03.jpg"],
    captions: ["ACTIVE SESSION / REST TIMER", "TRAINING GROUPS / SHARED TASKS"],
    features: ["Exercise guidance", "Workout timers", "Training groups"],
  },
];

export default function ProjectStories({ compact = false }) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray(".story-project").forEach((project) => {
          gsap.from(project.querySelectorAll(".story-copy > *, .story-meta"), {
            y: 36,
            opacity: 0,
            stagger: 0.08,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 78%" },
          });
          gsap.from(project.querySelector(".story-video"), {
            y: 70,
            rotate: project.classList.contains("story-grofit") ? 4 : -2,
            opacity: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 74%" },
          });
        });
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section className={`project-stories ${compact ? "is-compact" : ""}`} ref={scope}>
      <header className="stories-intro">
        <p>MORE SELECTED WORK / 2026</p>
        <h2>Different worlds.<br/><em>One point of view.</em></h2>
      </header>

      {projects.map((project) => (
        <article className={`story-project story-${project.slug}`} key={project.slug}>
          <div className="story-copy">
            <p className="story-kicker">{project.number} / {project.label}</p>
            <h3>{project.title}</h3>
            <p className="story-intro">{project.intro}</p>
            <p className="project-detail-label">Key features</p>
            <ul>{project.features.map((feature) => <li key={feature}><strong>{feature}</strong></li>)}</ul>
            {project.url && <a className="story-live-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit website <span aria-hidden="true">↗</span></a>}
          </div>
          <div className="story-media">
            <div className="story-video">
              <div className="story-browser-bar"><i/><i/><i/><span>{project.title.toUpperCase()} / PRODUCT WALKTHROUGH</span></div>
              <video src={project.video} poster={project.poster} muted loop autoPlay playsInline controls={!compact} preload="metadata" aria-label={`${project.title} product walkthrough`} />
            </div>
            {(!compact || project.slug === 'aura') && <div className="story-stills">
              {project.screenshots.map((src, index) => <figure key={src}><img src={src} alt={`${project.title} interface detail ${index + 1}`} /><figcaption>{project.captions[index]}</figcaption></figure>)}
            </div>}
            {project.slug === 'aura' && <details className="aura-walkthroughs"><summary>Explore all 5 walkthroughs</summary><div className="story-stills">{[2,3,4,5].map(n => <figure key={n}><video src={`/media/aura/walkthrough-${n}.mp4`} poster={`/media/aura/screen-${n}.png`} controls playsInline preload="none" aria-label={`Aura Store walkthrough ${n}`} /><figcaption>AURA STORE / WALKTHROUGH {n}</figcaption></figure>)}</div></details>}
          </div>
          <div className="story-meta"><span>{project.number}</span><span>DESIGN · DEVELOPMENT · MOTION</span></div>
        </article>
      ))}

      {compact && <a className="stories-link" href="#/projects">See videos, screens &amp; project details <span aria-hidden="true">↗</span></a>}
    </section>
  );
}
