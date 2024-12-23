import { Col } from '@bx-design/react-grid';
import { bxShippingServiceAtom, priceAtom } from 'atoms/price-quote';
import PriceQuotePricingContent from 'components/price-quote/pricing/content';
import PriceQuotePricingContentPrice from 'components/price-quote/pricing/content-price';
import PriceQuotePricingWrapper from 'components/price-quote/pricing/wrapper';
import { useGetPricingQuote } from 'hooks/use-get-pricing-quote';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import type { PricingQuoteHookDtoType } from 'types/pricing';

type Props = {
  pricingDto: PricingQuoteHookDtoType;
};

function PriceQuotePricing({ pricingDto }: Props): JSX.Element {
  const { isLoading, price, withRequest } = useGetPricingQuote(pricingDto);

  const list = useMemo(
    () => (withRequest && price ? price.sort((a, b) => a.sla - b.sla) : []),
    [price, withRequest]
  );

  const [, setPriceQuote] = useAtom(priceAtom);
  const [, setBxShippingService] = useAtom(bxShippingServiceAtom);

  useEffect(() => {
    if (isLoading) {
      setBxShippingService(null);
    }
    if (!list.length) return;
    const [first] = list;
    if (!first) return;

    setBxShippingService(first.service);
    setPriceQuote(price);
  }, [price, list, setBxShippingService, setPriceQuote, isLoading]);

  return (
    <>
      {withRequest &&
        price
          .sort((a, b) => a.sla - b.sla)
          .map((pri) => (
            <Col col='12' key={pri.service} className='mb-6 xl:mb-0'>
              <PriceQuotePricingWrapper
                serviceType={pri.service}
                sla={pri.sla}
                price={price}
                total={pri.totalValue}
                isLoading={isLoading}
              >
                <PriceQuotePricingContent sla={pri.sla}>
                  <PriceQuotePricingContentPrice
                    price={pri.price}
                    tax={pri.tax}
                    totalValue={pri.totalValue}
                    isLoading={isLoading}
                  />
                </PriceQuotePricingContent>
              </PriceQuotePricingWrapper>
            </Col>
          ))}
    </>
  );
}

export default PriceQuotePricing;
