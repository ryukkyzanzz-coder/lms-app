'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api';
import { AuthUser, AuthContextValue, UserRole } from './auth-types';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setToken(null);
    setUser(null);
    setError(null);
    router.replace('/login');
  }, [router]);

  const refetchUser = useCallback(async () => {
    const currentToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!currentToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data?.user) {
          setUser(data.data.user);
          setToken(currentToken);
        } else {
          logout();
        }
      } else {
        // Token invalid or expired
        logout();
      }
    } catch (err) {
      console.error('Failed to verify session:', err);
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.data?.accessToken) {
        const accessToken = data.data.accessToken;
        const loggedInUser: AuthUser = data.data.user;

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', accessToken);
        }

        setToken(accessToken);
        setUser(loggedInUser);
        setIsLoading(false);

        return { success: true, role: loggedInUser.role };
      } else {
        const message = data.message || (data.error && data.error.message) || 'Kredensial tidak valid';
        setError(message);
        setIsLoading(false);
        return { success: false, error: message };
      }
    } catch (err) {
      const message = 'Gagal terhubung ke server. Pastikan backend aktif.';
      setError(message);
      setIsLoading(false);
      return { success: false, error: message };
    }
  };

  const role = user?.role || null;
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
