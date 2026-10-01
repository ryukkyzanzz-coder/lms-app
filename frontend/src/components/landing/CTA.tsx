import React from 'react';
import { UserCheck, Download } from 'lucide-react';

export default function CTA() {
  return (
    <section className="w-full bg-[#005131] text-white py-20 sm:py-24 relative overflow-hidden" id="daftar">
      {/* Subtle Coordinate Accents on Solid Green */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="stitch-container h-full flex justify-between border-x border-white">
          <div className="w-px h-full bg-white" />
          <div className="w-px h-full bg-white" />
        </div>
      </div>

      <div className="stitch-container relative z-10">
        <div className="max-w-4xl cta-content">
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-[#98f6c2]" />
            <span className="stitch-mono-caption text-[#98f6c2] uppercase tracking-widest">
              09 / TAHUN AJARAN 2025/2026
            </span>
          </div>

          {/* Monumental Headline */}
          <h2 className="stitch-display font-extrabold text-white uppercase tracking-tighter mb-6 leading-tight">
            Siap melangkah ke dunia yang lebih luas?
          </h2>

          {/* Context Copy */}
          <p className="stitch-body-lg text-[#99e9b9] max-w-2xl mb-10 leading-relaxed">
            Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2025/2026 telah dibuka. Konsultasikan peminatan keahlian putra-putri Anda bersama tim akademik kami atau ikuti program kunjungan kampus mandiri.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="inline-flex items-center justify-center bg-white text-[#005131] stitch-label-md px-8 py-4 rounded-[2px] hover:bg-[#e6f0e8] transition-colors shadow-sm font-bold tracking-tight"
              href="#pendaftaran-ppdb"
            >
              <span>Informasi &amp; Pendaftaran PPDB</span>
              <UserCheck size={18} strokeWidth={2} aria-hidden="true" className="ml-2" />
            </a>
            <a
              className="inline-flex items-center justify-center bg-transparent text-white border border-[#98f6c2]/40 hover:bg-white/10 stitch-label-md px-7 py-4 rounded-[2px] transition-colors font-medium"
              href="#unduh-brosur"
            >
              <Download size={18} strokeWidth={2} aria-hidden="true" className="mr-2" />
              <span>Unduh Panduan Brosur Akademik</span>
            </a>
          </div>

          {/* Bottom Informational Bar */}
          <div className="mt-14 pt-8 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 stitch-mono-caption text-[#98f6c2]">
            <div>HOTLINE PPDB: (021) 7721-3456 / WHATSAPP: 0812-9900-2025</div>
            <div>LOKASI: KEMIRI MUKA, BEJI, KOTA DEPOK</div>
          </div>
        </div>
      </div>
    </section>
  );
}
