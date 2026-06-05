import { useRef, useEffect, useState } from "react";
import "./HorizonDivider.css";

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function HorizonDivider({ title }) {
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
      className={`horizon-divider${visible ? " horizon-divider--visible" : ""}`}
      aria-hidden="true"
    >
      {/* Background glow */}
      <div className="horizon-divider__bg-glow" aria-hidden="true" />

      {/* Line with particles */}
      <div className="horizon-divider__line-wrapper">
        <div className="horizon-divider__line" />
        <span className="horizon-divider__particle horizon-divider__particle--1" aria-hidden="true" />
        <span className="horizon-divider__particle horizon-divider__particle--2" aria-hidden="true" />
        <span className="horizon-divider__particle horizon-divider__particle--3" aria-hidden="true" />
        <span className="horizon-divider__particle horizon-divider__particle--4" aria-hidden="true" />
      </div>

      {/* Pill badge */}
      <div className="horizon-divider__pill">
        <span className="horizon-divider__prompt">$ cd /</span>
        <span className="horizon-divider__slug">{slug}</span>
      </div>
    </div>
  );
}
