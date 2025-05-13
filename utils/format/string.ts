export function getSingularOrPlural(
  amount: number,
  singular: string,
  plural: string,
  includeAmount?: boolean
): string {
  const result = amount <= 1 ? singular : plural;
  return includeAmount ? `${amount} ${result}` : `${result}`;
}
