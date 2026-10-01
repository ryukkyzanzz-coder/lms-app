'use client';

import React, { useState, useEffect } from 'react';
import { fetchAPI } from '../../../lib/api';
import { TeacherDashboardStats } from '../../../types/guru';
import { 
  Calendar, 
  ClipboardCheck, 
  Clock, 
  CheckCircle, 
  Monitor, 
  ClipboardList, 
  Info, 
  ExternalLink, 
  ArrowRight,
  AlertTriangle,
  GraduationCap,
  FileText,
  Send,
  DoorOpen,
  Shield
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTeacher } from '@/lib/guru/teacher-context';

export default function Dashboard() {
  const { teacher, isLoading: loadingTeacher } = useTeacher();
  const [data, setData] = useState<TeacherDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reloadDashboard = () => {
    setLoading(true);
    setError('');
    fetchAPI('/teachers/me/dashboard')
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let isMounted = true;
    fetchAPI('/teachers/me/dashboard')
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-7 w-64 mb-2" />
            <Skeleton className="h-4 w-40 mb-4" />
            <div className="flex gap-3">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-28" />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-5 flex flex-col gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-full" />
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertTriangle className="size-5" />
          <AlertTitle>Gagal Memuat Dashboard</AlertTitle>
          <AlertDescription className="mt-2 space-y-3">
            <p>{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={reloadDashboard}
            >
              Coba Lagi
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) return null;

  const totalSiswa = data.kelas.reduce((acc, curr) => acc + curr.jumlahSiswa, 0);
  const totalRombel = data.kelas.length;
  const teacherDisplayName = loadingTeacher ? '...' : (teacher?.nama || 'Dafiand');
  const teacherDisplayNip = loadingTeacher ? '...' : (teacher?.nip || '—');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      {/* 1. ACADEMIC CONTEXT HEADER */}
      <Card>
        <CardContent className="p-6 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex flex-col">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                Selamat datang kembali, {teacherDisplayName}
              </h1>
              <span className="text-sm font-medium text-muted-foreground">
                NIP. {teacherDisplayNip}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5 text-foreground">
                <Calendar className="size-3.5 text-primary" />
                Sabtu, 26 September 2026
              </span>
              <span>•</span>
              <span>Semester Ganjil TA 2026/2027</span>
              <span>•</span>
              <Badge variant="secondary" className="font-semibold text-primary">
                Minggu Efektif Ke-11
              </Badge>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <ClipboardCheck className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Kurikulum Merdeka SMK
                </span>
                <span className="text-sm font-medium text-foreground mt-0.5">
                  Target Silabus: <strong className="text-emerald-600 font-bold">68% Tercapai</strong>
                </span>
              </div>
            </div>
            <Button variant="outline" className="h-auto py-3 gap-2">
              <FileText className="size-4 text-primary" />
              <span>Jurnal Guru</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2. HARI INI: JADWAL & OPERASIONAL MENGAJAR */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Hari Ini: Jadwal & Operasional Mengajar
            </h2>
          </div>
          <span className="text-xs text-muted-foreground font-medium">3 Sesi Terjadwal • Shift Pagi</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Item 1: Selesai */}
          <Card className="opacity-80 flex flex-col justify-between">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                  <CheckCircle className="size-3.5 text-muted-foreground" />
                  Telah Selesai
                </Badge>
                <span className="text-xs font-semibold text-muted-foreground line-through">07.00 – 08.30 WIB</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">XII RPL 1</span>
                <h3 className="text-base font-semibold text-muted-foreground mt-1">Pemrograman Web</h3>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <Monitor className="size-3.5" />
                  Lab Komputer 2 (32/32 Hadir)
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border">
                <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                  <ClipboardList className="size-3.5" />
                  Lihat Presensi & Jurnal Kelas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Item 2: Sedang Berlangsung */}
          <Card className="border-primary/60 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Badge variant="default" className="gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                  <span className="size-1.5 rounded-full bg-primary-foreground" />
                  Sekarang (Berlangsung 35 mnt)
                </Badge>
                <span className="text-xs font-bold text-primary">08.45 – 10.15 WIB</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <span>XI RPL 2</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground capitalize">Sesi Teori & Praktik</span>
                </div>
                <h3 className="text-base font-bold text-foreground mt-1">Basis Data</h3>
                <p className="flex items-center gap-1.5 text-xs text-foreground mt-2 font-medium">
                  <DoorOpen className="size-3.5 text-primary" />
                  Ruang Teori 12 (34 Siswa)
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-2.5 flex items-start gap-2 text-xs text-foreground">
                <Info className="size-4 text-primary shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">Modul Aktif: Agregasi SQL (COUNT, SUM, AVG)</span>
              </div>
              <div className="mt-4">
                <Button className="w-full gap-2 font-semibold">
                  <ExternalLink className="size-3.5" />
                  Masuk & Buka Kelas Sekarang
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Item 3: Berikutnya */}
          <Card className="flex flex-col justify-between">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="gap-1.5 font-bold uppercase tracking-wider text-[11px] text-amber-700 dark:text-amber-400">
                  <ArrowRight className="size-3.5" />
                  Berikutnya
                </Badge>
                <span className="text-xs font-semibold text-foreground">10.30 – 12.00 WIB</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">XII RPL 2</span>
                <h3 className="text-base font-semibold text-foreground mt-1">Pemrograman Web</h3>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <Monitor className="size-3.5" />
                  Lab Komputer 1 (33 Siswa)
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-2.5 text-xs text-muted-foreground font-medium">
                Praktikum: Validasi Request & Token JWT
              </div>
              <div className="mt-4 pt-3 border-t border-border">
                <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                  <FileText className="size-3.5" />
                  Buka Rencana Sesi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. PERLU TINDAKAN */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-rose-600" />
            <h2 className="text-base font-semibold text-foreground">
              Perlu Tindakan (Action Items Prioritas)
            </h2>
          </div>
          <Badge variant="destructive" className="font-bold uppercase tracking-wider text-[11px]">
            {(data.perluTindakan.belumDiperiksa > 0 ? 1 : 0) + (data.perluTindakan.belumKumpul > 0 ? 1 : 0)} Item
          </Badge>
        </div>
        
        <div className="flex flex-col gap-3">
          {data.perluTindakan.belumDiperiksa === 0 && data.perluTindakan.belumKumpul === 0 && (
            <Card>
              <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-2">
                <CheckCircle className="size-6 text-emerald-500 mb-1" />
                <span className="font-semibold text-foreground">Semua Beres!</span>
                <span className="text-xs text-muted-foreground">
                  Tidak ada tindakan yang membutuhkan perhatian segera.
                </span>
              </CardContent>
            </Card>
          )}

          {data.perluTindakan.belumDiperiksa > 0 && (
            <Card>
              <CardContent className="p-4 lg:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ClipboardCheck className="size-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-foreground text-sm">
                      {data.perluTindakan.belumDiperiksa} tugas menunggu diperiksa
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Ada tugas yang sudah dikumpulkan oleh siswa dan menunggu penilaian Anda.
                    </p>
                  </div>
                </div>
                <Button size="sm" className="shrink-0 gap-2">
                  <ClipboardCheck className="size-4" />
                  Periksa Berkas Siswa ({data.perluTindakan.belumDiperiksa})
                </Button>
              </CardContent>
            </Card>
          )}

          {data.perluTindakan.belumKumpul > 0 && (
            <Card>
              <CardContent className="p-4 lg:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Clock className="size-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-foreground text-sm">
                      {data.perluTindakan.belumKumpul} siswa belum mengumpulkan tugas
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Beberapa siswa melewati batas waktu pengumpulan tugas atau belum mengerjakan.
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 gap-2">
                  <Send className="size-4" />
                  Kirim Pengingat ke {data.perluTindakan.belumKumpul} Siswa
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 4. KELAS YANG SAYA AJAR */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Kelas yang Saya Ajar (Semester Ini)
            </h2>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            Total: {totalRombel} Rombel • {totalSiswa} Siswa Binaan
          </span>
        </div>
        
        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Mata Pelajaran & Rombel</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Total Siswa</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Ketercapaian Modul</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-center">Tugas Aktif</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-right">Aksi Operasional</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.kelas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground text-sm">
                    Belum ada kelas yang diampu.
                  </TableCell>
                </TableRow>
              ) : (
                data.kelas.map((kelas, idx) => (
                  <TableRow key={kelas.kelasId || idx}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-sm">{kelas.mapel}</span>
                        <span className="text-xs text-muted-foreground mt-0.5">{kelas.kelas}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      <strong className="text-foreground">{kelas.jumlahSiswa}</strong> Siswa
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5 min-w-32">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-muted-foreground">Ketuntasan</span>
                          <span className="text-primary font-bold">{kelas.ketuntasanModul}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${kelas.ketuntasanModul}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {kelas.tugasAktif > 0 ? (
                        <Badge variant="outline" className="font-semibold text-primary border-primary/30">
                          {kelas.tugasAktif} tugas
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="font-normal text-muted-foreground">
                          0 tugas
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        <span>Buka Ruang Kelas</span>
                        <ArrowRight className="size-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
      
      {/* 5. KETERCAPAIAN TARGET */}
      <div className="flex flex-col gap-3 pb-6">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-emerald-600" />
            <h2 className="text-base font-semibold text-foreground">
              Ketercapaian Target Kurikulum Sekolah
            </h2>
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            <span>Kriteria Kelulusan Minimal (KKM): <strong className="text-foreground">75</strong></span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.kelas.map((kelas, idx) => (
            <Card key={idx} className="flex flex-col justify-between gap-5 p-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-bold uppercase tracking-wider text-[11px]">
                    {kelas.kelas}
                  </Badge>
                  <Badge variant="outline" className="font-bold text-emerald-700 dark:text-emerald-400 border-emerald-300">
                    {kelas.ketuntasanModul}% Target
                  </Badge>
                </div>
                <h3 className="text-base font-semibold text-foreground mt-1">{kelas.mapel}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Capaian: Ketuntasan instruksional berjalan sesuai modul kurikulum merdeka.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Realisasi Jam Pelajaran (JP)</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${kelas.ketuntasanModul}%` }} />
                </div>
              </div>
            </Card>
          ))}
          {data.kelas.length === 0 && (
            <Card className="col-span-1 md:col-span-2">
              <CardContent className="p-8 text-center text-muted-foreground text-sm">
                Belum ada kelas yang ditugaskan.
              </CardContent>
            </Card>
          )}
        </div>
        
        <Card className="border-border bg-muted/20">
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="size-5 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground font-medium">
                Laporan evaluasi silabus resmi akan dikirim otomatis ke Waka Kurikulum pada <strong className="text-foreground">30 September 2026</strong>.
              </p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 text-xs font-semibold">
              Unduh Rekap Format Kemenristekbud
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
