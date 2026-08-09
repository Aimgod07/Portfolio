import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectCarousel.css";

gsap.registerPlugin(ScrollTrigger);

// Edit this array to swap in your own projects later.
const PROJECTS = [
  {
    title: "Nimbus Analytics",
    tag: "SaaS Dashboard",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Fintra Wallet",
    tag: "React Native App",
    cover:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Orbit CMS",
    tag: "Node + Next.js",
    cover:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Pulse Realtime",
    tag: "WebSocket Platform",
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Verve Store",
    tag: "Headless Commerce",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Atlas Maps",
    tag: "Three.js + WebGL",
    cover:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  },
];

export default function ProjectCarousel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(Math.floor(PROJECTS.length / 2));

  // Fan/stack visual styling based on distance from track center
  const styleCards = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const r = card.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const dist = cardCenter - centerX;
      const absDist = Math.abs(dist);
      const norm = Math.min(absDist / (trackRect.width / 2.1), 1);

      const scale = 1 - norm * 0.28;
      const translateY = norm * 26;
      const rotate = (dist / trackRect.width) * -22;
      const opacity = 1 - norm * 0.55;

      card.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
      card.style.opacity = opacity;
      card.style.zIndex = String(100 - Math.round(absDist));

      if (absDist < closestDist) {
        closestDist = absDist;
        closestIdx = i;
      }
    });

    setActiveIndex(closestIdx);
  };

  useEffect(() => {
    const track = trackRef.current;
    styleCards();

    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(styleCards);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Center the track on load
    requestAnimationFrame(() => {
      const mid = (track.scrollWidth - track.clientWidth) / 2;
      track.scrollLeft = mid;
      styleCards();
    });

    // ScrollTrigger: drive horizontal auto-scroll from vertical page scroll,
    // while native overflow-x still allows free manual scroll/drag.
    const maxScroll = () => track.scrollWidth - track.clientWidth;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        track.scrollLeft = self.progress * maxScroll();
        styleCards();
      },
    });

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      st.kill();
    };
  }, []);

  return (
    <section id="work" className="carousel-section" ref={sectionRef}>
      <div className="carousel-section__head">
        <span className="carousel-section__eyebrow">Selected Work</span>
        <h2>
          Projects I've <span>Built &amp; Shipped</span>
        </h2>
        <p>Scroll the page, or drag the row — the shelf moves either way.</p>
      </div>

      <div className="carousel" role="region" aria-label="Project carousel">
        <div className="carousel__track" ref={trackRef}>
          <div className="carousel__pad" aria-hidden="true" />
          {PROJECTS.map((p, i) => (
            <article
              className={`carousel__card ${i === activeIndex ? "is-active" : ""}`}
              key={p.title}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="carousel__cover">
                <img src={p.cover} alt={p.title} loading="lazy" />
                <div className="carousel__cover-shade" />
              </div>
              <div className="carousel__meta">
                <span>{p.tag}</span>
                <h3>{p.title}</h3>
              </div>
            </article>
          ))}
          <div className="carousel__pad" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
