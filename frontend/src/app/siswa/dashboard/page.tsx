'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen,
  Calendar,
  Clock,
  FileText,
  PieChart,
  Target,
  Award,
  ChevronRight,
  TrendingUp,
  Bell,
  CheckCircle2,
  Monitor,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export default function SiswaDashboardPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. ACADEMIC CONTEXT HEADER */}
      <Card className="border border-border shadow-sm bg-card">
        <CardContent className="p-5 lg:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Selamat datang kembali, Dafiand
              </h1>
              <Badge variant="secondary" className="font-semibold text-xs py-0.5">
                NISN 2204128
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm flex-wrap">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Calendar className="size-4 text-primary" />
                Sabtu, 26 September 2026
              </span>
              <span className="text-muted-foreground/60">•</span>
              <span>Semester Ganjil TA 2026/2027</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="font-semibold text-primary">Minggu Efektif Ke-11</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="bg-muted/50 border border-border px-4 py-2.5 rounded-xl flex items-center gap-3">
              <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Award className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Rerata Nilai
                </span>
                <span className="text-lg font-bold text-foreground">
                  86.4 <span className="text-emerald-600 text-xs font-semibold ml-1">(A-)</span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kiri: Jadwal & Tugas (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Jadwal Hari Ini */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="text-primary size-5" />
                <h2 className="text-base sm:text-lg font-semibold text-foreground">Jadwal Hari Ini</h2>
              </div>
              <Button render={<Link href="/siswa/jadwal" />} variant="link" size="sm" className="text-xs h-auto p-0 font-semibold text-primary">
                Lihat Semua Jadwal
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item 1: Selesai */}
              <Card className="border border-border opacity-85 hover:opacity-100 transition-opacity">
                <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="gap-1 text-[11px] text-emerald-700 bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400">
                      <CheckCircle2 className="size-3" /> Selesai
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">07.00 – 08.30 WIB</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Matematika Terapan</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                      <BookOpen className="size-3.5 text-muted-foreground/70" />
                      Ruang Kelas XII RPL 1 • Drs. Haryono
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Item 2: Sedang Berlangsung */}
              <Card className="border-2 border-primary/40 bg-card relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary text-primary-foreground text-[10px] font-semibold">
                      Sedang Berlangsung
                    </Badge>
                    <span className="text-xs text-primary font-bold">08.45 – 10.15 WIB</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Pemrograman Web</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Monitor className="size-3.5 text-primary" />
                      Lab Komputer 2 • Budi Pratama, S.Kom.
                    </p>
                  </div>
                  <div className="p-2 bg-muted/60 rounded-md flex items-center gap-2 border border-border/60">
                    <BookOpen className="size-3.5 text-primary shrink-0" />
                    <span className="text-xs text-foreground font-medium truncate">Topik: JWT & Security Middleware</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tugas yang Harus Diselesaikan */}
          <div className="flex flex-col gap-3 mt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="text-destructive size-5" />
                <h2 className="text-base sm:text-lg font-semibold text-foreground">Tugas & Tenggat Waktu Terdekat</h2>
              </div>
              <Badge variant="destructive" className="text-[11px] font-semibold">
                2 Belum Selesai
              </Badge>
            </div>
            
            <div className="flex flex-col gap-3">
              <Link href="/siswa/tugas/tugas-03" className="group">
                <Card className="border border-border group-hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="size-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Tugas 03: Autentikasi JWT & Middleware
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Pemrograman Web & Perangkat Bergerak</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <Badge variant="destructive" className="text-[10px] font-semibold py-0">
                            Sisa 4 Hari
                          </Badge>
                          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                            <Clock className="size-3" /> Batas: 30 Sep, 23:59
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                      <ChevronRight className="size-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/siswa/tugas/quiz-02" className="group">
                <Card className="border border-border group-hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <PieChart className="size-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Kuis Formatif: Pemahaman Asinkronus JS
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Pemrograman Web & Perangkat Bergerak</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <Badge variant="secondary" className="text-[10px] font-semibold py-0">
                            Belum Dikerjakan
                          </Badge>
                          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                            <Clock className="size-3" /> Batas: 1 Okt, 15:00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                      <ChevronRight className="size-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
            
            <Button render={<Link href="/siswa/tugas" />} variant="outline" className="w-full gap-1.5 text-xs font-semibold mt-1">
              <span>Lihat Semua Tugas</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Kanan: Pengumuman & Progres (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Progres Modul */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between border-b border-border space-y-0">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Progres Belajar</CardTitle>
              </div>
              <Button render={<Link href="/siswa/nilai" />} variant="ghost" size="icon-sm" className="size-7 text-muted-foreground hover:text-foreground">
                <ChevronRight className="size-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span className="font-semibold text-foreground">Pemrograman Web</span>
                  <span>8 / 12 Modul</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span className="font-semibold text-foreground">Basis Data</span>
                  <span>6 / 9 Modul</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span className="font-semibold text-foreground">PBO (Java)</span>
                  <span>7 / 10 Modul</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Pengumuman Terkini */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between border-b border-border space-y-0">
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-amber-500" />
                <CardTitle className="text-sm font-semibold">Pengumuman</CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50">
                1 Baru
              </Badge>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3">
              <Link href="/siswa/pengumuman/peng-1" className="group block">
                <div className="flex flex-col gap-1 hover:bg-muted/50 p-2 -mx-2 rounded-lg transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      Perubahan Jadwal Praktikum Lab
                    </span>
                    <span className="size-2 rounded-full bg-primary shrink-0" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">Budi Pratama, S.Kom. • Kemarin, 14:30</span>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    Diinformasikan kepada seluruh siswa XII RPL 1, jadwal praktikum Web dipindah ke Lab 2 karena...
                  </p>
                </div>
              </Link>
              
              <Separator />
              
              <Link href="/siswa/pengumuman/peng-2" className="group block">
                <div className="flex flex-col gap-1 hover:bg-muted/50 p-2 -mx-2 rounded-lg transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      Pembayaran SPP Bulan September
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">Tata Usaha • 23 Sep 2026</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
