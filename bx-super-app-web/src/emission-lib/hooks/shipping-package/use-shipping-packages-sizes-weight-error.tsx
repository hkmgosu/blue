import { useShippingPackageSizesWeight } from './use-shipping-packages-sizes-weight';

export function useShippingPackageSizesWeightError(): boolean {
  const [weight, setWeight] = useShippingPackageSizesWeight();
  const hasError = weight > 16;
  if (hasError) {
    setWeight(16);
  }
  return hasError;
}
