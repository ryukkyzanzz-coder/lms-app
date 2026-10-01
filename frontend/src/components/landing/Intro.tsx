import React from 'react';

export default function Intro() {
  return (
    <section className="w-full bg-[#f2fcf3] py-20 sm:py-24 border-b border-[#dbe5dd]/80" id="tentang-kami">
      <div className="stitch-container">
        {/* Anchor Accent Marker */}
        <div className="flex items-center gap-4 mb-6 intro-reveal">
          <span className="w-12 h-[2px] bg-[#005131]" />
          <span className="stitch-mono-caption text-[#005131] uppercase tracking-widest">
            02 / MANIFIESTO PENDIDIKAN
          </span>
        </div>

        {/* Monumental Statement */}
        <div className="max-w-5xl mb-10 intro-reveal">
          <p className="stitch-headline-xl text-[#151e19] font-bold tracking-tight leading-[1.25]">
            Belajar bukan hanya tentang memahami teori. Tetapi tentang membangun kapasitas nyata untuk mengeksekusi, berinovasi, dan bertanggung jawab di dunia kerja.
          </p>
        </div>

        {/* Institutional Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#dbe5dd]/80">
          <div className="flex flex-col pr-0 md:pr-4 intro-card">
            <span className="stitch-mono-caption text-[#005131] font-bold uppercase mb-2">
              Pilar I
            </span>
            <h3 className="stitch-headline-sm text-[#151e19] mb-2 font-semibold">
              Kurikulum Berbasis Kompetensi
            </h3>
            <p className="stitch-body-md text-[#3f4942] leading-relaxed">
              Struktur pengajaran disusun secara presisi bersama pakar industri teknologi dan manufaktur untuk memastikan relevansi setiap jam tatap muka praktikum.
            </p>
          </div>

          <div className="flex flex-col px-0 md:px-4 md:border-l border-[#dbe5dd]/80 intro-card">
            <span className="stitch-mono-caption text-[#005131] font-bold uppercase mb-2">
              Pilar II
            </span>
            <h3 className="stitch-headline-sm text-[#151e19] mb-2 font-semibold">
              Karakter &amp; Disiplin Kerja
            </h3>
            <p className="stitch-body-md text-[#3f4942] leading-relaxed">
              Standar etos kerja 5R (Ringkas, Rapi, Resik, Rawat, Rajin) diterapkan secara konsisten dalam seluruh ritme harian interaksi akademik siswa.
            </p>
          </div>

          <div className="flex flex-col pl-0 md:pl-4 md:border-l border-[#dbe5dd]/80 intro-card">
            <span className="stitch-mono-caption text-[#005131] font-bold uppercase mb-2">
              Pilar III
            </span>
            <h3 className="stitch-headline-sm text-[#151e19] mb-2 font-semibold">
              Fasilitas Standar Industri
            </h3>
            <p className="stitch-body-md text-[#3f4942] leading-relaxed">
              Ruang server rack, workstation pengembang, dan perangkat bengkel diagnosa terstandardisasi sesuai ekosistem kerja perusahaan rekanan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
