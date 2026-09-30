'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Lock, User, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (loginUsername?: string, loginPassword?: string) => {
    const userToLogin = loginUsername || username;
    const passToLogin = loginPassword || password;

    if (!userToLogin || !passToLogin) {
      setError('Harap masukkan Username/NIP dan Kata Sandi');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userToLogin, password: passToLogin }),
      });

      const data = await res.json();

      if (res.ok && data.data?.accessToken) {
        localStorage.setItem('token', data.data.accessToken);

        // Redirect based on user role
        const role = data.data.user?.role;
        if (role === 'GURU') {
          router.push('/guru/dashboard');
        } else if (role === 'SISWA') {
          router.push('/siswa/dashboard');
        } else if (role === 'ADMIN') {
          router.push('/admin/dashboard');
        } else if (role === 'KEPSEK') {
          router.push('/kepsek/dashboard');
        } else if (role === 'KURIKULUM') {
          router.push('/kurikulum/dashboard');
        } else {
          router.push('/');
        }
      } else {
        setError(data.message || (data.error && data.error.message) || 'Kredensial tidak valid. Silakan coba lagi.');
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      setError('Gagal terhubung ke server. Pastikan backend aktif.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoGuruLogin = () => {
    setUsername('198504122010011014');
    setPassword('password123');
    handleLogin('198504122010011014', 'password123');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 flex flex-col">
        {/* Top Branding */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-display font-bold text-2xl mb-3 shadow-md">
            S
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900 text-center tracking-tight">
            Portal Masuk Akademik
          </h1>
          <p className="font-body text-xs text-slate-500 text-center mt-1">
            SMK N 1 Surabaya • Tahun Ajaran 2026/2027
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-xs font-medium">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* Login Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-semibold text-slate-700 uppercase tracking-wider">
              NIP / Username
            </label>
            <div className="relative flex items-center">
              <User size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan NIP atau username..."
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200/80 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:bg-white transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Kata Sandi
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200/80 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:bg-white transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 h-10 bg-blue-900 hover:bg-blue-800 disabled:bg-blue-300 text-white rounded-lg font-body text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <span>Masuk Sekarang</span>
            )}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="mt-6 pt-6 border-t border-slate-200/60 flex flex-col gap-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            Akses Demo Pengajar
          </span>
          <button
            type="button"
            onClick={handleDemoGuruLogin}
            disabled={loading}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors shrink-0">
                <BookOpen size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-body text-xs font-bold text-slate-900">
                  Login Guru Demo (Budi Pratama)
                </span>
                <span className="font-body text-[11px] text-slate-500">
                  NIP: 198504122010011014
                </span>
              </div>
            </div>
            <span className="font-body text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded">
              Cepat
            </span>
          </button>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Halaman Utama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
