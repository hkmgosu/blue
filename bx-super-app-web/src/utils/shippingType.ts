import { OriginCode } from 'types/payment';

export const LocationShippingType: {
  [prop: string]: OriginCode;
} = {
  default: 'EMISSION',
  massive: 'MASSIVE',
  multi: 'MULTIPLE',
};

export function getShippingType(path: string): OriginCode {
  path = path.replace(/(.+)\/(.+)$/, '$2');
  return path in LocationShippingType
    ? LocationShippingType[path]
    : LocationShippingType.default;
}
