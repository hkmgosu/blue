import { useOriginAddressCommune } from '../origin/use-origin-address-commune';
import { useShippingDestinyAddressCommune } from '../shipping-destiny/use-shipping-destiny-address-commune';
import { useShippingDestinyIsPickup } from '../shipping-destiny/use-shipping-destiny-is-pickup';
import { useShippingPackageSizesPricing } from './use-shipping-packages-sizes-pricing';
import { useShippingPackageWarrantyExtended } from './use-shipping-packages-warranty-extended';

export function useShippingPackagePricingDto(): {
  isPickup: boolean | undefined;
  codeOrigin: string;
  codePickup: string;
  extendedWarrantyValue: number;
  googleBasepost: string;
  broad: number;
  high: number;
  length: number;
  weight: number;
} {
  const sizesPricing = useShippingPackageSizesPricing();
  const [isPickup] = useShippingDestinyIsPickup();
  const [originCommune] = useOriginAddressCommune();
  const [destinyCommune] = useShippingDestinyAddressCommune();
  const warrantyExtended = useShippingPackageWarrantyExtended();

  return {
    ...sizesPricing,
    isPickup,
    codeOrigin: originCommune.location_code,
    codePickup: destinyCommune.location_code,
    extendedWarrantyValue: warrantyExtended,
    googleBasepost: destinyCommune.base_post,
  };
}
