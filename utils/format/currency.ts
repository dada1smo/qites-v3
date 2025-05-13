export function formatCurrency(
  value: number | string,
  locale: string = 'pt-BR',
  currency: string = 'BRL'
): string {
  if (value == null || value === '') {
    return '';
  }

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  return numericValue.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}
