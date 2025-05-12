'use client';

import { IconButton, IconButtonProps } from '@radix-ui/themes';
import { forwardRef } from 'react';

const UIIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ ...props }, ref) => {
    return <IconButton ref={ref} {...props} />;
  }
);

UIIconButton.displayName = 'UIIconButton';

export default UIIconButton;
