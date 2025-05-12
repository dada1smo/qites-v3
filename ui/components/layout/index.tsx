import { FunctionComponent, ReactNode } from 'react';
import UIFlex from '../flex';
import UIHeader from '../header';
import UIImage from '../image';

interface UILayoutProps {
  pageTitle?: string;
  children: ReactNode;
}

const UILayout: FunctionComponent<UILayoutProps> = ({
  pageTitle,
  children,
}) => {
  return (
    <UIFlex
      direction="column"
      align="stretch"
      justify="center"
      className="h-[100dvh]"
      position="relative"
    >
      <UIImage
        cover
        priority
        src="/bg-blur-gray-1.svg"
        alt=""
        className="absolute h-full w-full opacity-50 -z-1"
      />
      <UIHeader pageTitle={pageTitle} />
      {children}
    </UIFlex>
  );
};

export default UILayout;
