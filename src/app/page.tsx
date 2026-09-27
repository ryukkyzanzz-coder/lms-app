import Link from "next/link";
import { BookOpen, GraduationCap, Building2, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-display font-bold text-3xl mb-4">
          S
        </div>
        <h1 className="font-display text-2xl font-bold text-slate-900 text-center">
          LMS Akademik
        </h1>
        <p className="font-body text-sm text-slate-500 text-center mt-2 mb-8">
          SMK N 1 Surabaya
        </p>

        <div className="w-full flex flex-col gap-4">
          <Link 
            href="/siswa/dashboard"
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <GraduationCap size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-slate-900">Masuk sebagai Siswa</span>
              <span className="font-body text-xs text-slate-500">Akses modul, tugas, dan nilai</span>
            </div>
          </Link>

          <button 
            onClick={async () => {
              try {
                const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1') + '/auth/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ username: '198504122010011014', password: 'password123' })
                });
                const data = await res.json();
                if (res.ok) {
                  localStorage.setItem('token', data.data.token);
                  window.location.href = '/guru/dashboard';
                } else {
                  alert('Login failed: ' + data.message);
                }
              } catch (e) {
                alert('Network error');
              }
            }}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <BookOpen size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-slate-900">Masuk sebagai Guru</span>
              <span className="font-body text-xs text-slate-500">Kelola kelas, tugas, dan rekap nilai</span>
            </div>
          </button>

          <Link 
            href="/kepsek/dashboard"
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <BookOpen size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-slate-900">Masuk sebagai Kepala Sekolah</span>
              <span className="font-body text-xs text-slate-500">Pemantauan eksekutif & audit akademik</span>
            </div>
          </Link>
          <Link 
            href="/admin/dashboard"
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-blue-700 hover:bg-blue-50/70 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-900 text-white flex items-center justify-center group-hover:bg-blue-800 transition-colors">
              <Building2 size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-slate-900">Masuk sebagai Administrator</span>
              <span className="font-body text-xs text-slate-500">Kelola master data, kelas, guru, dan rombel</span>
            </div>
          </Link>

          <Link 
            href="/kurikulum/dashboard"
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-600 hover:bg-purple-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Layers size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-slate-900">Masuk sebagai Kurikulum</span>
              <span className="font-body text-xs text-slate-500">Struktur capaian pembelajaran & silabus</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
