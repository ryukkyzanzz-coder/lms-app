import React from 'react';
import Image from 'next/image';

const activities = [
  {
    title: 'Robotika & Coding Club',
    tag: 'KLUB TEKNOLOGI',
    desc: 'Wadah eksplorasi mikrokontroler Arduino, IoT smart-campus, dan persiapan kompetisi Lomba Kompetensi Siswa (LKS) tingkat provinsi.',
  },
  {
    title: 'Desain & Media Kreatif',
    tag: 'KONTEN & PUBLIKASI',
    desc: 'Mengelola kanal publikasi resmi kampus, peliputan acara berkala, siaran podcast kejuruan, dan pameran berkala karya visual siswa.',
  },
  {
    title: 'OSIS & Kepemimpinan',
    tag: 'ORGANISASI FORMAL',
    desc: 'Pusat koordinasi dinamika santun siswa, simulasi manajemen kepemimpinan publik, dan penegakan kultur kedisiplinan sesama rekan sebaya.',
  },
  {
    title: 'Pramuka & Olahraga Prestasi',
    tag: 'KETAHANAN FISIK',
    desc: 'Pembentukan mental tangguh, resiliensi di bawah tekanan fisik, dan pembinaan cabang futsal, basket, serta pencak silat kejuaraan.',
  },
];

export default function StudentLife() {
  return (
    <section className="w-full bg-[#f2fcf3] py-20 sm:py-24 border-b border-[#dbe5dd]/80" id="kehidupan-siswa">
      <div className="stitch-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="stitch-mono-caption text-[#005131] uppercase tracking-widest block mb-2">
            05 / EKOSISTEM SISWA
          </span>
          <h2 className="stitch-headline-lg text-[#151e19] uppercase tracking-tight font-bold">
            Kehidupan Siswa &amp; Aktivitas Kampus
          </h2>
          <p className="stitch-body-md text-[#3f4942] mt-2">
            Mengimbangi ketajaman teknis dengan kepemimpinan organisasi, kebugaran fisik, dan kepekaan sosial.
          </p>
        </div>

        {/* Asymmetric Editorial Visual & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left: Featured Documentary Photograph (7 cols) */}
          <div className="lg:col-span-7 student-life-visual">
            <div className="relative bg-white p-2 border border-[#dbe5dd] shadow-xs">
              {/* Structural Corner Tags */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#005131] z-10 pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#005131] z-10 pointer-events-none" />

              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e6f0e8]">
                <Image
                  src="/images/landing/student-life-lab.jpg"
                  alt="Siswa SMK Citra Negara merakit kabel jaringan di server rack"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute bottom-3 left-3 bg-[#151e19]/90 text-white px-3 py-1.5 backdrop-blur-sm z-10">
                  <span className="stitch-mono-caption tracking-wider uppercase">
                    TJKT LAB // MODUL 04: FIBER OPTIC TERMINATION
                  </span>
                </div>
              </div>

              <div className="pt-3 pb-1 px-2 flex items-center justify-between stitch-mono-caption text-[#3f4942]">
                <span>DOKUMENTASI RIIL WORKSHOP KOMPUTER</span>
                <span className="text-[#005131] font-semibold">
                  KERJA KELOMPOK TERPIMPIN
                </span>
              </div>
            </div>
          </div>

          {/* Right: Activities Breakdown (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {activities.map((act, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#f2fcf3] border border-[#dbe5dd]/80 hover:border-[#005131]/50 transition-colors rounded-[2px] activity-item"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="stitch-headline-sm font-bold text-[#151e19]">
                    {act.title}
                  </h4>
                  <span className="stitch-mono-caption text-[#005131]">
                    {act.tag}
                  </span>
                </div>
                <p className="stitch-body-sm text-[#3f4942] leading-relaxed">
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
