import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ArtGallery.css";

gsap.registerPlugin(ScrollTrigger);

const interfaceStudies = [
  { src: "/media/art/interface-01.png", title: "Habit rhythm", type: "Goal-setting interface" },
  { src: "/media/art/interface-02.png", title: "Care network", type: "Medical community concept" },
  { src: "/media/art/interface-03.png", title: "Everyday commerce", type: "Shopping experience" },
  { src: "/media/art/interface-04.png", title: "Quiet utility", type: "Product and cart flow" },
  { src: "/media/art/interface-05.png", title: "Sportswear edit", type: "Editorial commerce" },
];

const motionStudies = [
  "Immersive product page",
  "Soft commerce motion",
  "Landing-page choreography",
  "Digital product composition",
  "Interface in motion",
  "Wide-screen experiment",
  "Editorial interaction",
  "Mobile finance concept",
  "Smart-home interface",
  "Reward interaction",
  "Mobile spatial study",
];

export default function ArtGallery() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".art-gallery-head > *", {
          y: 36, opacity: 0, stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 82%" },
        });
        gsap.from(".interface-piece", {
          y: 65, opacity: 0, stagger: 0.08, duration: 0.95, ease: "power3.out",
          scrollTrigger: { trigger: ".interface-mosaic", start: "top 84%" },
        });
        gsap.from(".motion-piece", {
          y: 48, opacity: 0, stagger: 0.055, duration: 0.75, ease: "power2.out",
          scrollTrigger: { trigger: ".motion-grid", start: "top 88%" },
        });
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  const play = (event) => event.currentTarget.play().catch(() => {});
  const pause = (event) => event.currentTarget.pause();

  return (
    <section className="art-gallery" ref={scope}>
      <header className="art-gallery-head">
        <p>VISUAL ARCHIVE / INTERFACE &amp; MOTION</p>
        <h2>Studies in form,<br/><em>rhythm and utility.</em></h2>
        <span>Selected UI concepts and motion references, collected as a working visual archive.</span>
      </header>

      <div className="gallery-section-label"><span>01</span><h3>Interface studies</h3><p>Five approaches to mobile product design.</p></div>
      <div className="interface-mosaic">
        {interfaceStudies.map((piece, index) => (
          <figure className={`interface-piece piece-${index + 1}`} key={piece.src}>
            <div><img src={piece.src} alt={`${piece.title} — ${piece.type}`} loading={index < 2 ? "eager" : "lazy"} /></div>
            <figcaption><span>{piece.title}</span><span>{piece.type}</span></figcaption>
          </figure>
        ))}
      </div>

      <div className="gallery-section-label motion-label"><span>02</span><h3>Motion studies</h3><p>Hover or tap to explore each film.</p></div>
      <div className="motion-grid">
        {motionStudies.map((title, index) => {
          const id = String(index + 1).padStart(2, "0");
          return (
            <figure className={`motion-piece motion-${id}`} key={title}>
              <div className="motion-frame">
                <video
                  src={`/media/art/film-${id}.mp4`}
                  poster={`/media/art/film-${id}.jpg`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls
                  onMouseEnter={play}
                  onMouseLeave={pause}
                  aria-label={`${title} motion design study`}
                />
                <span>{id}</span>
              </div>
              <figcaption>{title}</figcaption>
            </figure>
          );
        })}
      </div>

      <footer className="art-gallery-foot"><span>END OF CURRENT EDIT</span><p>The archive keeps changing as the work does.</p></footer>
    </section>
  );
}
