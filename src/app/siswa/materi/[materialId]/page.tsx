'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home,
  BookOpen,
  User,
  Calendar,
  Clock,
  BarChart,
  Download,
  CheckCircle2,
  FileText,
  Lock,
  PlayCircle,
  ArrowLeft,
  ArrowRight,
  Shield,
  Database,
  Terminal,
  Laptop,
  Check,
  PieChart,
  FolderArchive,
  Code
} from 'lucide-react';

export default function SiswaDetailMateriPage({ params }: { params: { materialId: string } }) {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-7xl mx-auto">
      {/* 1. Header & Meta Data */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6 mb-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <div className="flex items-center gap-2 text-slate-500 font-body text-xs mb-1">
              <Link href="/siswa/dashboard" className="hover:text-blue-700 transition-colors flex items-center gap-1">
                <Home size={14} />
                Portal Siswa
              </Link>
              <span>/</span>
              <Link href="/siswa/materi" className="hover:text-blue-700 transition-colors">
                Materi Pembelajaran
              </Link>
              <span>/</span>
              <span className="font-semibold text-blue-700 truncate">Modul 09</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-body text-[10px] font-bold border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Sedang Dipelajari
              </span>
            </div>
            
            <h1 className="font-display text-2xl lg:text-3xl text-blue-900 font-bold tracking-tight leading-tight">
              Modul 09: Implementasi JSON Web Token (JWT) & Middleware Security
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500 font-body text-xs mt-1">
              <div className="flex items-center gap-1.5">
                <User size={16} className="text-blue-700" />
                <span className="text-slate-700 font-medium">Budi Pratama, S.Kom.</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>Rilis: 20 Sep 2026</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>Estimasi: 25 Menit</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <BarChart size={16} className="text-orange-500" />
                <span>Tingkat: Menengah</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-body text-sm font-semibold transition-colors">
              <Download size={18} />
              Unduh PDF (2.4 MB)
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-body text-sm font-bold shadow-sm transition-all active:scale-95">
              <CheckCircle2 size={18} />
              Tandai Selesai & Lanjut
            </button>
          </div>
        </div>
        
        {/* Live Reading Progress */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-slate-500 font-body text-xs mb-2">
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen size={14} className="text-blue-700" />
              Progres Membaca Modul Ini
            </span>
            <span className="font-bold text-blue-700">75% Selesai (~6 menit tersisa)</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      {/* 2. Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (Main Content) */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          
          {/* A. Capaian Pembelajaran */}
          <div className="bg-slate-50 rounded-xl p-5 lg:p-6 border border-slate-200/60">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-lg text-blue-900 font-bold leading-tight">
                  Tujuan Pembelajaran (Capaian Pembelajaran Fase F)
                </h2>
                <p className="font-body text-sm text-slate-600">
                  Setelah menuntaskan modul praktikum ini, peserta didik Kelas XII Rekayasa Perangkat Lunak diharapkan kompeten dalam:
                </p>
                <ol className="mt-2 space-y-3 font-body text-sm text-slate-700 list-decimal list-inside pl-1">
                  <li className="leading-relaxed">
                    <span className="font-bold text-slate-900">Memahami arsitektur token stateless vs cookie-session:</span> Menganalisis alasan arsitektur microservices dan REST API modern menggunakan JSON Web Token untuk skalabilitas otentikasi.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-bold text-slate-900">Implementasi enkripsi signing HMAC SHA-256:</span> Mengonfigurasi signing payload menggunakan private secret key dari environment variables sistem (<code className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono text-slate-800">.env</code>).
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-bold text-slate-900">Konstruksi custom middleware Express.js:</span> Merancang fungsi interceptor <code className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono text-slate-800">authenticateToken</code> guna memvalidasi HTTP Header Bearer Token sebelum request diteruskan ke protected route.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* B. Main Reading Material */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-8 flex flex-col gap-8">
            
            {/* Section 1 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-blue-800 text-white font-body text-[10px] font-bold tracking-wider">BAGIAN 01</span>
                <h3 className="font-display text-xl text-slate-900 font-bold">
                  Anatomi & Struktur Dasar JSON Web Token (RFC 7519)
                </h3>
              </div>
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                JSON Web Token (JWT) adalah standar terbuka (<a href="#" className="text-blue-700 underline font-medium">RFC 7519</a>) yang mendefinisikan cara ringkas dan mandiri (<em className="italic">self-contained</em>) untuk mentransmisikan informasi antar-pihak secara aman sebagai objek JSON. Informasi ini dapat diverifikasi dan dipercaya karena ditandatangani secara digital menggunakan kunci rahasia HMAC atau pasangan kunci publik/privat RSA.
              </p>
              
              <div className="my-2 p-5 bg-slate-50 border border-slate-200/60 rounded-xl flex flex-col gap-4">
                <span className="font-body text-xs uppercase tracking-widest text-slate-500 font-bold text-center">Tiga Komponen Penyusun Token JWT</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center">
                    <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 mb-2">HEADER</span>
                    <span className="font-mono text-sm font-bold text-slate-900">Algoritma & Tipe</span>
                    <p className="font-body text-xs text-slate-500 mt-2">Menentukan algoritma hashing (misal: HS256) dan tipe token (<code className="text-[10px]">typ: "JWT"</code>).</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center">
                    <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 mb-2">PAYLOAD</span>
                    <span className="font-mono text-sm font-bold text-slate-900">Claims / Data</span>
                    <p className="font-body text-xs text-slate-500 mt-2">Menyimpan klaim identitas: <code className="text-[10px]">id, role, exp</code>. Tidak dienkripsi, hanya Base64Url!</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center">
                    <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700 mb-2">SIGNATURE</span>
                    <span className="font-mono text-sm font-bold text-slate-900">Tanda Tangan</span>
                    <p className="font-body text-xs text-slate-500 mt-2">Kombinasi Header + Payload yang di-hash bersama rahasia server.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 Flow */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-blue-800 text-white font-body text-[10px] font-bold tracking-wider">BAGIAN 02</span>
                <h3 className="font-display text-xl text-slate-900 font-bold">
                  Alur Kerja Middleware Autentikasi
                </h3>
              </div>
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                Pada arsitektur RESTful API Express.js, setiap request yang mengakses rute terproteksi harus melewati filter perantara (<em className="italic">middleware</em>) sebelum diteruskan ke fungsi Controller.
              </p>
              
              <div className="w-full bg-slate-50 border border-slate-200/60 rounded-xl p-6 overflow-x-auto">
                <div className="min-w-[620px] flex items-center justify-between gap-3">
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mb-2">
                      <Laptop size={20} />
                    </div>
                    <span className="font-body text-sm font-bold text-slate-900">Client</span>
                    <span className="font-mono text-[10px] text-slate-500 mt-1">Header: Bearer</span>
                  </div>
                  <div className="flex flex-col items-center px-1 text-blue-600">
                    <ArrowRight size={24} />
                    <span className="font-body text-[9px] font-bold tracking-wider uppercase mt-1 text-slate-400">Req</span>
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-2">
                      <Shield size={20} />
                    </div>
                    <span className="font-body text-sm font-bold text-slate-900">Middleware</span>
                    <span className="font-mono text-[10px] text-slate-500 mt-1">verifyToken()</span>
                  </div>
                  <div className="flex flex-col items-center px-1 text-green-600">
                    <ArrowRight size={24} />
                    <span className="font-body text-[9px] font-bold tracking-wider uppercase mt-1 text-slate-400">next()</span>
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-2">
                      <Database size={20} />
                    </div>
                    <span className="font-body text-sm font-bold text-slate-900">Controller</span>
                    <span className="font-mono text-[10px] text-slate-500 mt-1">Kirim JSON</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Code */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-blue-800 text-white font-body text-[10px] font-bold tracking-wider">BAGIAN 03</span>
                  <h3 className="font-display text-xl text-slate-900 font-bold">
                    Praktikum Laboratorium: Middleware Express
                  </h3>
                </div>
                <button className="text-slate-500 hover:text-blue-700 flex items-center gap-1.5 font-body text-xs font-bold transition-colors">
                  <Code size={16} />
                  <span>Salin Kode</span>
                </button>
              </div>
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                Buat berkas baru <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono font-semibold text-blue-700">src/middlewares/authMiddleware.js</code> di dalam project starter Express.js kalian.
              </p>
              
              <div className="rounded-xl overflow-hidden bg-[#1e293b] text-slate-300 shadow-sm border border-slate-800">
                <div className="bg-[#0f172a] px-5 py-3 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <span className="ml-2 font-bold text-slate-200">authMiddleware.js</span>
                  </div>
                  <span>JavaScript (Node.js)</span>
                </div>
                <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed font-mono text-slate-300">
                  <code>
<span className="text-slate-500">{`// Import modul JWT dan konfigurasi`}</span>
<span className="text-pink-400">const</span> jwt = <span className="text-blue-400">require</span>(<span className="text-green-400">'jsonwebtoken'</span>);

<span className="text-pink-400">function</span> <span className="text-blue-300 font-bold">authenticateToken</span>(req, res, next) {'{'}
  <span className="text-slate-500">{`// 1. Baca header otorisasi`}</span>
  <span className="text-pink-400">const</span> authHeader = req.headers[<span className="text-green-400">'authorization'</span>];
  <span className="text-pink-400">const</span> token = authHeader && authHeader.<span className="text-blue-300">split</span>(<span className="text-green-400">' '</span>)[<span className="text-yellow-300">1</span>];

  <span className="text-slate-500">{`// 2. Validasi keberadaan token`}</span>
  <span className="text-pink-400">if</span> (!token) {'{'}
    <span className="text-pink-400">return</span> res.<span className="text-blue-300">status</span>(<span className="text-yellow-300">401</span>).<span className="text-blue-300">json</span>({'{'}
      success: <span className="text-red-400">false</span>,
      message: <span className="text-green-400">'Akses ditolak.'</span>
    {'}'});
  {'}'}

  <span className="text-slate-500">{`// 3. Verifikasi signature`}</span>
  jwt.<span className="text-blue-300">verify</span>(token, process.env.<span className="text-yellow-300">JWT_SECRET</span>, (err, decodedUser) =&gt; {'{'}
    <span className="text-pink-400">if</span> (err) <span className="text-pink-400">return</span> res.<span className="text-blue-300">sendStatus</span>(<span className="text-yellow-300">403</span>);
    
    req.user = decodedUser;
    <span className="text-blue-300">next</span>();
  {'}'});
{'}'}
                  </code>
                </pre>
              </div>
            </div>
            
            {/* Attachment Section */}
            <div className="flex flex-col gap-4 pt-6 border-t border-slate-100">
              <h4 className="font-display text-lg text-slate-900 font-bold flex items-center gap-2">
                <FolderArchive size={20} className="text-blue-700" />
                <span>Berkas Lampiran & Sumber Daya</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex flex-col gap-3 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Code size={20} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-body text-sm font-bold text-slate-900 truncate">auth-starter.zip</span>
                      <span className="font-body text-[11px] text-slate-500">Starter Code • 4.2 MB</span>
                    </div>
                  </div>
                  <button className="w-full py-2 rounded-lg bg-white border border-slate-200 text-blue-700 font-body text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
                    <Download size={14} />
                    Unduh
                  </button>
                </div>
                
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex flex-col gap-3 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-body text-sm font-bold text-slate-900 truncate">LKS-09-JWT.pdf</span>
                      <span className="font-body text-[11px] text-slate-500">Lembar Kerja • 1.8 MB</span>
                    </div>
                  </div>
                  <button className="w-full py-2 rounded-lg bg-white border border-slate-200 text-blue-700 font-body text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
                    <Download size={14} />
                    Unduh
                  </button>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* C. Pagination Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/siswa/materi/modul-08" className="p-4 bg-white rounded-xl shadow-sm border border-slate-200/60 hover:border-blue-400 transition-colors flex items-center gap-4 group text-left">
              <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-500 group-hover:text-blue-700 shrink-0 transition-colors">
                <ArrowLeft size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider">Materi Sebelumnya</span>
                <span className="font-body text-sm font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                  Modul 08: Setup Express.js Modular
                </span>
              </div>
            </Link>
            
            <Link href="/siswa/materi/modul-10" className="p-4 bg-white rounded-xl shadow-sm border border-slate-200/60 hover:border-blue-400 transition-colors flex items-center justify-between gap-4 group text-right">
              <div className="flex flex-col min-w-0 ml-auto">
                <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider">Materi Berikutnya</span>
                <span className="font-body text-sm font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                  Modul 10: Endpoint Testing Postman
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>
          
        </div>
        
        {/* RIGHT COLUMN (Sidebar) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Progress Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PieChart size={20} className="text-blue-700" />
                <span className="font-display text-base font-bold text-slate-900">Progres BAB 03</span>
              </div>
              <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase">
                50% Tercapai
              </span>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <div className="flex justify-between font-body text-xs text-slate-500">
                <span>2 dari 4 Modul Tuntas</span>
                <span className="font-bold text-slate-700">Target: 28 Sep</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div className="mt-4 p-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between font-body text-xs">
              <span className="text-slate-500">Peserta: <strong className="text-slate-800">Rakha Arkana</strong></span>
              <span className="text-slate-400 font-semibold">XII RPL 1</span>
            </div>
          </div>
          
          {/* Syllabus Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-body text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Silabus Pembelajaran</span>
                <span className="font-display text-sm font-bold text-blue-900">BAB 03: RESTful API Backend</span>
              </div>
              <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-600 font-body text-[10px] font-bold">
                4 Modul
              </span>
            </div>
            
            <div className="p-3 flex flex-col gap-1.5">
              
              <Link href="/siswa/materi/modul-07" className="p-3 rounded-lg flex items-start gap-3 hover:bg-slate-50 transition-colors group">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body text-[10px] text-green-700 font-bold uppercase tracking-wider">Modul 07 • Selesai</span>
                  <span className="font-body text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors line-clamp-1">
                    Konsep RESTful Architecture
                  </span>
                  <span className="font-body text-[11px] text-slate-400 mt-0.5">Nilai Quiz: 92/100</span>
                </div>
              </Link>
              
              <Link href="/siswa/materi/modul-08" className="p-3 rounded-lg flex items-start gap-3 hover:bg-slate-50 transition-colors group">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body text-[10px] text-green-700 font-bold uppercase tracking-wider">Modul 08 • Selesai</span>
                  <span className="font-body text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors line-clamp-1">
                    Setup Node.js & Express.js
                  </span>
                  <span className="font-body text-[11px] text-slate-400 mt-0.5">Praktikum Mandiri Tuntas</span>
                </div>
              </Link>
              
              <div className="p-3 rounded-lg flex items-start gap-3 bg-blue-50 border border-blue-100">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <PlayCircle size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body text-[10px] text-blue-700 font-bold uppercase tracking-wider">Modul 09 • Aktif</span>
                  <span className="font-body text-sm font-bold text-blue-900 line-clamp-2">
                    Implementasi JWT & Middleware
                  </span>
                  <span className="font-body text-[11px] text-blue-600 mt-0.5">Sedang dipelajari (75%)</span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg flex items-start gap-3 opacity-60">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body text-[10px] text-slate-400 font-bold uppercase tracking-wider">Modul 10 • Terkunci</span>
                  <span className="font-body text-sm font-bold text-slate-600 line-clamp-1">
                    Endpoint Testing Postman
                  </span>
                  <span className="font-body text-[11px] text-slate-400 mt-0.5">Selesaikan Modul 09</span>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
