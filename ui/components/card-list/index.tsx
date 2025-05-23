import { FunctionComponent } from 'react';
import UICardListItem, { UICardListItemProps } from './item';
import UIFlex from '../flex';

interface UICardListProps {
  items: UICardListItemProps[];
}

const UICardList: FunctionComponent<UICardListProps> = ({ items }) => {
  return (
    <UIFlex direction="column" gap="2">
      {items.map((item) => (
        <UICardListItem key={item.id} {...item} />
      ))}
    </UIFlex>
  );
};

export default UICardList;
