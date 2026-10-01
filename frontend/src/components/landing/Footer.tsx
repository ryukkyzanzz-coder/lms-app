import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#151e19] text-[#dbe5dd]" id="kontak">
      <div className="stitch-container pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="stitch-headline-sm text-white uppercase tracking-tight font-bold">
                SMK CITRA NEGARA
              </span>
              <span className="stitch-mono-caption text-[#98f6c2] bg-[#dbe5dd]/20 px-1.5 py-0.5 rounded-[2px]">
                ID-VOC-3276
              </span>
            </div>
            <p className="stitch-mono-caption text-[#bfc9c0] uppercase mb-4 tracking-wider">
              Pendidikan Berbasis Industri &amp; Integritas Teknologis
            </p>
            <div className="stitch-body-sm text-[#bfc9c0] space-y-1">
              <p>Jl. Tanah Baru No. 12, Kemiri Muka, Beji</p>
              <p>Kota Depok, Jawa Barat 16423, Indonesia</p>
              <p className="stitch-mono-caption text-[#98f6c2] pt-2">
                NPSN: 20268291 // NSS: 402026804001
              </p>
            </div>
          </div>

          {/* 01 Navigasi Utama (2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <span className="stitch-mono-caption text-[#98f6c2] uppercase tracking-wider mb-4">
              01 / Navigasi Utama
            </span>
            <ul className="space-y-2 stitch-body-sm text-[#dbe5dd]">
              <li className="hover:text-white transition-colors">
                <a href="#">Beranda</a>
              </li>
              <li className="hover:text-white transition-colors">
                <a href="#tentang-kami">Tentang Kami</a>
              </li>
              <li className="hover:text-white transition-colors">
                <a href="#program-keahlian">Program Keahlian</a>
              </li>
              <li className="hover:text-white transition-colors">
                <a href="#pengalaman-belajar">Pengalaman Belajar</a>
              </li>
              <li className="hover:text-white transition-colors">
                <a href="#kehidupan-siswa">Kehidupan Siswa</a>
              </li>
              <li className="hover:text-white transition-colors">
                <a href="#berita">Warta &amp; Berita</a>
              </li>
              <li className="hover:text-white transition-colors">
                <Link href="/login">Portal LMS</Link>
              </li>
            </ul>
          </div>

          {/* 02 Program Keahlian (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="stitch-mono-caption text-[#98f6c2] uppercase tracking-wider mb-4">
              02 / Program Keahlian
            </span>
            <ul className="space-y-2.5 stitch-body-sm text-[#dbe5dd]">
              <li className="flex items-center justify-between">
                <span className="text-[#bfc9c0] stitch-mono-caption">PPLG</span>
                <span>Pengembangan Perangkat Lunak</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#bfc9c0] stitch-mono-caption">TJKT</span>
                <span>Teknik Jaringan Komputer</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#bfc9c0] stitch-mono-caption">DKV</span>
                <span>Desain Komunikasi Visual</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#bfc9c0] stitch-mono-caption">TKRO</span>
                <span>Teknik Kendaraan Ringan</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#bfc9c0] stitch-mono-caption">MPLB</span>
                <span>Manajemen Perkantoran</span>
              </li>
            </ul>
          </div>

          {/* 03 Informasi & Kontak (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="stitch-mono-caption text-[#98f6c2] uppercase tracking-wider mb-4">
              03 / Informasi &amp; Kontak
            </span>
            <div className="stitch-body-sm text-[#dbe5dd] space-y-2.5 mb-5">
              <div className="flex flex-col">
                <span className="stitch-mono-caption text-[#bfc9c0] uppercase">
                  Telepon Sentral
                </span>
                <span className="text-white stitch-label-md">(021) 7721-3456</span>
              </div>
              <div className="flex flex-col">
                <span className="stitch-mono-caption text-[#bfc9c0] uppercase">
                  Surel Kedinasan
                </span>
                <span className="text-white stitch-label-md">
                  info@smkcitranegara.sch.id
                </span>
              </div>
              <div className="flex flex-col">
                <span className="stitch-mono-caption text-[#bfc9c0] uppercase">
                  Jam Operasional
                </span>
                <span className="text-[#bfc9c0]">
                  Senin - Jumat: 07.00 - 16.00 WIB
                </span>
              </div>
            </div>
            <a
              className="inline-flex items-center justify-center bg-[#005131] text-white stitch-label-sm py-2.5 px-4 rounded-[2px] hover:bg-[#006c45] transition-colors text-center"
              href="#daftar"
            >
              Pusat Informasi PPDB Online
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#3f4942]/60 flex flex-col md:flex-row items-center justify-between gap-4 stitch-mono-caption text-[#bfc9c0]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2025 SMK CITRA NEGARA. Hak Cipta Dilindungi.</span>
            <span className="hidden md:inline">•</span>
            <span>STATUS AKREDITASI: A (UNGGUL)</span>
          </div>
          <div>
            <span>KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
