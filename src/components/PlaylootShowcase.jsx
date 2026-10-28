import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PlaylootShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { value: "01", label: "Player experience", text: "Arcade discovery, missions, rewards, wallets and a playful daily-spin loop." },
  { value: "02", label: "Product studio", text: "A single workspace for analytics, content controls, events and publishing." },
  { value: "03", label: "Connected system", text: "A consumer product and an operating layer designed as one visual ecosystem." },
];

export default function PlaylootShowcase({ compact = false }) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".playloot-heading > *", {
          y: 42, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 78%" },
        });
        gsap.from(".playloot-mobile", {
          y: 90, rotate: -4, opacity: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ".playloot-stage", start: "top 82%" },
        });
        gsap.from(".playloot-desktop", {
          x: 80, rotate: 3, opacity: 0, duration: 1.1, delay: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".playloot-stage", start: "top 82%" },
        });
        gsap.to(".playloot-mobile", { y: -18, duration: 4.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section className={`playloot-showcase ${compact ? "is-compact" : ""}`} ref={scope}>
      <div className="playloot-heading">
        <div>
          <p className="playloot-kicker">FEATURED CASE STUDY / PRODUCT ECOSYSTEM</p>
          <h2>Playloot</h2>
        </div>
        <p className="playloot-lede">A playful arcade experience paired with a powerful product studio—one for players, one for the people shaping every moment behind the scenes.</p>
      </div>

      <div className="playloot-stage">
        <span className="playloot-orbit" aria-hidden="true" />
        <div className="playloot-mobile media-frame">
          <div className="media-topline"><span>PLAYER APP</span><span>01</span></div>
          <video src="/media/playloot-mobile.mp4" poster="/media/playloot-mobile-01.jpg" muted loop autoPlay playsInline controls={!compact} preload="metadata" aria-label="Playloot mobile arcade application walkthrough" />
        </div>
        <div className="playloot-desktop media-frame">
          <div className="media-topline"><span>PRODUCT MANAGEMENT STUDIO</span><span>02</span></div>
          <video src="/media/playloot-pms.mp4" poster="/media/playloot-pms-02.jpg" muted loop autoPlay playsInline controls={!compact} preload="metadata" aria-label="Playloot product management studio walkthrough" />
        </div>
        <span className="playloot-float-tag tag-product">FULL-STACK PRODUCT</span>
        <span className="playloot-float-tag tag-motion">UI IN MOTION</span>
      </div>

      {!compact && <>
        <div className="playloot-highlights">
          {highlights.map((item) => <article key={item.value}><span>{item.value}</span><h3>{item.label}</h3><p>{item.text}</p></article>)}
        </div>
        <div className="playloot-gallery" aria-label="Selected Playloot interface frames">
          <figure className="mobile-shot"><img src="/media/playloot-mobile-02.jpg" alt="Playloot player profile with wallet, statistics and rewards" /><figcaption>PLAYER PROFILE / WALLET &amp; PROGRESS</figcaption></figure>
          <figure><img src="/media/playloot-pms-01.jpg" alt="Playloot studio advertisement management interface" /><figcaption>PRODUCT STUDIO / AD MANAGEMENT</figcaption></figure>
          <figure><img src="/media/playloot-pms-03.jpg" alt="Playloot studio tournament moderation interface" /><figcaption>PRODUCT STUDIO / EVENTS &amp; MODERATION</figcaption></figure>
        </div>
      </>}

      {compact && <a className="playloot-link" href="#/projects">Explore the full case study <span aria-hidden="true">↗</span></a>}
    </section>
  );
}
