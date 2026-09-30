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
  X,
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

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);


  const handleOpenDetailModal = (item: SubmissionRosterItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedItem(null);
    setIsDetailModalOpen(false);
  };

  const formatDateTime = (dateStr?: string | Date) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return String(dateStr);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header & Navigation */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link
            href="/guru/tugas"
            className="hover:text-blue-900 transition-colors flex items-center gap-1 font-semibold"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Penugasan</span>
          </Link>
          <span>/</span>
          <span className="text-slate-400">Rombel & Mapel</span>
          <span>/</span>
          <span className="text-blue-950 font-semibold truncate max-w-xs">
            {data?.assignment?.judul || 'Pengumpulan Tugas'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <span>Pengumpulan Tugas:</span>
              <span className="text-blue-950">
                {data?.assignment?.judul || 'Memuat Tugas...'}
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Pantau status penyerahan berkas siswa, ketepatan waktu deadline, dan verifikasi lampiran tugas.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setRefreshTrigger((v) => v + 1)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200/80 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <RotateCcw size={14} className={isLoading ? 'animate-spin' : ''} />
              <span>Muat Ulang</span>
            </button>
          </div>
        </div>

        {/* Assignment Metadata Banner */}
        {data?.assignment && (
          <div className="bg-slate-50/80 border border-slate-200/70 rounded-xl p-4 flex flex-wrap items-center gap-4 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <Layers size={15} className="text-blue-900" />
              <span>Kelas: {data.assignment.kelas?.nama}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <BookOpen size={15} className="text-blue-900" />
              <span>Mapel: {data.assignment.mapel?.nama}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Calendar size={15} className="text-slate-400" />
              <span>Batas Waktu: <strong>{formatDateTime(data.assignment.deadline)}</strong></span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Award size={15} className="text-blue-700" />
              <span>Nilai Maks: <strong>{data.assignment.maxScore} Poin</strong></span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                data.assignment.status === 'published'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {data.assignment.status === 'published' ? 'Dipublikasikan' : data.assignment.status}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Total Siswa */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-2xs flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Siswa
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <span className="font-display text-2xl font-bold text-slate-900">
            {stats ? stats.totalStudents : 0}
          </span>
          <span className="text-[11px] text-slate-400">Terdaftar di rombel</span>
        </div>

        {/* Sudah Mengumpulkan */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-2xs flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Sudah Kumpul
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <span className="font-display text-2xl font-bold text-emerald-700">
            {stats ? stats.submittedCount : 0}
          </span>
          <span className="text-[11px] text-slate-400">
            {stats && stats.totalStudents > 0
              ? `${Math.round((stats.submittedCount / stats.totalStudents) * 100)}% partisipasi`
              : '0% partisipasi'}
          </span>
        </div>

        {/* Belum Mengumpulkan */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-2xs flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Belum Kumpul
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <span className="font-display text-2xl font-bold text-amber-700">
            {stats ? stats.unsubmittedCount : 0}
          </span>
          <span className="text-[11px] text-slate-400">Menunggu submission</span>
        </div>

        {/* Terlambat */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-2xs flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Terlambat
            </span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <span className="font-display text-2xl font-bold text-rose-700">
            {stats ? stats.lateCount : 0}
          </span>
          <span className="text-[11px] text-slate-400">Melewati deadline</span>
        </div>

        {/* Sudah Dinilai */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-2xs flex flex-col gap-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Sudah Dinilai
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Award size={16} />
            </div>
          </div>
          <span className="font-display text-2xl font-bold text-indigo-700">
            {stats ? stats.gradedCount : 0}
          </span>
          <span className="text-[11px] text-slate-400">Telah diberi nilai</span>
        </div>
      </div>

      {/* 3. Filter & Search Controls */}
      <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama siswa atau NISN..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
          />
        </div>

        {/* Filter Badges / Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <Filter size={13} className="text-slate-400" />
            <span className="text-[11px] font-semibold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Roster</option>
              <option value="SUBMITTED">Sudah Kumpul</option>
              <option value="GRADED">Sudah Dinilai</option>
              <option value="RESUBMITTED">Kumpul Ulang</option>
              <option value="UNSUBMITTED">Belum Kumpul</option>
            </select>
          </div>

          {/* Late Filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <Clock size={13} className="text-slate-400" />
            <span className="text-[11px] font-semibold text-slate-500">Keterlambatan:</span>
            <select
              value={isLateFilter}
              onChange={(e) => {
                setIsLateFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Waktu</option>
              <option value="false">Tepat Waktu</option>
              <option value="true">Terlambat</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-red-600 shrink-0" />
            <div className="text-xs text-red-800">
              <strong>Gagal memuat data pengumpulan:</strong> {error}
            </div>
          </div>
          <button
            onClick={() => setRefreshTrigger((v) => v + 1)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* 5. Loading Skeleton */}
      {isLoading && !error && (
        <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-2xs flex flex-col gap-4 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-slate-100 rounded-lg"></div>
          ))}
        </div>
      )}

      {/* 6. Submissions Roster Table */}
      {!isLoading && !error && (
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-2xs overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Siswa</th>
                  <th className="py-3 px-4 text-center">Status Pengumpulan</th>
                  <th className="py-3 px-4">Waktu Penyerahan</th>
                  <th className="py-3 px-4 text-center">Berkas Lampiran</th>
                  <th className="py-3 px-4">Catatan Siswa</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {roster.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users size={36} className="text-slate-300" />
                        <p className="text-sm font-semibold text-slate-700">
                          Tidak Ada Data Siswa Ditemukan
                        </p>
                        <p className="text-xs text-slate-400 max-w-sm">
                          {searchQuery || statusFilter !== 'ALL' || isLateFilter !== 'ALL'
                            ? 'Tidak ada siswa yang sesuai dengan kriteria filter pencarian.'
                            : 'Belum ada siswa yang terdaftar di kelas tugas ini.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  roster.map((item, idx) => {
                    const rowNumber = data?.pagination
                      ? (data.pagination.page - 1) * data.pagination.limit + idx + 1
                      : idx + 1;
                    const sub = item.submission;

                    return (
                      <tr key={item.siswa._id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 text-center font-mono text-slate-400 text-xs">
                          {rowNumber < 10 ? `0${rowNumber}` : rowNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-900/10 text-blue-900 font-bold flex items-center justify-center text-xs shrink-0">
                              {item.siswa.nama.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-900 text-[13px]">
                                {item.siswa.nama}
                              </span>
                              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                <span>NISN: {item.siswa.nisn}</span>
                                <span>•</span>
                                <span className="uppercase">{item.siswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {item.hasSubmitted && sub ? (
                            <div className="inline-flex flex-col items-center gap-1">
                              {sub.status === 'SUBMITTED' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                  Sudah Mengumpulkan
                                </span>
                              ) : sub.status === 'GRADED' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                                  Sudah Dinilai
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                                  Kumpul Ulang
                                </span>
                              )}

                              {sub.isLate && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                                  <Clock size={10} />
                                  Terlambat
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 text-[11px] font-medium">
                              Belum Mengumpulkan
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-600">
                          {item.hasSubmitted && sub ? (
                            <span className="font-mono text-[11px]">
                              {formatDateTime(sub.submittedAt)}
                            </span>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {item.hasSubmitted && sub && sub.files && sub.files.length > 0 ? (
                            <button
                              onClick={() => handleOpenDetailModal(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80 text-[11px] font-semibold transition-colors cursor-pointer"
                            >
                              <FileText size={12} />
                              <span>{sub.files.length} Berkas</span>
                            </button>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate">
                          {item.hasSubmitted && sub && sub.catatanSiswa ? (
                            <span className="text-slate-600 italic text-[11px]">
                              &ldquo;{sub.catatanSiswa}&rdquo;
                            </span>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {item.hasSubmitted && sub ? (
                            <button
                              onClick={() => handleOpenDetailModal(item)}
                              className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                            >
                              <FileText size={13} />
                              <span>Periksa Berkas</span>
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Menunggu</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="p-4 border-t border-slate-200/60 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
              <span>
                Menampilkan {roster.length} dari {data.pagination.total} siswa
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={data.pagination.page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded border border-slate-200 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-2 font-semibold text-slate-700">
                  Halaman {data.pagination.page} dari {data.pagination.totalPages}
                </span>
                <button
                  disabled={data.pagination.page >= data.pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-1.5 rounded border border-slate-200 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. Modal: Inspection & Submission Detail */}
      {isDetailModalOpen && selectedItem && selectedItem.submission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Detail Pengumpulan Siswa
                </h3>
                <span className="text-xs text-slate-400">
                  Verifikasi lampiran berkas dan data submisi tugas
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseDetailModal}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Student & Status Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Nama Siswa
                </span>
                <span className="font-semibold text-slate-900 text-sm mt-0.5 block">
                  {selectedItem.siswa.nama}
                </span>
                <span className="text-slate-500 text-[11px]">
                  NISN: {selectedItem.siswa.nisn}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Status Pengumpulan
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {selectedItem.submission.status}
                  </span>
                  {selectedItem.submission.isLate ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      Terlambat
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      Tepat Waktu
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Waktu Diserahkan
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block font-mono">
                  {formatDateTime(selectedItem.submission.submittedAt)}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Batas Waktu (Deadline)
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block font-mono">
                  {formatDateTime(data?.assignment?.deadline)}
                </span>
              </div>
            </div>

            {/* Student Notes */}
            {selectedItem.submission.catatanSiswa && (
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Catatan dari Siswa
                </span>
                <p className="text-xs text-slate-700 leading-relaxed mt-1 p-3 bg-white border border-slate-200/80 rounded-lg italic">
                  &ldquo;{selectedItem.submission.catatanSiswa}&rdquo;
                </p>
              </div>
            )}

            {/* Files List */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Lampiran Berkas ({selectedItem.submission.files.length})
              </span>
              <div className="flex flex-col gap-2">
                {selectedItem.submission.files.map((file, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between text-xs hover:bg-slate-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-900/10 text-blue-900 flex items-center justify-center shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 text-xs">
                          {file.name}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <span>{file.mimeType}</span>
                          <span>•</span>
                          <span>{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-900 hover:text-blue-900 text-slate-700 rounded-md font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>Buka File</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>ID Submisi: {selectedItem.submission._id}</span>
              <button
                type="button"
                onClick={handleCloseDetailModal}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
