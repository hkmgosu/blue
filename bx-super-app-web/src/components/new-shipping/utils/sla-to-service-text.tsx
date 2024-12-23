import type { SlaType } from 'types/pricing';

export function slaToServiceText(sla: SlaType): string {
  const positiveSla = Math.abs(sla);
  if (positiveSla <= 1) {
    return 'Envío al día siguiente';
  } else {
    return `Envío en hasta ${positiveSla} días hábiles`;
  }
}
