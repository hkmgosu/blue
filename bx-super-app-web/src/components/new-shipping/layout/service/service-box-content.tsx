import { useMemo } from 'react';

import styles from './service-box-content.module.scss';
import { useGetPricing } from 'hooks/use-get-pricing';
import Skeleton from 'components/utils/skeleton';
import { parseToMoney } from '../../utils/parse-to-money';

type Props = {
  serviceType: 'STANDARD' | 'NEXT DAY';
  pricingDto: {
    isPickup: boolean | undefined;
    codeOrigin: string;
    codePickup: string;
    extendedWarrantyValue: number;
    googleBasepost: string;
    broad: number;
    high: number;
    length: number;
    weight: number;
  };
};
function NewShippingLayoutServiceBoxContent({
  serviceType,
  pricingDto,
}: Props): JSX.Element {
  const { isLoading, price } = useGetPricing(pricingDto);

  const pricing = useMemo(
    () => price.find((pri) => pri.service === serviceType),
    [price, serviceType]
  );

  return (
    <>
      <div className={styles.content}>
        <div className={styles.contentBox}>
          <div className={styles.contentText}>Valor de envío:</div>
          <div className={styles.contentValue}>
            {isLoading ? (
              <Skeleton width='50px' height='20px' />
            ) : (
              pricing?.price || 0
            )}
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.contentText}>Garantía Extendida:</div>
          <div className={styles.contentValue}>
            {isLoading ? (
              <Skeleton width='50px' height='20px' />
            ) : (
              Math.round(pricing?.warrantyValue || 0)
            )}
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.contentText}>IVA:</div>
          <div className={styles.contentValue}>
            {isLoading ? (
              <Skeleton width='50px' height='20px' />
            ) : (
              Math.round(pricing?.tax || 0)
            )}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerText}>
          <div>Total:</div>
          <div>
            {isLoading ? (
              <Skeleton width='50px' height='20px' />
            ) : (
              parseToMoney(Math.round(pricing?.totalValue || 0))
            )}
          </div>
        </div>
      </footer>
    </>
  );
}

export default NewShippingLayoutServiceBoxContent;
