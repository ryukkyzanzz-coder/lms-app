'use client';

import React from 'react';
import { 
  Calendar, 
  Search, 
  Bell, 
  ChevronDown, 
  CheckCircle2,
  Menu
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from './Sidebar';

interface TopHeaderProps {
  onOpenMobileMenu?: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
  role?: 'guru' | 'siswa' | 'kepsek' | 'kurikulum' | 'admin';
}

export default function TopHeader({ mobileMenuOpen, setMobileMenuOpen, role = 'guru' }: TopHeaderProps) {
  const adminPlaceholder = role === 'admin' 
    ? 'Cari kelas, siswa, guru, mapel...' 
    : 'Cari kelas, siswa, atau tugas...';

  const avatarName = role === 'admin'
    ? 'Bambang+Sudarmono'
    : role === 'guru' 
    ? 'Hendra+Setiawan' 
    : role === 'siswa' 
    ? 'Rakha+Arkana' 
    : role === 'kepsek' 
    ? 'Wardoyo' 
    : 'Ahmad+Hidayat';

  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-[60px] bg-white border-b border-slate-200/60 z-40 px-4 lg:px-6 flex items-center justify-between gap-4">
      
      {/* Mobile Menu Trigger & Context */}
      <div className="flex items-center gap-3 shrink-0 lg:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger className="p-1.5 -ml-1.5 rounded-md hover:bg-slate-100 text-slate-600 flex items-center justify-center">
            <Menu size={20} />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[260px]">
            <Sidebar onNavigate={() => setMobileMenuOpen?.(false)} role={role} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Academic Context (Hidden on small mobile) */}
      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100/50 px-3 py-1 rounded text-slate-700 font-medium text-xs">
          <Calendar size={14} className="text-blue-700" />
          <span>Tahun Ajaran 2026/2027 • Semester Ganjil</span>
        </div>
        <div className="hidden xl:flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-600 text-[11px] font-medium">
          <CheckCircle2 size={12} className="text-green-600" />
          <span>Kurikulum Merdeka</span>
        </div>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-md ml-auto lg:ml-0">
        <div className="relative flex items-center w-full">
          <Search size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
          <input 
            type="text" 
            className="w-full h-9 pl-9 pr-3 bg-slate-50 border border-slate-200/60 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:bg-white transition-colors"
            placeholder={adminPlaceholder} 
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 lg:gap-6 shrink-0">
        <span className="hidden lg:inline-block text-xs font-medium text-slate-500">
          Sabtu, 26 Sep 2026
        </span>
        
        <div className="h-4 w-px bg-slate-200 hidden lg:block"></div>
        
        <button className="relative p-1.5 rounded hover:bg-slate-100 text-slate-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
            4
          </span>
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 -mr-1 rounded-md transition-colors">
          <img 
            src={`https://ui-avatars.com/api/?name=${avatarName}&background=d5e3fd&color=1e3a8a`} 
            alt="Profile" 
            className="w-7 h-7 rounded-full object-cover border border-slate-200"
          />
          <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
