'use client';

import React from 'react';
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
  Users, 
  Award, 
  ArrowRightLeft, 
  FolderTree, 
  CheckCircle2, 
  LucideIcon 
} from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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
  { type: 'group', name: 'Pembelajaran' },
  { name: 'Kelas Saya', path: '/siswa/kelas', icon: DoorOpen },
  { name: 'Materi', path: '/siswa/materi', icon: BookOpen },
  { name: 'Tugas', path: '/siswa/tugas', icon: ClipboardCheck },
  { type: 'group', name: 'Hasil Belajar' },
  { name: 'Nilai Akademik', path: '/siswa/nilai', icon: Star },
  { type: 'group', name: 'Informasi' },
  { name: 'Pengumuman', path: '/siswa/pengumuman', icon: Megaphone },
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

export default function Sidebar({ 
  onNavigate, 
  role = 'guru',
  userProfile,
}: { 
  onNavigate?: () => void; 
  role?: 'guru' | 'siswa' | 'kepsek' | 'kurikulum' | 'admin';
  userProfile?: { name: string; idNumber?: string; roleSub?: string };
}) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleNavClick = () => {
    if (onNavigate) onNavigate();
    if (isMobile) setOpenMobile(false);
  };

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

  // Group items into sections
  const groupedSections: { title?: string; items: NavItem[] }[] = [];
  let currentSection: { title?: string; items: NavItem[] } = { items: [] };

  for (const item of navItems) {
    if (item.type === 'group') {
      if (currentSection.items.length > 0) {
        groupedSections.push(currentSection);
      }
      currentSection = { title: item.name, items: [] };
    } else {
      currentSection.items.push(item);
    }
  }
  if (currentSection.items.length > 0) {
    groupedSections.push(currentSection);
  }

  return (
    <ShadcnSidebar className="border-r border-border bg-sidebar text-sidebar-foreground">
      {/* Header / Brand */}
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
            S
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-semibold text-sm truncate leading-tight text-foreground">
              SMK CITRA NEGARA
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
              LMS Akademik
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-md bg-muted/60 px-2.5 py-1.5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-muted-foreground">Peran:</span>
            <span className="font-semibold text-foreground">{roleLabel}</span>
          </div>
          <Badge variant="outline" className="text-[10px] h-4 px-1 py-0">v2.6</Badge>
        </div>
      </SidebarHeader>

      {/* Nav Content */}
      <SidebarContent className="px-2 py-3">
        {groupedSections.map((section, sIdx) => (
          <SidebarGroup key={section.title || `section-${sIdx}`} className="p-0 mb-3">
            {section.title && (
              <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon as LucideIcon;
                  const targetPath = item.path?.split('#')[0].split('?')[0] as string;
                  const isActive = pathname === targetPath || (pathname?.startsWith(targetPath) && targetPath !== '/admin');

                  return (
                    <SidebarMenuItem key={`${item.name}-${iIdx}`}>
                      <SidebarMenuButton 
                        render={<Link href={item.path as string} onClick={handleNavClick} />}
                        isActive={isActive}
                        className={isActive ? 'bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:text-primary-foreground' : ''}
                      >
                        {Icon && <Icon className="size-4 shrink-0" />}
                        <span className="truncate">{item.name}</span>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge className={
                          isActive 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : item.badge.includes('Valid') 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-rose-100 text-rose-700'
                        }>
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer / Profile */}
      <SidebarFooter className="border-t border-border p-3 gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="#" />} size="sm">
              <HelpCircle className="size-4" />
              <span>Bantuan</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="#" />} size="sm">
              <Settings className="size-4" />
              <span>Pengaturan</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* User Card */}
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-2 text-card-foreground">
          <Avatar size="default">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
              {role === 'admin' ? 'BS' : role === 'guru' ? (userProfile?.name ? userProfile.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'D') : role === 'siswa' ? 'RA' : role === 'kepsek' ? 'W' : 'AH'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1 leading-tight">
            <span className="text-xs font-semibold truncate text-foreground">
              {role === 'admin'
                ? 'Bambang Sudarmono, S.AP.'
                : role === 'guru'
                ? userProfile?.name || 'Dafiand'
                : role === 'siswa'
                ? 'Rakha Arkana'
                : role === 'kepsek'
                ? 'Drs. H. Wardoyo, M.Pd.'
                : 'Ahmad Hidayat, M.Kom'}
            </span>
            <span className="text-[10px] text-muted-foreground truncate mt-0.5">
              {role === 'admin'
                ? 'NIP: 19780514 200501 1 003'
                : role === 'guru'
                ? userProfile?.idNumber || 'NIP. —'
                : role === 'siswa'
                ? 'NISN: 0061234567'
                : role === 'kepsek'
                ? '19680315 199303 1 004'
                : 'NIP: 19750820 200012 1 002'}
            </span>
            <span className="text-[10px] font-medium text-primary truncate">
              {role === 'admin'
                ? 'Kepala Tata Usaha'
                : role === 'guru'
                ? userProfile?.roleSub || 'Guru Pengampu'
                : role === 'siswa'
                ? 'XII RPL 1'
                : role === 'kepsek'
                ? 'Kepala Sekolah'
                : 'Waka Kurikulum'}
            </span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </ShadcnSidebar>
  );
}
