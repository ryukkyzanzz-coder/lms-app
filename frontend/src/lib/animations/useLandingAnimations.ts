'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

/**
 * Landing page animations: GSAP + ScrollTrigger + ScrollSmoother.
 *
 * Architecture:
 * - useLayoutEffect fires before paint → no FOUC from GSAP set()
 * - ScrollSmoother wraps the entire page (smooth-wrapper / smooth-content)
 * - ScrollTrigger uses ScrollSmoother.normalizeScroll to align with proxy scroll
 * - fromTo pattern: elements are visible by default (CSS), only animate when
 *   scrolled into view — preventing invisible sections on init.
 * - Respects prefers-reduced-motion.
 */
export function useLandingAnimations() {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const ctx = gsap.context(() => {
      // ──────────────────────────────────────────────────────
      // 1. SCROLLSMOOTHER
      // ──────────────────────────────────────────────────────
      if (!prefersReducedMotion) {
        try {
          const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.0,          // Feel responsive, not sluggish
            effects: true,
            smoothTouch: 0.1,     // Light touch on mobile
            normalizeScroll: true,
            ignoreMobileResize: true,
          });
          smootherRef.current = smoother;
        } catch (e) {
          console.warn('[LandingAnimations] ScrollSmoother failed:', e);
        }
      }

      // ──────────────────────────────────────────────────────
      // 2. HERO ENTRANCE (plays on mount, no ScrollTrigger)
      // ──────────────────────────────────────────────────────
      if (!prefersReducedMotion) {
        const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        heroTl
          .fromTo(
            '.hero-title',
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
          )
          .fromTo(
            '.hero-fade',
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
            '-=0.5'
          )
          .fromTo(
            '.hero-visual',
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' },
            '-=0.6'
          );
      }

      // ──────────────────────────────────────────────────────
      // 3. SCROLL-TRIGGERED REVEALS
      //    Use fromTo (not from) so elements are visible by
      //    default — only animate when entering viewport.
      // ──────────────────────────────────────────────────────
      if (prefersReducedMotion) return;

      function reveal(
        selector: string,
        triggerSelector: string,
        options: { stagger?: number; yFrom?: number; delay?: number } = {}
      ) {
        const els = gsap.utils.toArray<Element>(selector);
        if (!els.length) return;
        const trigger =
          document.querySelector(triggerSelector) ?? (els[0] as Element);
        gsap.fromTo(
          els,
          { opacity: 0, y: options.yFrom ?? 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: options.stagger ?? 0,
            delay: options.delay ?? 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // Section 02: Intro Manifesto
      reveal('.intro-reveal', '#tentang-kami', { stagger: 0.15 });
      reveal('.intro-card', '.intro-card', { stagger: 0.12 });

      // Section 03: Programs
      reveal('.major-row', '#program-keahlian', { stagger: 0.12 });

      // Section 04: Educational Experience
      reveal('.experience-card', '#pengalaman-belajar', { stagger: 0.1 });

      // Section 05: Student Life
      reveal('.student-life-visual', '#kehidupan-siswa');
      reveal('.activity-item', '.activity-item', { stagger: 0.08, yFrom: 16 });

      // Section 06: Projects
      reveal('.project-card', '#proyek-siswa', { stagger: 0.1 });

      // Section 07: Facilities
      reveal('.facility-card', '#fasilitas', { stagger: 0.08 });

      // Section 08: News
      reveal('.news-card', '#berita', { stagger: 0.12 });

      // Section 09: CTA
      reveal('.cta-content', '#daftar', { yFrom: 24 });
    });

    // Final refresh after layout is stable
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);
}
