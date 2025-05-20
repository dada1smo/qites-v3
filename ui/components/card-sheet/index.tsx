import { Card, CardProps } from '@radix-ui/themes';
import { FunctionComponent } from 'react';

export interface UICardSheetProps {
  expanded?: boolean;
}

const UICardSheet: FunctionComponent<CardProps & UICardSheetProps> = ({
  expanded,
  ...props
}) => {
  return (
    <Card
      {...props}
      className={`overflow-hidden transition duration-3000 !fixed top-[12px] left-2 w-[calc(100%-16px)] -bottom-4`}
      style={{
        transition: '0.3s',
        height: 'calc(100dvh + 8px)',
        maxHeight: 'calc(100dvh + 8px)',
        transform: expanded ? 'translateY(0)' : 'translateY(100%)',
      }}
    />
  );
};

export default UICardSheet;
