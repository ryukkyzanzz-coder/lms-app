'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  School,
  Clock,
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  HelpCircle,
  Star,
  Megaphone,
  PlayCircle,
  Code,
  FileText,
  AlertCircle,
  FolderArchive,
  ArrowRight,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function SiswaDetailKelasPage() {
  useParams(); // maintains client hook integration
  const [activeTab, setActiveTab] = useState('ringkasan');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Header & Context */}
      <Card className="border border-border shadow-sm bg-card">
        <CardContent className="p-5 lg:p-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/siswa/dashboard" />}>Portal Siswa</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/siswa/kelas" />}>Kelas Saya</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate max-w-[200px] sm:max-w-none">
                    Pemrograman Web & Perangkat Bergerak
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="gap-1 font-semibold text-[11px]">
                <School className="size-3 text-primary" />
                Fase F Kurikulum Merdeka
              </Badge>
              <Badge variant="secondary" className="font-semibold text-[11px]">
                KKTP: 75.0
              </Badge>
              <Badge variant="secondary" className="font-semibold text-[11px]">
                4 JP / Pertemuan
              </Badge>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pt-1">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="font-semibold text-[10px] tracking-wider uppercase">
                  Kode: RPL-302
                </Badge>
                <span className="text-muted-foreground text-xs">• Ruang Lab 02 & Hybrid LMS</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight leading-tight">
                Pemrograman Web & Perangkat Bergerak — XII RPL 1
              </h1>
              <p className="text-sm text-muted-foreground">
                Konsentrasi Keahlian Rekayasa Perangkat Lunak • Semester Ganjil TA 2026/2027
              </p>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/40 border border-border self-start xl:self-auto shrink-0 w-full xl:w-auto min-w-[310px]">
              <div className="size-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-base shrink-0">
                BP
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-foreground truncate">Budi Pratama, S.Kom.</span>
                  <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                </div>
                <span className="text-xs text-muted-foreground truncate">Wali Kelas & Guru Produktif RPL</span>
                <div className="flex items-center gap-2 mt-1">
                  <button type="button" className="text-primary hover:underline text-[11px] font-semibold transition-colors">
                    Kontak Pembimbing
                  </button>
                  <span className="text-muted-foreground/60">•</span>
                  <button type="button" className="text-muted-foreground hover:text-foreground text-[11px] font-semibold transition-colors">
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-11 p-1 bg-muted/60 border border-border rounded-xl">
          <TabsTrigger value="ringkasan" className="gap-2 text-xs font-semibold shrink-0">
            <LayoutDashboard className="size-4" />
            <span>Ringkasan Kelas</span>
          </TabsTrigger>
          <TabsTrigger value="materi" className="gap-2 text-xs font-semibold shrink-0">
            <BookOpen className="size-4" />
            <span>Materi Pembelajaran</span>
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] ml-0.5">12</Badge>
          </TabsTrigger>
          <TabsTrigger value="tugas" className="gap-2 text-xs font-semibold shrink-0">
            <ClipboardCheck className="size-4" />
            <span>Tugas Praktikum</span>
            <Badge variant="destructive" className="px-1.5 py-0 text-[10px] ml-0.5">2 Aktif</Badge>
          </TabsTrigger>
          <TabsTrigger value="quiz" className="gap-2 text-xs font-semibold shrink-0">
            <HelpCircle className="size-4" />
            <span>Quiz & Ujian</span>
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] ml-0.5">1</Badge>
          </TabsTrigger>
          <TabsTrigger value="nilai" className="gap-2 text-xs font-semibold shrink-0">
            <Star className="size-4" />
            <span>Nilai Akademik Saya</span>
          </TabsTrigger>
          <TabsTrigger value="pengumuman" className="gap-2 text-xs font-semibold shrink-0">
            <Megaphone className="size-4" />
            <span>Pengumuman Kelas</span>
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] ml-0.5">3</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Section A: Sedang Dipelajari */}
          <Card className="border border-border shadow-sm relative overflow-hidden">
            <CardContent className="p-5 lg:p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 font-semibold">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Modul Berjalan • Pekan ke-8
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Target: 24 - 29 Sep 2026</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2 max-w-xl">
                  <Badge variant="secondary" className="text-[11px] font-semibold">
                    Bab 03: RESTful API & Integrasi Backend Node.js
                  </Badge>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground leading-tight">
                    Topik 07: Konsep Arsitektur RESTful API, HTTP Methods & Status Code
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Membedah prinsip dasar arsitektur stateless, perancangan URI endpoints baku, implementasi controller modular, dan response format JSON standar industri.
                  </p>
                </div>
                
                {/* Progress indicator */}
                <div className="flex items-center gap-3.5 shrink-0 bg-muted/40 border border-border p-3 rounded-xl">
                  <div className="flex flex-col gap-1 min-w-[120px]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold">Progres Materi</span>
                      <span className="font-bold text-primary">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <span className="text-[11px] font-medium text-foreground mt-0.5">3 dari 4 Subbab</span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                <Button size="sm" className="gap-2 text-xs font-semibold">
                  <PlayCircle className="size-4" />
                  <span>Lanjutkan Modul 03 (Sesi 4)</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-xs font-semibold">
                  <Code className="size-4 text-muted-foreground" />
                  <span>Buka Starter Code</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground md:ml-auto">
                  <FileText className="size-4" />
                  <span>Unduh Handout PDF</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section B: Tugas Praktikum Mendatang */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between border-b border-border space-y-0">
              <div className="flex items-center gap-2">
                <AlertCircle className="size-5 text-primary" />
                <CardTitle className="text-base font-semibold">Tugas Praktikum Mendatang</CardTitle>
              </div>
              <Badge variant="destructive" className="text-[10px] font-semibold uppercase">
                1 Mendesak
              </Badge>
            </CardHeader>
            
            <CardContent className="p-5 flex flex-col gap-4">
              <Card className="border border-border bg-muted/20">
                <CardContent className="p-4 lg:p-5 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="text-[10px] font-semibold">
                          Praktikum Lab Mandiri
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] font-semibold">
                          Asesmen Sumatif 03
                        </Badge>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight">
                        Tugas 03: Implementasi Autentikasi JWT & Middleware Express.js
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Buat skema login & register dengan hashing kata sandi (bcrypt) serta verifikasi token Bearer JWT pada protected route data siswa.
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end shrink-0 gap-1 text-right bg-card sm:bg-transparent p-2.5 sm:p-0 rounded-lg border sm:border-none border-border">
                      <span className="inline-flex items-center gap-1.5 text-destructive text-xs sm:text-sm font-bold">
                        <Clock className="size-4" />
                        Sisa 4 Hari
                      </span>
                      <span className="text-[11px] text-muted-foreground font-medium">Rabu, 30 Sep 2026, 23:59</span>
                    </div>
                  </div>
                  
                  <div className="p-3.5 rounded-lg bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                        <FolderArchive className="size-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-semibold text-foreground">Draf Tersedia:</span>
                          <span className="text-xs font-medium text-primary hover:underline cursor-pointer truncate">
                            rakha_jwt_express_v1.zip (14.2 MB)
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-0.5">Terakhir diperbarui: 25 Sep 2026, 14.10 WIB</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" className="text-xs font-semibold">
                        Edit Draf
                      </Button>
                      <Button render={<Link href="/siswa/tugas/tugas-03" />} size="sm" className="gap-1.5 text-xs font-semibold">
                        <span>Kumpulkan</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border border-border shadow-sm">
            <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between border-b border-border space-y-0">
              <div className="flex items-center gap-2">
                <UserCheck className="size-5 text-primary" />
                <CardTitle className="text-base font-semibold">Capaian Akademik Saya</CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] font-semibold text-muted-foreground uppercase">
                Privat
              </Badge>
            </CardHeader>
            
            <CardContent className="p-5 flex flex-col gap-4">
              <Card className="border border-primary/30 bg-primary/5 shadow-sm">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                      Rerata Nilai Berjalan
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold text-foreground leading-none">88.0</span>
                      <span className="text-xs text-muted-foreground font-medium">/ 100.0</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                      <CheckCircle2 className="size-3.5" />
                      Melampaui KKTP (75.0)
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center size-12 rounded-lg bg-primary text-primary-foreground">
                    <span className="text-xl font-bold leading-none">A</span>
                    <span className="text-[7px] uppercase font-bold mt-0.5 tracking-wider">Sangat Baik</span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mb-1">
                    Kehadiran
                  </span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 leading-tight">100%</span>
                  <span className="text-[10px] text-muted-foreground font-medium mt-0.5">24 dari 24 Sesi</span>
                </div>
                <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mb-1">
                    Ketuntasan Tugas
                  </span>
                  <span className="text-lg font-bold text-primary leading-tight">6 / 6</span>
                  <span className="text-[10px] text-muted-foreground font-medium mt-0.5">Tepat Waktu (100%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
