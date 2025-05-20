import { forwardRef } from 'react';
import { Theme, ThemeProps } from '@radix-ui/themes';

const UITheme = forwardRef<HTMLDivElement, ThemeProps>(({ ...props }, ref) => {
  return (
    <Theme
      ref={ref}
      panelBackground="translucent"
      className="overflow-hidden"
      {...props}
    >
      {props.children}
    </Theme>
  );
});

UITheme.displayName = 'UITheme';

export default UITheme;
