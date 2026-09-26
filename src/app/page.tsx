import Link from "next/link";
import { BookOpen, GraduationCap } from "lucide-react";

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

          <Link 
            href="/guru/dashboard"
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <BookOpen size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-slate-900">Masuk sebagai Guru</span>
              <span className="font-body text-xs text-slate-500">Kelola kelas, tugas, dan rekap nilai</span>
            </div>
          </Link>

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
        </div>
      </div>
    </div>
  );
}
