import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Création du store pour le thème
const useThemeStore = create(
  persist(
    (set, get) => ({
      // État initial basé sur la préférence système ou 'light' par défaut
      theme: typeof window !== 'undefined' 
        ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        : 'light',
      
      // Fonction pour basculer entre les thèmes
      toggleTheme: () => set({ 
        theme: get().theme === 'light' ? 'dark' : 'light' 
      }),
      
      // Fonction pour définir directement un thème
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'theme-storage', // Nom dans localStorage
    }
  )
);

export default useThemeStore;