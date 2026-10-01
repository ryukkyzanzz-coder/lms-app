import React from 'react';
import { Monitor, Palette, Router, Bike, Library, type LucideIcon } from 'lucide-react';

interface Facility {
  room: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  spec: string;
  span: string;
}

const facilities: Facility[] = [
  {
    room: 'RUANG 101 // BLOK A',
    icon: Monitor,
    title: 'Lab Komputasi Kinerja Tinggi',
    desc: '42 unit desktop workstation dengan prosesor multi-core generasi terkini, memori 32GB, dan layar ganda untuk simulasi komputasi intensif.',
    spec: 'KAPASITAS: 42 SISWA // DUAL AC CLIMATE CONTROLLED',
    span: 'col-span-1',
  },
  {
    room: 'RUANG 104 // BLOK A',
    icon: Palette,
    title: 'Studio Multimedia & Fotografi',
    desc: 'Dilengkapi cyclorama wall, continuous lighting studio CRI 96+, audio recording booth kedap suara, dan pen tablet grafis profesional.',
    spec: 'PERALATAN: GODOX LIGHTING // SONY CINEMA LINE',
    span: 'col-span-1',
  },
  {
    room: 'RUANG 202 // BLOK B',
    icon: Router,
    title: 'Ruang Server & Workshop Jaringan',
    desc: 'Rak server modular 42U, perangkat switch managed Cisco Catalyst, splicer fiber optic presisi, dan perangkat uji OTDR untuk praktek telekomunikasi.',
    spec: 'RACK UNIT: CISCO & MIKROTIK MANAGED SWITCHES',
    span: 'col-span-1',
  },
  {
    room: 'HANGAR 01 // BLOK C',
    icon: Bike,
    title: 'Bengkel Otomotif Terpadu',
    desc: 'Area bengkel bersertifikasi pabrikan dengan 8 unit bike-lift hidrolik, fuel injection tester, exhaust gas analyzer, dan tools set lengkap.',
    spec: 'STANDAR: APM REKANAN RESMI // 8 BIKE-LIFT PNEUMATIK',
    span: 'col-span-1',
  },
  {
    room: 'PUSAT LITERASI // BLOK UTAMA',
    icon: Library,
    title: 'Perpustakaan & Ruang Kolaborasi Terbuka',
    desc: 'Ruang baca dengan katalog ribuan referensi teknis vokasi internasional, akses repositori IEEE/ACM, serta zona kerja kelompok fleksibel untuk merancang startup dan proposal tugas akhir.',
    spec: 'KONEKSI: 1 GBPS DEDICATED FIBER // HIGH-DENSITY WI-FI 6',
    span: 'lg:col-span-2',
  },
];

export default function Facilities() {
  return (
    <section className="w-full bg-[#f2fcf3] py-20 sm:py-24 border-b border-[#dbe5dd]/80" id="fasilitas">
      <div className="stitch-container">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-12 h-[2px] bg-[#005131]" />
          <span className="stitch-mono-caption text-[#005131] uppercase tracking-widest">
            07 / SARANA &amp; PRASARANA
          </span>
        </div>

        <div className="max-w-3xl mb-10">
          <h2 className="stitch-headline-lg text-[#151e19] uppercase tracking-tight font-bold">
            Infrastruktur Berstandar Industri
          </h2>
          <p className="stitch-body-md text-[#3f4942] mt-2">
            Setiap laboratorium dirancang untuk merefleksikan alur kerja workstation modern, memastikan transisi mulus siswa dari bangku sekolah menuju dunia karir.
          </p>
        </div>

        {/* Architectural Grid of Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className={`p-6 bg-white border border-[#dbe5dd] flex flex-col justify-between facility-card shadow-xs ${fac.span}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="stitch-mono-caption text-[#005131] font-bold">
                    {fac.room}
                  </span>
                  <fac.icon size={22} strokeWidth={1.75} aria-hidden="true" className="text-[#6f7a71]" />
                </div>
                <h3 className="stitch-headline-sm font-bold text-[#151e19] mb-2">
                  {fac.title}
                </h3>
                <p className="stitch-body-sm text-[#3f4942] leading-relaxed">
                  {fac.desc}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#dbe5dd]/60 stitch-mono-caption text-[#6f7a71]">
                {fac.spec}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
