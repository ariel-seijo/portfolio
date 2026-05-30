/**
 * Detects prefers-reduced-motion and disables animations.
 */
export function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function watchReducedMotion(cb: (reduced: boolean) => void): void {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", () => cb(mql.matches));
  cb(mql.matches);
}
