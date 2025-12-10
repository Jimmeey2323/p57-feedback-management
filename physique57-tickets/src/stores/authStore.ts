import { create } from 'zustand';
import { supabase, getCurrentUser, getUserProfile } from '../lib/supabase';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (authError) throw authError;
      
      if (authData.user) {
        const profile = await getUserProfile(authData.user.id);
        set({ 
          user: profile, 
          isAuthenticated: true, 
          isLoading: false,
          error: null 
        });
      }
    } catch (error: any) {
      set({ 
        error: error.message || 'Login failed', 
        isLoading: false,
        isAuthenticated: false 
      });
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ 
        user: null, 
        isAuthenticated: false,
        error: null 
      });
    } catch (error: any) {
      set({ error: error.message || 'Logout failed' });
      throw error;
    }
  },
  
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      
      const authUser = await getCurrentUser();
      
      if (authUser) {
        const profile = await getUserProfile(authUser.id);
        set({ 
          user: profile, 
          isAuthenticated: true, 
          isLoading: false,
          error: null 
        });
      } else {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      }
    } catch (error: any) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: error.message 
      });
    }
  },
  
  updateProfile: async (data: Partial<User>) => {
    try {
      const currentUser = get().user;
      if (!currentUser) throw new Error('No user logged in');
      
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', currentUser.id);
      
      if (error) throw error;
      
      set({ 
        user: { ...currentUser, ...data } 
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
  
  clearError: () => set({ error: null }),
}));
