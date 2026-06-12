import { useEffect } from "react";
import { animate, stagger } from "animejs";

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement);
        if (visible.length) {
          animate(visible, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 900,
            delay: stagger(70),
            ease: "outExpo",
          });
          visible.forEach((el) => obs.unobserve(el));
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll<HTMLElement>(".reveal-item, .fade-up")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}