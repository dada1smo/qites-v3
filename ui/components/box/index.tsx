import { Box, BoxProps } from '@radix-ui/themes';
import { FunctionComponent } from 'react';

const UIBox: FunctionComponent<BoxProps> = (props) => {
  return <Box {...props} />;
};

export default UIBox;
