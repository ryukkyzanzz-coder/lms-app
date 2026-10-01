'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  CheckCircle2,
  AlertCircle,
  FileText,
  Timer,
  BookOpen,
  HelpCircle,
  Upload,
  Link as LinkIcon,
  Shield,
  Monitor
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function SiswaDetailTugasPage() {
  const params = useParams();
  const taskId = (params?.taskId as string) || '';
  const isQuiz = taskId.includes('quiz');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Header & Meta Data */}
      <Card className="border border-border shadow-sm bg-card">
        <CardContent className="p-5 lg:p-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/siswa/dashboard" />}>Beranda</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/siswa/tugas" />}>Tugas & Penilaian</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate max-w-[200px] sm:max-w-none">
                    {isQuiz ? 'Detail Quiz' : 'Detail Tugas'}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="gap-1.5 font-semibold text-[10px] text-primary border-primary/30 uppercase">
                <span className="size-1.5 rounded-full bg-primary" />
                Formatif Mandiri • Bobot 10%
              </Badge>
              <Badge variant="secondary" className="font-semibold text-[10px] uppercase">
                {isQuiz ? 'CBT-EXAM-V2.4' : 'Unggah Berkas'}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-1">
            <div className="flex flex-col gap-2 max-w-3xl">
              <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground leading-tight">
                {isQuiz ? 'Pemahaman Asinkron: Promise & Async/Await' : 'Implementasi Autentikasi JWT & Middleware Express.js'}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <BookOpen className="size-4 text-primary" />
                  Pemrograman Web & Perangkat Bergerak (XII RPL 1)
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <HelpCircle className="size-4 text-muted-foreground" />
                  Budi Pratama, S.Kom.
                </span>
              </div>
            </div>
            
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 flex items-center gap-3 self-start lg:self-auto shrink-0">
              <div className="size-10 rounded-lg bg-destructive/20 text-destructive flex items-center justify-center shrink-0">
                <Timer className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-destructive uppercase tracking-wider">
                  Tersisa 4 Hari 6 Jam
                </span>
                <span className="text-xs font-semibold text-foreground">
                  Batas: 1 Okt 2026, 15:00 WIB
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] font-semibold uppercase tracking-wider">Durasi</span>
              <Timer className="size-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{isQuiz ? '25' : '1'}</span>
              <span className="text-xs text-muted-foreground font-medium">{isQuiz ? 'Menit' : 'Minggu'}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">{isQuiz ? 'Hitung mundur otomatis' : 'Waktu pengerjaan'}</span>
          </CardContent>
        </Card>
        
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] font-semibold uppercase tracking-wider">{isQuiz ? 'Butir Soal' : 'Tipe Penyerahan'}</span>
              <FileText className="size-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{isQuiz ? '15' : 'File'}</span>
              <span className="text-xs text-muted-foreground font-medium">{isQuiz ? 'Soal' : 'ZIP/PDF'}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">{isQuiz ? 'PG Kompleks & Analisis' : 'Maksimal 10 MB'}</span>
          </CardContent>
        </Card>
        
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] font-semibold uppercase tracking-wider">Percobaan</span>
              <Monitor className="size-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{isQuiz ? '1' : '3'}</span>
              <span className="text-xs text-muted-foreground font-medium">{isQuiz ? 'Kali Sah' : 'Revisi'}</span>
            </div>
            <span className="text-[10px] text-destructive font-semibold">Tidak ada remedial instan</span>
          </CardContent>
        </Card>
        
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] font-semibold uppercase tracking-wider">KKTP Target</span>
              <CheckCircle2 className="size-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">75.0</span>
              <span className="text-xs text-muted-foreground font-medium">/ 100</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">Standar Kompetensi RPL</span>
          </CardContent>
        </Card>
        
        <Card className="border border-border shadow-sm col-span-2 md:col-span-1">
          <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] font-semibold uppercase tracking-wider">Koreksi</span>
              <Shield className="size-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-foreground">{isQuiz ? 'CBT Auto' : 'Manual'}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">{isQuiz ? 'Kunci enkripsi SHA-256' : 'Oleh Guru Pengampu'}</span>
          </CardContent>
        </Card>
      </div>

      {/* 3. Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Col (Main content) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="border border-border shadow-sm">
            <CardHeader className="p-5 pb-3 border-b border-border space-y-0 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                <CardTitle className="text-base font-semibold">Silabus & Ruang Lingkup Materi</CardTitle>
              </div>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {isQuiz ? 'MODUL-06.JS' : 'MODUL-09.JWT'}
              </Badge>
            </CardHeader>
            
            <CardContent className="p-5 flex flex-col gap-5">
              <div className="bg-muted/40 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border">
                <div className="flex items-center gap-3.5">
                  <div className="size-10 rounded-lg bg-card text-primary border border-border flex items-center justify-center font-bold text-base shadow-sm">
                    JS
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {isQuiz ? 'BAB 02: JavaScript Lanjutan' : 'BAB 03: RESTful API Backend'}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {isQuiz ? 'Topik: Asynchronous Execution, Promises, dan Modern Web API' : 'Topik: JSON Web Token & Security Middleware'}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                {isQuiz ? 'Kisi-Kisi Distribusi Indikator Soal' : 'Instruksi Pengerjaan Tugas Praktikum'}
              </h3>
              
              {isQuiz ? (
                <div className="flex flex-col gap-3">
                  <Card className="border border-border bg-card">
                    <CardContent className="p-4 flex items-start gap-3.5">
                      <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Konsep Sinkron vs Asinkron (20%)</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Mengidentifikasi perbedaan blocking dan non-blocking code pada Event Loop V8 Engine.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border bg-card">
                    <CardContent className="p-4 flex items-start gap-3.5">
                      <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Promise API & Chaining (40%)</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Menyelesaikan masalah callback hell dan memprediksi output dari serangkaian .then() dan .catch().
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border bg-card">
                    <CardContent className="p-4 flex items-start gap-3.5">
                      <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Async/Await & Error Handling (40%)</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Mengubah kode Promise lama menjadi sintaks async/await dan membungkusnya dalam try...catch block.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <ol className="list-decimal pl-5 space-y-2.5">
                    <li>Buat sebuah proyek Express.js baru atau gunakan repositori starter yang telah disediakan.</li>
                    <li>Implementasikan rute <code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono text-foreground">POST /api/auth/login</code> yang memvalidasi kredensial statis dan mengembalikan token JWT.</li>
                    <li>Buat middleware <code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono text-foreground">authenticateToken</code> di folder terpisah.</li>
                    <li>Lindungi rute <code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono text-foreground">GET /api/users/profile</code> menggunakan middleware tersebut.</li>
                    <li>Kumpulkan kode sumber dalam bentuk <code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono text-foreground">.zip</code> (tanpa folder node_modules) atau berikan link ke repository GitHub.</li>
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Col (Submission/Action) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border border-border shadow-sm sticky top-20">
            <CardHeader className="p-5 pb-4 bg-muted/40 border-b border-border space-y-1">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Status Pengerjaan
              </span>
              <CardTitle className="text-lg font-semibold text-foreground">Belum Diserahkan</CardTitle>
            </CardHeader>
            
            <CardContent className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Nilai Saat Ini</span>
                  <span className="font-semibold text-foreground">- / 100</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Percobaan ke</span>
                  <span className="font-semibold text-foreground">1 dari {isQuiz ? '1' : '3'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Tenggat Waktu</span>
                  <span className="font-bold text-destructive">1 Okt 2026, 15:00</span>
                </div>
              </div>
              
              <Separator />
              
              {isQuiz ? (
                <div className="flex flex-col gap-3">
                  <Alert variant="destructive" className="py-2.5 px-3">
                    <AlertCircle className="size-4" />
                    <AlertDescription className="text-xs leading-relaxed ml-2">
                      Sistem CBT akan mengunci browser Anda saat ujian dimulai. Pastikan koneksi internet stabil dan baterai perangkat cukup.
                    </AlertDescription>
                  </Alert>
                  <Button className="w-full text-xs font-semibold">
                    Mulai Ujian Sekarang
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button type="button" className="w-full py-3 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 text-muted-foreground hover:text-foreground text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1.5 h-28">
                    <Upload className="size-5 mb-0.5 text-muted-foreground" />
                    <span>Unggah File Tugas (.zip / .pdf)</span>
                    <span className="text-[10px] text-muted-foreground/80 font-normal">Maksimal 10 MB</span>
                  </button>
                  <div className="flex items-center gap-2 my-0.5">
                    <div className="h-px bg-border flex-1" />
                    <span className="text-[10px] text-muted-foreground font-medium">ATAU</span>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  <div className="relative">
                    <LinkIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <Input 
                      type="url" 
                      placeholder="Tempel tautan (GitHub, Drive, dll)" 
                      className="h-9 pl-9 pr-3 text-xs"
                    />
                  </div>
                  <Button className="w-full text-xs font-semibold mt-1">
                    Serahkan Tugas
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
