'use client';

import React from 'react';
import { 
  Calendar, 
  Search, 
  Bell, 
  ChevronDown, 
  CheckCircle2 
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

interface TopHeaderProps {
  onOpenMobileMenu?: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
  role?: 'guru' | 'siswa' | 'kepsek' | 'kurikulum' | 'admin';
  userProfile?: { name: string; idNumber?: string; roleSub?: string };
}

export default function TopHeader({ role = 'guru', userProfile }: TopHeaderProps) {
  const adminPlaceholder = role === 'admin' 
    ? 'Cari kelas, siswa, guru, mapel...' 
    : 'Cari kelas, siswa, atau tugas...';

  const userInitial = userProfile?.name
    ? userProfile.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : role === 'admin'
    ? 'BS'
    : role === 'guru'
    ? 'D'
    : role === 'siswa'
    ? 'RA'
    : role === 'kepsek'
    ? 'W'
    : 'AH';

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
          
          <div className="flex items-center gap-2 cursor-pointer hover:bg-muted/60 p-1 -mr-1 rounded-md transition-colors">
            <Avatar size="sm">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="size-3.5 text-muted-foreground hidden sm:block" />
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
