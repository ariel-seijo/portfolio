import { useRef, useEffect, useState } from "react";
import "./TerminalDivider.css";

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TerminalDivider({ title }) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slug = slugify(title);

  return (
    <div
      ref={containerRef}
      className={`terminal-divider${visible ? " terminal-divider--visible" : ""}`}
      aria-hidden="true"
    >
      <div className="terminal-divider__strip">
        <div className="terminal-divider__bg-dots" aria-hidden="true" />
        <div className="terminal-divider__content">
          <span className="terminal-divider__prompt">$ cd /</span>
          <span className="terminal-divider__slug">{slug}</span>
          <span className="terminal-divider__cursor" aria-hidden="true">█</span>
        </div>
      </div>
    </div>
  );
}
