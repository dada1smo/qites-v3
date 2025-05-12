import { FunctionComponent, ReactNode } from 'react';
import UIFlex from '../flex';

interface UILayoutProps {
  children: ReactNode;
}

const UILayout: FunctionComponent<UILayoutProps> = ({ children }) => {
  return (
    <UIFlex
      direction="column"
      align="stretch"
      justify="center"
      className="h-[100dvh]"
      py="1"
      px="1"
    >
      {children}
    </UIFlex>
  );
};

export default UILayout;
