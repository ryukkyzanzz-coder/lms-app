'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  Search,
  RotateCcw,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar,
  Layers,
  BookOpen,
} from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import {
  AssignmentSubmissionsResponse,
  SubmissionRosterItem,
  SubmissionStats,
} from '@/types/guru';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

export default function AssignmentSubmissionsPage() {
  const params = useParams();
  const assignmentId = params.id as string;

  // Data State
  const [data, setData] = useState<AssignmentSubmissionsResponse | null>(null);
  const [roster, setRoster] = useState<SubmissionRosterItem[]>([]);
  const [stats, setStats] = useState<SubmissionStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isLateFilter, setIsLateFilter] = useState<string>('ALL');
  const [page, setPage] = useState<number>(1);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Detail Modal State
  const [selectedItem, setSelectedItem] = useState<SubmissionRosterItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  // Fetch Submissions from API
  useEffect(() => {
    let isCancelled = false;

    const loadSubmissions = async () => {
      if (!assignmentId) return;

      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        if (searchQuery.trim()) queryParams.set('search', searchQuery.trim());
        if (statusFilter !== 'ALL') queryParams.set('status', statusFilter);
        if (isLateFilter !== 'ALL') queryParams.set('isLate', isLateFilter);
        queryParams.set('page', page.toString());
        queryParams.set('limit', '20');
        queryParams.set('sort', 'submittedAt:desc');

        const url = `/teachers/me/assignments/${assignmentId}/submissions?${queryParams.toString()}`;
        const res = await fetchAPI(url);

        if (!isCancelled) {
          if (res?.success) {
            setData(res);
            setRoster(res.data || []);
            setStats(res.stats || null);
          }
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const apiErr = err as { message?: string };
          setError(apiErr.message || 'Gagal memuat daftar pengumpulan tugas');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadSubmissions();

    return () => {
      isCancelled = true;
    };
  }, [assignmentId, searchQuery, statusFilter, isLateFilter, page, refreshTrigger]);

  // Debounced search submit
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Format Date Helper
  const formatDateTime = (isoDate?: string | Date) => {
    if (!isoDate) return '—';
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '—';
    }
  };

  // Format File Size Helper
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Open Submission Detail Modal
  const handleOpenDetailModal = (item: SubmissionRosterItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Academic Header & Breadcrumbs */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList className="text-xs">
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/guru/dashboard" className="text-primary font-medium hover:underline" />}>
                    Beranda
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/guru/tugas" className="text-muted-foreground hover:text-foreground" />}>
                    Tugas & Asesmen
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-foreground">
                    Pengumpulan Siswa
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col gap-1">
              <div>
                <Button render={<Link href="/guru/tugas" className="gap-1.5" />} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2 mb-1">
                  <ArrowLeft className="size-3.5" />
                  <span>Kembali ke Daftar Tugas</span>
                </Button>
              </div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                {data?.assignment?.judul || 'Pengumpulan Tugas Siswa'}
              </h1>
              <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
                {data?.assignment?.deskripsi ||
                  'Pantau status penyerahan berkas tugas peserta didik, evaluasi ketepatan waktu, dan lakukan pemeriksaan lembar kerja.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-auto shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRefreshTrigger((v) => v + 1)}
              className="gap-2 text-xs"
            >
              <RotateCcw className={`size-3.5 text-primary ${isLoading ? 'animate-spin' : ''}`} />
              <span>Muat Ulang</span>
            </Button>
          </div>
        </div>

        {/* Academic Context Ribbon */}
        {data?.assignment && (
          <Card>
            <CardContent className="p-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 text-foreground font-semibold">
                <Layers className="size-4 text-primary" />
                <span>Kelas: {data.assignment.kelas?.nama}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <BookOpen className="size-4 text-primary" />
                <span>Mapel: {data.assignment.mapel?.nama}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <Calendar className="size-4 text-muted-foreground" />
                <span>Batas Waktu: <strong>{formatDateTime(data.assignment.deadline)}</strong></span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <Award className="size-4 text-primary" />
                <span>Nilai Maks: <strong>{data.assignment.maxScore} Poin</strong></span>
              </div>
              <span>•</span>
              <Badge variant={data.assignment.status === 'published' ? 'outline' : 'secondary'} className="font-semibold text-xs">
                {data.assignment.status === 'published' ? 'Dipublikasikan' : data.assignment.status}
              </Badge>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 2. Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Total Siswa */}
        <Card className="p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Siswa</span>
            <Users className="size-4 text-primary" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            {stats ? stats.totalStudents : 0}
          </span>
          <span className="text-[11px] text-muted-foreground">Terdaftar di rombel</span>
        </Card>

        {/* Sudah Mengumpulkan */}
        <Card className="p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Sudah Kumpul</span>
            <CheckCircle2 className="size-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {stats ? stats.submittedCount : 0}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {stats && stats.totalStudents > 0
              ? `${Math.round((stats.submittedCount / stats.totalStudents) * 100)}% partisipasi`
              : '0% partisipasi'}
          </span>
        </Card>

        {/* Belum Mengumpulkan */}
        <Card className="p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Belum Kumpul</span>
            <Clock className="size-4 text-amber-600" />
          </div>
          <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stats ? stats.unsubmittedCount : 0}
          </span>
          <span className="text-[11px] text-muted-foreground">Menunggu submission</span>
        </Card>

        {/* Terlambat */}
        <Card className="p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Terlambat</span>
            <AlertTriangle className="size-4 text-destructive" />
          </div>
          <span className="text-2xl font-bold text-destructive">
            {stats ? stats.lateCount : 0}
          </span>
          <span className="text-[11px] text-muted-foreground">Melewati deadline</span>
        </Card>

        {/* Sudah Dinilai */}
        <Card className="p-4 flex flex-col gap-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Sudah Dinilai</span>
            <Award className="size-4 text-indigo-600" />
          </div>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {stats ? stats.gradedCount : 0}
          </span>
          <span className="text-[11px] text-muted-foreground">Telah diberi nilai</span>
        </Card>
      </div>

      {/* 3. Filter & Search Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Cari nama siswa atau NISN..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* Filter Badges / Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Filter className="size-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Status:</span>
            <Select
              value={statusFilter}
              onValueChange={(val) => {
                setStatusFilter(val || 'ALL');
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 min-w-36">
                <SelectValue placeholder="Semua Roster" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Roster</SelectItem>
                <SelectItem value="SUBMITTED">Sudah Kumpul</SelectItem>
                <SelectItem value="GRADED">Sudah Dinilai</SelectItem>
                <SelectItem value="RESUBMITTED">Kumpul Ulang</SelectItem>
                <SelectItem value="UNSUBMITTED">Belum Kumpul</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Waktu:</span>
            <Select
              value={isLateFilter}
              onValueChange={(val) => {
                setIsLateFilter(val || 'ALL');
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 min-w-32">
                <SelectValue placeholder="Semua Waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Waktu</SelectItem>
                <SelectItem value="false">Tepat Waktu</SelectItem>
                <SelectItem value="true">Terlambat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 4. Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="size-5" />
          <AlertTitle>Gagal Memuat Data Pengumpulan</AlertTitle>
          <AlertDescription className="mt-2 flex items-center justify-between gap-4">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRefreshTrigger((v) => v + 1)}
            >
              Coba Lagi
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* 5. Loading Skeleton */}
      {isLoading && !error && (
        <Card className="p-6 flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </Card>
      )}

      {/* 6. Submissions Roster Table */}
      {!isLoading && !error && (
        <Card className="overflow-hidden flex flex-col">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-12 text-center text-[11px] font-bold uppercase tracking-wider">No</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Siswa</TableHead>
                <TableHead className="text-center text-[11px] font-bold uppercase tracking-wider">Status Pengumpulan</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Waktu Penyerahan</TableHead>
                <TableHead className="text-center text-[11px] font-bold uppercase tracking-wider">Berkas Lampiran</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Catatan Siswa</TableHead>
                <TableHead className="text-right text-[11px] font-bold uppercase tracking-wider">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roster.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="size-10 text-muted-foreground/50" />
                      <p className="text-sm font-semibold text-foreground">
                        Tidak Ada Data Siswa Ditemukan
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm">
                        {searchQuery || statusFilter !== 'ALL' || isLateFilter !== 'ALL'
                          ? 'Tidak ada siswa yang sesuai dengan kriteria filter pencarian.'
                          : 'Belum ada siswa yang terdaftar di kelas tugas ini.'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                roster.map((item, idx) => {
                  const rowNumber = data?.pagination
                    ? (data.pagination.page - 1) * data.pagination.limit + idx + 1
                    : idx + 1;
                  const sub = item.submission;

                  return (
                    <TableRow key={item.siswa._id}>
                      <TableCell className="text-center font-mono text-muted-foreground text-xs">
                        {rowNumber < 10 ? `0${rowNumber}` : rowNumber}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                              {item.siswa.nama.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground text-sm">
                              {item.siswa.nama}
                            </span>
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <span>NISN: {item.siswa.nisn}</span>
                              <span>•</span>
                              <span>{item.siswa.jenisKelamin}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center whitespace-nowrap">
                        {sub ? (
                          <div className="flex flex-col items-center gap-1">
                            <Badge variant="outline" className="gap-1 font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-300 text-xs">
                              <span className="size-1.5 rounded-full bg-emerald-600" />
                              {sub.status === 'SUBMITTED' ? 'Terkumpul' : sub.status}
                            </Badge>
                            {sub.isLate && (
                              <Badge variant="destructive" className="text-[10px] py-0 h-4">
                                Terlambat
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <Badge variant="secondary" className="text-muted-foreground text-xs">
                            Belum Kumpul
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs text-foreground font-mono">
                        {sub?.submittedAt ? formatDateTime(sub.submittedAt) : '—'}
                      </TableCell>
                      <TableCell className="text-center whitespace-nowrap">
                        {sub?.files && sub.files.length > 0 ? (
                          <Badge variant="outline" className="gap-1 font-mono text-xs">
                            <FileText className="size-3" />
                            <span>{sub.files.length} File</span>
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <span className="text-xs text-muted-foreground line-clamp-1 italic">
                          {sub?.catatanSiswa || '—'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {sub ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDetailModal(item)}
                            className="gap-1 text-xs"
                          >
                            <span>Periksa</span>
                            <ExternalLink className="size-3" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" disabled className="text-xs">
                            Belum Ada
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                Menampilkan{' '}
                <strong className="text-foreground">
                  {(data.pagination.page - 1) * data.pagination.limit + 1}
                </strong>{' '}
                -{' '}
                <strong className="text-foreground">
                  {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)}
                </strong>{' '}
                dari <strong className="text-foreground">{data.pagination.total}</strong> siswa
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={data.pagination.page <= 1 || isLoading}
                  className="gap-1 text-xs"
                >
                  <ChevronLeft className="size-3.5" />
                  <span>Sebelumnya</span>
                </Button>

                <span className="px-2 font-medium text-foreground">
                  Halaman {data.pagination.page} / {data.pagination.totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                  disabled={data.pagination.page >= data.pagination.totalPages || isLoading}
                  className="gap-1 text-xs"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* DETAIL SUBMISSION MODAL */}
      <Dialog open={isDetailModalOpen && !!selectedItem?.submission} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>Detail Lembar Kerja Siswa</DialogTitle>
              <Badge variant="outline">
                {selectedItem?.submission?.status}
              </Badge>
            </div>
            <DialogDescription>
              Penyerahan berkas tugas oleh peserta didik.
            </DialogDescription>
          </DialogHeader>

          {selectedItem?.submission && (
            <div className="flex flex-col gap-4 py-2">
              {/* Student Header Summary */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-muted/30 border border-border rounded-lg text-xs">
                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[10px]">Nama Siswa</span>
                  <span className="font-semibold text-foreground text-sm mt-0.5 block">
                    {selectedItem.siswa.nama}
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    NISN: {selectedItem.siswa.nisn}
                  </span>
                </div>

                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[10px]">Status Pengumpulan</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-300">
                      {selectedItem.submission.status}
                    </Badge>
                    {selectedItem.submission.isLate ? (
                      <Badge variant="destructive">Terlambat</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-primary font-medium">Tepat Waktu</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[10px]">Waktu Diserahkan</span>
                  <span className="font-semibold text-foreground mt-0.5 block font-mono">
                    {formatDateTime(selectedItem.submission.submittedAt)}
                  </span>
                </div>

                <div>
                  <span className="text-muted-foreground uppercase font-bold text-[10px]">Batas Waktu (Deadline)</span>
                  <span className="font-semibold text-foreground mt-0.5 block font-mono">
                    {formatDateTime(data?.assignment?.deadline)}
                  </span>
                </div>
              </div>

              {/* Student Notes */}
              {selectedItem.submission.catatanSiswa && (
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Catatan dari Siswa
                  </span>
                  <p className="text-xs text-foreground leading-relaxed mt-1 p-3 bg-muted/20 border border-border rounded-lg italic">
                    &ldquo;{selectedItem.submission.catatanSiswa}&rdquo;
                  </p>
                </div>
              )}

              {/* Files List */}
              <div>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                  Lampiran Berkas ({selectedItem.submission.files.length})
                </span>
                <div className="flex flex-col gap-2 max-h-52 overflow-y-auto">
                  {selectedItem.submission.files.map((file, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3 bg-muted/30 border border-border rounded-lg flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 rounded bg-primary/10 text-primary items-center justify-center shrink-0">
                          <FileText className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground text-xs">
                            {file.name}
                          </span>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                            <span>{file.mimeType}</span>
                            <span>•</span>
                            <span>{formatFileSize(file.size)}</span>
                          </div>
                        </div>
                      </div>

                      <Button render={<a href={file.url} target="_blank" rel="noopener noreferrer" className="gap-1.5 text-xs" />} variant="outline" size="sm">
                        <span>Buka File</span>
                        <ExternalLink className="size-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2 flex justify-between sm:justify-between">
            <span className="text-xs text-muted-foreground self-center">
              ID: {selectedItem?.submission?._id}
            </span>
            <Button variant="outline" size="sm" onClick={handleCloseDetailModal}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
