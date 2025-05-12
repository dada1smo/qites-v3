import { Text, TextProps } from '@radix-ui/themes';
import { FunctionComponent } from 'react';

const UIText: FunctionComponent<TextProps> = ({ ...props }) => {
  return <Text {...props} />;
};

export default UIText;
