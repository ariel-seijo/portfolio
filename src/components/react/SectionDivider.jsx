import { useRef, useEffect, useCallback } from "react";
import "./SectionDivider.css";

export default function SectionDivider({ title }) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) {
        rafRef.current = null;
        return;
      }
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = containerRef.current;
    if (el) {
      el.style.setProperty("--mx", "-9999px");
      el.style.setProperty("--my", "-9999px");
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div ref={containerRef} className="section-title-divider" aria-hidden="true">
      <span className="section-title-divider__text">{title}</span>
      <span className="section-title-divider__spotlight" aria-hidden="true">
        {title}
      </span>
    </div>
  );
}
