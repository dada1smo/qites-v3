import { FunctionComponent, ReactNode } from 'react';
import UIFlex from '../flex';
import UIHeading from '../heading';
import UIText from '../text';

interface UIDataListProps {
  list: {
    value: ReactNode;
    label: ReactNode;
  }[];
}

const UIDataList: FunctionComponent<UIDataListProps> = ({ list }) => {
  return (
    <UIFlex direction="column" gap="2">
      {list.map((item) => {
        return (
          <UIFlex justify="between" key={`${item.label}`}>
            <UIHeading as="h4" size="3" className="text-(--jade-12)">
              {item.label}
            </UIHeading>
            <UIText size="3" className="text-right">
              {item.value}
            </UIText>
          </UIFlex>
        );
      })}
    </UIFlex>
  );
};

export default UIDataList;
