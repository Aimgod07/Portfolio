import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import reactImage from "../assets/img/react.jpg";
import nodeImage from "../assets/img/nodejs.jpg";
import aiImage from "../assets/img/ai.jpg";
import awsImage from "../assets/img/aws.jpg";
import "./SkillsPortfolio.css";

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  { number: "01", title: "Interfaces", note: "Clear, responsive and expressive.", image: reactImage, alt: "Abstract React interface artwork" },
  { number: "02", title: "Systems", note: "Reliable products behind the screen.", image: nodeImage, alt: "Node.js development artwork" },
  { number: "03", title: "AI workflows", note: "Faster exploration with human judgment.", image: aiImage, alt: "Generative AI visual artwork" },
  { number: "04", title: "Cloud delivery", note: "From local idea to live product.", image: awsImage, alt: "Cloud infrastructure artwork" },
];

const groups = [
  { title: "Web & application", skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js"] },
  { title: "Data & architecture", skills: ["MongoDB", "MySQL", "PostgreSQL", "Data Structures", "System Design"] },
  { title: "Cloud & delivery", skills: ["Docker", "Kubernetes", "AWS CloudFormation", "GitHub"] },
  { title: "AI & product design", skills: ["Python", "Generative AI Development", "ChatGPT", "Vibe Coding", "Figma", "UI & UX Design"] },
];

export default function SkillsPortfolio() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".skills-header > *", {
          y: 32, opacity: 0, stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 80%" },
        });
        gsap.from(".discipline-card", {
          y: 55, opacity: 0, stagger: 0.09, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".discipline-grid", start: "top 82%" },
        });
        gsap.from(".skill-group", {
          y: 28, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".skill-index", start: "top 88%" },
        });
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section className="skills-portfolio" ref={scope}>
      <header className="skills-header">
        <p>CAPABILITIES / TOOLS I USE</p>
        <h2>Broad enough to build.<br/><em>Focused enough to care.</em></h2>
        <span>Design, development and delivery—kept in one connected practice.</span>
      </header>

      <div className="discipline-grid">
        {disciplines.map((item) => (
          <article className="discipline-card" key={item.title}>
            <div className="discipline-image"><img src={item.image} alt={item.alt} loading="lazy" /><span>{item.number}</span></div>
            <h3>{item.title}</h3>
            <p>{item.note}</p>
          </article>
        ))}
      </div>

      <div className="skill-index">
        {groups.map((group, index) => (
          <article className="skill-group" key={group.title}>
            <header><span>0{index + 1}</span><h3>{group.title}</h3></header>
            <div>{group.skills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
