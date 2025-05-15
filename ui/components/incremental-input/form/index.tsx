/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { FunctionComponent } from 'react';
import { Control, Controller } from 'react-hook-form';
import UIIncrementalInput, { UIIncrementalInputProps } from '../base';

interface UIFormIncrementalInputProps extends UIIncrementalInputProps {
  control?: Control<any, any>;
  onFieldChange?: Function;
  onFieldBlur?: Function;
}

const UIFormIncrementalInput: FunctionComponent<
  UIFormIncrementalInputProps
> = ({ control, name, onFieldBlur, onFieldChange, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <UIIncrementalInput
          {...props}
          name={name}
          onBlur={(e) => {
            if (onFieldBlur) {
              onFieldBlur(e.target.value);
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
          fieldRef={ref}
        />
      )}
    />
  );
};

export default UIFormIncrementalInput;
