import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { sqliteStorage } from './sqliteStorage';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    hasLoggedInOnce: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            hasLoggedInOnce: false,
            login: (user, token) => set({ user, token, isAuthenticated: true, hasLoggedInOnce: true }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }), // checking if we should reset hasLoggedInOnce? No, user has logged in before.
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sqliteStorage),
        }
    )
);
