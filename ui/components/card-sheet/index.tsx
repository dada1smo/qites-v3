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
      className={`transition duration-3000 !absolute left-2 w-[calc(100%-16px)] -bottom-4`}
      style={{
        transition: '0.3s',
        height: expanded
          ? 'calc(100% + 4px)'
          : 'calc(var(--bottom-sheet-height) + 16px)',
      }}
      suppressHydrationWarning
    />
  );
};

export default UICardSheet;
