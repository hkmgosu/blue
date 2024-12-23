import { useEffect, useState } from 'react';

import type {
  PricingHookDtoType,
  PricingReturnType,
  UseGetPricingReturnType,
} from 'types/pricing';
import { getNewPricing } from 'api/emissions/price';
import { NewShippingPricingAtomType } from 'atoms/new-shipping/types';
import { fakePricing } from 'emission-lib/utils';

export function useGetPricing(
  pricingDto: PricingHookDtoType
): UseGetPricingReturnType {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [withRequest, setWithRequest] = useState(false);
  const [price, setPrice] = useState(fakePricing as NewShippingPricingAtomType);

  useEffect(() => {
    async function getPrice(): Promise<void> {
      try {
        setIsLoading(true);
        setIsError(false);
        setError(null);
        setPrice(fakePricing as NewShippingPricingAtomType);
        const volumetricWeight: number =
          (pricingDto.broad * pricingDto.high * pricingDto.length) / 4000;
        if (pricingDto.isPickup === null) {
          setPrice(fakePricing as NewShippingPricingAtomType);
        } else {
          if (volumetricWeight < 16 && volumetricWeight > 0) {
            setWithRequest(true);
            const res = await getNewPricing({
              broad: pricingDto.broad,
              high: pricingDto.high,
              length: pricingDto.length,
              weight: pricingDto.weight,
              codeOrigin: pricingDto.codeOrigin,
              codeDestination: pricingDto.isPickup
                ? pricingDto.codePickup
                : pricingDto.googleBasepost,
            });
            if (!res) {
              setPrice(fakePricing as NewShippingPricingAtomType);
            }
            const pricing = (res as PricingReturnType)?.map((pri) => {
              const warrantyValue = pricingDto.extendedWarrantyValue;
              const tax = (pri.price + warrantyValue) * 0.19;
              return {
                ...pri,
                warrantyValue,
                tax,
                totalValue: pri.price + warrantyValue + tax,
              };
            });
            if (!pricing) {
              setPrice(fakePricing as NewShippingPricingAtomType);
            } else {
              setPrice(pricing);
            }
          }
        }
      } catch (err) {
        setPrice(fakePricing as NewShippingPricingAtomType);
        setIsError(true);
        setError('Error with pricing');
      } finally {
        setIsLoading(false);
      }
    }
    getPrice();
  }, [pricingDto]);

  return {
    isLoading,
    isError,
    error,
    price,
    withRequest,
  };
}
