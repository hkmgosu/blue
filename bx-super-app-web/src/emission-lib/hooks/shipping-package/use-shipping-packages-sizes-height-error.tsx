import { useShippingPackageSizesHeight } from './use-shipping-packages-sizes-height';

export function useShippingPackageSizesHeightError(): boolean {
  const [height, setHeight] = useShippingPackageSizesHeight();
  const hasError = height > 60;
  if (hasError) {
    setHeight(60);
  }
  return hasError;
}
