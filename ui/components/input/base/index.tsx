import { TextField } from '@radix-ui/themes';
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
} from 'react';
import { FieldError } from 'react-hook-form';
import UIFlex from '../../flex';
import UIText from '../../text';
import { handleInputValue, handleOutputValue } from './masks';

export type MaskOptions = 'currency' | 'percentual' | 'int' | 'float' | 'text';

export interface UIInputProps {
  name: string;
  error?: FieldError;
  label?: string;
  type?:
    | 'number'
    | 'search'
    | 'time'
    | 'text'
    | 'hidden'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'password'
    | 'tel'
    | 'url'
    | 'week';
  mask?: MaskOptions;
  placeholder?: string;
  fullWidth?: boolean;
  fieldRef?: React.Ref<HTMLInputElement>;
  inputMode?: 'numeric' | 'decimal' | 'search' | 'tel' | 'text' | 'none';
  pattern?: string;
}

export interface UIBaseInputProps extends UIInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value: string;
}

const UIInput: FunctionComponent<UIBaseInputProps> = ({
  name,
  error,
  label,
  placeholder,
  onChange,
  onBlur,
  value,
  fieldRef,
  mask,
  inputMode,
  pattern,
}) => {
  const hasError = !!error?.message;

  const inputValue = handleInputValue(mask || 'text', value);

  return (
    <UIFlex direction="column" gap="1">
      {label && (
        <UIText
          as="label"
          size="2"
          weight="medium"
          htmlFor={name}
          className="text-(--jade-12)"
        >
          {label}
        </UIText>
      )}
      <TextField.Root
        name={name}
        id={name}
        placeholder={placeholder}
        value={inputValue}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e: any) => {
          const formatValue = handleOutputValue(
            mask || 'text',
            e.target.value,
            value
          );
          onChange(formatValue as unknown as ChangeEvent<HTMLInputElement>);
        }}
        onBlur={onBlur}
        size="3"
        type="text"
        ref={fieldRef}
        inputMode={inputMode}
        pattern={pattern}
      />
      {hasError && (
        <UIText size="2" className="text-(--red-11)" as="span">
          {error?.message}
        </UIText>
      )}
    </UIFlex>
  );
};

export default UIInput;
