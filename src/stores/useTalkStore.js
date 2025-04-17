import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTalkStore = create(
  persist(
    (set, get) => ({
      talks: [],
      

      addTalk: (talk) => set((state) => ({ talks: [...state.talks, talk] })),
      removeTalk: (id) => set((state) => ({ talks: state.talks.filter((t) => t.id !== id) })),
      updateTalk: (id, data) => set((state) => ({
        talks: state.talks.map((t) => (t.id === id ? { ...t, ...data } : t)),
      })),
      
      
      getSortedTalks: () => {
        const { talks } = get();
        return [...talks].sort((a, b) => 
          a.title.localeCompare(b.title, 'fr', { 
            sensitivity: 'base', 
            ignorePunctuation: true 
          })
        );
      },
    }),
    {
      name: 'talks-storage',
      version: 4,
    }
  )
);

export default useTalkStore;