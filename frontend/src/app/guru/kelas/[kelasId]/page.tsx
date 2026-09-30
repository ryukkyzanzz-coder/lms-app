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
      <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Link 
            href="/guru/kelas" 
            className="hover:text-blue-900 transition-colors flex items-center gap-1 font-medium"
          >
            <DoorOpen size={14} className="text-blue-700" />
            <span>Kelas Saya</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-800">
            {classDetail ? classDetail.nama : 'Detail Ruang Kelas'}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-blue-700 font-semibold">Rombel & Siswa</span>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {classDetail?.tahunAjaran && classDetail?.semester && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              TA {classDetail.tahunAjaran.nama} • {classDetail.semester.nama}
            </span>
          )}
          {classDetail?.tingkat && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100">
              <GraduationCap size={13} />
              Tingkat {classDetail.tingkat}
            </span>
          )}
        </div>
      </div>

      {/* Class Error State */}
      {errorClass && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-red-600 shrink-0" />
            <div className="text-sm text-red-800">
              <strong>Gagal mengakses detail kelas:</strong> {errorClass}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRefreshDetailTrigger((v) => v + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <RotateCcw size={14} />
              <span>Coba Lagi</span>
            </button>
            <Link
              href="/guru/kelas"
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              Kembali ke Kelas Saya
            </Link>
          </div>
        </div>
      )}

      {/* Class Loading State */}
      {isLoadingClass && !errorClass && (
        <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm flex flex-col gap-4 animate-pulse">
          <div className="h-6 w-48 bg-slate-200 rounded"></div>
          <div className="h-4 w-96 bg-slate-100 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      )}

      {/* Class Detail Content */}
      {!isLoadingClass && classDetail && (
        <>
          {/* 2. Class Identity Header */}
          <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <Link
                  href="/guru/kelas"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-900 transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Kembali ke Kelas Saya</span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  Kelas {classDetail.nama}
                </h1>
                <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider">
                  Rombel Aktif
                </span>
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-semibold">
                  Tingkat {classDetail.tingkat}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                  {classDetail.program}
                </span>
              </div>

              <p className="text-[13px] text-slate-500 flex items-center gap-2">
                <School size={16} className="text-slate-400 shrink-0" />
                <span>Rombongan Belajar Kompetensi Keahlian {classDetail.program} • Kurikulum SMK</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/guru/materi"
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors shadow-sm"
              >
                <BookOpen size={16} />
                <span>Buka Materi Kelas</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* 3. 4 Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Wali Kelas Card */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <UserCheck size={22} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Wali Kelas</span>
                <h4 className="font-display text-[15px] font-bold text-slate-900 truncate mt-0.5">
                  {classDetail.waliKelas?.nama || 'Belum Ditentukan'}
                </h4>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5">Pendidik Penanggung Jawab</span>
              </div>
            </div>

            {/* Jumlah Siswa Card */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                <Users size={22} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jumlah Siswa</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-display text-[20px] font-bold text-slate-900">
                    {classDetail.jumlahSiswa}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Siswa Terdaftar</span>
                </div>
                <span className="text-[11px] text-green-600 font-medium mt-0.5">Rombel Terverifikasi</span>
              </div>
            </div>

            {/* Mata Pelajaran Diampu Card */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                <BookOpen size={22} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mapel Diampu</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-display text-[20px] font-bold text-slate-900">
                    {classDetail.subjects?.length || 0}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Mata Pelajaran</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5">Alokasi Penugasan Mengajar</span>
              </div>
            </div>

            {/* Periode Akademik Card */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Calendar size={22} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Periode Akademik</span>
                <h4 className="font-display text-[15px] font-bold text-slate-900 truncate mt-0.5">
                  {classDetail.tahunAjaran?.nama || '-'}
                </h4>
                <span className="text-[11px] text-teal-700 font-medium mt-0.5">
                  Semester {classDetail.semester?.nama || '-'}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Active Subjects Ribbon */}
          {classDetail.subjects && classDetail.subjects.length > 0 && (
            <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BadgeCheck size={18} className="text-blue-700" />
                  <h3 className="font-display text-sm font-bold text-slate-800">
                    Mata Pelajaran yang Anda Ampu di Kelas Ini
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  {classDetail.subjects.length} Mapel aktif
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {classDetail.subjects.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-2 bg-blue-50/70 border border-blue-100 rounded-lg px-3.5 py-2"
                  >
                    <span className="bg-blue-900 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded">
                      {sub.kode}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">{sub.nama}</span>
                    <Link
                      href="/guru/materi"
                      className="ml-2 text-[11px] text-blue-700 hover:text-blue-900 font-medium underline flex items-center gap-0.5"
                    >
                      <span>Materi</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Student Roster Section */}
          <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
            {/* Header & Subtitle */}
            <div className="p-5 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Daftar Peserta Didik (Roster Siswa)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tercatat {pagination ? pagination.total : classDetail.jumlahSiswa} siswa aktif terdaftar pada rombongan belajar ini.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">
                  <ShieldCheck size={14} />
                  <span>Dapodik Sinkron</span>
                </span>
              </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari nama siswa atau NISN..."
                  className="w-full h-9 pl-9 pr-3 bg-white border border-slate-200/60 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                />
              </form>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium">Gender:</span>
                  <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value as 'all' | 'L' | 'P')}
                    className="h-9 px-2.5 bg-white border border-slate-200/60 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-900"
                  >
                    <option value="all">Semua ({students.length})</option>
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setSearchQuery('');
                    setGenderFilter('all');
                    setPage(1);
                    setRefreshStudentsTrigger((v) => v + 1);
                  }}
                  title="Reset Filter"
                  className="h-9 px-3 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Error Roster State */}
            {errorStudents && (
              <div className="p-6 bg-red-50 border-b border-red-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-red-700">
                  <AlertTriangle size={16} className="text-red-500 shrink-0" />
                  <span>Gagal memuat daftar siswa: {errorStudents}</span>
                </div>
                <button
                  onClick={() => setRefreshStudentsTrigger((v) => v + 1)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {/* Table Area */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4">Nama Lengkap Siswa</th>
                    <th className="py-3 px-4">NISN</th>
                    <th className="py-3 px-3 text-center">L/P</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {isLoadingStudents ? (
                    [1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="py-3.5 px-4 text-center">
                          <div className="w-4 h-4 bg-slate-200 rounded mx-auto"></div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
                            <div className="h-4 w-40 bg-slate-200 rounded"></div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="h-4 w-28 bg-slate-200 rounded font-mono"></div>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <div className="h-4 w-6 bg-slate-200 rounded mx-auto"></div>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="h-4 w-14 bg-slate-200 rounded"></div>
                        </td>
                      </tr>
                    ))
                  ) : displayedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Users size={36} className="text-slate-300" />
                          <p className="text-sm font-semibold text-slate-700">
                            Tidak Ada Siswa Ditemukan
                          </p>
                          <p className="text-xs text-slate-400 max-w-sm">
                            {searchQuery || genderFilter !== 'all'
                              ? 'Tidak ada siswa yang sesuai dengan filter pencarian.'
                              : 'Belum ada data siswa terdaftar dalam rombel ini.'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    displayedStudents.map((siswa, idx) => {
                      const rowNumber = pagination
                        ? (pagination.page - 1) * pagination.limit + idx + 1
                        : idx + 1;
                      return (
                        <tr
                          key={siswa.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-3.5 px-4 text-center font-mono text-slate-400 text-xs">
                            {rowNumber < 10 ? `0${rowNumber}` : rowNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[11px] shrink-0 border border-blue-200">
                                {getInitials(siswa.nama)}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-900 text-[13px]">
                                  {siswa.nama}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                            {siswa.nisn || '-'}
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                siswa.jenisKelamin === 'P'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                  : 'bg-blue-50 text-blue-700 border border-blue-100'
                              }`}
                            >
                              {siswa.jenisKelamin || '-'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              {siswa.status || 'Aktif'}
                            </span>
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
                  dari <strong className="text-slate-800">{pagination.total}</strong> siswa
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={pagination.page <= 1 || isLoadingStudents}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-sm"
                  >
                    <ChevronLeft size={14} />
                    <span>Sebelumnya</span>
                  </button>

                  <span className="px-2 font-medium text-slate-700">
                    Halaman {pagination.page} / {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={pagination.page >= pagination.totalPages || isLoadingStudents}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-sm"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
