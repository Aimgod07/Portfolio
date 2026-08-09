import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MusicBar from "./MusicBar.jsx";
import "./SkillsScroller.css";

gsap.registerPlugin(ScrollTrigger);

// Edit freely — swap covers/labels for your own skill or project artwork later.
const CARDS = [
  { name: "REACTJS", tag: "Frontend Library", image: "https://picsum.photos/seed/reactjs/500/620" },
  { name: "NODEJS", tag: "Runtime", image: "https://picsum.photos/seed/nodejs/500/620" },
  { name: "PYTHON", tag: "Language", image: "https://picsum.photos/seed/python/500/620" },
  { name: "NEXTJS", tag: "Framework", image: "https://picsum.photos/seed/nextjs/500/620" },
  { name: "AWS", tag: "Cloud", image: "https://picsum.photos/seed/aws/500/620" },
  { name: "THREEJS", tag: "3D / WebGL", image: "https://picsum.photos/seed/threejs/500/620" },
  { name: "GSAP", tag: "Animation", image: "https://picsum.photos/seed/gsap/500/620" },
];

const CENTER = Math.floor(CARDS.length / 2);

export default function SkillsScroller() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;

    const applyProgress = (p) => {
      cards.forEach((card, i) => {
        if (!card) return;
        const offset = i - CENTER;
        const abs = Math.abs(offset);
        const dir = Math.sign(offset);

        const rotateY = dir * (10 + p * 26);
        const translateX = offset * (18 + p * 200);
        const translateZ = -abs * (10 + p * 70);
        const scale = (offset === 0 ? 0.92 + p * 0.23 : 0.86 - abs * 0.03) - abs * p * 0.02;
        const opacity = 1 - abs * (0.06 + p * 0.16);

        card.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = Math.max(opacity, 0.25);
        card.style.zIndex = String(100 - abs);
      });
    };

    applyProgress(0);

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=130%",
        pin: pinRef.current,
        scrub: 0.7,
        onUpdate: (self) => applyProgress(self.progress),
      });

      gsap.from(".spotify__eyebrow, .spotify__heading", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="spotify" ref={sectionRef}>
      <div className="spotify__pin" ref={pinRef}>
        <div className="spotify__bg" style={{ backgroundImage: `url(${CARDS[CENTER].image})` }} />
        <div className="spotify__scrim" />

        <div className="spotify__head">
          <span className="spotify__eyebrow">Tech Stack</span>
          <h2 className="spotify__heading">Tools I reach for daily</h2>
        </div>

        <div className="spotify__stage">
          {CARDS.map((c, i) => (
            <div
              className={`spotify__card ${i === CENTER ? "is-center" : ""}`}
              key={c.name}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <img src={c.image} alt={c.name} loading="lazy" />
              <div className="spotify__card-shade" />
              <div className="spotify__card-label">
                <span>{c.tag}</span>
                <h3>{c.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <MusicBar />
      </div>
    </section>
  );
}