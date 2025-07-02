import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'admin' | 'superadmin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  waterParkId?: string; // Only for admin users
  waterParkName?: string; // Only for admin users
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      userRole: null,
      login: async (email: string, password: string) => {
        // In a real app, this would be an API call
        // For demo purposes, we're hardcoding users
        if (email === 'admin1@example.com' && password === 'password') {
          const user = {
            id: '1',
            email: 'admin1@example.com',
            name: 'Admin Acuático Paradise',
            role: 'admin' as UserRole,
            waterParkId: '1',
            waterParkName: 'Acuático Paradise'
          };
          set({ user, isAuthenticated: true, userRole: user.role });
        } else if (email === 'admin2@example.com' && password === 'password') {
          const user = {
            id: '2',
            email: 'admin2@example.com',
            name: 'Admin Aqua Fun',
            role: 'admin' as UserRole,
            waterParkId: '2',
            waterParkName: 'Aqua Fun'
          };
          set({ user, isAuthenticated: true, userRole: user.role });
        } else if (email === 'superadmin@example.com' && password === 'password') {
          const user = {
            id: '3',
            email: 'superadmin@example.com',
            name: 'Super Admin',
            role: 'superadmin' as UserRole
          };
          set({ user, isAuthenticated: true, userRole: user.role });
        } else {
          throw new Error('Credenciales inválidas');
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, userRole: null });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);