/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { FunctionComponent } from 'react';
import UISegmentedControl, { UISegmentedControlProps } from '../base';
import { Control, Controller } from 'react-hook-form';

interface UIFormSegmentedControlProps extends UISegmentedControlProps {
  control?: Control<any, any>;
  onFieldChange?: Function;
  onFieldBlur?: Function;
}

const UIFormSegmentedControl: FunctionComponent<
  UIFormSegmentedControlProps
> = ({ control, name, onFieldBlur, onFieldChange, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <UISegmentedControl
          {...props}
          name={name}
          onBlur={() => {
            if (onFieldBlur) {
              onFieldBlur();
            }
            onBlur();
          }}
          onChange={(e) => {
            if (onFieldChange) {
              onFieldChange(e);
            }

            onChange(e);
          }}
          value={value}
          error={error}
        />
      )}
    />
  );
};

export default UIFormSegmentedControl;
