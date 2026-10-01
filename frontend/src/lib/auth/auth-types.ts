export type UserRole =
  | 'GURU'
  | 'SISWA'
  | 'ADMIN'
  | 'KEPALA_SEKOLAH'
  | 'KURIKULUM';

export interface UserProfile {
  id?: string;
  _id?: string;
  nip?: string;
  nisn?: string;
  nama: string;
  email?: string;
  nomorTelepon?: string;
  status?: string;
  roleSub?: string;
  jenisKelamin?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  profile?: UserProfile | null;
}

export interface AuthContextValue {
  user: AuthUser | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

export const ROLE_ROUTES: Record<UserRole, string> = {
  GURU: '/guru/dashboard',
  SISWA: '/siswa/dashboard',
  ADMIN: '/admin/dashboard',
  KEPALA_SEKOLAH: '/kepsek/dashboard',
  KURIKULUM: '/kurikulum/dashboard',
};
