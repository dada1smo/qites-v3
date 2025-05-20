import { FunctionComponent, ReactNode } from 'react';
import UIFlex from '../../flex';
import UIIconButton from '../../icon-button';
import { X } from '@phosphor-icons/react';
import UIText from '../../text';

export interface UIDynamicListItemProps {
  id: string;
  title: string;
  endContent?: ReactNode;
  onRemove: (arg: string) => void;
}

const UIDynamicListItem: FunctionComponent<UIDynamicListItemProps> = ({
  id,
  title,
  endContent,
  onRemove,
}) => {
  return (
    <UIFlex
      gap="3"
      align="center"
      className="bg-(--slate-2) w-full overflow-hidden"
      style={{ borderRadius: 'var(--radius-2)' }}
      minHeight="32px"
      px="2"
      justify="between"
    >
      <UIFlex gap="3" align="center" className="overflow-hidden">
        <UIIconButton
          color="gray"
          size="2"
          variant="ghost"
          onClick={() => onRemove(id)}
        >
          <X fontSize={20} />
        </UIIconButton>
        <UIText truncate>{title}</UIText>
      </UIFlex>
      <div className="shrink-0">{endContent && endContent}</div>
    </UIFlex>
  );
};

export default UIDynamicListItem;
