'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  DoorOpen, 
  BookOpen, 
  ClipboardCheck, 
  Star, 
  TrendingUp, 
  Megaphone,
  HelpCircle,
  Settings,
  LayoutDashboard,
  BarChart3,
  CalendarCheck,
  AlertCircle,
  Layers,
  Book,
  Target,
  Calendar,
  CheckSquare,
  Building2,
  Users,
  GraduationCap,
  Award,
  ArrowRightLeft,
  FolderTree,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

type NavItem = {
  type?: 'group';
  name: string;
  path?: string;
  icon?: LucideIcon;
  badge?: string;
};

const adminNavItems: NavItem[] = [
  { name: 'Beranda Admin', path: '/admin/dashboard', icon: LayoutDashboard },
  { type: 'group', name: 'Data Akademik' },
  { name: 'Siswa', path: '/admin/siswa', icon: Users },
  { name: 'Guru', path: '/admin/guru', icon: Award },
  { name: 'Kelas', path: '/admin/kelas', icon: DoorOpen },
  { name: 'Mata Pelajaran', path: '/admin/mapel', icon: BookOpen },
  { name: 'Pengampu Mata Pelajaran', path: '/admin/pengampu-mapel', icon: ClipboardCheck },
  { name: 'Penempatan Siswa', path: '/admin/penempatan-siswa', icon: ArrowRightLeft },
  { type: 'group', name: 'Pembelajaran' },
  { name: 'Jadwal Pelajaran', path: '/admin/jadwal-pelajaran', icon: CalendarCheck },
  { name: 'Struktur Kurikulum', path: '/admin/struktur-kurikulum', icon: FolderTree },
  { type: 'group', name: 'Monitoring' },
  { name: 'Status Akademik', path: '/admin/status-akademik', icon: CheckCircle2, badge: '100% Valid' },
];

const guruNavItems: NavItem[] = [
  { name: 'Beranda', path: '/guru/dashboard', icon: Home },
  { type: 'group', name: 'Akademik' },
  { name: 'Kelas Saya', path: '/guru/kelas', icon: DoorOpen },
  { name: 'Materi', path: '/guru/materi', icon: BookOpen },
  { name: 'Tugas', path: '/guru/tugas', icon: ClipboardCheck },
  { name: 'Penilaian', path: '/guru/penilaian', icon: Star },
  { type: 'group', name: 'Siswa' },
  { name: 'Progres Siswa', path: '/guru/progres-siswa', icon: TrendingUp },
  { type: 'group', name: 'Komunikasi' },
  { name: 'Pengumuman', path: '/guru/pengumuman', icon: Megaphone },
];

const siswaNavItems: NavItem[] = [
  { name: 'Beranda', path: '/siswa/dashboard', icon: Home },
  { type: 'group', name: 'Akademik' },
  { name: 'Kelas Saya', path: '/siswa/kelas', icon: DoorOpen },
  { name: 'Tugas', path: '/siswa/tugas', icon: ClipboardCheck },
  { name: 'Nilai Akademik', path: '/siswa/nilai', icon: Star },
];

const kepsekNavItems: NavItem[] = [
  { name: 'Beranda Eksekutif', path: '/kepsek/dashboard', icon: LayoutDashboard },
  { type: 'group', name: 'Monitoring Akademik' },
  { name: 'Kondisi Akademik', path: '/kepsek/kondisi-akademik', icon: BarChart3 },
  { name: 'Aktivitas Pembelajaran', path: '/kepsek/aktivitas-pembelajaran', icon: CalendarCheck },
  { name: 'Perlu Perhatian', path: '/kepsek/perlu-perhatian', icon: AlertCircle, badge: '4 Isu' },
];

const kurikulumNavItems: NavItem[] = [
  { name: 'Beranda', path: '/kurikulum/dashboard', icon: Home },
  { type: 'group', name: 'Kurikulum' },
  { name: 'Struktur Kurikulum', path: '/kurikulum/struktur', icon: Layers },
  { name: 'Mata Pelajaran', path: '/kurikulum/struktur', icon: Book },
  { name: 'Capaian Pembelajaran', path: '/kurikulum/capaian-pembelajaran', icon: Target },
  { type: 'group', name: 'Pelaksanaan' },
  { name: 'Monitoring Materi', path: '/kurikulum/monitoring-materi', icon: CheckSquare },
  { name: 'Monitoring Pembelajaran', path: '/kurikulum/monitoring-pembelajaran', icon: BarChart3 },
  { type: 'group', name: 'Informasi' },
  { name: 'Tahun Ajaran', path: '/kurikulum/tahun-ajaran', icon: Calendar },
  { name: 'Semester', path: '/kurikulum/tahun-ajaran', icon: Calendar },
];

export default function Sidebar({ onNavigate, role = 'guru' }: { onNavigate?: () => void, role?: 'guru' | 'siswa' | 'kepsek' | 'kurikulum' | 'admin' }) {
  const pathname = usePathname();
  const navItems = role === 'admin' 
    ? adminNavItems 
    : role === 'guru' 
    ? guruNavItems 
    : role === 'siswa' 
    ? siswaNavItems 
    : role === 'kepsek' 
    ? kepsekNavItems 
    : kurikulumNavItems;

  const roleLabel = role === 'admin' 
    ? 'Administrator' 
    : role === 'guru' 
    ? 'Guru' 
    : role === 'siswa' 
    ? 'Siswa' 
    : role === 'kepsek' 
    ? 'Kepala Sekolah' 
    : 'Kurikulum';

  return (
    <aside className="h-full w-full bg-white border-r border-slate-200/60 flex flex-col justify-between select-none">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Brand Header */}
        <div className="h-[60px] px-6 flex items-center gap-3 border-b border-slate-200/60 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-display font-semibold text-sm">
            S
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-display text-sm font-semibold text-slate-900 truncate leading-none">
              SMK N 1 Surabaya
            </span>
            <span className="font-body text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              LMS Akademik
            </span>
          </div>
        </div>

        {/* Role Context */}
        <div className="px-6 py-3 border-b border-slate-200/40 bg-blue-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="font-body text-[11px] font-medium text-slate-500">Peran:</span>
            <span className="font-body text-[11px] font-semibold text-slate-900 bg-blue-100 px-1.5 py-0.5 rounded">
              {roleLabel}
            </span>
          </div>
          <span className="font-body text-[11px] text-slate-400">v2.6</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-3 gap-0.5 overflow-y-auto">
          {navItems.map((item, index) => {
            if (item.type === 'group') {
              return (
                <div key={`group-${index}`} className="px-3 pt-3 pb-1 font-body text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {item.name}
                </div>
              );
            }

            const Icon = item.icon as React.ElementType;
            const targetPath = item.path?.split('#')[0].split('?')[0] as string;
            const isActive = pathname === targetPath || (pathname?.startsWith(targetPath) && targetPath !== '/admin');
            
            return (
              <Link 
                key={`${item.name}-${index}`} 
                href={item.path as string}
                onClick={onNavigate}
                className={`flex items-center justify-between px-3 py-2 rounded-lg font-body text-[13px] font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-900 text-white' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={item.badge && !isActive ? "text-red-500" : ""} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`font-body text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : item.badge.includes('Valid') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col border-t border-slate-200/60 p-3 gap-1 bg-white shrink-0">
        <nav className="flex flex-col gap-0.5">
          <Link href="#" className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors font-body text-xs font-medium">
            <HelpCircle size={16} />
            <span>Bantuan</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors font-body text-xs font-medium">
            <Settings size={16} />
            <span>Pengaturan</span>
          </Link>
        </nav>

        {role === 'admin' ? (
          <div className="mt-1 p-2 rounded-lg bg-slate-50/80 border border-slate-200/60 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center font-display text-sm font-semibold shrink-0">
              BS
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-body text-xs font-semibold text-slate-900 truncate">Bambang Sudarmono, S.AP.</span>
              <span className="font-body text-[10px] text-slate-500 truncate">NIP: 19780514 200501 1 003</span>
              <span className="font-body text-[10px] font-medium text-blue-700 truncate">Kepala Tata Usaha</span>
            </div>
          </div>
        ) : role === 'guru' ? (
          <div className="mt-1 p-2 rounded-lg bg-slate-50/80 border border-slate-200/60 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-slate-700 flex items-center justify-center font-display text-sm font-semibold shrink-0">
              HS
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-body text-xs font-semibold text-slate-900 truncate">Drs. Hendra Setiawan</span>
              <span className="font-body text-[10px] text-slate-500 truncate">19850412 201001 1 018</span>
              <span className="font-body text-[10px] font-medium text-blue-700 truncate">Guru Produktif RPL</span>
            </div>
          </div>
        ) : role === 'siswa' ? (
          <div className="mt-1 p-2 rounded-lg bg-slate-50/80 border border-slate-200/60 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-slate-700 flex items-center justify-center font-display text-sm font-semibold shrink-0">
              RA
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-body text-xs font-semibold text-slate-900 truncate">Rakha Arkana</span>
              <span className="font-body text-[10px] text-slate-500 truncate">NISN: 0061234567</span>
              <span className="font-body text-[10px] font-medium text-blue-700 truncate">XII RPL 1</span>
            </div>
          </div>
        ) : role === 'kepsek' ? (
          <div className="mt-1 p-2 rounded-lg bg-slate-50/80 border border-slate-200/60 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-slate-700 flex items-center justify-center font-display text-sm font-semibold shrink-0">
              W
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-body text-xs font-semibold text-slate-900 truncate">Drs. H. Wardoyo, M.Pd.</span>
              <span className="font-body text-[10px] text-slate-500 truncate">19680315 199303 1 004</span>
              <span className="font-body text-[10px] font-medium text-blue-700 truncate">Kepala Sekolah</span>
            </div>
          </div>
        ) : (
          <div className="mt-1 p-2 rounded-lg bg-slate-50/80 border border-slate-200/60 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-slate-700 flex items-center justify-center font-display text-sm font-semibold shrink-0">
              AH
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-body text-xs font-semibold text-slate-900 truncate">Ahmad Hidayat, M.Kom</span>
              <span className="font-body text-[10px] text-slate-500 truncate">NIP: 19750820 200012 1 002</span>
              <span className="font-body text-[10px] font-medium text-blue-700 truncate">Waka Kurikulum</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
