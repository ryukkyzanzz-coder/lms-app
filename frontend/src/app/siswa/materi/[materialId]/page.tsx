'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
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
  Laptop,
  Check,
  PieChart,
  FolderArchive,
  Code
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function SiswaDetailMateriPage() {
  useParams(); // maintain client route integration

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Header & Meta Data */}
      <Card className="border border-border shadow-sm bg-card">
        <CardContent className="p-5 lg:p-6 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href="/siswa/dashboard" />}>Portal Siswa</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href="/siswa/materi" />}>Materi Pembelajaran</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Modul 09</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="outline" className="gap-1.5 font-semibold text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Sedang Dipelajari
                </Badge>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground leading-tight">
                Modul 09: Implementasi JSON Web Token (JWT) & Middleware Security
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-xs mt-1">
                <div className="flex items-center gap-1.5">
                  <User className="size-4 text-primary" />
                  <span className="text-foreground font-medium">Budi Pratama, S.Kom.</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  <span>Rilis: 20 Sep 2026</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  <span>Estimasi: 25 Menit</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <BarChart className="size-4 text-amber-500" />
                  <span>Tingkat: Menengah</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
              <Button variant="outline" size="sm" className="gap-2 text-xs font-semibold">
                <Download className="size-4" />
                <span>Unduh PDF (2.4 MB)</span>
              </Button>
              <Button size="sm" className="gap-2 text-xs font-semibold">
                <CheckCircle2 className="size-4" />
                <span>Tandai Selesai & Lanjut</span>
              </Button>
            </div>
          </div>
          
          {/* Live Reading Progress */}
          <div className="mt-2 pt-3 border-t border-border flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Progres Membaca Modul Ini</span>
              <span className="font-semibold text-primary">75% Selesai (~6 menit tersisa)</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* 2. Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (Main Content) */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          
          {/* A. Capaian Pembelajaran */}
          <Card className="border border-border bg-muted/30">
            <CardContent className="p-5 lg:p-6 flex items-start gap-4">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="size-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-semibold text-foreground leading-tight">
                  Tujuan Pembelajaran (Capaian Pembelajaran Fase F)
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Setelah menuntaskan modul praktikum ini, peserta didik Kelas XII Rekayasa Perangkat Lunak diharapkan kompeten dalam:
                </p>
                <ol className="mt-1 space-y-2 text-xs sm:text-sm text-muted-foreground list-decimal list-inside pl-1">
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Memahami arsitektur token stateless vs cookie-session:</span> Menganalisis alasan arsitektur microservices dan REST API modern menggunakan JSON Web Token untuk skalabilitas otentikasi.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Implementasi enkripsi signing HMAC SHA-256:</span> Mengonfigurasi signing payload menggunakan private secret key dari environment variables sistem (<code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono text-foreground">.env</code>).
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Konstruksi custom middleware Express.js:</span> Merancang fungsi interceptor <code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono text-foreground">authenticateToken</code> guna memvalidasi HTTP Header Bearer Token sebelum request diteruskan ke protected route.
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* B. Main Reading Material */}
          <Card className="border border-border shadow-sm">
            <CardContent className="p-5 lg:p-8 flex flex-col gap-8">
              
              {/* Section 1 */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Badge className="font-semibold text-[10px] tracking-wider uppercase">
                    BAGIAN 01
                  </Badge>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Anatomi & Struktur Dasar JSON Web Token (RFC 7519)
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  JSON Web Token (JWT) adalah standar terbuka (<span className="text-primary underline font-medium">RFC 7519</span>) yang mendefinisikan cara ringkas dan mandiri (<em className="italic">self-contained</em>) untuk mentransmisikan informasi antar-pihak secara aman sebagai objek JSON. Informasi ini dapat diverifikasi dan dipercaya karena ditandatangani secara digital menggunakan kunci rahasia HMAC atau pasangan kunci publik/privat RSA.
                </p>
                
                <div className="my-2 p-5 bg-muted/40 border border-border rounded-xl flex flex-col gap-4">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold text-center">
                    Tiga Komponen Penyusun Token JWT
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-card p-4 rounded-lg shadow-sm border border-border flex flex-col items-center">
                      <Badge variant="destructive" className="font-semibold text-[10px] mb-2">HEADER</Badge>
                      <span className="font-mono text-sm font-semibold text-foreground">Algoritma & Tipe</span>
                      <p className="text-xs text-muted-foreground mt-2">Menentukan algoritma hashing (misal: HS256) dan tipe token (<code className="text-[10px]">typ: &quot;JWT&quot;</code>).</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-sm border border-border flex flex-col items-center">
                      <Badge variant="secondary" className="font-semibold text-[10px] mb-2">PAYLOAD</Badge>
                      <span className="font-mono text-sm font-semibold text-foreground">Claims / Data</span>
                      <p className="text-xs text-muted-foreground mt-2">Menyimpan klaim identitas: <code className="text-[10px]">id, role, exp</code>. Tidak dienkripsi, hanya Base64Url!</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-sm border border-border flex flex-col items-center">
                      <Badge variant="outline" className="text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 font-semibold text-[10px] mb-2">SIGNATURE</Badge>
                      <span className="font-mono text-sm font-semibold text-foreground">Tanda Tangan</span>
                      <p className="text-xs text-muted-foreground mt-2">Kombinasi Header + Payload yang di-hash bersama rahasia server.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 Flow */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Badge className="font-semibold text-[10px] tracking-wider uppercase">
                    BAGIAN 02
                  </Badge>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Alur Kerja Middleware Autentikasi
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pada arsitektur RESTful API Express.js, setiap request yang mengakses rute terproteksi harus melewati filter perantara (<em className="italic">middleware</em>) sebelum diteruskan ke fungsi Controller.
                </p>
                
                <div className="w-full bg-muted/40 border border-border rounded-xl p-5 overflow-x-auto">
                  <div className="min-w-[560px] flex items-center justify-between gap-3">
                    <div className="flex-1 bg-card p-4 rounded-lg shadow-sm border border-border flex flex-col items-center text-center">
                      <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground mb-2">
                        <Laptop className="size-5" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">Client</span>
                      <span className="font-mono text-[10px] text-muted-foreground mt-1">Header: Bearer</span>
                    </div>
                    <div className="flex flex-col items-center px-1 text-primary">
                      <ArrowRight className="size-5" />
                      <span className="text-[9px] font-semibold tracking-wider uppercase mt-1 text-muted-foreground">Req</span>
                    </div>
                    <div className="flex-1 bg-card p-4 rounded-lg shadow-sm border border-border flex flex-col items-center text-center">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <Shield className="size-5" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">Middleware</span>
                      <span className="font-mono text-[10px] text-muted-foreground mt-1">verifyToken()</span>
                    </div>
                    <div className="flex flex-col items-center px-1 text-emerald-600">
                      <ArrowRight className="size-5" />
                      <span className="text-[9px] font-semibold tracking-wider uppercase mt-1 text-muted-foreground">next()</span>
                    </div>
                    <div className="flex-1 bg-card p-4 rounded-lg shadow-sm border border-border flex flex-col items-center text-center">
                      <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-2">
                        <Database className="size-5" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">Controller</span>
                      <span className="font-mono text-[10px] text-muted-foreground mt-1">Kirim JSON</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practical Code */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="font-semibold text-[10px] tracking-wider uppercase">
                      BAGIAN 03
                    </Badge>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                      Praktikum Laboratorium: Middleware Express
                    </h3>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                    <Code className="size-4" />
                    <span>Salin Kode</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Buat berkas baru <code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono font-semibold text-primary">src/middlewares/authMiddleware.js</code> di dalam project starter Express.js kalian.
                </p>
                
                <div className="rounded-xl overflow-hidden bg-slate-950 text-slate-200 border border-border shadow-sm">
                  <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-destructive" />
                      <span className="size-2.5 rounded-full bg-amber-500" />
                      <span className="size-2.5 rounded-full bg-emerald-500" />
                      <span className="ml-2 font-semibold text-slate-200">authMiddleware.js</span>
                    </div>
                    <span>JavaScript (Node.js)</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-xs leading-relaxed font-mono text-slate-300">
                    <code>
                      {`// Import modul JWT dan konfigurasi\nconst jwt = require('jsonwebtoken');\n\nfunction authenticateToken(req, res, next) {\n  // 1. Baca header otorisasi\n  const authHeader = req.headers['authorization'];\n  const token = authHeader && authHeader.split(' ')[1];\n\n  // 2. Validasi keberadaan token\n  if (!token) {\n    return res.status(401).json({\n      success: false,\n      message: 'Akses ditolak.'\n    });\n  }\n\n  // 3. Verifikasi signature\n  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {\n    if (err) return res.sendStatus(403);\n    \n    req.user = decodedUser;\n    next();\n  });\n}`}
                    </code>
                  </pre>
                </div>
              </div>
              
              {/* Attachment Section */}
              <div className="flex flex-col gap-4 pt-4 border-t border-border">
                <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <FolderArchive className="size-4 text-primary" />
                  <span>Berkas Lampiran & Sumber Daya</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border border-border bg-muted/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Code className="size-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-foreground truncate">auth-starter.zip</span>
                          <span className="text-[11px] text-muted-foreground">Starter Code • 4.2 MB</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold gap-1.5">
                        <Download className="size-3.5" />
                        <span>Unduh</span>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border bg-muted/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="size-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                          <FileText className="size-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-foreground truncate">LKS-09-JWT.pdf</span>
                          <span className="text-[11px] text-muted-foreground">Lembar Kerja • 1.8 MB</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold gap-1.5">
                        <Download className="size-3.5" />
                        <span>Unduh</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* C. Pagination Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/siswa/materi/modul-08" className="group">
              <Card className="border border-border group-hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex items-center gap-3.5">
                  <div className="size-9 rounded-lg bg-muted text-muted-foreground group-hover:text-primary flex items-center justify-center shrink-0 transition-colors">
                    <ArrowLeft className="size-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                      Materi Sebelumnya
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      Modul 08: Setup Express.js Modular
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/siswa/materi/modul-10" className="group">
              <Card className="border border-border group-hover:border-primary/50 transition-colors text-right">
                <CardContent className="p-4 flex items-center justify-between gap-3.5">
                  <div className="flex flex-col min-w-0 ml-auto">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                      Materi Berikutnya
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      Modul 10: Endpoint Testing Postman
                    </span>
                  </div>
                  <div className="size-9 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center shrink-0 transition-colors">
                    <ArrowRight className="size-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        
        {/* RIGHT COLUMN (Sidebar) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Progress Card */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between border-b border-border space-y-0">
              <div className="flex items-center gap-2">
                <PieChart className="size-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Progres BAB 03</CardTitle>
              </div>
              <Badge variant="secondary" className="text-[10px] font-semibold uppercase">
                50% Tercapai
              </Badge>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>2 dari 4 Modul Tuntas</span>
                <span className="font-semibold text-foreground">Target: 28 Sep</span>
              </div>
              <Progress value={50} className="h-2" />
              <div className="mt-2 p-2.5 bg-muted/40 border border-border rounded-lg flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Peserta: <strong className="text-foreground">Dafiand</strong></span>
                <span className="text-muted-foreground font-semibold">XII RPL 1</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Syllabus Navigation */}
          <Card className="border border-border shadow-sm overflow-hidden">
            <CardHeader className="p-4 pb-3 bg-muted/40 border-b border-border space-y-0 flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  Silabus Pembelajaran
                </span>
                <CardTitle className="text-sm font-semibold text-foreground mt-0.5">
                  BAB 03: RESTful API Backend
                </CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] font-semibold">
                4 Modul
              </Badge>
            </CardHeader>
            
            <CardContent className="p-2.5 flex flex-col gap-1">
              <Link href="/siswa/materi/modul-07" className="p-2.5 rounded-lg flex items-start gap-3 hover:bg-muted/50 transition-colors group">
                <div className="size-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="size-3" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-emerald-600 font-semibold uppercase">Modul 07 • Selesai</span>
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    Konsep RESTful Architecture
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Nilai Quiz: 92/100</span>
                </div>
              </Link>
              
              <Link href="/siswa/materi/modul-08" className="p-2.5 rounded-lg flex items-start gap-3 hover:bg-muted/50 transition-colors group">
                <div className="size-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="size-3" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-emerald-600 font-semibold uppercase">Modul 08 • Selesai</span>
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    Setup Node.js & Express.js
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Praktikum Mandiri Tuntas</span>
                </div>
              </Link>
              
              <div className="p-2.5 rounded-lg flex items-start gap-3 bg-primary/10 border border-primary/20">
                <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <PlayCircle className="size-3" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-primary font-semibold uppercase">Modul 09 • Aktif</span>
                  <span className="text-xs font-semibold text-foreground truncate">
                    Implementasi JWT & Middleware
                  </span>
                  <span className="text-[10px] text-primary font-medium mt-0.5">Sedang dipelajari (75%)</span>
                </div>
              </div>
              
              <div className="p-2.5 rounded-lg flex items-start gap-3 opacity-60">
                <div className="size-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="size-3" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase">Modul 10 • Terkunci</span>
                  <span className="text-xs font-semibold text-foreground truncate">
                    Endpoint Testing Postman
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Selesaikan Modul 09</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
