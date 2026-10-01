'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft,
  Users,
  BookOpen,
  Calendar,
  ShieldCheck,
  Search,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  UserCheck,
  AlertTriangle,
  RotateCcw,
  DoorOpen,
  School,
  BadgeCheck,
  ArrowRight
} from 'lucide-react';
import { useTeacher } from '@/lib/guru/teacher-context';
import { fetchAPI, ApiError } from '@/lib/api';
import { TeacherClassDetail, TeacherStudent, StudentPagination } from '@/types/guru';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function DetailRuangKelasPage() {
  const params = useParams();
  const kelasId = params.kelasId as string;
  const { setSelectedKelasId } = useTeacher();

  // Class Detail State
  const [classDetail, setClassDetail] = useState<TeacherClassDetail | null>(null);
  const [isLoadingClass, setIsLoadingClass] = useState<boolean>(true);
  const [errorClass, setErrorClass] = useState<string | null>(null);

  // Student Roster State
  const [students, setStudents] = useState<TeacherStudent[]>([]);
  const [pagination, setPagination] = useState<StudentPagination | null>(null);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(true);
  const [errorStudents, setErrorStudents] = useState<string | null>(null);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'L' | 'P'>('all');
  const [page, setPage] = useState<number>(1);
  const limit = 20;

  // Refresh triggers for retry buttons
  const [refreshDetailTrigger, setRefreshDetailTrigger] = useState<number>(0);
  const [refreshStudentsTrigger, setRefreshStudentsTrigger] = useState<number>(0);

  // 1. Fetch Class Detail Effect
  useEffect(() => {
    let isCancelled = false;
    if (!kelasId) return;

    const loadDetail = async () => {
      setIsLoadingClass(true);
      setErrorClass(null);

      try {
        const res = await fetchAPI(`/teachers/me/classes/${kelasId}`);
        if (!isCancelled) {
          if (res?.success && res?.data) {
            setClassDetail(res.data);
            setSelectedKelasId(res.data.id);
          } else {
            throw new Error(res?.message || 'Gagal memuat detail kelas');
          }
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const apiErr = err as ApiError;
          if (apiErr?.status === 403) {
            setErrorClass('Anda tidak memiliki akses penugasan mengajar di kelas ini (403 Forbidden).');
          } else if (apiErr?.status === 404) {
            setErrorClass('Kelas tidak ditemukan dalam pangkalan data sekolah (404 Not Found).');
          } else if (err instanceof Error) {
            setErrorClass(err.message);
          } else {
            setErrorClass('Terjadi kesalahan saat memuat detail kelas');
          }
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingClass(false);
        }
      }
    };

    loadDetail();

    return () => {
      isCancelled = true;
    };
  }, [kelasId, setSelectedKelasId, refreshDetailTrigger]);

  // 2. Fetch Student Roster Effect
  useEffect(() => {
    let isCancelled = false;
    if (!kelasId) return;

    const loadStudents = async () => {
      setIsLoadingStudents(true);
      setErrorStudents(null);

      try {
        const queryParams = new URLSearchParams();
        queryParams.set('page', page.toString());
        queryParams.set('limit', limit.toString());
        if (searchQuery.trim()) {
          queryParams.set('search', searchQuery.trim());
        }

        const res = await fetchAPI(`/teachers/me/classes/${kelasId}/students?${queryParams.toString()}`);
        if (!isCancelled) {
          if (res?.success && Array.isArray(res?.data)) {
            setStudents(res.data);
            setPagination(res.pagination || null);
          } else {
            throw new Error(res?.message || 'Gagal memuat daftar siswa');
          }
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          if (err instanceof Error) {
            setErrorStudents(err.message);
          } else {
            setErrorStudents('Terjadi kesalahan saat memuat daftar siswa');
          }
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingStudents(false);
        }
      }
    };

    loadStudents();

    return () => {
      isCancelled = true;
    };
  }, [kelasId, page, limit, searchQuery, refreshStudentsTrigger]);

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(searchInput);
  };

  // Filter students by gender locally if needed
  const displayedStudents = students.filter((s) => {
    if (genderFilter === 'all') return true;
    return s.jenisKelamin === genderFilter;
  });

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Academic Breadcrumbs & Context */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <Breadcrumb>
            <BreadcrumbList className="text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/guru/kelas" className="flex items-center gap-1 font-medium" />}>
                  <DoorOpen className="size-3.5 text-primary" />
                  <span>Kelas Saya</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="font-semibold text-foreground">
                  {classDetail ? classDetail.nama : 'Detail Ruang Kelas'}
                </span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-semibold">Rombel & Siswa</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {classDetail?.tahunAjaran && classDetail?.semester && (
              <Badge variant="secondary" className="gap-1 font-semibold text-[11px]">
                <span className="size-1.5 rounded-full bg-emerald-600" />
                TA {classDetail.tahunAjaran.nama} • {classDetail.semester.nama}
              </Badge>
            )}
            {classDetail?.tingkat && (
              <Badge variant="outline" className="gap-1 font-semibold text-[11px] text-primary border-primary/20">
                <GraduationCap className="size-3" />
                Tingkat {classDetail.tingkat}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Class Error State */}
      {errorClass && (
        <Alert variant="destructive">
          <AlertTriangle className="size-5" />
          <AlertTitle>Gagal Mengakses Detail Kelas</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span>{errorClass}</span>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRefreshDetailTrigger((v) => v + 1)}
                className="gap-1.5"
              >
                <RotateCcw className="size-3.5" />
                <span>Coba Lagi</span>
              </Button>
              <Button render={<Link href="/guru/kelas" />} variant="outline" size="sm">
                Kembali ke Kelas Saya
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Class Loading State */}
      {isLoadingClass && !errorClass && (
        <Card className="p-6 flex flex-col gap-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-96 max-w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </Card>
      )}

      {/* Class Detail Content */}
      {!isLoadingClass && classDetail && (
        <>
          {/* 2. Class Identity Header */}
          <Card>
            <CardContent className="p-6 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex flex-col gap-3 max-w-3xl">
                <div>
                  <Button render={<Link href="/guru/kelas" className="gap-1.5" />} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2 mb-1">
                    <ArrowLeft className="size-3.5" />
                    <span>Kembali ke Kelas Saya</span>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                    Kelas {classDetail.nama}
                  </h1>
                  <Badge variant="outline" className="font-bold uppercase tracking-wider text-[11px] text-emerald-700 dark:text-emerald-400 border-emerald-300">
                    Rombel Aktif
                  </Badge>
                  <Badge variant="outline" className="font-semibold text-[11px] text-primary border-primary/20">
                    Tingkat {classDetail.tingkat}
                  </Badge>
                  <Badge variant="secondary" className="font-medium text-[11px]">
                    {classDetail.program}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <School className="size-4 shrink-0" />
                  <span>Rombongan Belajar Kompetensi Keahlian {classDetail.program} • Kurikulum SMK</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Button render={<Link href="/guru/materi" className="gap-2" />} className="font-semibold text-xs">
                  <BookOpen className="size-4" />
                  <span>Buka Materi Kelas</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 3. 4 Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Wali Kelas Card */}
            <Card className="p-4 flex items-start gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserCheck className="size-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Wali Kelas</span>
                <h4 className="text-sm font-semibold text-foreground truncate mt-0.5">
                  {classDetail.waliKelas?.nama || 'Belum Ditentukan'}
                </h4>
                <span className="text-[10px] text-muted-foreground mt-0.5">Pendidik Penanggung Jawab</span>
              </div>
            </Card>

            {/* Jumlah Siswa Card */}
            <Card className="p-4 flex items-start gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <Users className="size-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Jumlah Siswa</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg font-bold text-foreground">
                    {classDetail.jumlahSiswa}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Siswa Terdaftar</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-medium mt-0.5">Rombel Terverifikasi</span>
              </div>
            </Card>

            {/* Mata Pelajaran Diampu Card */}
            <Card className="p-4 flex items-start gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <BookOpen className="size-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Mapel Diampu</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg font-bold text-foreground">
                    {classDetail.subjects?.length || 0}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Mata Pelajaran</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium mt-0.5">Alokasi Penugasan Mengajar</span>
              </div>
            </Card>

            {/* Periode Akademik Card */}
            <Card className="p-4 flex items-start gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
                <Calendar className="size-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Periode Akademik</span>
                <h4 className="text-sm font-semibold text-foreground truncate mt-0.5">
                  {classDetail.tahunAjaran?.nama || '-'}
                </h4>
                <span className="text-[10px] text-teal-700 dark:text-teal-400 font-medium mt-0.5">
                  Semester {classDetail.semester?.nama || '-'}
                </span>
              </div>
            </Card>
          </div>

          {/* 4. Active Subjects Ribbon */}
          {classDetail.subjects && classDetail.subjects.length > 0 && (
            <Card className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Mata Pelajaran yang Anda Ampu di Kelas Ini
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground">
                  {classDetail.subjects.length} Mapel aktif
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {classDetail.subjects.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5"
                  >
                    <Badge variant="default" className="font-mono text-[10px] font-bold px-1.5 py-0">
                      {sub.kode}
                    </Badge>
                    <span className="text-xs font-semibold text-foreground">{sub.nama}</span>
                    <Button render={<Link href="/guru/materi" />} variant="ghost" size="xs" className="h-6 px-1.5 text-primary">
                      <span>Materi</span>
                      <ArrowRight className="size-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* 5. Student Roster Section */}
          <Card className="overflow-hidden flex flex-col">
            {/* Header & Subtitle */}
            <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Daftar Peserta Didik (Roster Siswa)
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tercatat {pagination ? pagination.total : classDetail.jumlahSiswa} siswa aktif terdaftar pada rombongan belajar ini.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Badge variant="outline" className="gap-1.5 text-primary border-primary/20 py-1 font-semibold text-xs">
                  <ShieldCheck className="size-3.5" />
                  <span>Dapodik Sinkron</span>
                </Badge>
              </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="p-4 bg-muted/20 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
              <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari nama siswa atau NISN..."
                  className="pl-9 h-9"
                />
              </form>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground font-medium">Gender:</span>
                  <Select
                    value={genderFilter}
                    onValueChange={(val) => setGenderFilter((val as 'all' | 'L' | 'P') || 'all')}
                  >
                    <SelectTrigger className="h-9 min-w-36">
                      <SelectValue placeholder="Semua" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua ({students.length})</SelectItem>
                      <SelectItem value="L">Laki-laki (L)</SelectItem>
                      <SelectItem value="P">Perempuan (P)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchInput('');
                    setSearchQuery('');
                    setGenderFilter('all');
                    setPage(1);
                    setRefreshStudentsTrigger((v) => v + 1);
                  }}
                  title="Reset Filter"
                  className="h-9 gap-1.5 text-xs"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Reset</span>
                </Button>
              </div>
            </div>

            {/* Error Roster State */}
            {errorStudents && (
              <Alert variant="destructive" className="rounded-none border-x-0">
                <AlertTriangle className="size-4" />
                <AlertTitle>Gagal Memuat Daftar Siswa</AlertTitle>
                <AlertDescription className="mt-1 flex items-center justify-between gap-3">
                  <span>{errorStudents}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setRefreshStudentsTrigger((v) => v + 1)}
                  >
                    Coba Lagi
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Table Area */}
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-12 text-center text-[11px] font-bold uppercase tracking-wider">No</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider">Nama Lengkap Siswa</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider">NISN</TableHead>
                  <TableHead className="text-center text-[11px] font-bold uppercase tracking-wider">L/P</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingStudents ? (
                  [1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell className="text-center">
                        <Skeleton className="size-4 mx-auto" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="size-8 rounded-full" />
                          <Skeleton className="h-4 w-40" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-4 w-6 mx-auto" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-14" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : displayedStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users className="size-9 text-muted-foreground/50" />
                        <p className="text-sm font-semibold text-foreground">
                          Tidak Ada Siswa Ditemukan
                        </p>
                        <p className="text-xs text-muted-foreground max-w-sm">
                          {searchQuery || genderFilter !== 'all'
                            ? 'Tidak ada siswa yang sesuai dengan filter pencarian.'
                            : 'Belum ada data siswa terdaftar dalam rombel ini.'}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedStudents.map((siswa, idx) => {
                    const rowNumber = pagination
                      ? (pagination.page - 1) * pagination.limit + idx + 1
                      : idx + 1;
                    return (
                      <TableRow key={siswa.id}>
                        <TableCell className="text-center font-mono text-muted-foreground text-xs">
                          {rowNumber < 10 ? `0${rowNumber}` : rowNumber}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar size="sm">
                              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                                {getInitials(siswa.nama)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-foreground text-sm">
                              {siswa.nama}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {siswa.nisn || '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="secondary"
                            className={`text-xs font-semibold ${
                              siswa.jenisKelamin === 'P'
                                ? 'text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-300'
                                : 'text-primary bg-primary/10'
                            }`}
                          >
                            {siswa.jenisKelamin || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1 font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-300 text-xs">
                            <span className="size-1.5 rounded-full bg-emerald-600" />
                            {siswa.status || 'Aktif'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>
                  Menampilkan{' '}
                  <strong className="text-foreground">
                    {(pagination.page - 1) * pagination.limit + 1}
                  </strong>{' '}
                  -{' '}
                  <strong className="text-foreground">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </strong>{' '}
                  dari <strong className="text-foreground">{pagination.total}</strong> siswa
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={pagination.page <= 1 || isLoadingStudents}
                    className="gap-1 text-xs"
                  >
                    <ChevronLeft className="size-3.5" />
                    <span>Sebelumnya</span>
                  </Button>

                  <span className="px-2 font-medium text-foreground">
                    Halaman {pagination.page} / {pagination.totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={pagination.page >= pagination.totalPages || isLoadingStudents}
                    className="gap-1 text-xs"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
