import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Détecter le thème initial du système
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme-storage');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme).state.theme;
      } catch {
        // En cas d'erreur de parsing, on continue avec la détection
      }
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
      },
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ theme: state.theme })
    }
  )
);

export default useThemeStore; 