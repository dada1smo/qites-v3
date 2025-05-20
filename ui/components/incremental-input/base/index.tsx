import {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
  useMemo,
} from 'react';
import { FieldError } from 'react-hook-form';
import UIFlex from '../../flex';
import UILabel from '../../label';
import UIFieldError from '../../field-error';
import UIIconButton from '../../icon-button';
import { Minus, Plus } from '@phosphor-icons/react';
import UIText from '../../text';

export interface UIIncrementalInputProps {
  name: string;
  error?: FieldError;
  label?: string;
  width?: 'full' | 'fit';
  fieldRef?: React.Ref<HTMLInputElement>;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'soft' | 'ghost';
}

export interface UIBaseIncrementalInputProps extends UIIncrementalInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value: string;
}

const UIIncrementalInput: FunctionComponent<UIBaseIncrementalInputProps> = ({
  name,
  error,
  label,
  width,
  onChange,
  value,
  min,
  max,
  fieldRef,
  onBlur,
  size = 'md',
  variant = 'soft',
}) => {
  const numericValue = parseInt(value, 10);

  const canIncrement = useMemo(() => {
    if (typeof max === 'number') {
      if (max <= 0) {
        return false;
      }

      if (numericValue < max) {
        return true;
      }

      if (numericValue >= max) {
        return false;
      }
    }
    return true;
  }, [numericValue, max]);

  const canDecrement = useMemo(() => {
    if (typeof min === 'number') {
      if (min < 0) {
        return false;
      }

      if (numericValue > min) {
        return true;
      }

      return false;
    }
    return true;
  }, [numericValue, min]);

  const handleIncrement = () => {
    if (!canIncrement) {
      return;
    }
    const event = {
      target: { value: `${numericValue + 1}` },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleDecrement = () => {
    if (!canDecrement) {
      return;
    }
    const event = {
      target: { value: `${numericValue - 1}` },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <UIFlex
      direction="column"
      gap="1"
      display={width === 'full' ? 'flex' : 'inline-flex'}
      className={width === 'full' ? 'grow' : ''}
    >
      <UILabel label={label} />
      <UIFlex gap="2" align="center" justify="between">
        <UIIconButton
          variant={variant}
          size={size === 'md' ? '3' : '2'}
          onClick={handleDecrement}
          disabled={!canDecrement}
        >
          <Minus fontSize={variant === 'ghost' ? 20 : 16} />
        </UIIconButton>
        <UIText
          className="font-space-mono text-center"
          size={size === 'md' ? '4' : '3'}
          style={{ minWidth: '3ch' }}
          id={name}
        >
          {numericValue}
        </UIText>
        <UIIconButton
          variant={variant}
          size={size === 'md' ? '3' : '2'}
          onClick={handleIncrement}
          disabled={!canIncrement}
        >
          <Plus fontSize={variant === 'ghost' ? 20 : 16} />
        </UIIconButton>
      </UIFlex>
      <input
        name={name}
        value={value}
        type="hidden"
        ref={fieldRef}
        onBlur={onBlur}
      />
      <UIFieldError error={error} />
    </UIFlex>
  );
};

export default UIIncrementalInput;
