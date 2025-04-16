// 
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTalkStore = create(
  persist(
    (set, get) => ({
      talks: [],
      sortOrder: 'date', // 'date', 'title' ou 'duration'
      addTalk: (talk) => set((state) => ({ talks: [...state.talks, talk] })),
      removeTalk: (id) => set((state) => ({ talks: state.talks.filter((t) => t.id !== id) })),
      updateTalk: (id, data) =>
        set((state) => ({
          talks: state.talks.map((t) => (t.id === id ? { ...t, ...data } : t)),
        })),
      setSortOrder: (order) => set({ sortOrder: order }),
      getSortedTalks: () => {
        const state = get();
        const talks = [...state.talks];
        const now = new Date();
        if (state.sortOrder === 'duration') {
          return talks.sort((a, b) => {
            // Tri croissant par durée, puis alphabétique
            const durA = parseInt(a.duration) || 0;
            const durB = parseInt(b.duration) || 0;
            if (durA !== durB) return durA - durB;
            return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base', ignorePunctuation: true });
          });
        }
        if (state.sortOrder === 'title') {
          return talks.sort((a, b) => a.title.localeCompare(b.title, 'fr', { sensitivity: 'base', ignorePunctuation: true }));
        }
        // Par défaut : tri date (ancien comportement)
        return talks.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA >= now && dateB >= now) {
            return dateA - dateB;
          }
          if (dateA < now && dateB < now) {
            return dateB - dateA;
          }
          return dateA >= now ? -1 : 1;
        });
      },
    }),
    {
      name: 'talks-storage',
      version: 1,
    }
  )
);

export default useTalkStore; 