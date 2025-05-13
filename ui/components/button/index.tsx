import { Button, ButtonProps } from '@radix-ui/themes';
import { forwardRef } from 'react';

const UIButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return <Button ref={ref} {...props} />;
  }
);

UIButton.displayName = 'UIButton';

export default UIButton;
