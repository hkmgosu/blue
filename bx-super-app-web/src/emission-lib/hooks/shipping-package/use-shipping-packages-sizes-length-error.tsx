import { useShippingPackageSizesLength } from './use-shipping-packages-sizes-length';

export function useShippingPackageSizesLengthError(): boolean {
  const [length, setLength] = useShippingPackageSizesLength();
  const hasError = length > 60;
  if (hasError) {
    setLength(60);
  }
  return hasError;
}
