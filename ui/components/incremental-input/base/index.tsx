import {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
  useEffect,
  useState,
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
}) => {
  const [numericValue, setNumericValue] = useState<number>(parseInt(value, 10));
  const canIncrement = max ? numericValue < max : true;
  const canDecrement = min ? numericValue > min : true;

  const handleIncrement = () => {
    if (!canIncrement) {
      return;
    }
    setNumericValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (!canDecrement) {
      return;
    }
    setNumericValue((prev) => prev - 1);
  };

  useEffect(() => {
    const event = {
      target: { value: `${numericValue}` },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericValue]);

  return (
    <UIFlex
      direction="column"
      gap="1"
      display={width === 'full' ? 'flex' : 'inline-flex'}
      className="grow"
    >
      <UILabel label={label} />
      <UIFlex gap="2" align="center" justify="between">
        <UIIconButton
          variant="soft"
          size="3"
          onClick={handleDecrement}
          disabled={!canDecrement}
        >
          <Minus />
        </UIIconButton>
        <UIText
          className="font-space-mono text-center"
          size="4"
          style={{ minWidth: '3ch' }}
          id={name}
        >
          {numericValue}
        </UIText>
        <UIIconButton
          variant="soft"
          size="3"
          onClick={handleIncrement}
          disabled={!canIncrement}
        >
          <Plus />
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
