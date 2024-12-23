import { useShippingPackageSizes } from './use-shipping-packages-sizes';

export function useShippingPackageSizesEdgeError(): boolean {
  const [packageSizes] = useShippingPackageSizes();
  return (
    packageSizes.height > 60 ||
    packageSizes.length > 60 ||
    packageSizes.width > 60
  );
}
