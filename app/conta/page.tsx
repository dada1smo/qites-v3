'use client';

import useGlobalStore from '@/modules/global/store/global.store';
import TabData from '@/modules/tab/components/tab-data';
import TabForm from '@/modules/tab/components/tab-form';
import TabItemForm from '@/modules/tab/components/tab-item-form';
import TabItemList from '@/modules/tab/components/tab-item-list';
import { TabItemType } from '@/modules/tab/types/TabType';
import UIButton from '@/ui/components/button';
import UICardSheet from '@/ui/components/card-sheet';
import UIFlex from '@/ui/components/flex';
import UIFooterSheet from '@/ui/components/footer-sheet';
import { useSheet } from '@/ui/providers/SheetProvider';
import { Plus } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

export default function TabPage() {
  const tabId = useGlobalStore((state) => state.tab?.id);

  const { isOpen, closeSheet, openSheet } = useSheet();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TabItemType | null>(null);

  const handleSelectItem = (itemId: string, items: TabItemType[]) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      setSelectedItem(item);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!tabId) {
      openSheet();
    }

    if (tabId) {
      closeSheet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabId]);

  return (
    <>
      <UIFlex
        direction="column"
        gap="4"
        height="100%"
        className="pb-(--bottom-sheet-height)"
        overflow="auto"
      >
        <UIButton
          className="grow"
          size="3"
          variant="soft"
          onClick={() => {
            setOpen(!open);
            setSelectedItem(null);
          }}
        >
          <Plus />
          Adicionar item da conta
        </UIButton>
        <TabItemList handleSelectItem={handleSelectItem} />
      </UIFlex>
      <UIFooterSheet expanded={isOpen}>
        {isOpen && <TabForm />}
        {!isOpen && tabId && <TabData />}
      </UIFooterSheet>
      <UICardSheet expanded={open}>
        {open && <TabItemForm setOpen={setOpen} selectedItem={selectedItem} />}
      </UICardSheet>
    </>
  );
}
