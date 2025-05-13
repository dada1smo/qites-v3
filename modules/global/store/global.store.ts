import { TabParticipantType, TabType } from '@/modules/tab/types/TabType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
  tab: TabType | null;
  initTab: (tabTotal: number, participants: TabParticipantType[]) => void;
  updateTabData: (tabTotal: number, participants: TabParticipantType[]) => void;
}

const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      tab: null,
      initTab: (tabTotal, participants) => {
        const newTab: TabType = {
          id: crypto.randomUUID(),
          total: tabTotal,
          items: [],
          participants,
        };

        set({ tab: newTab });
      },
      updateTabData: (tabTotal, participants) => {
        const getTab: TabType | null = get().tab;

        if (getTab) {
          set({ tab: { ...getTab, total: tabTotal, participants } });
        }
      },
    }),
    {
      name: 'qites',
    }
  )
);

export default useGlobalStore;
