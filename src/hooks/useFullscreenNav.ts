/**
 * Fullscreen section navigator.
 *
 * Desktop (>= 1024px): hijacks wheel/keys to navigate between 100vh sections.
 * Mobile (< 1024px): native scroll, navigator does nothing.
 *
 * Uses History API so each section gets its own URL hash.
 */
class FullscreenNavigator {
  private sections: HTMLElement[] = [];
  private currentIndex = 0;
  private transitioning = false;
  private enabled = false;
  private readonly debounceMs = 800;
  private wheelTimer: ReturnType<typeof setTimeout> | null = null;
  private touchStartY = 0;

  init(): void {
    this.detectMobile();
    this.gatherSections();
    if (!this.enabled || this.sections.length === 0) return;

    this.bindEvents();
    this.goTo(this.getInitialIndex(), false);
    this.updateAria();
    this.updateProgress();
  }

  /* ---- detection ---- */
  private detectMobile(): void {
    const mql = window.matchMedia("(max-width: 1023px)");
    this.enabled = !mql.matches;
    mql.addEventListener("change", (e) => {
      this.enabled = !e.matches;
      if (!this.enabled) {
        this.showAllSections();
        this.container.style.overflow = "visible";
      } else {
        this.container.style.overflow = "hidden";
        this.goTo(this.currentIndex, false);
      }
    });
    if (this.enabled) {
      this.container.style.overflow = "hidden";
    }
  }

  /* ---- DOM ---- */
  private get container(): HTMLElement {
    return document.querySelector(".page-container") as HTMLElement;
  }

  private gatherSections(): void {
    const ids = ["hero", "projects", "stack", "experience", "contact"];
    this.sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
  }

  private getInitialIndex(): number {
    const hash = window.location.hash.replace("#", "");
    const idx = this.sections.findIndex((s) => s.id === hash);
    return idx >= 0 ? idx : 0;
  }

  /* ---- events ---- */
  private bindEvents(): void {
    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("keydown", this.onKey);
    this.bindNavLinks();
    this.bindMobileMenu();
    window.addEventListener("popstate", this.onPopState);
  }

  /* Wheel */
  private onWheel = (e: WheelEvent): void => {
    if (!this.enabled || this.transitioning) {
      // Let the inner scrollable sections handle it
      const target = e.target as HTMLElement | null;
      if (target?.closest(".scrollable-inner")) return;
      e.preventDefault();
      return;
    }
    e.preventDefault();

    const direction = Math.abs(e.deltaY) > Math.abs(e.deltaX)
      ? e.deltaY
      : e.deltaX;

    if (Math.abs(direction) < 30) return;

    if (this.wheelTimer) return;
    this.wheelTimer = setTimeout(() => {
      this.wheelTimer = null;
    }, this.debounceMs);

    this.goTo(
      direction > 0 ? this.currentIndex + 1 : this.currentIndex - 1,
      true
    );
  };

  /* Keys */
  private onKey = (e: KeyboardEvent): void => {
    if (!this.enabled) return;
    const target = e.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    )
      return;

    let dir = 0;
    if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
    else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;

    if (dir !== 0) {
      e.preventDefault();
      this.goTo(this.currentIndex + dir, true);
    }
  };

  /* History */
  private onPopState = (): void => {
    this.goTo(this.getInitialIndex(), false);
  };

  /* ---- navigation ---- */
  goTo(index: number, animate: boolean): void {
    if (!this.enabled) return;
    if (this.transitioning) return;
    if (index < 0 || index >= this.sections.length) return;
    if (index === this.currentIndex) return;

    this.transitioning = true;

    const leaving = this.sections[this.currentIndex];
    const entering = this.sections[index];
    const direction = index > this.currentIndex ? 1 : -1;

    // Animate out
    leaving.classList.add("section-exit");
    leaving.classList.add(direction > 0 ? "exit-up" : "exit-down");

    // Animate in
    entering.classList.add("section-enter");
    entering.classList.add(direction > 0 ? "enter-from-bottom" : "enter-from-top");

    const duration = animate ? 600 : 0;

    setTimeout(() => {
      leaving.classList.remove("section-active", "section-exit", "exit-up", "exit-down");
      entering.classList.add("section-active");
      entering.classList.remove("section-enter", "enter-from-bottom", "enter-from-top");

      leaving.setAttribute("aria-hidden", "true");
      entering.setAttribute("aria-hidden", "false");

      this.currentIndex = index;
      this.transitioning = false;

      this.updateProgress();
      this.updateActiveLink();
      this.triggerStagger(entering);
    }, duration);

    // Push state
    const hash = `#${this.sections[index].id}`;
    if (window.location.hash !== hash) {
      history.pushState(null, "", hash);
    }
  }

  /* ---- helpers ---- */
  private updateAria(): void {
    this.sections.forEach((s, i) => {
      s.setAttribute("aria-hidden", i === this.currentIndex ? "false" : "true");
      if (i === this.currentIndex) s.classList.add("section-active");
    });
  }

  private updateProgress(): void {
    const bar = document.getElementById("progress-fill");
    if (!bar) return;
    const pct = (this.currentIndex / (this.sections.length - 1)) * 100;
    bar.style.width = `${pct}%`;
    const parent = bar.parentElement;
    if (parent) {
      parent.setAttribute("aria-valuenow", String(Math.round(pct)));
    }
  }

  private updateActiveLink(): void {
    const current = this.sections[this.currentIndex];
    document.querySelectorAll("[data-section]").forEach((el) => {
      const section = el.getAttribute("data-section");
      if (section === current.id) {
        el.setAttribute("aria-current", "true");
      } else {
        el.removeAttribute("aria-current");
      }
    });
  }

  private triggerStagger(section: HTMLElement): void {
    const container = section.querySelector(".stagger-children");
    if (!container) return;
    // Reset animations
    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement;
      el.style.animation = "none";
      el.offsetHeight; // force reflow
      el.style.animation = "";
    }
  }

  private showAllSections(): void {
    this.sections.forEach((s) => {
      s.classList.add("section-active");
      s.setAttribute("aria-hidden", "false");
      s.classList.remove("section-exit", "exit-up", "exit-down", "section-enter", "enter-from-bottom", "enter-from-top");
    });
  }

  /* Mobile menu */
  private bindMobileMenu(): void {
    const btn = document.getElementById("menu-toggle");
    const overlay = document.getElementById("mobile-overlay");
    if (!btn || !overlay) return;

    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      overlay.classList.toggle("open", !open);
      overlay.setAttribute("aria-hidden", String(open));
    });

    overlay.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        btn.setAttribute("aria-expanded", "false");
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
      });
    });
  }

  /* Link clicks in navbar */
  private bindNavLinks(): void {
    document.querySelectorAll("[data-section]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const sectionId = link.getAttribute("data-section");
        if (!sectionId) return;
        const idx = this.sections.findIndex((s) => s.id === sectionId);
        if (idx < 0) return;
        e.preventDefault();
        this.goTo(idx, true);
      });
    });
  }
}

// Singleton
const navigator = new FullscreenNavigator();

// Export init for Astro
export function initFullscreenNav(): void {
  navigator.init();
}

// Expose for debugging
if (typeof window !== "undefined") {
  (window as any).__nav = navigator;
}
