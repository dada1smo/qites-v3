export function formatFloat(float?: number, locale: string = 'pt-BR') {
  if (!float) {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(float);
}

export function formatCurrencyToFloat(currency: string) {
  return parseFloat(currency.replace(',', '.'));
}
