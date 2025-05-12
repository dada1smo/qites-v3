'use client';

import { FunctionComponent } from 'react';
import UIFlex from '../flex';
import UIIconButton from '../icon-button';
import { List } from '@phosphor-icons/react';
import UIHeading from '../heading';

interface UIHeaderProps {
  pageTitle?: string;
}

const UIHeader: FunctionComponent<UIHeaderProps> = ({ pageTitle }) => {
  return (
    <UIFlex
      align="center"
      justify="between"
      py="4"
      px="4"
      className="border-b border-(--slate-5)"
    >
      <UIHeading as="h1">{pageTitle ? pageTitle : 'Qites'}</UIHeading>
      <UIIconButton variant="soft">
        <List size={24} />
      </UIIconButton>
    </UIFlex>
  );
};

export default UIHeader;
