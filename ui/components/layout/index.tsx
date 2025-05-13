import { FunctionComponent, ReactNode } from 'react';
import UIFlex from '../flex';
import UIHeader from '../header';
import UIImage from '../image';
import UIBox from '../box';

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
      justify="start"
      className="h-[100dvh]"
      position="relative"
    >
      <UIImage
        cover
        priority
        src="/bg-blur-gray-1.svg"
        alt=""
        className="absolute h-full w-full opacity-20 -z-1"
      />
      <UIHeader pageTitle={pageTitle} />
      <UIBox
        px="4"
        py="3"
        height="100%"
        asChild
        position="relative"
        className="overflow-hidden"
      >
        <main>{children}</main>
      </UIBox>
    </UIFlex>
  );
};

export default UILayout;
