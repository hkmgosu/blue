export function parteToPercentage(mount: number): string {
  if (!mount) return '0 %';
  return `${mount} %`;
}
