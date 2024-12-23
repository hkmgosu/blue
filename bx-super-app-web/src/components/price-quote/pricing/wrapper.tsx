import { ReactNode, useCallback } from 'react';
import { useAtom } from 'jotai';
import cs from 'classnames';
import { BxChronometer, BxTruck } from '@bx-design/react-icons';

import styles from 'components/price-quote/pricing/wrapper.module.scss';
import { bxShippingServiceAtom, priceAtom } from 'atoms/price-quote';
import type {
  ServicePriceType,
  SlaType,
  UseReturnQuoteType,
} from 'types/pricing';
import { slaToService } from 'components/new-shipping/utils/sla-to-service';
import { slaToServiceText } from 'components/new-shipping/utils/sla-to-service-text';
import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import { Skeleton } from 'components/utils';

type Props = {
  serviceType: ServicePriceType;
  children: ReactNode;
  sla: SlaType;
  price: UseReturnQuoteType[];
  total: number;
  isLoading: boolean;
};

function PriceQuotePricingWrapper({
  serviceType,
  sla,
  children,
  price,
  total,
  isLoading,
}: Props): JSX.Element {
  const [, setBxShippingService] = useAtom(bxShippingServiceAtom);
  const [, setPriceQuote] = useAtom(priceAtom);

  const isActive = true;

  const handleClick = useCallback(() => {
    setBxShippingService(serviceType);
    setPriceQuote(price);
  }, [setBxShippingService, serviceType, setPriceQuote, price]);

  return (
    <div
      className={cs(styles.wrapper, {
        [styles.wrapperIsActive]: isActive,
      })}
      onClick={handleClick}
    >
      <header className={styles.header}>
        <div className={styles.subheader}>
          <div className={styles.containerIcon}>
            <div className={styles.boxIcon}>
              {serviceType === 'STANDARD' ? (
                <BxTruck
                  color={isActive ? '#fff' : 'var(--bx-color-blue-fun)'}
                />
              ) : (
                <BxChronometer
                  color={isActive ? '#fff' : 'var(--bx-color-blue-fun)'}
                />
              )}
            </div>
            <div
              className={cs(styles.headerTitle, {
                [styles.headerTitleIsActive]: isActive,
              })}
            >
              {isLoading ? 'Cargando...' : slaToService(sla)}
            </div>
          </div>

          <div
            className={cs(styles.title, {
              [styles.titleIsActive]: isActive,
            })}
          >
            {isLoading ? 'Cargando...' : slaToServiceText(sla)}
          </div>
        </div>

        <div
          className={cs(styles.headerTotal, {
            [styles.headerTotalIsActive]: isActive,
          })}
        >
          Total: <br />
          {isLoading ? (
            <Skeleton width='50px' height='20px' />
          ) : (
            parseToMoney(Math.round(total))
          )}
        </div>
      </header>
      <div className={styles.line} />

      <div
        className={cs(styles.content, {
          [styles.contentIsActive]: isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default PriceQuotePricingWrapper;
