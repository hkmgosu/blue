import { useShippingPackageSizesWidth } from './use-shipping-packages-sizes-width';

export function useShippingPackageSizesWidthError(): boolean {
  const [width, setWidth] = useShippingPackageSizesWidth();
  const hasError = width > 60;
  if (hasError) {
    setWidth(60);
  }
  return hasError;
}
