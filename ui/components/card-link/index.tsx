import { Card } from '@radix-ui/themes';
import { FunctionComponent, ReactNode } from 'react';
import UIFlex from '../flex';
import Link from 'next/link';
import UIHeading from '../heading';
import UIText from '../text';

interface UICardLinkProps {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const UICardLink: FunctionComponent<UICardLinkProps> = ({
  href,
  title,
  description,
  icon,
}) => {
  return (
    <Card asChild>
      <Link href={href}>
        <UIFlex gap="3" align="start">
          {icon && icon}
          <UIFlex direction="column" gap="1">
            <UIHeading as="h3" size="4" className="text-(--jade-12)">
              {title}
            </UIHeading>
            <UIText>{description}</UIText>
          </UIFlex>
        </UIFlex>
      </Link>
    </Card>
  );
};

export default UICardLink;
