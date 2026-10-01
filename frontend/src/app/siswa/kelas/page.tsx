'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2,
  Terminal,
  Clock,
  Search,
  ArrowUpDown,
  Timer,
  Calendar,
  Monitor,
  ClipboardList,
  UserCheck,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { fetchAPI } from '@/lib/api';

export default function SiswaKelasPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState<any[]>([]);
  const [activeClassDetail, setActiveClassDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadClasses = async () => {
      try {
        const res = await fetchAPI('/students/me/classes');
        if (isMounted && res?.success && res.data?.length > 0) {
          setClasses(res.data);
          const firstClassId = res.data[0]._id;
          const detailRes = await fetchAPI(`/students/me/classes/${firstClassId}`);
          if (isMounted && detailRes?.success) {
            setActiveClassDetail(detailRes.data);
          }
        }
      } catch (err) {
        console.error('Failed to load student classes:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadClasses();
    return () => {
      isMounted = false;
    };
  }, []);

  const primaryClass = classes[0] || {
    nama: 'XII RPL 1',
    program: 'Rekayasa Perangkat Lunak',
    tingkat: 'XII',
  };

  const defaultSubjects = [
    {
      _id: 'rpl-301',
      kode: 'RPL-301',
      nama: 'Pemrograman Web & Perangkat Bergerak',
      guru: 'Budi Pratama, S.Kom.',
      role: 'Wali Kelas XII RPL 1',
      category: 'kejuruan',
      tag: 'Praktikum Utama',
      tugasCount: '2 Tugas Aktif',
      jadwal: 'Senin (07.00 - 08.30) & Rabu',
      ruang: 'Lab Komputer RPL 2',
      progress: 67,
      progressText: '8 / 12 Modul Tuntas (67%)',
    },
    {
      _id: 'rpl-302',
      kode: 'RPL-302',
      nama: 'Basis Data & Pemodelan Relasional',
      guru: 'Siti Aulia, S.Kom.',
      role: 'Guru Kejuruan RPL',
      category: 'kejuruan',
      tag: 'Teori & Praktik',
      tugasCount: '1 Tugas Aktif',
      jadwal: 'Selasa & Kamis',
      ruang: 'Lab Komputer RPL 1',
      progress: 66,
      progressText: '6 / 9 Modul Tuntas (66%)',
    },
    {
      _id: 'rpl-303',
      kode: 'RPL-303',
      nama: 'Pemrograman Berorientasi Objek (Java)',
      guru: 'Budi Pratama, S.Kom.',
      role: 'Guru Produktif RPL',
      category: 'kejuruan',
      tag: 'Praktikum OOP',
      tugasCount: '1 Tugas Aktif',
      jadwal: 'Jumat (08.00 - 11.00)',
      ruang: 'Lab Komputer RPL 2',
      progress: 70,
      progressText: '7 / 10 Modul Tuntas (70%)',
    },
    {
      _id: 'rpl-304',
      kode: 'RPL-304',
      nama: 'Produk Kreatif & Kewirausahaan (PKK)',
      guru: 'Dra. Endang W.',
      role: 'Guru Kewirausahaan',
      category: 'kejuruan',
      tag: 'Projek Portofolio',
      tugasCount: 'Tepat Waktu',
      jadwal: 'Kamis (13.00 - 15.30)',
      ruang: 'Ruang Teori XII RPL 1',
      progress: 50,
      progressText: '4 / 8 Modul Tuntas (50%)',
    },
  ];

  // Merge backend subjects if available
  const subjects = activeClassDetail?.subjects && activeClassDetail.subjects.length > 0
    ? activeClassDetail.subjects.map((sub: any, idx: number) => ({
        _id: sub.mataPelajaranId || sub._id || `sub-${idx}`,
        kode: sub.kode || `RPL-30${idx + 1}`,
        nama: sub.nama || 'Mata Pelajaran',
        guru: sub.guru?.nama || primaryClass.waliKelas?.nama || 'Guru Pengampu',
        role: 'Guru Pengampu',
        category: 'kejuruan',
        tag: 'Praktikum Utama',
        tugasCount: 'Aktif',
        jadwal: 'Senin & Rabu (07.00 - 08.30)',
        ruang: 'Lab Komputer RPL',
        progress: 67,
        progressText: 'Modul Aktif',
      }))
    : defaultSubjects;

  const filteredSubjects = subjects.filter((s: any) => {
    if (filter === 'kejuruan' && s.category !== 'kejuruan') return false;
    if (filter === 'umum' && s.category === 'kejuruan') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return s.nama.toLowerCase().includes(q) || s.guru.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Academic Context Header */}
      <Card className="border border-border shadow-sm bg-card">
        <CardContent className="p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/siswa/dashboard" />}>Portal Siswa</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-muted-foreground">Pembelajaran</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Kelas Saya</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-wrap items-center gap-2.5 mt-0.5">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Kelas Saya — Rombel & Mata Pelajaran
              </h1>
              <Badge variant="secondary" className="gap-1.5 font-semibold text-xs py-0.5">
                <span className="size-1.5 rounded-full bg-primary" />
                Semester Ganjil TA 2026/2027 • Fase F (SMK)
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Daftar seluruh rombongan belajar konsentrasi keahlian {primaryClass.program || 'Rekayasa Perangkat Lunak'} yang kamu ikuti semester ini.
            </p>
          </div>

          {/* Live Dapodik State Badge */}
          <div className="flex items-center gap-3 self-start lg:self-center shrink-0 bg-muted/50 px-4 py-2.5 rounded-xl border border-border">
            <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground leading-tight">
                Sinkronisasi Rombel
              </span>
              <span className="text-xs font-bold text-foreground leading-tight mt-0.5">
                Dapodik Terkunci • {primaryClass.nama}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Summary Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="size-10 rounded-lg bg-primary/10 border border-border flex items-center justify-center text-primary shrink-0">
                <Terminal className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                  Mata Pelajaran Kejuruan
                </span>
                <span className="text-base sm:text-lg font-bold text-foreground leading-tight mt-0.5">
                  {subjects.length} Konsentrasi Keahlian
                </span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs font-semibold hidden lg:inline-flex">
              RPL
            </Badge>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="size-10 rounded-lg bg-primary/10 border border-border flex items-center justify-center text-primary shrink-0">
                <BookOpen className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                  Muatan Nasional & Umum
                </span>
                <span className="text-base sm:text-lg font-bold text-foreground leading-tight mt-0.5">
                  3 Mata Pelajaran
                </span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs font-semibold hidden lg:inline-flex">
              Fase F
            </Badge>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="size-10 rounded-lg bg-emerald-500/10 border border-border flex items-center justify-center text-emerald-600 shrink-0">
                <Clock className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                  Beban Belajar Mingguan
                </span>
                <span className="text-base sm:text-lg font-bold text-foreground leading-tight mt-0.5">
                  48 Jam Pelajaran (JP)
                </span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 hidden lg:inline-flex">
              Aktif
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* 3. Operational Filter & Search */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input 
              className="h-9 pl-9 pr-3 text-xs sm:text-sm bg-muted/30" 
              placeholder="Cari mata pelajaran, guru pengampu..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Button 
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              className="text-xs font-semibold whitespace-nowrap"
            >
              Semua Kategori ({subjects.length})
            </Button>
            <Button 
              onClick={() => setFilter('kejuruan')}
              variant={filter === 'kejuruan' ? 'default' : 'outline'}
              size="sm"
              className="text-xs font-semibold whitespace-nowrap"
            >
              Konsentrasi RPL ({subjects.length})
            </Button>
            <Button 
              onClick={() => setFilter('umum')}
              variant={filter === 'umum' ? 'default' : 'outline'}
              size="sm"
              className="text-xs font-semibold whitespace-nowrap"
            >
              Umum & Nasional (3)
            </Button>
            <div className="h-4 w-px bg-border mx-1 hidden sm:block" />
            <Button variant="ghost" size="icon-sm" className="size-8 text-muted-foreground" title="Urutkan Jadwal">
              <ArrowUpDown className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 4. Section: Kejuruan */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="size-2 rounded-sm bg-primary" />
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              Konsentrasi Keahlian — {primaryClass.program || 'Rekayasa Perangkat Lunak'}
            </h2>
            <Badge variant="outline" className="text-xs font-semibold text-muted-foreground">
              Fase F SMK
            </Badge>
          </div>
          <span className="text-xs font-semibold text-primary">{filteredSubjects.length} Mata Pelajaran Terjadwal</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredSubjects.map((sub: any, idx: number) => {
            const detailHref = `/siswa/kelas/${sub._id}`;
            const initials = sub.guru
              ? sub.guru.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
              : 'BP';

            return (
              <Card key={sub._id || idx} className="border border-border shadow-sm flex flex-col justify-between hover:border-primary/50 transition-colors">
                <CardContent className="p-5 flex flex-col flex-1 gap-4">
                  {/* Meta Top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="font-semibold text-[10px] tracking-wider uppercase">
                        {sub.kode}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 font-semibold">
                        {sub.tag || 'Praktikum Utama'}
                      </Badge>
                    </div>
                    {idx === 0 && (
                      <Badge variant="destructive" className="gap-1 text-[10px] font-semibold">
                        <Timer className="size-3" /> 1 Tugas Mendekati Tenggat
                      </Badge>
                    )}
                  </div>
                  
                  {/* Title & Teacher */}
                  <div>
                    <Link href={detailHref} className="group">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {sub.nama}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2 flex-wrap">
                      <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                        {initials}
                      </div>
                      <span className="font-semibold text-foreground">{sub.guru}</span>
                      <span>•</span>
                      <span className="text-muted-foreground">{sub.role || 'Guru Pengampu'}</span>
                    </div>
                  </div>
                  
                  {/* Schedule & Room */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-muted/40 rounded-lg border border-border/60 text-xs text-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground shrink-0" />
                      <span className="font-medium">{sub.jadwal || 'Senin & Rabu'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="size-4 text-muted-foreground shrink-0" />
                      <span className="font-medium">{sub.ruang || 'Lab Komputer RPL'}</span>
                    </div>
                  </div>
                  
                  {/* Progress Capaian */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-muted-foreground font-medium">Capaian Pembelajaran (CP)</span>
                      <span className="font-semibold text-primary">{sub.progressText || 'Modul Aktif'}</span>
                    </div>
                    <Progress value={sub.progress || 67} className="h-2" />
                  </div>
                  
                  {/* Operational Indicators */}
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-card border border-border">
                      <ClipboardList className="size-4 text-primary shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider leading-none mb-1">
                          Status Tugas
                        </span>
                        <span className="font-bold text-foreground text-xs leading-tight truncate">
                          {sub.tugasCount || 'Aktif'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-card border border-border">
                      <UserCheck className="size-4 text-emerald-600 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider leading-none mb-1">
                          Presensi Sesi
                        </span>
                        <span className="font-bold text-emerald-600 text-xs leading-tight truncate">
                          100% (24/24)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                {/* Action CTAs */}
                <div className="p-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Button render={<Link href="/siswa/materi" />} variant="outline" size="sm" className="w-full sm:w-auto gap-2 text-xs font-semibold">
                    <BookOpen className="size-3.5" />
                    <span>Materi & Silabus</span>
                  </Button>
                  <Button render={<Link href={detailHref} />} size="sm" className="w-full sm:w-auto gap-1.5 text-xs font-semibold">
                    <span>Buka Ruang Kelas</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
