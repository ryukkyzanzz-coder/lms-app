'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
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
    status: 'draft' as 'draft' | 'published',
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
          console.error('Error fetching materials:', apiErr);
          setError(apiErr.message || 'Gagal memuat daftar materi');
          setMaterials([]);
          setPagination(null);
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

  // Quick Stats
  const publishedCount = useMemo(
    () => materials.filter((m) => m.status === 'published').length,
    [materials]
  );
  const draftCount = useMemo(
    () => materials.filter((m) => m.status === 'draft').length,
    [materials]
  );

  // Open Create Modal
  const openCreateModal = () => {
    setFormData({
      judul: '',
      tipe: 'DOCUMENT',
      deskripsi: '',
      konten: '',
      urutan: materials.length + 1,
      status: 'draft',
    });
    setActionError(null);
    setActiveModal('CREATE');
  };

  // Open Edit Modal
  const openEditModal = (material: IMateri) => {
    setSelectedMaterial(material);
    setFormData({
      judul: material.judul,
      tipe: material.tipe,
      deskripsi: material.deskripsi || '',
      konten: material.konten || '',
      urutan: material.urutan || 1,
      status: material.status === 'published' ? 'published' : 'draft',
    });
    setActionError(null);
    setActiveModal('EDIT');
  };

  // Open Detail Modal
  const openDetailModal = (material: IMateri) => {
    setSelectedMaterial(material);
    setActiveModal('DETAIL');
  };

  // Open Delete Modal
  const openDeleteModal = (material: IMateri) => {
    setSelectedMaterial(material);
    setActionError(null);
    setActiveModal('DELETE');
  };

  // Close Any Modal
  const closeModal = () => {
    setActiveModal('NONE');
    setSelectedMaterial(null);
    setActionError(null);
  };

  // Submit Create Material
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKelasId || !selectedMapelId) return;

    try {
      setIsSubmitting(true);
      setActionError(null);

      await fetchAPI(
        `/teachers/me/classes/${selectedKelasId}/subjects/${selectedMapelId}/materials`,
        {
          method: 'POST',
          body: JSON.stringify({
            judul: formData.judul.trim(),
            tipe: formData.tipe,
            deskripsi: formData.deskripsi.trim() || undefined,
            konten: formData.konten.trim() || undefined,
            urutan: Number(formData.urutan) || 1,
            status: formData.status,
          }),
        }
      );

      setActionSuccess('Materi baru berhasil dibuat');
      setTimeout(() => setActionSuccess(null), 4000);
      closeModal();
      refetchMaterials();
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      console.error('Error creating material:', apiErr);
      setActionError(apiErr.message || 'Gagal membuat materi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Edit Material with Optimistic Concurrency
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterial) return;

    try {
      setIsSubmitting(true);
      setActionError(null);

      // Must send current version for optimistic concurrency
      await fetchAPI(`/teachers/me/materials/${selectedMaterial._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          version: selectedMaterial.version,
          judul: formData.judul.trim(),
          tipe: formData.tipe,
          deskripsi: formData.deskripsi.trim() || undefined,
          konten: formData.konten.trim() || undefined,
          urutan: Number(formData.urutan) || 1,
          status: formData.status,
        }),
      });

      setActionSuccess('Perubahan materi berhasil disimpan');
      setTimeout(() => setActionSuccess(null), 4000);
      closeModal();
      refetchMaterials();
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      console.error('Error updating material:', apiErr);
      if (apiErr.status === 409 || apiErr.code === 'VERSION_CONFLICT') {
        setActionError('Data materi telah berubah. Muat ulang data sebelum menyimpan perubahan.');
      } else {
        setActionError(apiErr.message || 'Gagal menyimpan perubahan materi');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Publish / Unpublish
  const handleTogglePublish = async (material: IMateri) => {
    try {
      setIsSubmitting(true);
      const isPublished = material.status === 'published';
      const endpoint = isPublished
        ? `/teachers/me/materials/${material._id}/unpublish`
        : `/teachers/me/materials/${material._id}/publish`;

      await fetchAPI(endpoint, { method: 'POST' });

      setActionSuccess(
        isPublished
          ? 'Materi dialihkan ke status Draft'
          : 'Materi berhasil dipublikasikan'
      );
      setTimeout(() => setActionSuccess(null), 4000);
      refetchMaterials();
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      console.error('Error updating status:', apiErr);
      alert(apiErr.message || 'Gagal mengubah status publikasi materi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirm Delete Material
  const handleDeleteSubmit = async () => {
    if (!selectedMaterial) return;

    try {
      setIsSubmitting(true);
      setActionError(null);

      await fetchAPI(`/teachers/me/materials/${selectedMaterial._id}`, {
        method: 'DELETE',
      });

      setActionSuccess('Materi berhasil dihapus');
      setTimeout(() => setActionSuccess(null), 4000);
      closeModal();
      refetchMaterials();
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      console.error('Error deleting material:', apiErr);
      setActionError(apiErr.message || 'Gagal menghapus materi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for Type Icon
  const renderTypeIcon = (tipe: string) => {
    switch (tipe) {
      case 'PDF':
        return <FileText size={20} className="text-red-600" />;
      case 'VIDEO':
        return <Video size={20} className="text-purple-600" />;
      case 'LINK':
        return <LinkIcon size={20} className="text-blue-600" />;
      case 'TEXT':
        return <Code size={20} className="text-indigo-600" />;
      case 'DOCUMENT':
      default:
        return <FileText size={20} className="text-blue-700" />;
    }
  };

  const renderTypeBg = (tipe: string) => {
    switch (tipe) {
      case 'PDF':
        return 'bg-red-50 text-red-600';
      case 'VIDEO':
        return 'bg-purple-50 text-purple-600';
      case 'LINK':
        return 'bg-blue-50 text-blue-600';
      case 'TEXT':
        return 'bg-indigo-50 text-indigo-600';
      case 'DOCUMENT':
      default:
        return 'bg-blue-50 text-blue-700';
    }
  };

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* 1. HEADER & BREADCRUMB */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-1.5 text-[12px] font-medium" aria-label="Breadcrumb">
              <Link href="/guru/kelas" className="text-blue-700 hover:underline">Kelas Saya</Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-600">{currentClass ? currentClass.nama : 'Pilih Kelas'}</span>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-900 font-semibold bg-slate-100 px-2 py-0.5 rounded">Materi Pembelajaran</span>
            </nav>
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Materi Pembelajaran <span className="text-slate-400 font-normal mx-1">—</span>{' '}
              {currentSubject ? currentSubject.nama : 'Pilih Mata Pelajaran'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button 
              onClick={() => refetchMaterials()}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors shadow-sm disabled:opacity-60"
            >
              <RefreshCcw size={16} className={`text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sinkron Materi</span>
              <span className="sm:hidden">Sinkron</span>
            </button>
            <button 
              onClick={openCreateModal}
              disabled={!selectedKelasId || !selectedMapelId}
              className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle size={16} />
              <span>Tambah Materi</span>
            </button>
          </div>
        </div>

        {/* SELECTOR & INSTITUTIONAL CONTEXT BAR */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Konteks Mengajar:</span>
              <ClassSubjectSelector showLabels={false} />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Terhubung dengan MongoDB Master</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100/50 border border-blue-200/50 text-blue-700 flex items-center justify-center shrink-0">
                <GraduationCap size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-900 text-[13px]">
                  Kurikulum Operasional Satuan Pendidikan (KOSP) 2026/2027
                </span>
                <span className="text-[12px] text-slate-500 mt-0.5">
                  Konsentrasi Keahlian: {currentClass?.program || 'RPL'} (Tingkat {currentClass?.tingkat || '-'})
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 bg-slate-50/80 px-3 py-2 rounded-lg border border-slate-200/60">
              <span className="font-semibold text-slate-700 text-[12px] mr-1">
                {pagination?.total || materials.length} Materi Terdaftar
              </span>
              <span className="w-px h-3 bg-slate-300"></span>
              <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                {publishedCount} Dipublikasikan
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-bold border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                {draftCount} Draft
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS BANNER NOTIFICATION */}
      {actionSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center justify-between text-sm shadow-sm transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-600" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-green-600 hover:text-green-800">
            <X size={16} />
          </button>
        </div>
      )}

      {/* 2. BENTO STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Total Materi Terbit</span>
            <Users size={20} className="text-blue-700" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">
                {publishedCount}
              </span>
              <span className="text-[12px] font-semibold text-slate-500">dari {materials.length} total</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                style={{ width: `${materials.length ? Math.round((publishedCount / materials.length) * 100) : 0}%` }}
              ></div>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {materials.length ? `${Math.round((publishedCount / materials.length) * 100)}% materi telah aktif dipelajari` : 'Belum ada materi'}
          </span>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Status Publikasi</span>
            <CheckSquare size={20} className="text-green-600" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">
                {draftCount} Draft
              </span>
              <span className="text-[12px] font-semibold text-slate-500">siap tayang</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                style={{ width: `${materials.length ? Math.round((draftCount / materials.length) * 100) : 0}%` }}
              ></div>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Dapat ditinjau sebelum dipublikasikan</span>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Distribusi Format</span>
            <Layers size={20} className="text-indigo-600" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-display text-[16px] font-bold text-slate-900">
                {materials.filter((m) => m.tipe === 'PDF' || m.tipe === 'DOCUMENT').length}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Dokumen</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[16px] font-bold text-slate-900">
                {materials.filter((m) => m.tipe === 'TEXT').length}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Teks</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[16px] font-bold text-slate-900">
                {materials.filter((m) => m.tipe === 'VIDEO' || m.tipe === 'LINK').length}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Media</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-auto">Format digital multi-modal</span>
        </div>

        <div className="bg-blue-900 rounded-xl p-5 shadow-sm flex flex-col gap-4 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 opacity-10">
            <CalendarClock size={100} />
          </div>
          <div className="relative z-10 flex items-center justify-between text-blue-100">
            <span className="font-semibold text-[13px]">Materi Terakhir Diperbarui</span>
            <CalendarClock size={20} className="text-blue-200" />
          </div>
          <div className="relative z-10 flex flex-col mt-2">
            <span className="font-display text-[15px] font-bold leading-tight truncate">
              {materials[0]?.judul || 'Belum ada materi'}
            </span>
            <span className="text-[12px] font-semibold text-blue-200 bg-blue-950/50 w-fit px-2 py-1 rounded mt-2">
              {materials[0]?.updatedAt ? new Date(materials[0].updatedAt).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : '-'}
            </span>
          </div>
          <div className="relative z-10 flex items-center gap-1.5 text-[11px] text-blue-200/80 font-medium mt-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Tersimpan pada Database MongoDB
          </div>
        </div>
      </div>

      {/* 3. FILTER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0">
          <button 
            onClick={() => setStatusFilter('ALL')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap shadow-sm transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Materi
            <span className={`px-1.5 py-0.5 rounded text-[11px] ${statusFilter === 'ALL' ? 'bg-blue-600/30 text-blue-200' : 'bg-slate-100 text-slate-500'}`}>
              {materials.length}
            </span>
          </button>
          <button 
            onClick={() => setStatusFilter('published')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors ${
              statusFilter === 'published'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Dipublikasikan
            <span className={`px-1.5 py-0.5 rounded text-[11px] ${statusFilter === 'published' ? 'bg-blue-600/30 text-blue-200' : 'bg-slate-100 text-slate-500'}`}>
              {publishedCount}
            </span>
          </button>
          <button 
            onClick={() => setStatusFilter('draft')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors ${
              statusFilter === 'draft'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Draft Guru
            <span className={`px-1.5 py-0.5 rounded text-[11px] ${statusFilter === 'draft' ? 'bg-blue-600/30 text-blue-200' : 'bg-slate-100 text-slate-500'}`}>
              {draftCount}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[250px] lg:w-[300px] h-10 pl-9 pr-3 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow"
              placeholder="Cari topik, judul materi..." 
            />
          </div>
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/60">
            <button className="p-1.5 rounded-md bg-white text-blue-900 shadow-sm border border-slate-200/40" title="Tampilan Daftar Materi">
              <ListTree size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. CONTENT AREA & OPERATIONAL LIST */}
      <div className="flex flex-col gap-6">
        {/* State A: Loading State */}
        {isLoading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white border border-slate-200/60 rounded-xl p-5 flex items-center justify-between gap-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-200"></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-48 h-4 bg-slate-200 rounded"></div>
                    <div className="w-32 h-3 bg-slate-100 rounded"></div>
                  </div>
                </div>
                <div className="w-24 h-8 bg-slate-100 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* State B: Error State */}
        {!isLoading && error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3">
            <AlertCircle size={36} className="text-red-600" />
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-red-900">Terjadi Kesalahan Saat Memuat Materi</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={() => refetchMaterials()}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              Coba Muat Ulang
            </button>
          </div>
        )}

        {/* State C: No Class / Subject Selected */}
        {!isLoading && !error && (!selectedKelasId || !selectedMapelId) && (
          <div className="bg-white border border-slate-200/80 rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FolderOpen size={28} />
            </div>
            <div className="flex flex-col gap-1 max-w-md">
              <h3 className="text-base font-bold text-slate-900">Pilih Kelas & Mata Pelajaran</h3>
              <p className="text-sm text-slate-500">
                Pilih rombongan belajar dan mata pelajaran yang Anda ampu melalui bilah seleksi di atas untuk mulai mengelola materi pembelajaran.
              </p>
            </div>
          </div>
        )}

        {/* State D: Empty Materials State */}
        {!isLoading && !error && selectedKelasId && selectedMapelId && materials.length === 0 && (
          <div className="bg-white border border-slate-200/80 rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center">
              <FileText size={28} />
            </div>
            <div className="flex flex-col gap-1 max-w-md">
              <h3 className="text-base font-bold text-slate-900">Belum Ada Materi Pembelajaran</h3>
              <p className="text-sm text-slate-500">
                {searchQuery || statusFilter !== 'ALL'
                  ? 'Tidak ada materi yang sesuai dengan filter atau kata kunci pencarian Anda.'
                  : 'Belum ada modul materi yang ditambahkan untuk kelas dan mata pelajaran ini.'}
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <PlusCircle size={16} />
              <span>Tambah Materi Pertama</span>
            </button>
          </div>
        )}

        {/* State E: Populated Material List */}
        {!isLoading && !error && materials.length > 0 && (
          <section className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-blue-50/50 p-4 lg:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-display text-sm font-bold">
                  {materials.length}
                </div>
                <div>
                  <h2 className="font-display text-[15px] font-bold text-slate-900">
                    Daftar Materi Aktif — {currentSubject?.nama || 'Mata Pelajaran'}
                  </h2>
                  <p className="text-[12px] text-slate-500">
                    Disusun untuk {currentClass?.nama || 'Kelas'} • Terurut sesuai urutan silabus KOSP
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100">
              {materials.map((materi) => (
                <article 
                  key={materi._id}
                  className="p-4 lg:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-1 ${renderTypeBg(materi.tipe)}`}>
                      {renderTypeIcon(materi.tipe)}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                          {materi.tipe}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          #{materi.urutan}
                        </span>
                        <h3 className="font-display text-[15px] font-semibold text-slate-900">
                          {materi.judul}
                        </h3>
                      </div>
                      
                      {materi.deskripsi && (
                        <p className="text-[13px] text-slate-600 line-clamp-1 mb-1.5">
                          {materi.deskripsi}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-slate-400" />
                          {materi.status === 'published' && materi.publishedAt
                            ? `Dirilis: ${new Date(materi.publishedAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}`
                            : 'Status: Tersimpan Sebagai Draft'}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded text-[11px] font-semibold">
                          Versi {materi.version}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-14 lg:pl-0 shrink-0">
                    {materi.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-2.5 py-1 rounded-md text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        Dipublikasikan
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        Draft
                      </span>
                    )}

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => openDetailModal(materi)}
                        className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors"
                        title="Lihat Detail Materi"
                      >
                        <Eye size={14} /> Lihat
                      </button>

                      <button 
                        onClick={() => openEditModal(materi)}
                        className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors"
                        title="Edit Materi"
                      >
                        <Edit size={14} /> Edit
                      </button>

                      <button
                        onClick={() => handleTogglePublish(materi)}
                        disabled={isSubmitting}
                        className={`p-1.5 rounded-md border text-[12px] font-semibold transition-colors ${
                          materi.status === 'published'
                            ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                            : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                        }`}
                        title={materi.status === 'published' ? 'Kembalikan ke Draft' : 'Publikasikan Materi'}
                      >
                        {materi.status === 'published' ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                      </button>

                      <button 
                        onClick={() => openDeleteModal(materi)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent transition-colors"
                        title="Hapus Materi"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="bg-slate-50/70 p-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Halaman {pagination.page} dari {pagination.totalPages} (Total {pagination.total} materi)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700 disabled:opacity-40"
                  >
                    Sebelumnya
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={currentPage >= pagination.totalPages}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700 disabled:opacity-40"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      {/* 5. MODAL CREATE MATERIAL */}
      {activeModal === 'CREATE' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-bold text-slate-900">Tambah Materi Pembelajaran</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 flex flex-col gap-4">
              {actionError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
                  {actionError}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Judul Materi *</label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Pengantar Pemrograman Web Modern"
                  className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">Tipe Materi *</label>
                  <select
                    value={formData.tipe}
                    onChange={(e) => setFormData({ ...formData, tipe: e.target.value as 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT' })}
                    className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900"
                  >
                    <option value="DOCUMENT">Dokumen (DOCUMENT)</option>
                    <option value="PDF">Dokumen PDF</option>
                    <option value="TEXT">Teks / Bacaan</option>
                    <option value="VIDEO">Video Materi</option>
                    <option value="LINK">Tautan Eksternal</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">Urutan Tampil *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.urutan}
                    onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) || 1 })}
                    className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Status Awal</label>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === 'draft'}
                      onChange={() => setFormData({ ...formData, status: 'draft' })}
                    />
                    <span>Draft (Belum dapat diakses siswa)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === 'published'}
                      onChange={() => setFormData({ ...formData, status: 'published' })}
                    />
                    <span>Langsung Publikasikan</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Ringkasan atau tujuan instruksional dari materi ini..."
                  className="p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Konten / Isi Materi</label>
                <textarea
                  rows={4}
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  placeholder="Isi teks penjelasan materi atau instruksi bacaan..."
                  className="p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900 font-mono text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  <span>Simpan Materi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL EDIT MATERIAL (Optimistic Concurrency) */}
      {activeModal === 'EDIT' && selectedMaterial && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Edit Materi</h2>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-semibold">
                  Versi {selectedMaterial.version}
                </span>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-5 flex flex-col gap-4">
              {/* Conflict / Error Banner */}
              {actionError && (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-amber-900 text-xs font-bold">
                    <AlertCircle size={16} className="text-amber-600" />
                    <span>Konflik Perubahan Data</span>
                  </div>
                  <p className="text-xs text-amber-800">{actionError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      refetchMaterials();
                      closeModal();
                    }}
                    className="self-start mt-1 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold"
                  >
                    Muat Ulang Data Sekarang
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Judul Materi *</label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">Tipe Materi *</label>
                  <select
                    value={formData.tipe}
                    onChange={(e) => setFormData({ ...formData, tipe: e.target.value as 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT' })}
                    className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900"
                  >
                    <option value="DOCUMENT">Dokumen (DOCUMENT)</option>
                    <option value="PDF">Dokumen PDF</option>
                    <option value="TEXT">Teks / Bacaan</option>
                    <option value="VIDEO">Video Materi</option>
                    <option value="LINK">Tautan Eksternal</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">Urutan Tampil *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.urutan}
                    onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) || 1 })}
                    className="h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Status</label>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="status_edit"
                      checked={formData.status === 'draft'}
                      onChange={() => setFormData({ ...formData, status: 'draft' })}
                    />
                    <span>Draft</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="status_edit"
                      checked={formData.status === 'published'}
                      onChange={() => setFormData({ ...formData, status: 'published' })}
                    />
                    <span>Dipublikasikan</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Konten / Isi Materi</label>
                <textarea
                  rows={4}
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  className="p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900 font-mono text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL DETAIL VIEW */}
      {activeModal === 'DETAIL' && selectedMaterial && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold uppercase">
                  {selectedMaterial.tipe}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  Versi {selectedMaterial.version}
                </span>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedMaterial.judul}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                  <span>Urutan: #{selectedMaterial.urutan}</span>
                  <span>•</span>
                  <span>
                    Status:{' '}
                    <strong className={selectedMaterial.status === 'published' ? 'text-green-700' : 'text-slate-700'}>
                      {selectedMaterial.status === 'published' ? 'Dipublikasikan' : 'Draft'}
                    </strong>
                  </span>
                  <span>•</span>
                  <span>
                    Dibuat: {new Date(selectedMaterial.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                  </span>
                </div>
              </div>

              {selectedMaterial.deskripsi && (
                <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700">
                  <span className="text-xs font-semibold text-slate-500 block mb-1">Deskripsi:</span>
                  {selectedMaterial.deskripsi}
                </div>
              )}

              {selectedMaterial.konten ? (
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">Konten Materi:</span>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-800 whitespace-pre-wrap font-sans leading-relaxed max-h-60 overflow-y-auto">
                    {selectedMaterial.konten}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">Tidak ada konten teks tambahan.</div>
              )}

              {selectedMaterial.file && (
                <div className="p-3 bg-blue-50/60 border border-blue-200/60 rounded-lg flex items-center justify-between text-xs text-blue-900">
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span className="font-semibold">{selectedMaterial.file.name}</span>
                  </div>
                  <span>{(selectedMaterial.file.size / 1024).toFixed(1)} KB</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    closeModal();
                    openEditModal(selectedMaterial);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Edit size={14} /> Edit Materi
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL CONFIRM DELETE */}
      {activeModal === 'DELETE' && selectedMaterial && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Hapus Materi</h3>
                <p className="text-xs text-slate-500">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>

            <p className="text-sm text-slate-700">
              Apakah Anda yakin ingin menghapus materi <strong>&quot;{selectedMaterial.judul}&quot;</strong>?
            </p>

            {actionError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
                {actionError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                <span>Hapus Materi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
