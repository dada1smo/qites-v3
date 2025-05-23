import { Card } from '@radix-ui/themes';
import { FunctionComponent } from 'react';
import UIFlex from '../../flex';
import UIText from '../../text';

export interface UICardListItemProps {
  id: string;
  name: string;
  value: string;
  description: string;
  onClick?: () => void;
}

const UICardListItem: FunctionComponent<UICardListItemProps> = ({
  name,
  value,
  description,
  onClick,
}) => {
  return (
    <Card onClick={onClick} className="cursor-pointer !py-2">
      <UIFlex width="100%" justify="between" align="center" overflow="hidden">
        <UIFlex direction="column" overflow="hidden">
          <UIText size="2" weight="medium">
            {name}
          </UIText>
          <UIText size="2" truncate className="text-(--slate-11)">
            {description}
          </UIText>
        </UIFlex>
        <UIText size="3" className="shrink-0">
          {value}
        </UIText>
      </UIFlex>
    </Card>
  );
};

export default UICardListItem;
