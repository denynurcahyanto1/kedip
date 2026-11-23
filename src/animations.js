import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let scrollTriggerRegistered = false;

export function applyScrollReveals(root, prefersReducedMotion, animate) {
  if (prefersReducedMotion) {
    return 0;
  }

  const targets = root.querySelectorAll('[data-reveal]');
  targets.forEach(animate);
  return targets.length;
}

export function initScrollReveals(root = document) {
  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }

  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    applyScrollReveals(root, false, (element) => {
      gsap.from(element, {
        opacity: 0,
        y: 12,
        duration: 0.4,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  });

  return () => media.revert();
}
