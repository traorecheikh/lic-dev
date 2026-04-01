import type { MoneyValue } from '@gym/types';

export function formatMoney(value: MoneyValue): string {
  const amount = value.amountMinor / 100;
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: value.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function toIsoTimestamp(value: Date = new Date()): string {
  return value.toISOString();
}
