'use client';

import useGlobalStore from '@/modules/global/store/global.store';
import UICardList from '@/ui/components/card-list';
import { formatCurrency } from '@/utils/format/currency';
import { getSingularOrPlural } from '@/utils/format/string';
import { FunctionComponent } from 'react';
import { TabItemType } from '../../types/TabType';

interface TabItemListProps {
  handleSelectItem: (itemId: string, items: TabItemType[]) => void;
}

const TabItemList: FunctionComponent<TabItemListProps> = ({
  handleSelectItem,
}) => {
  const items = useGlobalStore((state) => state.tab?.items) || [];

  return (
    <UICardList
      items={items.map((item) => ({
        ...item,
        value: formatCurrency(item.value * item.quantity),
        description: getSingularOrPlural(
          item.split.length,
          'pessoa',
          'pessoas',
          true
        ),
        onClick: () => handleSelectItem(item.id, items),
      }))}
    />
  );
};

export default TabItemList;
