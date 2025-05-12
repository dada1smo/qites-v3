import { TextField } from '@radix-ui/themes';
import {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
} from 'react';
import { FieldError } from 'react-hook-form';
import UIFlex from '../../flex';
import UIText from '../../text';
import { handleInputValue } from './masks';
import { useNumberFormat } from '@react-input/number-format';
import { mergeRefs } from '@/utils/format/ref';

export type InputMode = 'currency' | 'percentual' | 'int' | 'float' | 'text';

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
  inputMode?: InputMode;
  placeholder?: string;
  fullWidth?: boolean;
  fieldRef?: React.Ref<HTMLInputElement>;
  mask?: 'currency';
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
  type,
  placeholder,
  onChange,
  onBlur,
  value,
  fieldRef,
  inputMode,
  mask,
}) => {
  const hasError = !!error?.message;

  const inputValue = handleInputValue(inputMode || 'text', value);

  const maskRef = useNumberFormat({
    locales: 'pt-br',
    maximumFractionDigits: 2,
  });

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
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        size="3"
        type={type}
        ref={mask ? mergeRefs(fieldRef, maskRef) : fieldRef}
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
