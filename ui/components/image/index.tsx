import Image, { ImageProps } from 'next/image';
import { FunctionComponent } from 'react';

interface UIImageProps extends ImageProps {
  cover?: boolean;
}

const UIImage: FunctionComponent<UIImageProps> = ({ cover, ...props }) => {
  return (
    <Image
      {...props}
      alt={props.alt || ''}
      width={0}
      height={0}
      style={{
        width: cover ? '100%' : props.width,
        height: cover ? '100%' : 'auto',
        objectFit: cover ? 'cover' : undefined,
      }}
    />
  );
};

export default UIImage;
