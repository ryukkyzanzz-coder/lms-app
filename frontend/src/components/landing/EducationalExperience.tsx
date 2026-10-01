import React from 'react';
import { Terminal, Server, BadgeCheck, Award, type LucideIcon } from 'lucide-react';

interface Principle {
  tag: string;
  title: string;
  desc: string;
  meta: string;
  icon: LucideIcon;
}

const principles: Principle[] = [
  {
    tag: '01 // SISTEM PEMBELAJARAN',
    title: 'Project-Based Learning',
    desc: 'Siswa tidak hanya mengerjakan lembar tugas ujian teori, melainkan menyelesaikan pesanan solusi perangkat lunak atau perancangan riil dari mitra usaha.',
    meta: 'OUTPUT: SISTEM KERJA NYATA',
    icon: Terminal,
  },
  {
    tag: '02 // FASILITAS LAB',
    title: 'Laboratorium Standar Industri',
    desc: 'Peralatan praktek, server, dan instrumen jaringan identik dengan standar data center Tier-2, didukung konektivitas serat optik berkecepatan tinggi.',
    meta: 'STANDAR: ISO/IEC 27001 COMPLIANT',
    icon: Server,
  },
  {
    tag: '03 // BUDAYA KERJA',
    title: 'Kedisiplinan & Etos Profesional',
    desc: 'Ketepatan waktu, dokumentasi teknis yang akuntabel, dan tanggung jawab kerja tim diajarkan sebagai kompetensi fundamental yang tidak dapat ditawar.',
    meta: 'ETOS: INTEGRITAS & PRESISI',
    icon: BadgeCheck,
  },
  {
    tag: '04 // VALIDASI KOMPETENSI',
    title: 'Sertifikasi & Portofolio Teruji',
    desc: 'Lulusan dibekali sertifikat kompetensi resmi Badan Nasional Sertifikasi Profesi (BNSP) serta portofolio karya digital siap uji seleksi kerja.',
    meta: 'LISENSI: LSP-P1 SMK CITRA NEGARA',
    icon: Award,
  },
];

export default function EducationalExperience() {
  return (
    <section className="w-full bg-[#ecf6ee] py-20 sm:py-24 border-b border-[#dbe5dd]/80" id="pengalaman-belajar">
      <div className="stitch-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Monumental Stacked Typography (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <span className="stitch-mono-caption text-[#005131] uppercase tracking-widest block mb-4">
                04 / METODOLOGI PEDAGOGI
              </span>
              <div className="stitch-display font-extrabold text-[#151e19] uppercase tracking-tighter leading-[0.95] mb-8">
                Learn.<br />
                Build.<br />
                <span className="text-[#6f7a71]">Collab.</span><br />
                <span className="text-[#005131]">Grow.</span>
              </div>
            </div>
            <div className="border-t border-[#dbe5dd]/80 pt-4 hidden lg:block">
              <span className="stitch-mono-caption text-[#3f4942] block">
                METODE: TEACHING FACTORY
              </span>
              <span className="stitch-body-sm text-[#6f7a71]">
                Simulasi riil lingkungan korporasi sejak semester pertama.
              </span>
            </div>
          </div>

          {/* Right: 4 Articulated Principles (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 border border-[#dbe5dd] flex flex-col justify-between experience-card shadow-xs"
              >
                <div>
                  <span className="stitch-mono-caption text-[#005131] font-bold uppercase mb-3 block">
                    {item.tag}
                  </span>
                  <h4 className="stitch-headline-sm font-bold text-[#151e19] mb-2">
                    {item.title}
                  </h4>
                  <p className="stitch-body-sm text-[#3f4942] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#dbe5dd]/60 flex items-center justify-between text-[#6f7a71] stitch-mono-caption">
                  <span>{item.meta}</span>
                  <item.icon size={16} strokeWidth={1.75} aria-hidden="true" className="text-[#6f7a71]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
