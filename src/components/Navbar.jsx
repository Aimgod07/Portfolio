import { useEffect, useState } from "react";
import "./Navbar.css";

const LINKS = [
  { label: "About", href: "#hero" },
  { label: "Results", href: "#work" },
  { label: "Programs", href: "#skills" },
  { label: "Progress", href: "#connect" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a className="nav__mark" href="#hero" aria-label="Home">
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
          <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="white" strokeWidth="2.5" fill="none"/>
          <path d="M20 10L28 14.5V23.5L20 28L12 23.5V14.5L20 10Z" fill="white"/>
        </svg>
      </a>

      <nav className="nav__links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} data-scroll-to>
            {l.label}
          </a>
        ))}
      </nav>

      <a className="nav__contact" href="mailto:ihyaet@gmail.com">
        ihyaet@gmail.com
      </a>

      <button
        className={`nav__burger ${open ? "is-open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      {open && (
        <div className="nav__mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-scroll-to onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="mailto:ihyaet@gmail.com">ihyaet@gmail.com</a>
        </div>
      )}
    </header>
  );
}