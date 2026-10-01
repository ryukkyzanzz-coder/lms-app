'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ClipboardCheck, 
  PlusCircle, 
  Search, 
  RotateCcw, 
  Edit, 
  Trash2, 
  Eye, 
  Clock, 
  Award, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import { useTeacher } from '@/lib/guru/teacher-context';
import ClassSubjectSelector from '@/components/guru/ClassSubjectSelector';
import { fetchAPI, ApiError } from '@/lib/api';
import { ITugas, AssignmentPagination } from '@/types/guru';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function TugasPage() {
  const {
    availableClasses,
    availableSubjects,
    selectedKelasId,
    selectedMapelId,
  } = useTeacher();

  // Find currently selected class and subject models for display
  const currentClass = availableClasses.find((c) => c._id === selectedKelasId);
  const currentSubject = availableSubjects.find((s) => s._id === selectedMapelId);

  // Assignments & Pagination State
  const [assignments, setAssignments] = useState<ITugas[]>([]);
  const [pagination, setPagination] = useState<AssignmentPagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'published' | 'draft' | 'closed'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Modal State: NONE | CREATE | EDIT | DETAIL | DELETE
  const [activeModal, setActiveModal] = useState<'NONE' | 'CREATE' | 'EDIT' | 'DETAIL' | 'DELETE'>('NONE');
  const [selectedAssignment, setSelectedAssignment] = useState<ITugas | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    instruksi: '',
    deadline: '',
    maxScore: 100,
    status: 'draft' as 'draft' | 'published' | 'closed',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Format Date Helper
  const formatDeadline = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  // Convert Date to Local datetime-local input string
  const toLocalDatetimeInput = (dateInput?: string | Date) => {
    const d = dateInput ? new Date(dateInput) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // 1. Fetch Assignments Effect
  useEffect(() => {
    let isCancelled = false;

    const loadAssignments = async () => {
      if (!selectedKelasId || !selectedMapelId) {
        if (!isCancelled) {
          setAssignments([]);
          setPagination(null);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (statusFilter !== 'ALL') {
          params.append('status', statusFilter);
        }
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }
        params.append('page', page.toString());
        params.append('limit', '10');
        params.append('sort', 'createdAt:desc');

        const url = `/teachers/me/classes/${selectedKelasId}/subjects/${selectedMapelId}/assignments?${params.toString()}`;
        const res = await fetchAPI(url);

        if (!isCancelled) {
          if (res?.success && Array.isArray(res?.data)) {
            setAssignments(res.data);
            setPagination(res.pagination || null);
          } else {
            setAssignments([]);
            setPagination(null);
          }
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const apiErr = err as ApiError;
          setError(apiErr?.message || 'Gagal memuat daftar tugas');
          setAssignments([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadAssignments();

    return () => {
      isCancelled = true;
    };
  }, [selectedKelasId, selectedMapelId, statusFilter, searchQuery, page, refreshTrigger]);

  // Open Create Modal
  const openCreateModal = () => {
    setFormData({
      judul: '',
      deskripsi: '',
      instruksi: '',
      deadline: toLocalDatetimeInput(),
      maxScore: 100,
      status: 'draft',
    });
    setSelectedAssignment(null);
    setActionError(null);
    setActiveModal('CREATE');
  };

  // Open Edit Modal
  const openEditModal = (tugas: ITugas) => {
    setSelectedAssignment(tugas);
    setFormData({
      judul: tugas.judul,
      deskripsi: tugas.deskripsi,
      instruksi: tugas.instruksi || '',
      deadline: toLocalDatetimeInput(tugas.deadline),
      maxScore: tugas.maxScore,
      status: tugas.status,
    });
    setActionError(null);
    setActiveModal('EDIT');
  };

  // Open Detail Modal
  const openDetailModal = (tugas: ITugas) => {
    setSelectedAssignment(tugas);
    setActiveModal('DETAIL');
  };

  // Open Delete Modal
  const openDeleteModal = (tugas: ITugas) => {
    setSelectedAssignment(tugas);
    setActionError(null);
    setActiveModal('DELETE');
  };

  // Close Modal
  const closeModal = () => {
    setActiveModal('NONE');
    setSelectedAssignment(null);
    setActionError(null);
  };

  // 2. Submit Create Handler
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKelasId || !selectedMapelId) return;

    setIsSubmitting(true);
    setActionError(null);

    try {
      const payload = {
        judul: formData.judul,
        deskripsi: formData.deskripsi,
        instruksi: formData.instruksi,
        deadline: new Date(formData.deadline).toISOString(),
        maxScore: Number(formData.maxScore),
        status: formData.status,
      };

      const res = await fetchAPI(
        `/teachers/me/classes/${selectedKelasId}/subjects/${selectedMapelId}/assignments`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

      if (res?.success) {
        setActionSuccess('Tugas berhasil dibuat');
        closeModal();
        setRefreshTrigger((v) => v + 1);
        setTimeout(() => setActionSuccess(null), 4000);
      } else {
        throw new Error(res?.message || 'Gagal membuat tugas');
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setActionError(apiErr?.message || 'Terjadi kesalahan saat membuat tugas');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Submit Edit Handler (Optimistic Concurrency)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    setIsSubmitting(true);
    setActionError(null);

    try {
      const payload = {
        judul: formData.judul,
        deskripsi: formData.deskripsi,
        instruksi: formData.instruksi,
        deadline: new Date(formData.deadline).toISOString(),
        maxScore: Number(formData.maxScore),
        status: formData.status,
        version: selectedAssignment.version, // Concurrency Version Token
      };

      const res = await fetchAPI(`/teachers/me/assignments/${selectedAssignment._id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (res?.success) {
        setActionSuccess('Perubahan tugas berhasil disimpan');
        closeModal();
        setRefreshTrigger((v) => v + 1);
        setTimeout(() => setActionSuccess(null), 4000);
      } else {
        throw new Error(res?.message || 'Gagal menyimpan perubahan tugas');
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      if (apiErr?.status === 409) {
        setActionError('Data tugas telah berubah di server. Silakan muat ulang halaman sebelum menyimpan perubahan.');
      } else {
        setActionError(apiErr?.message || 'Terjadi kesalahan saat menyimpan perubahan');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Submit Delete Handler
  const handleDeleteSubmit = async () => {
    if (!selectedAssignment) return;

    setIsSubmitting(true);
    setActionError(null);

    try {
      const res = await fetchAPI(`/teachers/me/assignments/${selectedAssignment._id}`, {
        method: 'DELETE',
      });

      if (res?.success) {
        setActionSuccess(`Tugas "${selectedAssignment.judul}" berhasil dihapus`);
        closeModal();
        setRefreshTrigger((v) => v + 1);
        setTimeout(() => setActionSuccess(null), 4000);
      } else {
        throw new Error(res?.message || 'Gagal menghapus tugas');
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setActionError(apiErr?.message || 'Terjadi kesalahan saat menghapus tugas');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Toggle Publish Handler
  const handleTogglePublish = async (tugas: ITugas) => {
    try {
      const isPublishing = tugas.status === 'draft';
      const endpoint = isPublishing
        ? `/teachers/me/assignments/${tugas._id}/publish`
        : `/teachers/me/assignments/${tugas._id}/unpublish`;

      const res = await fetchAPI(endpoint, { method: 'PATCH' });

      if (res?.success) {
        setActionSuccess(
          isPublishing
            ? `Tugas "${tugas.judul}" berhasil dipublikasikan`
            : `Tugas "${tugas.judul}" dikembalikan ke status draf`
        );
        setRefreshTrigger((v) => v + 1);
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setActionError(apiErr?.message || 'Gagal memperbarui status publikasi');
      setTimeout(() => setActionError(null), 4000);
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
        {/* 1. Academic Command Header */}
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
                    <BreadcrumbLink render={<Link href="/guru/kelas" className="text-muted-foreground hover:text-foreground" />}>
                      Kelas Saya
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-foreground">
                      Tugas & Asesmen
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                  Tugas & Asesmen
                </h1>
                <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  Manajemen penugasan, instruksi kerja praktikum, batas pengumpulan berkas, dan evaluasi hasil belajar siswa.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRefreshTrigger((v) => v + 1)}
                disabled={isLoading || !selectedKelasId || !selectedMapelId}
                className="gap-2 text-xs"
              >
                <RotateCcw className={`size-3.5 text-primary ${isLoading ? 'animate-spin' : ''}`} />
                <span>Muat Ulang</span>
              </Button>

              <Button
                size="sm"
                onClick={openCreateModal}
                disabled={!selectedKelasId || !selectedMapelId}
                className="gap-2 text-xs font-semibold"
              >
                <PlusCircle className="size-4" />
                <span>Buat Tugas Baru</span>
              </Button>
            </div>
          </div>

          {/* Context Selector Card */}
          <Card>
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-border">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Konteks Mengajar:</span>
                  <ClassSubjectSelector showLabels={false} />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span>Pangkalan Data Akademik Terverifikasi</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <ClipboardCheck className="size-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground text-sm">
                      {currentSubject?.nama || 'Mata Pelajaran'} • {currentClass?.nama || 'Kelas'}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      Program: {currentClass?.program || '-'} (Tingkat {currentClass?.tingkat || '-'})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 bg-muted/40 px-3 py-1.5 rounded-lg border border-border">
                  <span className="font-semibold text-foreground text-xs mr-1">
                    {pagination?.total || assignments.length} Tugas Terdaftar
                  </span>
                  <span className="w-px h-3 bg-border" />
                  <Badge variant="outline" className="gap-1 font-bold text-emerald-700 dark:text-emerald-400 border-emerald-300 text-[10px]">
                    <span className="size-1.5 rounded-full bg-emerald-600" />
                    {assignments.filter((a) => a.status === 'published').length} Terbit
                  </Badge>
                  <Badge variant="secondary" className="gap-1 font-bold text-muted-foreground text-[10px]">
                    <span className="size-1.5 rounded-full bg-muted-foreground" />
                    {assignments.filter((a) => a.status === 'draft').length} Draf
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Alert */}
        {actionSuccess && (
          <Alert className="border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <AlertTitle>Berhasil</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{actionSuccess}</span>
              <Button variant="ghost" size="icon-xs" onClick={() => setActionSuccess(null)}>
                <AlertCircle className="size-3" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex overflow-x-auto gap-2">
            <Button
              variant={statusFilter === 'ALL' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setStatusFilter('ALL');
                setPage(1);
              }}
              className="gap-2 text-xs"
            >
              <span>Semua</span>
              <Badge variant={statusFilter === 'ALL' ? 'secondary' : 'outline'} className="text-[10px] px-1 py-0 h-4">
                {assignments.length}
              </Badge>
            </Button>
            <Button
              variant={statusFilter === 'published' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setStatusFilter('published');
                setPage(1);
              }}
              className="gap-2 text-xs"
            >
              <span>Dipublikasikan</span>
              <Badge variant={statusFilter === 'published' ? 'secondary' : 'outline'} className="text-[10px] px-1 py-0 h-4">
                {assignments.filter((a) => a.status === 'published').length}
              </Badge>
            </Button>
            <Button
              variant={statusFilter === 'draft' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setStatusFilter('draft');
                setPage(1);
              }}
              className="gap-2 text-xs"
            >
              <span>Draf</span>
              <Badge variant={statusFilter === 'draft' ? 'secondary' : 'outline'} className="text-[10px] px-1 py-0 h-4">
                {assignments.filter((a) => a.status === 'draft').length}
              </Badge>
            </Button>
            <Button
              variant={statusFilter === 'closed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setStatusFilter('closed');
                setPage(1);
              }}
              className="gap-2 text-xs"
            >
              <span>Ditutup</span>
              <Badge variant={statusFilter === 'closed' ? 'secondary' : 'outline'} className="text-[10px] px-1 py-0 h-4">
                {assignments.filter((a) => a.status === 'closed').length}
              </Badge>
            </Button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="w-full md:w-[250px] lg:w-[300px] pl-9 h-9 text-xs"
                placeholder="Cari tugas..."
              />
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="size-5" />
            <AlertTitle>Gagal Memuat Daftar Tugas</AlertTitle>
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

        {/* Loading Skeleton */}
        {isLoading && !error && (
          <Card className="p-6 flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </Card>
        )}

        {/* No Selection Empty State */}
        {!isLoading && !error && (!selectedKelasId || !selectedMapelId) && (
          <Card>
            <CardContent className="p-12 flex flex-col items-center justify-center text-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FolderOpen className="size-6" />
              </div>
              <div className="flex flex-col gap-1 max-w-md">
                <h3 className="text-base font-semibold text-foreground">Pilih Kelas & Mata Pelajaran</h3>
                <p className="text-xs text-muted-foreground">
                  Pilih rombel dan mata pelajaran untuk melihat atau mengelola penugasan belajar siswa.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assignment Data Table */}
        {!isLoading && !error && selectedKelasId && selectedMapelId && (
          <Card className="overflow-hidden flex flex-col">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-12 text-center text-[11px] font-bold uppercase tracking-wider">No</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider">Judul & Instruksi Tugas</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider">Batas Waktu (Deadline)</TableHead>
                  <TableHead className="text-center text-[11px] font-bold uppercase tracking-wider">Nilai Maks</TableHead>
                  <TableHead className="text-center text-[11px] font-bold uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-right text-[11px] font-bold uppercase tracking-wider">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <ClipboardCheck className="size-10 text-muted-foreground/50" />
                        <p className="text-sm font-semibold text-foreground">
                          Tidak Ada Tugas Ditemukan
                        </p>
                        <p className="text-xs text-muted-foreground max-w-sm">
                          {searchQuery || statusFilter !== 'ALL'
                            ? 'Tidak ada tugas yang sesuai dengan kriteria filter pencarian.'
                            : 'Belum ada tugas yang dibuat untuk kelas dan mata pelajaran ini.'}
                        </p>
                        <Button
                          size="sm"
                          onClick={openCreateModal}
                          className="mt-2 gap-1.5"
                        >
                          <PlusCircle className="size-4" />
                          <span>Buat Tugas Pertama</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  assignments.map((tugas, idx) => {
                    const rowNumber = pagination
                      ? (pagination.page - 1) * pagination.limit + idx + 1
                      : idx + 1;
                    return (
                      <TableRow key={tugas._id}>
                        <TableCell className="text-center font-mono text-muted-foreground text-xs">
                          {rowNumber < 10 ? `0${rowNumber}` : rowNumber}
                        </TableCell>
                        <TableCell className="max-w-md">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span
                                className="font-semibold text-foreground text-sm hover:text-primary cursor-pointer transition-colors"
                                onClick={() => openDetailModal(tugas)}
                              >
                                {tugas.judul}
                              </span>
                              <Badge variant="outline" className="text-[10px] font-mono px-1 py-0 h-4">
                                v{tugas.version}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {tugas.deskripsi}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-foreground text-xs">
                            <Clock className="size-3.5 text-muted-foreground shrink-0" />
                            <span className="font-medium">
                              {formatDeadline(tugas.deadline)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          <Badge variant="secondary" className="gap-1 font-mono font-bold text-xs text-primary">
                            <Award className="size-3" />
                            {tugas.maxScore} Poin
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          {tugas.status === 'published' ? (
                            <Badge variant="outline" className="gap-1 font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-300 text-xs">
                              <span className="size-1.5 rounded-full bg-emerald-600" />
                              Dipublikasikan
                            </Badge>
                          ) : tugas.status === 'draft' ? (
                            <Badge variant="secondary" className="gap-1 font-semibold text-muted-foreground text-xs">
                              <span className="size-1.5 rounded-full bg-muted-foreground" />
                              Draf
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Ditutup
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    render={<Link href={`/guru/tugas/${tugas._id}`} className="gap-1 text-xs" />}
                                  >
                                    <Users className="size-3.5" />
                                    <span>Roster</span>
                                  </Button>
                                }
                              />
                              <TooltipContent>Lihat Pengumpulan Siswa</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => openDetailModal(tugas)}
                                  >
                                    <Eye className="size-3.5" />
                                  </Button>
                                }
                              />
                              <TooltipContent>Rincian Tugas</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => openEditModal(tugas)}
                                  >
                                    <Edit className="size-3.5" />
                                  </Button>
                                }
                              />
                              <TooltipContent>Edit Tugas</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => handleTogglePublish(tugas)}
                                    className={tugas.status === 'published' ? 'text-amber-600 hover:text-amber-700' : 'text-emerald-600 hover:text-emerald-700'}
                                  >
                                    {tugas.status === 'published' ? <Clock className="size-3.5" /> : <CheckCircle2 className="size-3.5" />}
                                  </Button>
                                }
                              />
                              <TooltipContent>
                                {tugas.status === 'published' ? 'Kembalikan ke Draf' : 'Publikasikan Tugas'}
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => openDeleteModal(tugas)}
                                    className="text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash2 className="size-3.5" />
                                  </Button>
                                }
                              />
                              <TooltipContent>Hapus Tugas</TooltipContent>
                            </Tooltip>
                          </div>
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
                  dari <strong className="text-foreground">{pagination.total}</strong> tugas
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={pagination.page <= 1 || isLoading}
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
                    disabled={pagination.page >= pagination.totalPages || isLoading}
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

        {/* MODAL: CREATE / EDIT ASSIGNMENT */}
        <Dialog open={activeModal === 'CREATE' || activeModal === 'EDIT'} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>
                  {activeModal === 'CREATE' ? 'Buat Tugas Baru' : 'Perbarui Data Tugas'}
                </DialogTitle>
                {activeModal === 'EDIT' && selectedAssignment && (
                  <Badge variant="outline">v{selectedAssignment.version}</Badge>
                )}
              </div>
              <DialogDescription>
                {activeModal === 'CREATE'
                  ? 'Isi formulir berikut untuk menerbitkan penugasan baru kepada siswa.'
                  : 'Ubah informasi tugas dan simpan perubahan ke sistem.'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={activeModal === 'CREATE' ? handleCreateSubmit : handleEditSubmit} className="flex flex-col gap-4">
              {actionError && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Terjadi Kesalahan</AlertTitle>
                  <AlertDescription className="mt-1 flex flex-col gap-2">
                    <p>{actionError}</p>
                    {actionError.includes('Data tugas telah berubah') && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          closeModal();
                          setRefreshTrigger((v) => v + 1);
                        }}
                        className="self-start text-xs"
                      >
                        Muat Ulang Data
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Judul Tugas <span className="text-destructive">*</span>
                </label>
                <Input
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Tugas 02: Implementasi REST API Express & Mongoose"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Deskripsi Ringkas <span className="text-destructive">*</span>
                </label>
                <Textarea
                  required
                  rows={3}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Jelaskan ringkasan materi atau tujuan dari tugas ini..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Instruksi Pengerjaan (Opsional)
                </label>
                <Textarea
                  rows={4}
                  value={formData.instruksi}
                  onChange={(e) => setFormData({ ...formData, instruksi: e.target.value })}
                  placeholder="Tuliskan petunjuk teknis pengerjaan, format berkas yang diterima, atau ketentuan repositori git..."
                  className="font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Batas Waktu (Deadline) <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="datetime-local"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Nilai Maksimal <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={1000}
                    required
                    value={formData.maxScore}
                    onChange={(e) => setFormData({ ...formData, maxScore: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Status Tugas</label>
                <Select
                  value={formData.status}
                  onValueChange={(val) => setFormData({ ...formData, status: val as 'draft' | 'published' | 'closed' })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draf (Belum terlihat oleh siswa)</SelectItem>
                    <SelectItem value="published">Publikasikan (Siswa dapat mengakses & mengumpulkan)</SelectItem>
                    {activeModal === 'EDIT' && <SelectItem value="closed">Tutup Tugas (Batas akhir tercapai)</SelectItem>}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={closeModal} disabled={isSubmitting}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? 'Menyimpan...'
                    : activeModal === 'CREATE'
                    ? 'Buat Tugas'
                    : 'Simpan Perubahan'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* MODAL: DETAIL ASSIGNMENT */}
        <Dialog open={activeModal === 'DETAIL' && !!selectedAssignment} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{selectedAssignment?.judul}</DialogTitle>
                <Badge variant="outline">v{selectedAssignment?.version}</Badge>
              </div>
              <DialogDescription>
                Batas Pengumpulan: {selectedAssignment ? formatDeadline(selectedAssignment.deadline) : '-'} • Nilai Maks: {selectedAssignment?.maxScore} Poin
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-muted/30 border border-border rounded-lg text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Status</span>
                  <Badge variant="secondary" className="mt-1 capitalize">
                    {selectedAssignment?.status}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Nilai Maksimal</span>
                  <span className="font-semibold text-primary font-mono mt-1 block">
                    {selectedAssignment?.maxScore} Poin
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Batas Pengumpulan</span>
                  <span className="font-semibold text-foreground mt-1 block">
                    {selectedAssignment ? formatDeadline(selectedAssignment.deadline) : '-'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Deskripsi</span>
                <p className="text-xs text-foreground leading-relaxed mt-1 p-3 bg-card border border-border rounded-lg whitespace-pre-wrap">
                  {selectedAssignment?.deskripsi}
                </p>
              </div>

              {selectedAssignment?.instruksi && (
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Instruksi Pengerjaan</span>
                  <p className="text-xs text-foreground leading-relaxed mt-1 p-3 bg-muted/20 border border-border rounded-lg whitespace-pre-wrap font-mono">
                    {selectedAssignment.instruksi}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter className="pt-2 flex justify-between sm:justify-between">
              {selectedAssignment && (
                <Button
                  render={<Link href={`/guru/tugas/${selectedAssignment._id}`} className="gap-1.5" />}
                  size="sm"
                  className="font-semibold text-xs"
                >
                  <Users className="size-3.5" />
                  <span>Lihat Pengumpulan Siswa</span>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={closeModal} className="text-xs">
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* MODAL: DELETE CONFIRMATION */}
        <Dialog open={activeModal === 'DELETE' && !!selectedAssignment} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="size-5" />
                Konfirmasi Hapus Tugas
              </DialogTitle>
              <DialogDescription>
                Tindakan ini permanen. Apakah Anda yakin ingin menghapus tugas{' '}
                <strong className="text-foreground">{selectedAssignment?.judul}</strong>?
              </DialogDescription>
            </DialogHeader>

            {actionError && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{actionError}</AlertDescription>
              </Alert>
            )}

            <DialogFooter className="pt-2">
              <Button variant="outline" onClick={closeModal} disabled={isSubmitting}>
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menghapus...' : 'Ya, Hapus Tugas'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
