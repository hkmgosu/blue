import { useShippingPackageService } from './use-shipping-packages-service';
import { useShippingPackageTax } from './use-shipping-packages-tax';
import { useShippingPackageWarrantyExtended } from './use-shipping-packages-warranty-extended';

export function useShippingPackageTotal(): {
  price: number;
  tax: number;
  warrantyValue: number;
} {
  const [tax] = useShippingPackageTax();
  const warrantyExtented = useShippingPackageWarrantyExtended();
  const [packageService] = useShippingPackageService();

  return {
    price: packageService.price,
    tax,
    warrantyValue: warrantyExtented,
  };
}
