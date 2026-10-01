'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, 
  Search, 
  Bell, 
  ChevronDown, 
  CheckCircle2,
  LogOut,
  User as UserIcon,
  Shield
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/lib/auth/auth-context';

interface TopHeaderProps {
  onOpenMobileMenu?: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
  role?: 'guru' | 'siswa' | 'kepsek' | 'kurikulum' | 'admin';
  userProfile?: { name: string; idNumber?: string; roleSub?: string };
}

export default function TopHeader({ role = 'guru', userProfile }: TopHeaderProps) {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const adminPlaceholder = role === 'admin' 
    ? 'Cari kelas, siswa, guru, mapel...' 
    : 'Cari kelas, siswa, atau tugas...';

  const displayName = userProfile?.name || user?.profile?.nama || (role === 'admin' ? 'Administrator' : user?.username || 'Pengguna');
  const displayId = userProfile?.idNumber || (user?.profile?.nip ? `NIP: ${user.profile.nip}` : user?.profile?.nisn ? `NISN: ${user.profile.nisn}` : user?.username || '');
  const displayRoleSub = userProfile?.roleSub || user?.profile?.roleSub || (role === 'admin' ? 'Administrator' : role.toUpperCase());

  const userInitial = displayName
    ? displayName.split(' ').map((n: string) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-30 flex h-[60px] w-full items-center justify-between gap-2 sm:gap-4 border-b border-border bg-card px-3 sm:px-4 lg:px-6">
        {/* Sidebar Trigger (Mobile Sheet & Desktop Toggle) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <SidebarTrigger />
        </div>

        {/* Academic Context (Hidden on small mobile) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
            <Calendar className="size-3.5 text-primary" />
            <span>Tahun Ajaran 2026/2027 • Semester Ganjil</span>
          </div>
          <div className="hidden xl:flex items-center gap-1 rounded bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            <CheckCircle2 className="size-3 text-emerald-600" />
            <span>Kurikulum Merdeka</span>
          </div>
        </div>

        {/* Global Search */}
        <div className="flex-1 max-w-md min-w-0 ml-auto lg:ml-0">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
            <Input 
              type="text" 
              className="h-9 pl-9 pr-3 bg-muted/30 text-xs sm:text-sm truncate"
              placeholder={adminPlaceholder} 
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-5 shrink-0">
          <span className="hidden lg:inline-block text-xs font-medium text-muted-foreground">
            Sabtu, 26 Sep 2026
          </span>
          
          <div className="h-4 w-px bg-border hidden lg:block" />
          
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell className="size-4" />
                  <Badge className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full p-0 text-[10px] font-bold">
                    4
                  </Badge>
                </Button>
              }
            />
            <TooltipContent>
              Notifikasi
            </TooltipContent>
          </Tooltip>
          
          {/* User Profile Trigger & Dropdown Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer hover:bg-muted/60 p-1 -mr-1 rounded-md transition-colors focus:outline-none"
            >
              <Avatar size="sm">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="size-3.5 text-muted-foreground hidden sm:block" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card p-3 shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Avatar size="default">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-xs truncate text-foreground leading-tight">
                      {displayName}
                    </span>
                    {displayId && (
                      <span className="text-[11px] text-muted-foreground truncate mt-0.5">
                        {displayId}
                      </span>
                    )}
                    <span className="text-[10px] font-medium text-primary mt-0.5">
                      {displayRoleSub}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors text-left"
                  >
                    <LogOut size={15} />
                    <span>Keluar dari Akun (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}

