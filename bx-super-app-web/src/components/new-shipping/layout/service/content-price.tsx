import { BxInfo } from '@bx-design/react-icons';

import styles from 'components/new-shipping/layout/service/content-price.module.scss';
import { Tooltip } from 'components/ui-bx/tooltip';
import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import Skeleton from 'components/utils/skeleton';

type Props = {
  price: number;
  warrantyValue: number;
  tax: number;
  totalValue: number;
  isLoading: boolean;
};

function NewShippingLayoutServiceContentPrice({
  price,
  warrantyValue,
  tax,
  totalValue,
  isLoading,
}: Props): JSX.Element {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.contentBox}>
          <div className={styles.contentText}>Valor de envío:</div>
          <div className={styles.contentValue}>
            {isLoading ? (
              <Skeleton width='50px' height='20px' />
            ) : (
              parseToMoney(Math.floor(price))
            )}
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.contentWarrantyText}>
            <Tooltip
              content={
                'La garantía extendida tiene un cobro del 0.6% del valor declarado de tu producto'
              }
              direction='down'
              style={{
                left: 'calc(50% + 10px)',
                top: 'calc(73%)',
              }}
            >
              <div className={styles.iconContainer}>
                <BxInfo size={16} />
              </div>
            </Tooltip>
            <span className={styles.warrantyText}>Garantía Extendida:</span>
          </div>
          <div className={styles.contentValue}>
            {isLoading ? (
              <Skeleton width='50px' height='20px' />
            ) : (
              parseToMoney(Math.round(warrantyValue))
            )}
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.contentText}>IVA:</div>
          <div className={styles.contentValue}>
            {isLoading ? (
              <Skeleton width='50px' height='20px' />
            ) : (
              parseToMoney(Math.round(tax))
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
              parseToMoney(Math.round(totalValue))
            )}
          </div>
        </div>
      </footer>
    </>
  );
}

export default NewShippingLayoutServiceContentPrice;
