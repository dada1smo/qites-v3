import { ItemFormOutput } from '@/modules/tab/components/tab-item-form';
import { TabParticipantType, TabType } from '@/modules/tab/types/TabType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
  tab: TabType | null;
  initTab: (tabTotal: number, participants: TabParticipantType[]) => void;
  updateTabData: (tabTotal: number, participants: TabParticipantType[]) => void;
  createItem: (data: ItemFormOutput) => void;
  updateItem: (itemId: string, data: ItemFormOutput) => void;
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
      createItem: (data: ItemFormOutput) => {
        const getTab: TabType | null = get().tab;

        if (getTab) {
          const newItem = {
            id: crypto.randomUUID(),
            name: data.item_name,
            value: Number(data.item_value),
            quantity: data.item_amount,
            split: data.split,
          };

          set({ tab: { ...getTab, items: [...getTab.items, newItem] } });
        }
      },
      updateItem: (itemId: string, data: ItemFormOutput) => {
        const getTab: TabType | null = get().tab;

        if (getTab) {
          const update = getTab.items.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                name: data.item_name,
                value: Number(data.item_value),
                quantity: data.item_amount,
                split: data.split,
              };
            }
            return item;
          });

          set({ tab: { ...getTab, items: update } });
        }
      },
    }),
    {
      name: 'qites',
    }
  )
);

export default useGlobalStore;
