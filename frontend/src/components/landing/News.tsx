import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function News() {
  return (
    <section className="w-full bg-[#f2fcf3] py-20 sm:py-24 border-b border-[#dbe5dd]/80" id="berita">
      <div className="stitch-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#dbe5dd]/80">
          <div>
            <span className="stitch-mono-caption text-[#005131] uppercase tracking-widest block mb-2">
              08 / PUBLIKASI &amp; WARTA
            </span>
            <h2 className="stitch-headline-lg text-[#151e19] uppercase tracking-tight font-bold">
              Kabar Institusi &amp; Prestasi
            </h2>
          </div>
          <a
            className="stitch-label-md text-[#005131] font-semibold hover:text-[#006c45] inline-flex items-center gap-1 mt-2 md:mt-0 group"
            href="#arsip-berita"
          >
            <span>Arsip Berita Lengkap</span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Journalistic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Featured Headline (7 cols) */}
          <article className="lg:col-span-7 bg-white p-6 lg:p-8 border border-[#dbe5dd] flex flex-col justify-between h-full news-card shadow-xs">
            <div>
              <div className="flex items-center gap-2 stitch-mono-caption text-[#6f7a71] mb-3">
                <span className="text-[#005131] font-bold">KERJASAMA INDUSTRI</span>
                <span>{'//'}</span>
                <time dateTime="2025-01-14">14 JANUARI 2025</time>
              </div>
              <h3 className="stitch-headline-lg font-bold text-[#151e19] hover:text-[#005131] transition-colors mb-4 leading-tight">
                Pembaruan Kerja Sama Kurikulum Industri dan Kesiapan Sertifikasi Kompetensi Siswa 2025/2026
              </h3>
              <p className="stitch-body-md text-[#3f4942] mb-6 leading-relaxed">
                SMK Citra Negara memperluas sinkronisasi kurikulum dengan konsorsium penyedia cloud dan telekomunikasi regional. Sebanyak 180 calon lulusan tahun ajaran berjalan ditargetkan memiliki lisensi sertifikasi berstandar industri internasional sebelum masa kelulusan resmi.
              </p>
            </div>
            <div className="pt-4 border-t border-[#dbe5dd]/60 flex items-center justify-between stitch-mono-caption text-[#3f4942]">
              <span>DOKUMEN PERS {'//'} ID-PR-2025-01</span>
              <a className="text-[#005131] font-semibold hover:underline inline-flex items-center gap-1 group" href="#">
                <span>Baca Laporan Penuh</span>
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </article>

          {/* Secondary Stories (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <article className="bg-white p-6 border border-[#dbe5dd] flex flex-col justify-between news-card shadow-xs">
              <div>
                <div className="flex items-center gap-2 stitch-mono-caption text-[#6f7a71] mb-2">
                  <span className="text-[#005131] font-bold">INFORMASI PENERIMAAN</span>
                  <span>{'//'}</span>
                  <time dateTime="2025-01-10">10 JANUARI 2025</time>
                </div>
                <h4 className="stitch-headline-sm font-bold text-[#151e19] hover:text-[#005131] transition-colors mb-2">
                  Jadwal Sosialisasi Penerimaan Peserta Didik Baru (PPDB) Gelombang I
                </h4>
                <p className="stitch-body-sm text-[#3f4942] leading-relaxed">
                  Agenda pengenalan program keahlian secara tatap muka dan tur laboratorium terbuka diselenggarakan setiap akhir pekan sepanjang bulan Februari 2025.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#dbe5dd]/60 flex justify-end stitch-mono-caption">
                <a className="text-[#005131] font-semibold hover:underline inline-flex items-center gap-1 group" href="#">
                  <span>Rincian Acara &amp; Registrasi</span>
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </article>

            <article className="bg-white p-6 border border-[#dbe5dd] flex flex-col justify-between news-card shadow-xs">
              <div>
                <div className="flex items-center gap-2 stitch-mono-caption text-[#6f7a71] mb-2">
                  <span className="text-[#005131] font-bold">PAMERAN KARYA</span>
                  <span>{'//'}</span>
                  <time dateTime="2024-12-20">20 DESEMBER 2024</time>
                </div>
                <h4 className="stitch-headline-sm font-bold text-[#151e19] hover:text-[#005131] transition-colors mb-2">
                  Pameran Karya Akhir dan Gelar Produk Inovasi Siswa SMK Citra Negara
                </h4>
                <p className="stitch-body-sm text-[#3f4942] leading-relaxed">
                  Menampilkan lebih dari 40 purwarupa aplikasi, solusi jaringan, identitas visual UMKM, serta performa mesin sepeda motor hasil rancangan siswa kelas XII.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#dbe5dd]/60 flex justify-end stitch-mono-caption">
                <a className="text-[#005131] font-semibold hover:underline inline-flex items-center gap-1 group" href="#">
                  <span>Galeri Dokumentasi</span>
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
