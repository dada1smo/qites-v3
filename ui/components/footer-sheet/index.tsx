import { FunctionComponent, ReactNode } from 'react';
import UIBox from '../box';
import { BoxProps } from '@radix-ui/themes';

export interface UIFooterSheetProps {
  expanded?: boolean;
  children: ReactNode;
}

const UIFooterSheet: FunctionComponent<BoxProps & UIFooterSheetProps> = ({
  expanded,
  children,
  ...props
}) => {
  return (
    <UIBox
      {...props}
      p="5"
      className={`bg-(--slate-2) transition duration-3000 left-0 !absolute w-[calc(100%)] -bottom-4`}
      style={{
        borderRadius: 'var(--radius-6)',
        transition: '0.3s',
        height: expanded
          ? 'calc(100% + 4px)'
          : 'calc(var(--bottom-sheet-height) + 16px)',
      }}
    >
      {children}
    </UIBox>
  );
};

export default UIFooterSheet;
