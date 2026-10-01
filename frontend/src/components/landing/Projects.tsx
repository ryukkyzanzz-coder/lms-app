import React from 'react';

const projects = [
  {
    num: 'PROYEK 01 // 2024',
    dept: 'DEPT. PPLG',
    title: 'Sistem Informasi Presensi Siswa Berbasis QR & Web',
    desc: 'Platform pencatatan kehadiran otomatis waktu-nyata dengan verifikasi geolokasi dan integrasi pelaporan WhatsApp Gateway untuk orang tua siswa.',
    tags: ['Next.js', 'PostgreSQL', 'Docker', 'Tailwind'],
    status: 'TERPASANG DI SEKOLAH',
    accent: 'primary',
  },
  {
    num: 'PROYEK 02 // 2024',
    dept: 'DEPT. DKV',
    title: 'Identitas Visual & Kemasan Produk 12 UMKM Depok',
    desc: 'Standardisasi brand guidelines, perancangan kemasan siap cetak bersertifikasi SNI, dan materi promosi digital untuk pengusaha kuliner binaan daerah.',
    tags: ['Adobe Illustrator', 'Packaging 3D', 'Photography'],
    status: 'KEMITRAAN DINAS',
    accent: 'secondary',
  },
  {
    num: 'PROYEK 03 // 2024',
    dept: 'DEPT. TJKT',
    title: 'Implementasi Mesh Network Skala Kampus Sekolah',
    desc: 'Revitalisasi topologi jaringan gedung pembelajaran utama, pembagian segmentasi VLAN antar laboratorium, dan manajemen bandwidth traffic shaping mikrotik.',
    tags: ['MikroTik RouterOS', 'VLAN 802.1Q', 'Ubiquiti AP'],
    status: 'INFRASTRUKTUR AKTIF',
    accent: 'primary',
  },
];

export default function Projects() {
  return (
    <section className="w-full bg-[#ecf6ee] py-20 sm:py-24 border-b border-[#dbe5dd]/80" id="proyek-siswa">
      <div className="stitch-container">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#dbe5dd]/80">
          <div>
            <span className="stitch-mono-caption text-[#005131] uppercase tracking-widest block mb-2">
              06 / HASIL KARYA SISWA
            </span>
            <h2 className="stitch-headline-lg text-[#151e19] uppercase tracking-tight font-bold">
              Inovasi Terapan &amp; Produk Nyata
            </h2>
          </div>
          <p className="stitch-body-sm text-[#3f4942] mt-2 md:mt-0 max-w-sm">
            Portofolio proyek akhir siswa yang telah diimplementasikan pada operasional sekolah dan industri lokal.
          </p>
        </div>

        {/* Tabular / Technical List Architecture */}
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#dbe5dd] p-6 lg:p-7 transition-shadow hover:shadow-sm project-card"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-2">
                  <span className="stitch-mono-caption text-[#005131] font-bold block">
                    {proj.num}
                  </span>
                  <div className="stitch-mono-caption text-[#6f7a71]">
                    {proj.dept}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="stitch-headline-sm font-bold text-[#151e19] mb-1">
                    {proj.title}
                  </h3>
                  <p className="stitch-body-sm text-[#3f4942] leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                <div className="lg:col-span-3 flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="stitch-mono-caption bg-[#e6f0e8] px-2 py-1 text-[#151e19] rounded-[2px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="lg:col-span-2 flex justify-start lg:justify-end">
                  <span
                    className={`inline-flex items-center gap-1.5 stitch-mono-caption border px-2.5 py-1 rounded-[2px] font-semibold ${
                      proj.accent === 'secondary'
                        ? 'text-[#006c45] border-[#006c45]/30'
                        : 'text-[#005131] border-[#005131]/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        proj.accent === 'secondary'
                          ? 'bg-[#006c45]'
                          : 'bg-[#005131]'
                      }`}
                    />
                    {proj.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
