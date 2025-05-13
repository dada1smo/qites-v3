'use client';

import useGlobalStore from '@/modules/global/store/global.store';
import TabData from '@/modules/tab/components/tab-data';
import TabForm from '@/modules/tab/components/tab-form';
import UIFooterSheet from '@/ui/components/footer-sheet';
import { useSheet } from '@/ui/providers/SheetProvider';
import { useEffect } from 'react';

export default function TabPage() {
  const tabId = useGlobalStore((state) => state.tab?.id);

  console.log(tabId);

  const { isOpen, closeSheet, openSheet } = useSheet();

  useEffect(() => {
    if (!tabId) {
      openSheet();
    }

    if (tabId) {
      closeSheet();
    }
  }, [tabId]);

  return (
    <div>
      <UIFooterSheet expanded={isOpen}>
        {isOpen && <TabForm />}
        {!isOpen && tabId && <TabData />}
      </UIFooterSheet>
    </div>
  );
}
