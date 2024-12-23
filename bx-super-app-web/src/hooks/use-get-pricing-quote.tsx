import { useEffect, useState } from 'react';

import type {
  PricingQuoteHookDtoType,
  PricingReturnType,
  UseGetPricingQuoteReturnType,
} from 'types/pricing';
import { getNewPricing } from 'api/emissions/price';
import { NewShippingPricingAtomType } from 'atoms/new-shipping/types';
import { fakePricing } from 'emission-lib/utils';

export function useGetPricingQuote(
  pricingDto: PricingQuoteHookDtoType
): UseGetPricingQuoteReturnType {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [withRequest, setWithRequest] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

        if (volumetricWeight < 16 && volumetricWeight > 0) {
          setWithRequest(true);

          const res = await getNewPricing({
            broad: pricingDto.broad,
            high: pricingDto.high,
            length: pricingDto.length,
            weight: pricingDto.weight,
            codeOrigin: pricingDto.codeOrigin,
            codeDestination: pricingDto.codeDestination,
          });
          if (!res) {
            setPrice(fakePricing as NewShippingPricingAtomType);
          }
          const pricing = (res as PricingReturnType)?.map((pri) => {
            const tax = pri.price * 0.19;
            return {
              ...pri,
              tax,
              totalValue: pri.price + tax,
            };
          });
          if (!pricing) {
            setPrice(fakePricing as NewShippingPricingAtomType);
          } else {
            setPrice(pricing as NewShippingPricingAtomType);
          }
        }
      } catch (err) {
        setPrice(fakePricing as NewShippingPricingAtomType);
        setIsError(true);
        setError((err as Error).message);
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
