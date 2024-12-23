import { HmacSHA3 } from 'crypto-js';

export const hashObject = (data: string): string => {
  return HmacSHA3(data, 'v;4C$k^0Pti}6*mG').toString();
};
