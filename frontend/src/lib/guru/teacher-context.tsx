'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { TeacherProfile, TeacherClass, TeacherSubject } from '@/types/guru';

export interface TeacherContextValue {
  // Auth state & Teacher Identity
  teacher: TeacherProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  refetchTeacher: () => Promise<void>;

  // Classes & Subjects Context
  availableClasses: TeacherClass[];
  availableSubjects: TeacherSubject[];
  selectedKelasId: string | null;
  selectedMapelId: string | null;
  setSelectedKelasId: (id: string | null) => void;
  setSelectedMapelId: (id: string | null) => void;
  isLoadingClasses: boolean;
  isLoadingSubjects: boolean;
  errorClasses: string | null;
  errorSubjects: string | null;
  refetchClasses: () => Promise<void>;
  refetchSubjects: () => Promise<void>;

  // Auth Action
  logout: () => void;
}

const TeacherContext = createContext<TeacherContextValue | undefined>(undefined);

export function TeacherProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Auth & Profile State
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Classes & Subjects State
  const [availableClasses, setAvailableClasses] = useState<TeacherClass[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<TeacherSubject[]>([]);
  const [selectedKelasId, setSelectedKelasId] = useState<string | null>(null);
  const [selectedMapelId, setSelectedMapelId] = useState<string | null>(null);
  const [isLoadingClasses, setIsLoadingClasses] = useState<boolean>(true);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState<boolean>(true);
  const [errorClasses, setErrorClasses] = useState<string | null>(null);
  const [errorSubjects, setErrorSubjects] = useState<string | null>(null);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setIsAuthenticated(false);
    setTeacher(null);
    router.replace('/login');
  }, [router]);

  const refetchTeacher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchAPI('/teachers/me');
      if (res?.success && res?.data) {
        setTeacher(res.data);
        setIsAuthenticated(true);
      } else {
        throw new Error(res?.message || 'Data pengajar tidak ditemukan');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memverifikasi identitas guru';
      setError(message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetchClasses = useCallback(async () => {
    setIsLoadingClasses(true);
    setErrorClasses(null);
    try {
      const res = await fetchAPI('/teachers/me/classes');
      if (res?.success && Array.isArray(res?.data)) {
        setAvailableClasses(res.data);
        setSelectedKelasId((prev) => (prev ? prev : res.data.length > 0 ? res.data[0]._id : null));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memuat daftar kelas';
      setErrorClasses(message);
    } finally {
      setIsLoadingClasses(false);
    }
  }, []);

  const refetchSubjects = useCallback(async () => {
    setIsLoadingSubjects(true);
    setErrorSubjects(null);
    try {
      const res = await fetchAPI('/teachers/me/subjects');
      if (res?.success && Array.isArray(res?.data)) {
        setAvailableSubjects(res.data);
        setSelectedMapelId((prev) => (prev ? prev : res.data.length > 0 ? res.data[0]._id : null));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memuat daftar mata pelajaran';
      setErrorSubjects(message);
    } finally {
      setIsLoadingSubjects(false);
    }
  }, []);

  // Initial Auth Check & Data Load
  useEffect(() => {
    let isMounted = true;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }

    fetchAPI('/teachers/me')
      .then((res) => {
        if (isMounted && res?.success && res?.data) {
          setTeacher(res.data);
          setIsAuthenticated(true);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Gagal memverifikasi identitas guru';
          setError(message);
          setIsAuthenticated(false);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    fetchAPI('/teachers/me/classes')
      .then((res) => {
        if (isMounted && res?.success && Array.isArray(res?.data)) {
          setAvailableClasses(res.data);
          setErrorClasses(null);
          setSelectedKelasId((prev) => (prev ? prev : res.data.length > 0 ? res.data[0]._id : null));
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Gagal memuat daftar kelas';
          setErrorClasses(message);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingClasses(false);
      });

    fetchAPI('/teachers/me/subjects')
      .then((res) => {
        if (isMounted && res?.success && Array.isArray(res?.data)) {
          setAvailableSubjects(res.data);
          setErrorSubjects(null);
          setSelectedMapelId((prev) => (prev ? prev : res.data.length > 0 ? res.data[0]._id : null));
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Gagal memuat daftar mata pelajaran';
          setErrorSubjects(message);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingSubjects(false);
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  // Loading screen during initial auth verification to prevent flashing protected UI
  if (isLoading && !teacher) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-3 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Memverifikasi Sesi Akademik Guru...
          </p>
        </div>
      </div>
    );
  }

  // If token was missing or invalid, do not render children
  if (!isAuthenticated && !isLoading) {
    return null;
  }

  return (
    <TeacherContext.Provider
      value={{
        teacher,
        isAuthenticated,
        isLoading,
        error,
        refetchTeacher,
        availableClasses,
        availableSubjects,
        selectedKelasId,
        selectedMapelId,
        setSelectedKelasId,
        setSelectedMapelId,
        isLoadingClasses,
        isLoadingSubjects,
        errorClasses,
        errorSubjects,
        refetchClasses,
        refetchSubjects,
        logout,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeacher() {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  return context;
}
