import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
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
      className="bg-(--slate-2) w-full"
      style={{ borderRadius: 'var(--radius-2)' }}
      minHeight="32px"
      px="2"
    >
      <UIIconButton
        color="gray"
        size="2"
        variant="ghost"
        onClick={() => onRemove(id)}
      >
        <X fontSize={20} />
      </UIIconButton>
      <UIText>{title}</UIText>
      {endContent && endContent}
    </UIFlex>
  );
};

export default UIDynamicListItem;
