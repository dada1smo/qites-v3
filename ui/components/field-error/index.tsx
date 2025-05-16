import { FunctionComponent } from 'react';
import { FieldError } from 'react-hook-form';
import UIText from '../text';

interface UIFieldErrorProps {
  error?: FieldError;
}

const UIFieldError: FunctionComponent<UIFieldErrorProps> = ({ error }) => {
  const hasError = !!error?.message;

  if (!hasError) {
    return null;
  }

  return (
    <UIText size="2" className="text-(--tomato-11)" as="span">
      {error?.message}
    </UIText>
  );
};

export default UIFieldError;
