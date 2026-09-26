'use client';

import React from 'react';
import { ClipboardCheck } from 'lucide-react';

export default function TugasPage() {
  return (
    <div className="w-full h-[calc(100vh-60px)] flex flex-col items-center justify-center p-6">
      <ClipboardCheck size={48} className="text-slate-300 mb-4" />
      <h1 className="font-display text-2xl font-bold text-slate-900">Halaman Tugas</h1>
      <p className="text-slate-500 mt-2">Fitur ini sedang dalam tahap pengembangan.</p>
    </div>
  );
}
