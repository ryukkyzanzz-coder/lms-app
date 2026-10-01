'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Home,
  TrendingUp,
  BookOpen,
  Award,
  AlertCircle,
  FileText,
  PieChart,
  Target,
  Download,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Clock,
  Loader2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { fetchAPI } from '@/lib/api';

export default function SiswaNilaiPage() {
  const [loading, setLoading] = useState(true);
  const [gradesData, setGradesData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadGrades() {
      try {
        const res = await fetchAPI<any>('/students/me/grades');
        if (isMounted && res.data) {
          setGradesData(res.data);
        }
      } catch (err) {
        console.error('Failed to load grades:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadGrades();
    return () => {
      isMounted = false;
    };
  }, []);

  const summary = gradesData?.summary || {
    rerataNilai: 86.4,
    predikat: 'A-',
    modulSelesai: 32,
    modulTotal: 42,
    modulPersen: 75,
    kehadiranPersen: 98,
    kehadiranDetail: '49 dari 50 sesi tatap muka',
    tugasBelumSelesaiCount: 3,
  };

  const perhatianList = gradesData?.perhatianList && gradesData.perhatianList.length > 0
    ? gradesData.perhatianList
    : [
        {
          _id: 'tugas-03',
          judul: 'Tugas Praktikum 03: Implementasi Autentikasi JWT & Middleware',
          mapel: 'Pemrograman Web & Perangkat Bergerak',
          guru: 'Budi Pratama, S.Kom.',
          deadline: '30 September 2026, 23:59 WIB',
          sisaHari: 'Tersisa 4 Hari',
          bobot: '15%',
          isQuiz: false,
        },
        {
          _id: 'quiz-02',
          judul: 'Kuis Formatif 02: Pemahaman Asinkronus (Promise & Async/Await)',
          mapel: 'Pemrograman Web & Perangkat Bergerak',
          guru: '15 Soal Pilihan Ganda Teknis',
          deadline: '01 Oktober 2026',
          sisaHari: '1 Kesempatan',
          bobot: 'Durasi: 25 Menit',
          isQuiz: true,
        },
      ];

  const subjects = gradesData?.mataPelajaran && gradesData.mataPelajaran.length > 0
    ? gradesData.mataPelajaran
    : [
        {
          nama: 'Pemrograman Web & Perangkat Bergerak',
          guru: 'Budi Pratama, S.Kom. • 4 JP/Pekan',
          nilai: 88.0,
          statusKKTP: 'Tuntas KKTP',
          modulSelesai: 8,
          modulTotal: 12,
          persentaseModul: 67,
          tugasSelesai: 2,
          tugasTotal: 3,
          catatan: 'Segera selesaikan tugas 03 JWT Authentication sebelum tenggat 30 September untuk menjaga nilai kepatuhan praktikum lab.',
        },
        {
          nama: 'Basis Data & Pemodelan Relasional',
          guru: 'Siti Aulia, S.Kom. • 4 JP/Pekan',
          nilai: 85.0,
          statusKKTP: 'Tuntas KKTP',
          modulSelesai: 6,
          modulTotal: 9,
          persentaseModul: 66,
          tugasSelesai: 1,
          tugasTotal: 1,
          catatan: 'Tingkatkan latihan query JOIN bertingkat dan agregasi GROUP BY di Lab Komputer sebelum asesmen sumatif.',
        },
        {
          nama: 'Pemrograman Berorientasi Objek (Java)',
          guru: 'Drs. Hendra Setiawan • 4 JP/Pekan',
          nilai: 86.5,
          statusKKTP: 'Tuntas KKTP',
          modulSelesai: 7,
          modulTotal: 10,
          persentaseModul: 70,
          tugasSelesai: 3,
          tugasTotal: 3,
          catatan: 'Seluruh penugasan modul Enkapsulasi, Inheritance, dan Polimorfisme telah dinilai lengkap dan memenuhi indikator.',
        },
      ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-7xl mx-auto">
      {/* 1. Academic Context Banner */}
      <Card>
        <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/siswa/dashboard" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />
                    <span>Portal Siswa</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Progres Belajar &amp; Nilai</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Progres Belajar Pribadi
              </h1>
              <Badge variant="secondary" className="text-[10px] font-semibold uppercase tracking-wider">
                Semester Ganjil 2026
              </Badge>
              {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
            
            <CardDescription className="max-w-3xl mt-1">
              Pantau perkembangan belajar Anda, ketuntasan modul ajar, rekap nilai ujian, dan kepatuhan penyelesaian tugas.
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
            <Button variant="outline" className="gap-2" onClick={handlePrint}>
              <Download className="h-4 w-4" />
              Unduh Transkrip (PDF)
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* 2. Ringkasan Metrik Pribadi (4-Card Metric Strip) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <Card className="flex flex-col justify-between">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Capaian Akademik</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{summary.rerataNilai}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <TrendingUp className="h-3.5 w-3.5" /> +2.4
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <span className="text-xs text-muted-foreground flex items-center justify-between">
                Status Keseluruhan: <Badge variant="secondary" className="text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60 font-semibold">Tuntas (Predikat {summary.predikat})</Badge>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="flex flex-col justify-between">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Penyelesaian Modul</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{summary.modulPersen}%</span>
                  <span className="text-muted-foreground text-sm font-medium">{summary.modulSelesai}/{summary.modulTotal}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Progress value={summary.modulPersen} className="w-full">
                <ProgressTrack className="h-1.5 w-full bg-muted">
                  <ProgressIndicator className="bg-primary" />
                </ProgressTrack>
              </Progress>
              <span className="text-[10px] text-muted-foreground">
                {Math.max(0, summary.modulTotal - summary.modulSelesai)} modul tersisa semester ini
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="flex flex-col justify-between">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Kehadiran (Absensi)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{summary.kehadiranPersen}%</span>
                  <span className="text-muted-foreground text-sm font-medium">Hadir</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Progress value={summary.kehadiranPersen} className="w-full">
                <ProgressTrack className="h-1.5 w-full bg-muted">
                  <ProgressIndicator className="bg-emerald-600 dark:bg-emerald-500" />
                </ProgressTrack>
              </Progress>
              <span className="text-[10px] text-muted-foreground">{summary.kehadiranDetail}</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="flex flex-col justify-between border-l-4 border-l-destructive">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Tugas Belum Selesai</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-destructive">
                    {summary.tugasBelumSelesaiCount}
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">Tugas</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <span className="text-xs font-semibold text-destructive flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" /> Butuh Perhatian Segera
              </span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* 3. Action Required List */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Perhatian &amp; Tindak Lanjut Akademik</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                {perhatianList.length} Agenda Memerlukan Aksi Anda
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 divide-y">
          {perhatianList.map((item: any, idx: number) => {
            const linkHref = `/siswa/tugas/${item._id}`;
            const formattedDeadline = item.deadline
              ? (isNaN(Date.parse(item.deadline)) ? item.deadline : new Date(item.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }))
              : 'Tenggat Waktu Dekat';

            return (
              <div key={item._id || idx} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${item.isQuiz ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-primary/10 text-primary'} flex items-center justify-center shrink-0`}>
                    {item.isQuiz ? <PieChart className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={linkHref} className="text-base font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                        {item.judul}
                      </Link>
                      <Badge variant={item.isQuiz ? 'secondary' : 'destructive'} className={item.isQuiz ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/50 text-[10px] font-semibold' : 'text-[10px] font-semibold'}>
                        {item.sisaHari || 'Perlu Diserahkan'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.mapel} • {item.guru}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Batas: {formattedDeadline}</span>
                      <span className="flex items-center gap-1"><Target className="h-3.5 w-3.5" /> Bobot: {item.bobot || '15%'}</span>
                    </div>
                  </div>
                </div>
                <Button render={<Link href={linkHref} />} size="sm" variant={item.isQuiz ? 'outline' : 'default'} className="w-full md:w-auto shrink-0 gap-1.5">
                  <span>{item.isQuiz ? 'Mulai Kuis' : 'Kerjakan'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* 4. Subject Progress Grid */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Evaluasi Pembelajaran per Mata Pelajaran</h2>
          <p className="text-sm text-muted-foreground">Rincian nilai dan penyelesaian tugas untuk semua mata pelajaran semester ini.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {subjects.map((sub: any, idx: number) => (
            <Card key={sub.id || idx} className="flex flex-col justify-between">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">Konsentrasi Keahlian</span>
                    <CardTitle className="text-lg font-semibold leading-tight hover:text-primary cursor-pointer transition-colors">
                      {sub.nama}
                    </CardTitle>
                    <CardDescription className="text-xs mt-1">{sub.guru}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-2xl font-bold text-primary">{sub.nilai}</span>
                    <Badge variant="secondary" className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/50 uppercase tracking-wider">
                      {sub.statusKKTP || 'Tuntas KKTP'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <div className="grid grid-cols-3 gap-2 bg-muted/50 rounded-lg p-3 mb-4">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Modul</span>
                      <span className="text-lg font-bold text-foreground">{sub.modulSelesai}/{sub.modulTotal}</span>
                      <span className="text-[10px] text-muted-foreground">{sub.persentaseModul}% Silabus</span>
                    </div>
                    <div className="flex flex-col items-center text-center border-x">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Praktikum</span>
                      <span className="text-lg font-bold text-foreground">{sub.tugasSelesai}/{sub.tugasTotal}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {sub.tugasSelesai >= sub.tugasTotal ? 'Tuntas' : `${sub.tugasTotal - sub.tugasSelesai} Berjalan`}
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Ujian/Quiz</span>
                      <span className="text-lg font-bold text-foreground">2</span>
                      <span className="text-[10px] text-muted-foreground">Rerata {sub.nilai}</span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-1.5">
                      <span>Progres Capaian Pembelajaran</span>
                      <span className="font-semibold text-foreground">{sub.persentaseModul}%</span>
                    </div>
                    <Progress value={sub.persentaseModul} className="w-full">
                      <ProgressTrack className="h-1.5 w-full bg-muted">
                        <ProgressIndicator className="bg-primary" />
                      </ProgressTrack>
                    </Progress>
                  </div>
                </div>
                
                <div className="pt-3 border-t flex items-start gap-3 bg-muted/40 p-3 rounded-lg border">
                  <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground">Catatan &amp; Arahan:</span>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {sub.catatan}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

