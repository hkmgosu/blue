import type { ServicesType, SlaType } from 'types/pricing';

export function slaToService(sla?: SlaType): ServicesType {
  if (!sla) return '48 hrs';
  const positiveSla = Math.abs(sla);
  if (positiveSla <= 1) {
    return '24 hrs';
  } else if (positiveSla === 2) {
    return '48 hrs';
  } else if (positiveSla === 3) {
    return '72 hrs';
  } else {
    return `${positiveSla} días`;
  }
}
