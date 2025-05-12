import { formatFloat } from '@/utils/format/number';
import { MaskOptions } from '.';

export function handleInputValue(mode: MaskOptions, value?: string | number) {
  if (!value) {
    return '';
  }

  if (mode === 'percentual') {
    return maskPercentualValue(value);
  }

  if (mode === 'currency') {
    return maskCurrencyValue(value);
  }

  return value;
}

export function handleOutputValue(
  mode: MaskOptions,
  value?: string,
  oldValue?: string
) {
  if (!value) {
    return '';
  }

  if (mode === 'percentual') {
    return unmaskPercentualValue(value, oldValue);
  }

  if (mode === 'currency') {
    return unmaskCurrencyValue(value);
  }

  return value;
}

function maskCurrencyValue(value: string | number) {
  if (Number.isNaN(value)) {
    return '';
  }

  const numberValue =
    typeof value === 'string'
      ? Number(value.replace(/[^0-9]/g, ''))
      : value * 100;

  if (Number.isNaN(numberValue)) {
    return '';
  }

  if (numberValue === 0) {
    return '';
  }

  return formatFloat(numberValue / 100);
}

function unmaskCurrencyValue(value: string) {
  const numberValue = Number(value.replace(/[^0-9]/g, ''));

  if (Number.isNaN(numberValue)) {
    return '';
  }

  if (numberValue === 0) {
    return '';
  }

  return parseFloat(`${numberValue / 100}`).toFixed(2);
}

function maskPercentualValue(value: string | number) {
  if (Number.isNaN(value)) {
    return '';
  }

  const numberValue =
    typeof value === 'string'
      ? Number(value.replace(/[^0-9]/g, ''))
      : value * 100;

  if (Number.isNaN(numberValue)) {
    return '';
  }

  if (numberValue === 0) {
    return '';
  }

  return formatFloat(numberValue / 100);
}

function unmaskPercentualValue(value: string, oldValue?: string | number) {
  const numberValue = Number(value.replace(/[^0-9]/g, ''));

  if (Number.isNaN(numberValue)) {
    return '';
  }

  if (numberValue === 0) {
    return '';
  }

  if (numberValue / 100 > 100) {
    return oldValue || '';
  }

  return parseFloat(`${numberValue / 100}`).toFixed(2);
}
