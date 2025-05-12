import { Heading, HeadingProps } from '@radix-ui/themes';
import { FunctionComponent } from 'react';

const UIHeading: FunctionComponent<HeadingProps> = ({ ...props }) => {
  return <Heading {...props} />;
};

export default UIHeading;
