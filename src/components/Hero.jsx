import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroPhoto from "../assets/img/hero.png";
import IdCard from "./IdCard";
import "./Hero.css";
import icard from "../assets/img/icard.png";

export default function Hero() {
  const scope = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero__eyebrow", { y: 16, opacity: 0, duration: 0.6 })
        .from(".hero__line", { y: 60, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.3")
        .from(".hero__cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero__stat", { y: 24, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.35")
        .from(".hero__photo-glow", { opacity: 0, duration: 1.2 }, "-=0.9")
        .from(".hero__photo", { scale: 1.08, opacity: 0, duration: 1.1 }, "-=1")
        .from(".hero__status-card, .hero__praise-card, .hero__id-card", { x: 30, opacity: 0, duration: 0.5, stagger: 0.15 }, "-=0.6");

      gsap.to(".hero__photo", { y: -10, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero__photo-shadow", { scaleX: 0.92, opacity: 0.7, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero" ref={scope}>
      <div className="hero__panel-right" aria-hidden="true" />
      <div className="hero__blobs" aria-hidden="true" />
                    <div className="hero__copy">
        <span className="hero__eyebrow">Over Series - The Client</span>

        <h1 className="hero__headline">
          <span className="hero__line">Become</span>
          <span className="hero__line">the Man</span>
          <span className="hero__line">in Control</span>
        </h1>

        <a href="#work" data-scroll-to className="hero__cta">
          Start Your Upgrade
        </a>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-label">Focus Level</span>
            <span className="hero__stat-badge">100%</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-label">Growth</span>
            <span className="hero__stat-badge">200%</span>
          </div>
        </div>

        <div className="hero__socials">
          <a href="#" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" /><path d="M8 10.5V17M8 7.5v.01M12 17v-4c0-1.4 1-2.3 2.2-2.3S16 11.6 16 13v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M13.8 8.5h-1.3c-.9 0-1.3.5-1.3 1.4V11h2.4l-.3 2.2h-2.1V19h-2.3v-5.8H7.6V11H9v-1.6c0-1.9 1.1-3 3-3h1.8v2.1z" fill="currentColor" /></svg>
          </a>
        </div>
      </div>
      <div className="hero__photo-wrap">
        <div className="hero__photo-glow" aria-hidden="true" />
        <div className="hero__photo-shadow" aria-hidden="true" />
        <img className="hero__photo" src={heroPhoto} alt="Portrait" />
      </div>

    

      <div className="hero__right-content">
        <div className="hero__id-card">
  
          <IdCard photo={icard} />
        </div>

        <div className="hero__status-card">
          <span className="hero__status-tag">Session</span>
          <p>
            Good morning, Alex. You have <b>3 priorities</b> today, including{" "}
            <b>1 deep&nbsp;work</b> session at 8&nbsp;AM. Ready to level up?
          </p>
          <span className="hero__status-foot">Clarity. Discipline. Measurable growth.</span>
        </div>

        <div className="hero__praise-card">
          <div className="hero__praise-top">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"
              alt="Jacki Homanzo"
            />
            <div>
              <strong>Jacki Homanzo</strong>
              <span>Freelancer</span>
            </div>
          </div>
          <p>
            "Personal coaching took my results to the next level"
          </p>
        </div>
      </div>
    </section>
  );
}