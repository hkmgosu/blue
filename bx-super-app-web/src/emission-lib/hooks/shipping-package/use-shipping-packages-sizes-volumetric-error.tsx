import { useShippingPackageSizes } from './use-shipping-packages-sizes';

export function useShippingPackageSizesVolumetricError(): boolean {
  const [packageSizes] = useShippingPackageSizes();
  const volumetricWeight: number =
    (packageSizes.height * packageSizes.length * packageSizes.width) / 4000;
  if (volumetricWeight > 16) {
    return true;
  }
  return false;
}
