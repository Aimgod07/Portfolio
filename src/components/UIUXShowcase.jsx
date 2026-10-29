import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./UIUXShowcase.css";

gsap.registerPlugin(ScrollTrigger);

export default function UIUXShowcase({ compact = false, artMode = false }) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".ux-heading > *", {
          y: 38,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 78%" },
        });
        gsap.from(".deepster-phone", {
          y: 90,
          rotate: -8,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".deepster-study", start: "top 78%" },
        });
        gsap.from(".atelier-board", {
          y: 70,
          rotate: 2,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".atelier-study", start: "top 82%" },
        });
        gsap.to(".ux-orbit-word", {
          xPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section className={`uiux-showcase ${compact ? "is-compact" : ""} ${artMode ? "is-art-mode" : ""}`} ref={scope}>
      <span className="ux-orbit-word" aria-hidden="true">INTERFACE / EXPERIENCE / INTERFACE / EXPERIENCE</span>
      <header className="ux-heading">
        <p>UI / UX DESIGN — FIGMA STUDIES</p>
        <h2>Interfaces with<br/><em>a point of view.</em></h2>
        <p className="ux-lede">Two visual systems exploring how rhythm, hierarchy and personality can turn a screen into a place people want to spend time in.</p>
      </header>

      <article className="ux-study deepster-study">
        <div className="ux-study-copy">
          <span className="ux-index">04 / MOBILE PRODUCT CONCEPT</span>
          <h3>Deepster</h3>
          <p>A music-first social experience that moves naturally between discovery, short-form Snaps, conversations and playful rewards.</p>
          <div className="ux-tags"><span>Product design</span><span>Interaction</span><span>Dark UI</span></div>
        </div>
        <div className="deepster-stage">
          <span className="deepster-ring" aria-hidden="true" />
          <div className="deepster-phone">
            <video src="/media/deepster-uiux.mp4" poster="/media/deepster-01.jpg" muted loop autoPlay playsInline controls={!compact} preload="metadata" aria-label="Deepster Figma mobile interface walkthrough" />
          </div>
          <span className="ux-sticker sticker-one">MUSIC IN MOTION</span>
          <span className="ux-sticker sticker-two">SOCIAL BY DESIGN</span>
        </div>
        {!compact && <div className="deepster-frames">
          <figure><img src="/media/deepster-01.jpg" alt="Deepster Snaps music discovery interface" /><figcaption>01 / DISCOVERY — MUSIC SNAPS</figcaption></figure>
          <figure><img src="/media/deepster-02.jpg" alt="Deepster music conversations interface" /><figcaption>02 / COMMUNITY — CONVERSATIONS</figcaption></figure>
          <figure><img src="/media/deepster-03.jpg" alt="Deepster arcade and rewards interface" /><figcaption>03 / RETENTION — ARCADE &amp; REWARDS</figcaption></figure>
        </div>}
      </article>

      <article className="ux-study atelier-study">
        <div className="ux-study-copy">
          <span className="ux-index">05 / EDITORIAL COMMERCE CONCEPT</span>
          <h3>Atelier Archive</h3>
          <p>A luxury fashion landing experience where restrained typography, generous space and tactile imagery make materials and silhouettes the main story.</p>
          <div className="ux-tags"><span>Art direction</span><span>Commerce UX</span><span>Editorial system</span></div>
        </div>
        <figure className="atelier-board">
          <img src="/media/deepster-figma-board.png" alt="Full-page Figma design for an editorial fashion commerce experience" />
          <figcaption>FULL-PAGE FIGMA BOARD / LANDING EXPERIENCE</figcaption>
        </figure>
        {!compact && <div className="atelier-notes">
          <p><span>01</span><strong>Visual hierarchy</strong>Large editorial moments lead into clear, familiar product discovery.</p>
          <p><span>02</span><strong>Commerce clarity</strong>Collections, filters, pricing and favourites remain easy to scan.</p>
          <p><span>03</span><strong>Brand atmosphere</strong>Material details and origin stories give the interface a distinct voice.</p>
        </div>}
      </article>

      {compact && <a className="ux-project-link" href="#/projects">View the UI/UX case studies <span aria-hidden="true">↗</span></a>}
      {artMode && <p className="ux-art-note">A working archive of interface studies—where product thinking meets visual experimentation.</p>}
    </section>
  );
}
