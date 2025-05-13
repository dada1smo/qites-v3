import { Card } from '@radix-ui/themes';
import { FunctionComponent } from 'react';
import UIText from '../text';
import UIIconButton from '../icon-button';
import { X } from '@phosphor-icons/react';

interface UIChipProps {
  label: string;
  onDelete?: (arg: string) => void;
}

const UIChip: FunctionComponent<UIChipProps> = ({ label, onDelete }) => {
  return (
    <Card className="!py-2 !inline-flex !items-center gap-2">
      {onDelete && (
        <UIIconButton variant="soft" size="1" onClick={() => onDelete(label)}>
          <X />
        </UIIconButton>
      )}
      <UIText as="span">{label}</UIText>
    </Card>
  );
};

export default UIChip;
