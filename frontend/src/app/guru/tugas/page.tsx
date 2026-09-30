'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ClipboardCheck, 
  Search, 
  PlusCircle, 
  Clock, 
  Award, 
  Edit, 
  Trash2, 
  Eye, 
  Send, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  FileText,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  CheckCheck,
  Users
} from 'lucide-react';
import { useTeacher } from '@/lib/guru/teacher-context';
import ClassSubjectSelector from '@/components/guru/ClassSubjectSelector';
import { fetchAPI, ApiError } from '@/lib/api';
import { ITugas, AssignmentPagination } from '@/types/guru';

export default function GuruTugasPage() {
  const {
    selectedKelasId,
    selectedMapelId,
  } = useTeacher();

  // Assignment List & Pagination State
  const [assignments, setAssignments] = useState<ITugas[]>([]);
  const [pagination, setPagination] = useState<AssignmentPagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
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
        params.append('page', currentPage.toString());
        params.append('limit', '10');
        params.append('sort', 'deadline');

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
          setError(apiErr.message || 'Gagal memuat daftar tugas');
          setAssignments([]);
          setPagination(null);
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
  }, [selectedKelasId, selectedMapelId, statusFilter, searchQuery, currentPage, refreshTrigger]);

  // Handle Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchQuery(searchInput);
  };

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
      maxScore: tugas.maxScore || 100,
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

  // Submit Create Assignment
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKelasId || !selectedMapelId) return;

    try {
      setIsSubmitting(true);
      setActionError(null);

      await fetchAPI(
        `/teachers/me/classes/${selectedKelasId}/subjects/${selectedMapelId}/assignments`,
        {
          method: 'POST',
          body: JSON.stringify({
            judul: formData.judul.trim(),
            deskripsi: formData.deskripsi.trim(),
            instruksi: formData.instruksi.trim() || undefined,
            deadline: new Date(formData.deadline).toISOString(),
            maxScore: Number(formData.maxScore) || 100,
            status: formData.status,
          }),
        }
      );

      setActionSuccess('Tugas baru berhasil dibuat');
      setTimeout(() => setActionSuccess(null), 4000);
      closeModal();
      setRefreshTrigger((v) => v + 1);
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setActionError(apiErr.message || 'Gagal membuat tugas');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Edit Assignment with Optimistic Concurrency
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    try {
      setIsSubmitting(true);
      setActionError(null);

      // Must send current version for atomic optimistic concurrency
      await fetchAPI(`/teachers/me/assignments/${selectedAssignment._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          version: selectedAssignment.version,
          judul: formData.judul.trim(),
          deskripsi: formData.deskripsi.trim(),
          instruksi: formData.instruksi.trim() || undefined,
          deadline: new Date(formData.deadline).toISOString(),
          maxScore: Number(formData.maxScore) || 100,
          status: formData.status,
        }),
      });

      setActionSuccess('Perubahan tugas berhasil disimpan');
      setTimeout(() => setActionSuccess(null), 4000);
      closeModal();
      setRefreshTrigger((v) => v + 1);
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      if (apiErr.status === 409) {
        setActionError(
          'Data tugas telah berubah. Muat ulang data sebelum menyimpan perubahan.'
        );
      } else {
        setActionError(apiErr.message || 'Gagal memperbarui tugas');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Delete Assignment
  const handleDeleteSubmit = async () => {
    if (!selectedAssignment) return;

    try {
      setIsSubmitting(true);
      setActionError(null);

      await fetchAPI(`/teachers/me/assignments/${selectedAssignment._id}`, {
        method: 'DELETE',
      });

      setActionSuccess('Tugas berhasil dihapus');
      setTimeout(() => setActionSuccess(null), 4000);
      closeModal();
      setRefreshTrigger((v) => v + 1);
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setActionError(apiErr.message || 'Gagal menghapus tugas');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick Action: Publish Assignment
  const handlePublish = async (tugas: ITugas) => {
    try {
      await fetchAPI(`/teachers/me/assignments/${tugas._id}/publish`, {
        method: 'POST',
      });
      setActionSuccess(`Tugas "${tugas.judul}" berhasil dipublikasikan`);
      setTimeout(() => setActionSuccess(null), 4000);
      setRefreshTrigger((v) => v + 1);
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      alert(`Gagal mempublikasikan tugas: ${apiErr.message}`);
    }
  };

  // Quick Action: Unpublish Assignment
  const handleUnpublish = async (tugas: ITugas) => {
    try {
      await fetchAPI(`/teachers/me/assignments/${tugas._id}/unpublish`, {
        method: 'POST',
      });
      setActionSuccess(`Tugas "${tugas.judul}" dialihkan menjadi draf`);
      setTimeout(() => setActionSuccess(null), 4000);
      setRefreshTrigger((v) => v + 1);
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      alert(`Gagal mengalihkan tugas: ${apiErr.message}`);
    }
  };

  // Stats calculation
  const totalCount = pagination?.total ?? assignments.length;
  const publishedCount = assignments.filter((a) => a.status === 'published').length;
  const draftCount = assignments.filter((a) => a.status === 'draft').length;
  const closedCount = assignments.filter((a) => a.status === 'closed').length;

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Academic Command Header */}
      <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Modul Evaluasi Pembelajaran
            </span>
            <span className="text-[12px] text-slate-500 font-medium">TA 2026/2027 • Semester Ganjil</span>
          </div>
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Manajemen Tugas & Penugasan
            </h1>
            <p className="text-[13px] text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Kelola penugasan siswa, batas waktu pengumpulan, dan bobot nilai per rombongan belajar dan mata pelajaran.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openCreateModal}
            disabled={!selectedKelasId || !selectedMapelId}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none text-white rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors shadow-sm"
          >
            <PlusCircle size={18} />
            <span>Buat Tugas Baru</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {actionSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between gap-3 text-emerald-800 text-sm shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCheck size={18} className="text-emerald-600 shrink-0" />
            <span className="font-medium">{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-emerald-600 hover:text-emerald-800">
            <X size={16} />
          </button>
        </div>
      )}

      {/* 2. Operational Stat Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <ClipboardCheck size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Tugas</span>
            <span className="font-display text-[20px] font-bold text-slate-900 mt-0.5">
              {isLoading ? '...' : `${totalCount} Tugas`}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dipublikasikan</span>
            <span className="font-display text-[20px] font-bold text-emerald-700 mt-0.5">
              {isLoading ? '...' : `${publishedCount} Aktif`}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Draf Tugas</span>
            <span className="font-display text-[20px] font-bold text-amber-700 mt-0.5">
              {isLoading ? '...' : `${draftCount} Draf`}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tugas Ditutup</span>
            <span className="font-display text-[20px] font-bold text-slate-800 mt-0.5">
              {isLoading ? '...' : `${closedCount} Selesai`}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Class & Subject Selector Bar */}
      <ClassSubjectSelector />

      {/* 4. Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari judul tugas..."
            className="w-full h-10 pl-9 pr-3 bg-white border border-slate-200/60 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all shadow-sm"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 px-3 bg-white border border-slate-200/60 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-900 shadow-sm"
            >
              <option value="ALL">Semua Status</option>
              <option value="published">Dipublikasikan</option>
              <option value="draft">Draf</option>
              <option value="closed">Ditutup</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchInput('');
              setSearchQuery('');
              setStatusFilter('ALL');
              setCurrentPage(1);
              setRefreshTrigger((v) => v + 1);
            }}
            title="Muat Ulang / Reset Filter"
            className="h-10 px-3 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-red-600 shrink-0" />
            <div className="text-sm text-red-800">
              <strong>Gagal memuat daftar tugas:</strong> {error}
            </div>
          </div>
          <button
            onClick={() => setRefreshTrigger((v) => v + 1)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && !error && (
        <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm flex flex-col gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-lg"></div>
          ))}
        </div>
      )}

      {/* 5. Assignment Data Table */}
      {!isLoading && !error && (
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Judul & Instruksi Tugas</th>
                  <th className="py-3 px-4">Batas Waktu (Deadline)</th>
                  <th className="py-3 px-3 text-center">Nilai Maks</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {assignments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <ClipboardCheck size={40} className="text-slate-300" />
                        <p className="text-sm font-semibold text-slate-700">
                          Tidak Ada Tugas Ditemukan
                        </p>
                        <p className="text-xs text-slate-400 max-w-sm">
                          {searchQuery || statusFilter !== 'ALL'
                            ? 'Tidak ada tugas yang sesuai dengan kriteria filter pencarian.'
                            : 'Belum ada tugas yang dibuat untuk kelas dan mata pelajaran ini.'}
                        </p>
                        {selectedKelasId && selectedMapelId && (
                          <button
                            onClick={openCreateModal}
                            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors shadow-sm"
                          >
                            <PlusCircle size={14} />
                            <span>Buat Tugas Pertama</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  assignments.map((tugas, idx) => {
                    const rowNumber = pagination
                      ? (pagination.page - 1) * pagination.limit + idx + 1
                      : idx + 1;
                    return (
                      <tr key={tugas._id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-4 text-center font-mono text-slate-400 text-xs">
                          {rowNumber < 10 ? `0${rowNumber}` : rowNumber}
                        </td>
                        <td className="py-4 px-4 max-w-md">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 text-[13px] hover:text-blue-900 cursor-pointer" onClick={() => openDetailModal(tugas)}>
                                {tugas.judul}
                              </span>
                              <span className="px-1.5 py-0.2 bg-slate-100 text-slate-500 font-mono text-[10px] rounded">
                                v{tugas.version}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">
                              {tugas.deskripsi}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Clock size={14} className="text-slate-400 shrink-0" />
                            <span className="font-medium text-[12px]">
                              {formatDeadline(tugas.deadline)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-3 text-center whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[11px] border border-blue-100">
                            <Award size={12} />
                            {tugas.maxScore} Poin
                          </span>
                        </td>
                        <td className="py-4 px-3 text-center whitespace-nowrap">
                          {tugas.status === 'published' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              Dipublikasikan
                            </span>
                          ) : tugas.status === 'draft' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              Draf
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold">
                              Ditutup
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            <Link
                              href={`/guru/tugas/${tugas._id}`}
                              title="Daftar Pengumpulan Siswa"
                              className="p-1.5 rounded-md hover:bg-blue-50 text-slate-600 hover:text-blue-900 transition-colors"
                            >
                              <Users size={16} />
                            </Link>

                            <button
                              onClick={() => openDetailModal(tugas)}
                              title="Lihat Rincian Tugas"
                              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-blue-900 transition-colors"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              onClick={() => openEditModal(tugas)}
                              title="Edit Tugas"
                              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-amber-700 transition-colors"
                            >
                              <Edit size={16} />
                            </button>

                            {tugas.status === 'draft' ? (
                              <button
                                onClick={() => handlePublish(tugas)}
                                title="Publikasikan Tugas ke Siswa"
                                className="p-1.5 rounded-md hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
                              >
                                <Send size={16} />
                              </button>
                            ) : tugas.status === 'published' ? (
                              <button
                                onClick={() => handleUnpublish(tugas)}
                                title="Tarik Kembali Menjadi Draf"
                                className="p-1.5 rounded-md hover:bg-amber-50 text-slate-600 hover:text-amber-700 transition-colors"
                              >
                                <EyeOff size={16} />
                              </button>
                            ) : null}

                            <button
                              onClick={() => openDeleteModal(tugas)}
                              title="Hapus Tugas"
                              className="p-1.5 rounded-md hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="p-4 bg-white border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Menampilkan{' '}
                <strong className="text-slate-800">
                  {(pagination.page - 1) * pagination.limit + 1}
                </strong>{' '}
                -{' '}
                <strong className="text-slate-800">
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </strong>{' '}
                dari <strong className="text-slate-800">{pagination.total}</strong> tugas
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={pagination.page <= 1 || isLoading}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-sm"
                >
                  <ChevronLeft size={14} />
                  <span>Sebelumnya</span>
                </button>

                <span className="px-2 font-medium text-slate-700">
                  Halaman {pagination.page} / {pagination.totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={pagination.page >= pagination.totalPages || isLoading}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-sm"
                >
                  <span>Berikutnya</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CREATE / EDIT ASSIGNMENT */}
      {/* ======================================================== */}
      {(activeModal === 'CREATE' || activeModal === 'EDIT') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  {activeModal === 'CREATE' ? <PlusCircle size={18} /> : <Edit size={18} />}
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {activeModal === 'CREATE' ? 'Buat Tugas Baru' : 'Perbarui Data Tugas'}
                </h3>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={activeModal === 'CREATE' ? handleCreateSubmit : handleEditSubmit} className="p-6 flex flex-col gap-4">
              {actionError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Terjadi Kesalahan:</p>
                    <p>{actionError}</p>
                    {actionError.includes('Data tugas telah berubah') && (
                      <button
                        type="button"
                        onClick={() => {
                          closeModal();
                          setRefreshTrigger((v) => v + 1);
                        }}
                        className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition-colors"
                      >
                        Muat Ulang Data
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeModal === 'EDIT' && selectedAssignment && (
                <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg flex items-center justify-between text-xs text-blue-900 font-medium">
                  <span>Kontrol Versi Optimistic Concurrency:</span>
                  <span className="font-mono bg-blue-100 px-2 py-0.5 rounded font-bold">
                    Versi Saat Ini: v{selectedAssignment.version}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Judul Tugas <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Tugas 02: Implementasi REST API Express & Mongoose"
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Deskripsi Ringkas <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Jelaskan ringkasan materi atau tujuan dari tugas ini..."
                  className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Instruksi Pengerjaan (Opsional)
                </label>
                <textarea
                  rows={4}
                  value={formData.instruksi}
                  onChange={(e) => setFormData({ ...formData, instruksi: e.target.value })}
                  placeholder="Tuliskan petunjuk teknis pengerjaan, format berkas yang diterima, atau ketentuan repositori git..."
                  className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Batas Waktu (Deadline) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Nilai Maksimal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    required
                    value={formData.maxScore}
                    onChange={(e) => setFormData({ ...formData, maxScore: Number(e.target.value) })}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Status Tugas</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'closed' })}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-900"
                >
                  <option value="draft">Draf (Belum terlihat oleh siswa)</option>
                  <option value="published">Publikasikan (Siswa dapat mengakses & mengumpulkan)</option>
                  {activeModal === 'EDIT' && <option value="closed">Tutup Tugas (Batas akhir tercapai)</option>}
                </select>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>Menyimpan...</span>
                  ) : activeModal === 'CREATE' ? (
                    <span>Buat Tugas</span>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DETAIL ASSIGNMENT */}
      {/* ======================================================== */}
      {activeModal === 'DETAIL' && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-blue-50 text-blue-700">
                  <ClipboardCheck size={20} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Rincian Tugas
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ID: {selectedAssignment._id} • v{selectedAssignment.version}
                  </span>
                </div>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Judul Tugas</span>
                <h2 className="font-display text-xl font-bold text-slate-900 mt-1">
                  {selectedAssignment.judul}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200/60 rounded-lg text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
                  <span className="font-semibold text-slate-800 capitalize mt-0.5 block">
                    {selectedAssignment.status}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Nilai Maksimal</span>
                  <span className="font-semibold text-blue-700 font-mono mt-0.5 block">
                    {selectedAssignment.maxScore} Poin
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Batas Pengumpulan</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">
                    {formatDeadline(selectedAssignment.deadline)}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Deskripsi</span>
                <p className="text-xs text-slate-700 leading-relaxed mt-1 p-3 bg-white border border-slate-100 rounded-lg whitespace-pre-wrap">
                  {selectedAssignment.deskripsi}
                </p>
              </div>

              {selectedAssignment.instruksi && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Instruksi Pengerjaan</span>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1 p-3 bg-slate-50/50 border border-slate-100 rounded-lg whitespace-pre-wrap font-mono">
                    {selectedAssignment.instruksi}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Dibuat: {new Date(selectedAssignment.createdAt).toLocaleString('id-ID')}</span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/guru/tugas/${selectedAssignment._id}`}
                    className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Users size={14} />
                    <span>Lihat Pengumpulan</span>
                  </Link>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DELETE CONFIRMATION */}
      {/* ======================================================== */}
      {activeModal === 'DELETE' && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Konfirmasi Hapus Tugas
                </h3>
                <span className="text-xs text-slate-500">Tindakan ini permanen</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus tugas <strong className="text-slate-900">{selectedAssignment.judul}</strong>? Seluruh data yang terkait dengan tugas ini akan dihapus dari sistem.
            </p>

            {actionError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                {actionError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
              >
                {isSubmitting ? 'Menghapus...' : 'Ya, Hapus Tugas'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
