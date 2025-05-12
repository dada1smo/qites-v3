import { Card, CardProps } from '@radix-ui/themes';
import { FunctionComponent } from 'react';

const UICardSheet: FunctionComponent<CardProps> = ({ ...props }) => {
  return (
    <Card
      {...props}
      className="!absolute left-2 h-[calc(100%+4px)] w-[calc(100%-16px)]"
    />
  );
};

export default UICardSheet;
