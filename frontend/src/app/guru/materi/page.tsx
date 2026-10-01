'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  RefreshCcw, 
  PlusCircle,
  GraduationCap,
  Users,
  CheckSquare,
  Layers,
  CalendarClock,
  Search,
  ListTree,
  FileText,
  Calendar,
  Eye,
  Code,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Video,
  Link as LinkIcon,
  X,
  AlertCircle,
  Loader2,
  FolderOpen
} from 'lucide-react';
import { useTeacher } from '@/lib/guru/teacher-context';
import ClassSubjectSelector from '@/components/guru/ClassSubjectSelector';
import { fetchAPI, ApiError } from '@/lib/api';
import { IMateri, MaterialPagination } from '@/types/guru';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function MateriPage() {
  const {
    availableClasses,
    availableSubjects,
    selectedKelasId,
    selectedMapelId,
  } = useTeacher();

  // Find currently selected class and subject models for display
  const currentClass = useMemo(
    () => availableClasses.find((c) => c._id === selectedKelasId),
    [availableClasses, selectedKelasId]
  );
  const currentSubject = useMemo(
    () => availableSubjects.find((s) => s._id === selectedMapelId),
    [availableSubjects, selectedMapelId]
  );

  // Materials & Pagination State
  const [materials, setMaterials] = useState<IMateri[]>([]);
  const [pagination, setPagination] = useState<MaterialPagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'published' | 'draft'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modals & Action State
  const [activeModal, setActiveModal] = useState<'NONE' | 'CREATE' | 'EDIT' | 'DETAIL' | 'DELETE'>('NONE');
  const [selectedMaterial, setSelectedMaterial] = useState<IMateri | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Form States for Create / Edit
  const [formData, setFormData] = useState({
    judul: '',
    tipe: 'DOCUMENT' as 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT',
    deskripsi: '',
    konten: '',
    urutan: 1,
    status: 'draft' as 'draft' | 'published' | 'archived',
  });

  // Trigger for manual refresh
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const refetchMaterials = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  // Fetch Materials from Backend API
  useEffect(() => {
    let isCancelled = false;

    if (!selectedKelasId || !selectedMapelId) {
      return;
    }

    const loadMaterials = async () => {
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
        params.append('page', currentPage.toString());
        params.append('limit', '10');
        params.append('sort', 'urutan');

        const url = `/teachers/me/classes/${selectedKelasId}/subjects/${selectedMapelId}/materials?${params.toString()}`;
        const res = await fetchAPI(url);

        if (!isCancelled) {
          if (res && res.data) {
            setMaterials(res.data);
            setPagination(res.pagination || null);
          } else {
            setMaterials([]);
            setPagination(null);
          }
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const apiErr = err as ApiError;
          setError(apiErr?.message || 'Gagal memuat materi pembelajaran');
          setMaterials([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadMaterials();

    return () => {
      isCancelled = true;
    };
  }, [selectedKelasId, selectedMapelId, statusFilter, searchQuery, currentPage, refreshTrigger]);

  // Handle Form Input Reset
  const resetForm = () => {
    setFormData({
      judul: '',
      tipe: 'DOCUMENT',
      deskripsi: '',
      konten: '',
      urutan: materials.length + 1,
      status: 'draft',
    });
    setActionError(null);
  };

  // Open Modals
  const openCreateModal = () => {
    resetForm();
    setActiveModal('CREATE');
  };

  const openEditModal = (material: IMateri) => {
    setSelectedMaterial(material);
    setFormData({
      judul: material.judul,
      tipe: material.tipe,
      deskripsi: material.deskripsi || '',
      konten: material.konten || '',
      urutan: material.urutan || 1,
      status: material.status,
    });
    setActionError(null);
    setActiveModal('EDIT');
  };

  const openDetailModal = (material: IMateri) => {
    setSelectedMaterial(material);
    setActiveModal('DETAIL');
  };

  const openDeleteModal = (material: IMateri) => {
    setSelectedMaterial(material);
    setActionError(null);
    setActiveModal('DELETE');
  };

  const closeModal = () => {
    setActiveModal('NONE');
    setSelectedMaterial(null);
    setActionError(null);
  };

  // 1. CREATE MATERIAL HANDLER
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKelasId || !selectedMapelId) return;

    setIsSubmitting(true);
    setActionError(null);

    try {
      const payload = {
        judul: formData.judul,
        tipe: formData.tipe,
        deskripsi: formData.deskripsi,
        konten: formData.konten,
        urutan: formData.urutan,
        status: formData.status,
      };

      const res = await fetchAPI(
        `/teachers/me/classes/${selectedKelasId}/subjects/${selectedMapelId}/materials`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

      if (res && (res.success || res.data)) {
        setActionSuccess('Materi baru berhasil ditambahkan');
        setTimeout(() => setActionSuccess(null), 4000);
        closeModal();
        refetchMaterials();
      } else {
        throw new Error(res?.message || 'Gagal menambahkan materi');
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setActionError(apiErr?.message || 'Terjadi kesalahan saat menambahkan materi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. EDIT MATERIAL HANDLER (With Concurrency Conflict Check)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterial) return;

    setIsSubmitting(true);
    setActionError(null);

    try {
      const payload = {
        judul: formData.judul,
        tipe: formData.tipe,
        deskripsi: formData.deskripsi,
        konten: formData.konten,
        urutan: formData.urutan,
        status: formData.status,
        version: selectedMaterial.version, // Concurrency Token
      };

      const res = await fetchAPI(`/teachers/me/materials/${selectedMaterial._id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (res && (res.success || res.data)) {
        setActionSuccess('Perubahan materi berhasil disimpan');
        setTimeout(() => setActionSuccess(null), 4000);
        closeModal();
        refetchMaterials();
      } else {
        throw new Error(res?.message || 'Gagal memperbarui materi');
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      if (apiErr?.status === 409) {
        setActionError('Materi telah diubah oleh sesi lain. Silakan muat ulang data untuk melihat versi terbaru sebelum menyimpan kembali.');
      } else {
        setActionError(apiErr?.message || 'Terjadi kesalahan saat menyimpan perubahan');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. DELETE MATERIAL HANDLER
  const handleDeleteSubmit = async () => {
    if (!selectedMaterial) return;

    setIsSubmitting(true);
    setActionError(null);

    try {
      const res = await fetchAPI(`/teachers/me/materials/${selectedMaterial._id}`, {
        method: 'DELETE',
      });

      if (res && res.success) {
        setActionSuccess(`Materi "${selectedMaterial.judul}" berhasil dihapus`);
        setTimeout(() => setActionSuccess(null), 4000);
        closeModal();
        refetchMaterials();
      } else {
        throw new Error(res?.message || 'Gagal menghapus materi');
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setActionError(apiErr?.message || 'Terjadi kesalahan saat menghapus materi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. PUBLISH / UNPUBLISH TOGGLE HANDLER
  const handleTogglePublish = async (material: IMateri) => {
    setIsSubmitting(true);
    try {
      const isPublishing = material.status === 'draft';
      const endpoint = isPublishing
        ? `/teachers/me/materials/${material._id}/publish`
        : `/teachers/me/materials/${material._id}/unpublish`;

      const res = await fetchAPI(endpoint, {
        method: 'PATCH',
      });

      if (res && (res.success || res.data)) {
        setActionSuccess(
          isPublishing
            ? `Materi "${material.judul}" berhasil dipublikasikan`
            : `Materi "${material.judul}" dikembalikan ke status draft`
        );
        setTimeout(() => setActionSuccess(null), 4000);
        refetchMaterials();
      } else {
        throw new Error(res?.message || 'Gagal mengubah status publikasi');
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setActionError(apiErr?.message || 'Gagal mengubah status materi');
      setTimeout(() => setActionError(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format Helper for Icons
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
      case 'DOCUMENT':
        return <FileText className="size-5 text-primary" />;
      case 'VIDEO':
        return <Video className="size-5 text-indigo-600 dark:text-indigo-400" />;
      case 'LINK':
        return <LinkIcon className="size-5 text-teal-600 dark:text-teal-400" />;
      case 'TEXT':
      default:
        return <Code className="size-5 text-muted-foreground" />;
    }
  };

  // Stats calculation
  const publishedCount = materials.filter((m) => m.status === 'published').length;
  const draftCount = materials.filter((m) => m.status === 'draft').length;

  return (
    <TooltipProvider>
      <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
        {/* 1. ACADEMIC HEADER & BREADCRUMB */}
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
                      Materi Pembelajaran
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              <div>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                  Materi Pembelajaran
                </h1>
                <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  Kelola dokumen ajar, modul digital, video instruksional, dan referensi belajar per rombel dan kompetensi keahlian.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={refetchMaterials}
                disabled={isLoading || !selectedKelasId || !selectedMapelId}
                className="gap-2 text-xs"
              >
                <RefreshCcw className={`size-3.5 text-primary ${isLoading ? 'animate-spin' : ''}`} />
                <span>Muat Ulang</span>
              </Button>

              <Button
                size="sm"
                onClick={openCreateModal}
                disabled={!selectedKelasId || !selectedMapelId}
                className="gap-2 text-xs font-semibold"
              >
                <PlusCircle className="size-4" />
                <span>Tambah Materi</span>
              </Button>
            </div>
          </div>

          {/* SELECTOR & INSTITUTIONAL CONTEXT BAR */}
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
                    <GraduationCap className="size-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground text-sm">
                      Kurikulum Operasional Satuan Pendidikan (KOSP) 2026/2027
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      Konsentrasi Keahlian: {currentClass?.program || 'RPL'} (Tingkat {currentClass?.tingkat || '-'})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 bg-muted/40 px-3 py-1.5 rounded-lg border border-border">
                  <span className="font-semibold text-foreground text-xs mr-1">
                    {pagination?.total || materials.length} Materi Terdaftar
                  </span>
                  <span className="w-px h-3 bg-border" />
                  <Badge variant="outline" className="gap-1 font-bold text-emerald-700 dark:text-emerald-400 border-emerald-300 text-[10px]">
                    <span className="size-1.5 rounded-full bg-emerald-600" />
                    {publishedCount} Dipublikasikan
                  </Badge>
                  <Badge variant="secondary" className="gap-1 font-bold text-muted-foreground text-[10px]">
                    <span className="size-1.5 rounded-full bg-muted-foreground" />
                    {draftCount} Draft
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SUCCESS BANNER NOTIFICATION */}
        {actionSuccess && (
          <Alert className="border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <AlertTitle>Berhasil</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{actionSuccess}</span>
              <Button variant="ghost" size="icon-xs" onClick={() => setActionSuccess(null)}>
                <X className="size-3" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* 2. STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-semibold text-xs">Total Materi Terbit</span>
              <Users className="size-4 text-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {publishedCount}
                </span>
                <span className="text-xs text-muted-foreground">dari {materials.length} total</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-0.5">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${materials.length ? Math.round((publishedCount / materials.length) * 100) : 0}%` }}
                />
              </div>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">
              {materials.length ? `${Math.round((publishedCount / materials.length) * 100)}% materi telah aktif dipelajari` : 'Belum ada materi'}
            </span>
          </Card>

          <Card className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-semibold text-xs">Status Publikasi</span>
              <CheckSquare className="size-4 text-emerald-600" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {draftCount} Draft
                </span>
                <span className="text-xs text-muted-foreground">siap tayang</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-0.5">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                  style={{ width: `${materials.length ? Math.round((draftCount / materials.length) * 100) : 0}%` }}
                />
              </div>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">Dapat ditinjau sebelum dipublikasikan</span>
          </Card>

          <Card className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-semibold text-xs">Distribusi Format</span>
              <Layers className="size-4 text-indigo-600" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-bold text-foreground">
                  {materials.filter((m) => m.tipe === 'PDF' || m.tipe === 'DOCUMENT').length}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Dokumen</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-foreground">
                  {materials.filter((m) => m.tipe === 'TEXT').length}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Teks</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-foreground">
                  {materials.filter((m) => m.tipe === 'VIDEO' || m.tipe === 'LINK').length}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Media</span>
              </div>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium mt-auto">Format digital multi-modal</span>
          </Card>

          <Card className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-semibold text-xs">Terakhir Diperbarui</span>
              <CalendarClock className="size-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
                {materials[0]?.judul || 'Belum ada materi'}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground mt-0.5">
                {materials[0]?.updatedAt ? new Date(materials[0].updatedAt).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : '—'}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium mt-auto">Materi terbaru dalam daftar</span>
          </Card>
        </div>

        {/* 3. FILTER & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex overflow-x-auto gap-2">
            <Button 
              variant={statusFilter === 'ALL' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('ALL')}
              className="gap-2 text-xs"
            >
              Semua Materi
              <Badge variant={statusFilter === 'ALL' ? 'secondary' : 'outline'} className="text-[10px] px-1 py-0 h-4">
                {materials.length}
              </Badge>
            </Button>
            <Button 
              variant={statusFilter === 'published' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('published')}
              className="gap-2 text-xs"
            >
              Dipublikasikan
              <Badge variant={statusFilter === 'published' ? 'secondary' : 'outline'} className="text-[10px] px-1 py-0 h-4">
                {publishedCount}
              </Badge>
            </Button>
            <Button 
              variant={statusFilter === 'draft' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('draft')}
              className="gap-2 text-xs"
            >
              Draft Guru
              <Badge variant={statusFilter === 'draft' ? 'secondary' : 'outline'} className="text-[10px] px-1 py-0 h-4">
                {draftCount}
              </Badge>
            </Button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[250px] lg:w-[300px] pl-9 h-9 text-xs"
                placeholder="Cari topik, judul materi..." 
              />
            </div>
            <Button variant="outline" size="icon-sm" title="Tampilan Daftar Materi">
              <ListTree className="size-4 text-primary" />
            </Button>
          </div>
        </div>

        {/* 4. CONTENT AREA & OPERATIONAL LIST */}
        <div className="flex flex-col gap-6">
          {/* State A: Loading State */}
          {isLoading && (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="size-10 rounded-lg" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-48 h-4" />
                      <Skeleton className="w-32 h-3" />
                    </div>
                  </div>
                  <Skeleton className="w-24 h-8" />
                </Card>
              ))}
            </div>
          )}

          {/* State B: Error State */}
          {!isLoading && error && (
            <Alert variant="destructive">
              <AlertCircle className="size-5" />
              <AlertTitle>Terjadi Kesalahan Saat Memuat Materi</AlertTitle>
              <AlertDescription className="mt-2 flex items-center justify-between gap-4">
                <span>{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refetchMaterials}
                  className="shrink-0"
                >
                  Coba Muat Ulang
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* State C: No Class / Subject Selected */}
          {!isLoading && !error && (!selectedKelasId || !selectedMapelId) && (
            <Card>
              <CardContent className="p-12 flex flex-col items-center justify-center text-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FolderOpen className="size-6" />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                  <h3 className="text-base font-semibold text-foreground">Pilih Kelas & Mata Pelajaran</h3>
                  <p className="text-xs text-muted-foreground">
                    Pilih rombongan belajar dan mata pelajaran yang Anda ampu melalui bilah seleksi di atas untuk mulai mengelola materi pembelajaran.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* State D: Empty Materials State */}
          {!isLoading && !error && selectedKelasId && selectedMapelId && materials.length === 0 && (
            <Card>
              <CardContent className="p-12 flex flex-col items-center justify-center text-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <FileText className="size-6" />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                  <h3 className="text-base font-semibold text-foreground">Belum Ada Materi Pembelajaran</h3>
                  <p className="text-xs text-muted-foreground">
                    {searchQuery || statusFilter !== 'ALL'
                      ? 'Tidak ada materi yang sesuai dengan filter atau kata kunci pencarian Anda.'
                      : 'Belum ada modul materi yang ditambahkan untuk kelas dan mata pelajaran ini.'}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={openCreateModal}
                  className="gap-2 mt-2"
                >
                  <PlusCircle className="size-4" />
                  <span>Tambah Materi Pertama</span>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* State E: Populated Material List */}
          {!isLoading && !error && materials.length > 0 && (
            <Card className="overflow-hidden">
              <div className="bg-muted/30 p-4 lg:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-xs">
                    {materials.length}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      Daftar Materi Aktif — {currentSubject?.nama || 'Mata Pelajaran'}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Disusun untuk {currentClass?.nama || 'Kelas'} • Terurut sesuai urutan silabus KOSP
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col divide-y divide-border">
                {materials.map((materi) => (
                  <article 
                    key={materi._id}
                    className="p-4 lg:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-primary shrink-0 mt-0.5">
                        {renderTypeIcon(materi.tipe)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">
                            {materi.tipe}
                          </Badge>
                          <span className="text-xs font-semibold text-muted-foreground">
                            #{materi.urutan}
                          </span>
                          <h3 className="text-sm font-semibold text-foreground">
                            {materi.judul}
                          </h3>
                        </div>
                        
                        {materi.deskripsi && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                            {materi.deskripsi}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3 text-muted-foreground" />
                            {materi.status === 'published' && materi.publishedAt
                              ? `Dirilis: ${new Date(materi.publishedAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}`
                              : 'Status: Tersimpan Sebagai Draft'}
                          </span>
                          <span>•</span>
                          <Badge variant="outline" className="text-[10px] text-primary border-primary/20 py-0 h-4">
                            Versi {materi.version}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-14 lg:pl-0 shrink-0">
                      {materi.status === 'published' ? (
                        <Badge variant="outline" className="gap-1 font-bold text-emerald-700 dark:text-emerald-400 border-emerald-300 text-xs">
                          <span className="size-1.5 rounded-full bg-emerald-600" />
                          Dipublikasikan
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1 font-bold text-muted-foreground text-xs">
                          <span className="size-1.5 rounded-full bg-muted-foreground" />
                          Draft
                        </Badge>
                      )}

                      <div className="flex items-center gap-1.5">
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openDetailModal(materi)}
                                className="gap-1 text-xs"
                              >
                                <Eye className="size-3.5" />
                                <span>Lihat</span>
                              </Button>
                            }
                          />
                          <TooltipContent>Lihat Detail Materi</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditModal(materi)}
                                className="gap-1 text-xs"
                              >
                                <Edit className="size-3.5" />
                                <span>Edit</span>
                              </Button>
                            }
                          />
                          <TooltipContent>Edit Data Materi</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={() => handleTogglePublish(materi)}
                                disabled={isSubmitting}
                                className={materi.status === 'published' ? 'text-amber-700 border-amber-300 hover:bg-amber-50' : 'text-emerald-700 border-emerald-300 hover:bg-emerald-50'}
                              >
                                {materi.status === 'published' ? <Clock className="size-3.5" /> : <CheckCircle2 className="size-3.5" />}
                              </Button>
                            }
                          />
                          <TooltipContent>
                            {materi.status === 'published' ? 'Kembalikan ke Draft' : 'Publikasikan Materi'}
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => openDeleteModal(materi)}
                                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            }
                          />
                          <TooltipContent>Hapus Materi</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Controls */}
              {pagination && pagination.totalPages > 1 && (
                <div className="bg-muted/20 p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Halaman {pagination.page} dari {pagination.totalPages} (Total {pagination.total} materi)
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage <= 1}
                      className="text-xs"
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                      disabled={currentPage >= pagination.totalPages}
                      className="text-xs"
                    >
                      Selanjutnya
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* 5. MODAL CREATE MATERIAL */}
        <Dialog open={activeModal === 'CREATE'} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Tambah Materi Pembelajaran</DialogTitle>
              <DialogDescription>Masukkan rincian materi baru untuk rombel yang dipilih.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
              {actionError && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertDescription>{actionError}</AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Judul Materi *</label>
                <Input
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Pengantar Pemrograman Web Modern"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Tipe Materi *</label>
                  <Select
                    value={formData.tipe}
                    onValueChange={(val) => val && setFormData({ ...formData, tipe: val as 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT' })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DOCUMENT">Dokumen (DOCUMENT)</SelectItem>
                      <SelectItem value="PDF">Dokumen PDF</SelectItem>
                      <SelectItem value="TEXT">Teks / Bacaan</SelectItem>
                      <SelectItem value="VIDEO">Video Materi</SelectItem>
                      <SelectItem value="LINK">Tautan Eksternal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Urutan Tampil *</label>
                  <Input
                    type="number"
                    min="1"
                    required
                    value={formData.urutan}
                    onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Status Awal</label>
                <RadioGroup 
                  value={formData.status} 
                  onValueChange={(val) => val && setFormData({ ...formData, status: val as 'draft' | 'published' })}
                  className="flex flex-col sm:flex-row gap-2.5 sm:gap-6 pt-1"
                >
                  <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                    <RadioGroupItem value="draft" />
                    <span>Draft (Belum dapat diakses siswa)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                    <RadioGroupItem value="published" />
                    <span>Langsung Publikasikan</span>
                  </label>
                </RadioGroup>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Deskripsi Singkat</label>
                <Textarea
                  rows={2}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Ringkasan atau tujuan instruksional dari materi ini..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Konten / Isi Materi</label>
                <Textarea
                  rows={4}
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  placeholder="Isi teks penjelasan materi atau instruksi bacaan..."
                  className="font-mono text-xs"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                  <span>Simpan Materi</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* 6. MODAL EDIT MATERIAL */}
        <Dialog open={activeModal === 'EDIT' && !!selectedMaterial} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>Edit Materi</DialogTitle>
                <Badge variant="outline">Versi {selectedMaterial?.version}</Badge>
              </div>
              <DialogDescription>Perbarui data materi pembelajaran.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              {actionError && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Konflik Perubahan Data</AlertTitle>
                  <AlertDescription className="mt-1 flex flex-col gap-2">
                    <p>{actionError}</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        refetchMaterials();
                        closeModal();
                      }}
                      className="self-start text-xs"
                    >
                      Muat Ulang Data Sekarang
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Judul Materi *</label>
                <Input
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Tipe Materi *</label>
                  <Select
                    value={formData.tipe}
                    onValueChange={(val) => val && setFormData({ ...formData, tipe: val as 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT' })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DOCUMENT">Dokumen (DOCUMENT)</SelectItem>
                      <SelectItem value="PDF">Dokumen PDF</SelectItem>
                      <SelectItem value="TEXT">Teks / Bacaan</SelectItem>
                      <SelectItem value="VIDEO">Video Materi</SelectItem>
                      <SelectItem value="LINK">Tautan Eksternal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Urutan Tampil *</label>
                  <Input
                    type="number"
                    min="1"
                    required
                    value={formData.urutan}
                    onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Status</label>
                <RadioGroup 
                  value={formData.status} 
                  onValueChange={(val) => val && setFormData({ ...formData, status: val as 'draft' | 'published' })}
                  className="flex flex-wrap gap-4 sm:gap-6 pt-1"
                >
                  <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                    <RadioGroupItem value="draft" />
                    <span>Draft</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                    <RadioGroupItem value="published" />
                    <span>Dipublikasikan</span>
                  </label>
                </RadioGroup>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Deskripsi Singkat</label>
                <Textarea
                  rows={2}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Konten / Isi Materi</label>
                <Textarea
                  rows={4}
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  className="font-mono text-xs"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                  <span>Simpan Perubahan</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* 7. MODAL DETAIL VIEW */}
        <Dialog open={activeModal === 'DETAIL' && !!selectedMaterial} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="uppercase font-bold text-[10px]">
                  {selectedMaterial?.tipe}
                </Badge>
                <span className="text-xs text-muted-foreground font-semibold">
                  Versi {selectedMaterial?.version}
                </span>
              </div>
              <DialogTitle className="text-lg font-semibold">{selectedMaterial?.judul}</DialogTitle>
              <DialogDescription>
                Urutan: #{selectedMaterial?.urutan} • Status:{' '}
                {selectedMaterial?.status === 'published' ? 'Dipublikasikan' : 'Draft'} • Dibuat:{' '}
                {selectedMaterial?.createdAt
                  ? new Date(selectedMaterial.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })
                  : '—'}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-2">
              {selectedMaterial?.deskripsi && (
                <div className="rounded-lg bg-muted/40 p-3 text-xs text-foreground">
                  <span className="font-semibold text-muted-foreground block mb-1">Deskripsi:</span>
                  {selectedMaterial.deskripsi}
                </div>
              )}

              {selectedMaterial?.konten ? (
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-foreground">Konten Materi:</span>
                  <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-foreground whitespace-pre-wrap font-sans leading-relaxed max-h-56 overflow-y-auto">
                    {selectedMaterial.konten}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground italic">Tidak ada konten teks tambahan.</div>
              )}

              {selectedMaterial?.file && (
                <div className="rounded-lg border border-border bg-primary/5 p-3 flex items-center justify-between text-xs text-foreground">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-primary" />
                    <span className="font-semibold">{selectedMaterial.file.name}</span>
                  </div>
                  <span className="text-muted-foreground">{(selectedMaterial.file.size / 1024).toFixed(1)} KB</span>
                </div>
              )}
            </div>

            <DialogFooter className="pt-2 flex justify-between sm:justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  const mat = selectedMaterial;
                  closeModal();
                  if (mat) openEditModal(mat);
                }}
                className="gap-1.5 text-xs"
              >
                <Edit className="size-3.5" />
                <span>Edit Materi</span>
              </Button>
              <Button onClick={closeModal} className="text-xs">
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 8. MODAL CONFIRM DELETE */}
        <Dialog open={activeModal === 'DELETE' && !!selectedMaterial} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="size-5" />
                Hapus Materi
              </DialogTitle>
              <DialogDescription>
                Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus materi{' '}
                <strong>&quot;{selectedMaterial?.judul}&quot;</strong>?
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
                className="gap-2"
              >
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                <span>Hapus Materi</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
