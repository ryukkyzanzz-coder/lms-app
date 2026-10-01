'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#f2fcf3]/95 backdrop-blur-md border-b border-[#dbe5dd]/60 transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_8px_rgba(0,0,0,0.06)]' : 'shadow-none'
      }`}
    >
      {/* Inner container — matches Stitch max-w with Stitch margin spacing */}
      <div className="h-20 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between gap-4">

        {/* ── BRAND IDENTITY ────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-1.5 h-7 bg-[#005131] rounded-[2px]" />
          <div className="flex flex-col min-w-0">
            {/* Main school name — never wraps */}
            <span
              className="stitch-headline-sm text-[#151e19] uppercase tracking-tight font-bold leading-tight whitespace-nowrap"
              style={{ fontSize: '18px', lineHeight: '24px' }}
            >
              SMK CITRA NEGARA
            </span>
            {/* Subtitle — hidden on very small screens */}
            <span className="hidden sm:block stitch-mono-caption text-[#3f4942] uppercase tracking-wider leading-tight whitespace-nowrap">
              Sekolah Menengah Kejuruan
            </span>
          </div>
        </Link>

        {/* ── DESKTOP NAVIGATION ────────────────────────────────── */}
        <nav className="hidden xl:flex items-center gap-5 flex-1 justify-center">
          <a
            aria-current="page"
            className="transition-colors text-[#005131] font-bold stitch-label-md whitespace-nowrap"
            href="#"
          >
            Beranda
          </a>
          <a
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] transition-colors whitespace-nowrap"
            href="#tentang-kami"
          >
            Tentang Kami
          </a>
          <a
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] transition-colors whitespace-nowrap"
            href="#program-keahlian"
          >
            Program Keahlian
          </a>
          <a
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] transition-colors whitespace-nowrap"
            href="#pengalaman-belajar"
          >
            Pengalaman Belajar
          </a>
          <a
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] transition-colors whitespace-nowrap"
            href="#kehidupan-siswa"
          >
            Kehidupan Siswa
          </a>
          <a
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] transition-colors whitespace-nowrap"
            href="#berita"
          >
            Berita
          </a>
          <a
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] transition-colors whitespace-nowrap"
            href="#kontak"
          >
            Kontak
          </a>
        </nav>

        {/* ── CTA ACTIONS ───────────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link
            className="hidden sm:inline stitch-label-md text-[#3f4942] hover:text-[#005131] transition-colors px-2 py-2 whitespace-nowrap"
            href="/login"
          >
            Masuk
          </Link>
          <a
            className="inline-flex items-center justify-center bg-[#005131] text-white stitch-label-md px-4 py-2.5 rounded-[2px] hover:bg-[#006c45] transition-colors shadow-sm whitespace-nowrap"
            href="#daftar"
          >
            Daftar
          </a>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#151e19] hover:bg-[#ecf6ee] transition-colors ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X size={22} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER MENU ──────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#f2fcf3] border-b border-[#dbe5dd] px-6 py-5 flex flex-col gap-3 shadow-lg">
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="stitch-label-md text-[#005131] font-bold py-1"
            href="#"
          >
            Beranda
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] py-1"
            href="#tentang-kami"
          >
            Tentang Kami
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] py-1"
            href="#program-keahlian"
          >
            Program Keahlian
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] py-1"
            href="#pengalaman-belajar"
          >
            Pengalaman Belajar
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] py-1"
            href="#kehidupan-siswa"
          >
            Kehidupan Siswa
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] py-1"
            href="#berita"
          >
            Berita
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="stitch-label-md text-[#3f4942] hover:text-[#151e19] py-1"
            href="#kontak"
          >
            Kontak
          </a>
          <div className="pt-3 border-t border-[#dbe5dd] flex items-center gap-3">
            <Link
              onClick={() => setMobileMenuOpen(false)}
              href="/login"
              className="flex-1 text-center py-2.5 bg-[#ecf6ee] text-[#005131] stitch-label-md rounded-[2px]"
            >
              Masuk ke Portal LMS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
