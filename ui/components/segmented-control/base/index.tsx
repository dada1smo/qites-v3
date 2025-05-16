import { SegmentedControl } from '@radix-ui/themes';
import { FunctionComponent } from 'react';
import { FieldError } from 'react-hook-form';
import UIFlex from '../../flex';
import UILabel from '../../label';
import UIFieldError from '../../field-error';

export interface UISegmentedControlOption {
  label: string;
  value: string;
}

export interface UISegmentedControlProps {
  name: string;
  error?: FieldError;
  label?: string;
  options: UISegmentedControlOption[];
}

export interface UIBaseSegmentedControlProps extends UISegmentedControlProps {
  onChange: (value: string) => void;
  onBlur?: () => void;
  value: string;
}

const UISegmentedControl: FunctionComponent<UIBaseSegmentedControlProps> = ({
  name,
  error,
  label,
  options,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <UIFlex direction="column" gap="1">
      <UILabel label={label} />
      <SegmentedControl.Root
        value={value}
        onValueChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <SegmentedControl.Item key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl.Root>
      <UIFieldError error={error} />
    </UIFlex>
  );
};

export default UISegmentedControl;
