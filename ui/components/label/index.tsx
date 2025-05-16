import { FunctionComponent } from 'react';
import UIText from '../text';

interface UILabelProps {
  label?: string;
  fieldName?: string;
}

const UILabel: FunctionComponent<UILabelProps> = ({ label, fieldName }) => {
  if (!label) {
    return null;
  }

  return (
    <UIText
      as="label"
      size="2"
      weight="medium"
      htmlFor={fieldName}
      className="text-(--jade-12)"
    >
      {label}
    </UIText>
  );
};

export default UILabel;
