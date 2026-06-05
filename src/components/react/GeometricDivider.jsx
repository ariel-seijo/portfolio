import { useRef, useEffect, useState } from "react";
import "./GeometricDivider.css";

export default function GeometricDivider({ title }) {
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

  return (
    <div
      ref={containerRef}
      className={`geometric-divider${visible ? " geometric-divider--visible" : ""}`}
      aria-hidden="true"
    >
      {/* Pattern layer */}
      <div className="geometric-divider__pattern" aria-hidden="true">
        <div className="geometric-divider__dots" />
        <div className="geometric-divider__gradient" />
      </div>

      {/* Pill */}
      <div className="geometric-divider__pill">
        <span className="geometric-divider__bracket" aria-hidden="true">&lt;</span>
        <span className="geometric-divider__label">{title}</span>
        <span className="geometric-divider__bracket" aria-hidden="true">/&gt;</span>
      </div>
    </div>
  );
}
