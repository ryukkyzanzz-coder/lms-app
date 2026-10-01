import React from 'react';
import { ArrowRight } from 'lucide-react';

const programs = [
  {
    num: '01/',
    code: 'PPLG',
    dept: 'DEPT-TECH',
    title: 'Pengembangan Perangkat Lunak & Gim',
    desc: 'Pemrograman aplikasi web dan mobile, arsitektur database terdistribusi, perancangan antarmuka pengguna (UI/UX), dan logika rekayasa perangkat lunak modern.',
    tags: ['JavaScript', 'Python', 'Flutter', 'Git'],
  },
  {
    num: '02/',
    code: 'TJKT',
    dept: 'DEPT-NETW',
    title: 'Teknik Jaringan Komputer & Telekomunikasi',
    desc: 'Konfigurasi infrastruktur jaringan data, dasar pertahanan siber (cyber security), routing & switching multi-vendor, administrasi server cloud, dan terminasi fiber optics.',
    tags: ['Cisco CCNA', 'MikroTik MTCNA', 'Linux Server'],
  },
  {
    num: '03/',
    code: 'DKV',
    dept: 'DEPT-DESN',
    title: 'Desain Komunikasi Visual',
    desc: 'Produksi konten visual komersial, animasi 2D & 3D terapan, rancang identitas merek (brand identity), fotografi studio terarah, dan motion graphics editorial.',
    tags: ['Vector Design', 'Motion Graphics', 'Video Studio'],
  },
];

export default function Programs() {
  return (
    <section className="w-full bg-[#f2fcf3] py-20 sm:py-24 border-b border-[#dbe5dd]/80" id="program-keahlian">
      <div className="stitch-container">
        {/* Index Header Rule */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#dbe5dd]/80">
          <div>
            <span className="stitch-mono-caption text-[#005131] uppercase tracking-widest block mb-2">
              03 / PROGRAM STUDI KEJURUAN
            </span>
            <h2 className="stitch-headline-lg text-[#151e19] uppercase tracking-tight font-bold">
              Departemen Keahlian Terapan
            </h2>
          </div>
          <p className="stitch-body-sm text-[#3f4942] mt-2 md:mt-0 max-w-sm">
            Kurikulum vokasi 3 tahun terintegrasi sertifikasi kompetensi BNSP dan sertifikasi vendor global.
          </p>
        </div>

        {/* Disciplined Editorial Row List */}
        <div className="divide-y divide-[#dbe5dd]/80 border-t border-b border-[#dbe5dd]/80">
          {programs.map((item, idx) => (
            <div
              key={idx}
              className="group relative py-8 sm:py-10 transition-all duration-200 hover:bg-[#ecf6ee]/60 px-4 -mx-4 rounded-[2px] major-row"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-1 flex items-baseline">
                  <span className="stitch-mono-caption text-[#005131] font-bold text-base">
                    {item.num}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="stitch-mono-caption px-2 py-0.5 bg-[#98f6c2]/40 text-[#00734a] font-semibold rounded-[2px]">
                      {item.code}
                    </span>
                    <span className="stitch-mono-caption text-[#6f7a71]">
                      {item.dept}
                    </span>
                  </div>
                  <h3 className="stitch-headline-md font-bold text-[#151e19] group-hover:text-[#005131] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-4">
                  <p className="stitch-body-md text-[#3f4942] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="lg:col-span-3 flex flex-col justify-between h-full pt-1">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="stitch-mono-caption bg-[#e6f0e8] px-2 py-1 rounded-[2px] text-[#151e19]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-[#005131] stitch-label-md font-semibold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Rincian Kurikulum</span>
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
