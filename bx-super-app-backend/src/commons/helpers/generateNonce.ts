import { v4 as uuid } from 'uuid';

export function generateNonce(): string {
  return uuid().substring(0, 6);
}
