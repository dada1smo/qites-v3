import { FunctionComponent } from 'react';
import UIDynamicListItem, { UIDynamicListItemProps } from './item';
import UIFlex from '../flex';

interface UIDynamicListProps {
  items: UIDynamicListItemProps[];
}

const UIDynamicList: FunctionComponent<UIDynamicListProps> = ({ items }) => {
  return (
    <UIFlex direction="column" gap="2" className="overflow-auto">
      {items.map((item) => (
        <UIFlex key={item.title} gap="2">
          <UIDynamicListItem {...item} />
        </UIFlex>
      ))}
    </UIFlex>
  );
};

export default UIDynamicList;
