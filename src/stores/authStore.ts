import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiServices } from '../api';

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
        try {
          // Intenta primero con la API real
          const response = await apiServices.auth.login({ email, password });
          
          if (response.success) {
            const user = {
              id: '1', // ID genérico ya que la API no devuelve ID
              email: email,
              name: response.data.name,
              role: 'superadmin' as UserRole, // Asumimos superadmin para la API real
            };
            set({ user, isAuthenticated: true, userRole: user.role });
            return;
          }
        } catch (error) {
          console.log('Error con API real, usando usuarios demo:', error);
          
          // Si falla la API real, usa los usuarios demo
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
          } else if (email === 'dashboard@aquasac.com' && password === 'password') {
            // Usuario de la API real como fallback
            const user = {
              id: '4',
              email: 'dashboard@aquasac.com',
              name: 'Dashboard User',
              role: 'superadmin' as UserRole
            };
            set({ user, isAuthenticated: true, userRole: user.role });
          } else {
            throw new Error('Credenciales inválidas');
          }
        }
      },
      logout: async () => {
        try {
          // Intenta cerrar sesión con la API real si hay token
          if (apiServices.auth.getAccessToken()) {
            await apiServices.auth.logout();
          }
        } catch (error) {
          console.log('Error al cerrar sesión con API real:', error);
        } finally {
          // Siempre limpia el estado local
          set({ user: null, isAuthenticated: false, userRole: null });
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);