import { Col } from '@bx-design/react-grid';

import { useGetPricing } from 'hooks/use-get-pricing';
import type { PricingHookDtoType } from 'types/pricing';
import NewShippingLayoutServiceWrapper from 'components/new-shipping/layout/service/wrapper';
import NewShippingLayoutServiceContent from 'components/new-shipping/layout/service/content';
import NewShippingLayoutServiceContentPrice from 'components/new-shipping/layout/service/content-price';
import {
  useShippingPackageService,
  useShippingPackageTax,
  useShippingPackageTotalValue,
} from 'emission-lib/hooks/shipping-package';
import { useEffect } from 'react';

type Props = {
  pricingDto: PricingHookDtoType;
};

function NewShippingLayoutServicePricing({ pricingDto }: Props): JSX.Element {
  const { isLoading, price, withRequest } = useGetPricing(pricingDto);
  const [, setShippingPackageTax] = useShippingPackageTax();
  const [, setShippingPackageTotalValue] = useShippingPackageTotalValue();
  const [, setShippingPackageService] = useShippingPackageService();

  useEffect(() => {
    if (!isLoading && price) {
      setShippingPackageTax(price[0].tax);
      setShippingPackageTotalValue(price[0].totalValue);
      setShippingPackageService((prev) => ({
        ...prev,
        codeDestination: price[0].codeDestination,
        codeOrigin: price[0].codeOrigin,
        price: price[0].price,
        sla: price[0].sla,
        weight: price[0].weight,
      }));
    }
  }, [
    isLoading,
    setShippingPackageTax,
    price,
    setShippingPackageTotalValue,
    setShippingPackageService,
  ]);

  return (
    <>
      {withRequest &&
        price
          .sort((a, b) => a.sla - b.sla)
          .map((pri) => (
            <Col col='12' xl='12' key={pri.service} className='mb-6 xl:mb-0'>
              <NewShippingLayoutServiceWrapper
                serviceType={pri.service}
                sla={pri.sla}
                loading={isLoading}
              >
                <NewShippingLayoutServiceContent
                  sla={pri.sla}
                  loading={isLoading}
                >
                  <NewShippingLayoutServiceContentPrice
                    price={pri.price}
                    warrantyValue={pricingDto.extendedWarrantyValue}
                    tax={pri.tax}
                    totalValue={pri.totalValue}
                    isLoading={isLoading}
                  />
                </NewShippingLayoutServiceContent>
              </NewShippingLayoutServiceWrapper>
            </Col>
          ))}
    </>
  );
}

export default NewShippingLayoutServicePricing;
