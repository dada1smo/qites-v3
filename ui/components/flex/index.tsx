import { Flex, FlexProps } from '@radix-ui/themes';
import { forwardRef } from 'react';

const UIFlex = forwardRef<HTMLDivElement, FlexProps>(({ ...props }, ref) => {
  return (
    <Flex ref={ref} {...props}>
      {props.children}
    </Flex>
  );
});

UIFlex.displayName = 'UIFlex';

export default UIFlex;
