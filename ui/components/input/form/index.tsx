/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { FunctionComponent } from 'react';
import { Control, Controller } from 'react-hook-form';
import UIBaseInput, { UIInputProps } from '../base';

interface UIFormInputProps extends UIInputProps {
  control?: Control<any, any>;
  onFieldChange?: Function;
  onFieldBlur?: Function;
}

const UIFormInput: FunctionComponent<UIFormInputProps> = ({
  control,
  name,
  onFieldBlur,
  onFieldChange,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <UIBaseInput
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
          fieldRef={ref}
          error={error}
        />
      )}
    />
  );
};

export default UIFormInput;
