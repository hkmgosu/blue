export function parseToMoney(price?: number): string {
  if (!price) return '$0';
  return `$ ${String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`;
}
