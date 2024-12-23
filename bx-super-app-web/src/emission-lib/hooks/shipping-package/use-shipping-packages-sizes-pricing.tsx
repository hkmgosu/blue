import { useShippingPackageSizes } from './use-shipping-packages-sizes';

export function useShippingPackageSizesPricing(): {
  broad: number;
  high: number;
  length: number;
  weight: number;
} {
  const [sizes] = useShippingPackageSizes();
  return {
    broad: sizes.width,
    high: sizes.height,
    length: sizes.length,
    weight: sizes.weight,
  };
}
