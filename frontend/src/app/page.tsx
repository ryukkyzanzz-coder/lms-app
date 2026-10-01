'use client';

import React from 'react';
import '@/components/landing/landing.css';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Intro from '@/components/landing/Intro';
import Programs from '@/components/landing/Programs';
import EducationalExperience from '@/components/landing/EducationalExperience';
import StudentLife from '@/components/landing/StudentLife';
import Projects from '@/components/landing/Projects';
import Facilities from '@/components/landing/Facilities';
import News from '@/components/landing/News';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import { useLandingAnimations } from '@/lib/animations/useLandingAnimations';

/**
 * Landing page entry point.
 *
 * ScrollSmoother requires:
 *   #smooth-wrapper  → position:fixed, overflow:hidden
 *   #smooth-content  → the scrollable content inside
 *
 * Header is fixed via CSS (z-50), so it lives OUTSIDE the scroll wrapper
 * to prevent it from being affected by ScrollSmoother transforms.
 */
export default function HomePage() {
  useLandingAnimations();

  return (
    <div className="stitch-root">
      {/* Fixed navbar — outside smooth scroll scope */}
      <Header />

      {/* ScrollSmoother scope */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="w-full pt-20 bg-[#f2fcf3]">
            <Hero />
            <Intro />
            <Programs />
            <EducationalExperience />
            <StudentLife />
            <Projects />
            <Facilities />
            <News />
            <CTA />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
