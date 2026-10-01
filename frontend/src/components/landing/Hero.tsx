import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative w-full border-b border-[#dbe5dd]/80 bg-[#f2fcf3] overflow-hidden"
      id="hero"
    >
      <div className="stitch-container pt-10 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ── LEFT: Editorial Content (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col pt-2">
            {/* Eyebrow Metadata */}
            <div className="flex items-center gap-1.5 mb-4 hero-fade">
              <span className="inline-block w-2 h-2 bg-[#005131]" />
              <span className="stitch-mono-caption text-[#005131] tracking-widest uppercase">
                01 / PENDIDIKAN KEJURUAN BERBASIS INDUSTRI
              </span>
              <span className="text-[#bfc9c0] stitch-mono-caption">·</span>
              <span className="stitch-mono-caption text-[#3f4942] tracking-wider uppercase">
                DEP.CN-VOC
              </span>
            </div>

            {/* Massive Headline */}
            <h1 className="stitch-display font-extrabold text-[#151e19] tracking-tighter uppercase mb-6 hero-title leading-[1.08]">
              Membentuk<br />
              Keterampilan.<br />
              <span className="text-[#005131]">Menyiapkan</span><br />
              Masa Depan.
            </h1>

            {/* Supporting Editorial Copy */}
            <p className="stitch-body-lg text-[#3f4942] max-w-xl mb-10 hero-fade">
              Pendidikan kejuruan yang menghubungkan pembelajaran terapan,
              teknologi mutakhir, kedisiplinan karakter, dan kesiapan nyata
              menghadapi ekosistem kerja global.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 hero-fade">
              <a
                className="inline-flex items-center justify-center bg-[#005131] text-white stitch-label-md px-7 py-3.5 rounded-[2px] hover:bg-[#006c45] transition-colors duration-150 group shadow-sm"
                href="#program-keahlian"
              >
                <span>Jelajahi Program Keahlian</span>
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <a
                className="inline-flex items-center gap-2 stitch-label-md text-[#005131] hover:text-[#006c45] py-3 px-2 group transition-colors"
                href="#pengalaman-belajar"
              >
                <span>Kenali SMK Citra Negara</span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Technical Grid Coordinates Bar */}
            <div className="grid grid-cols-3 pt-4 border-t border-[#dbe5dd]/80 max-w-xl hero-fade">
              <div className="flex flex-col pr-2">
                <span className="stitch-mono-caption text-[#3f4942] uppercase tracking-wider">Status NPSN</span>
                <span className="stitch-label-md text-[#151e19] font-semibold mt-1">Terakreditasi A</span>
                <span className="stitch-mono-caption text-[#005131]">Unggul 96.00</span>
              </div>
              <div className="flex flex-col px-3 border-l border-[#dbe5dd]/80">
                <span className="stitch-mono-caption text-[#3f4942] uppercase tracking-wider">Kurikulum</span>
                <span className="stitch-label-md text-[#151e19] font-semibold mt-1">Merdeka Vokasi</span>
                <span className="stitch-mono-caption text-[#6f7a71]">Berbasis Industri</span>
              </div>
              <div className="flex flex-col pl-3 border-l border-[#dbe5dd]/80">
                <span className="stitch-mono-caption text-[#3f4942] uppercase tracking-wider">Kemitraan DUDI</span>
                <span className="stitch-label-md text-[#151e19] font-semibold mt-1">48+ Korporasi</span>
                <span className="stitch-mono-caption text-[#6f7a71]">Jabodetabek Area</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Photographic Architecture Frame (5 cols) ── */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 hero-visual">
            <div className="relative bg-white p-2 border border-[#dbe5dd] shadow-[0_4px_20px_-4px_rgba(21,30,25,0.06)]">
              {/* Precise Corner Index Brackets */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#005131] z-10 pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#005131] z-10 pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#005131] z-10 pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#005131] z-10 pointer-events-none" />

              {/* Photo slot */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#e6f0e8]">
                <Image
                  src="/images/landing/hero-lab.jpg"
                  alt="Siswa SMK Citra Negara di Lab Komputer"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute top-3 left-3 bg-[#f2fcf3]/90 backdrop-blur-sm px-2 py-1 border border-[#dbe5dd] z-10">
                  <span className="stitch-mono-caption text-[#005131] uppercase font-bold">
                    LAB-PPLG // CAM-01
                  </span>
                </div>
              </div>

              {/* Architectural Metadata Caption */}
              <div className="pt-3 pb-1 px-2 flex items-center justify-between stitch-mono-caption text-[#3f4942]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005131] animate-pulse" />
                  <span className="text-[#151e19] font-semibold">
                    Laboratorium Rekayasa Perangkat Lunak
                  </span>
                </div>
                <span className="text-[#6f7a71] uppercase">Sesi Praktik Terbimbing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
