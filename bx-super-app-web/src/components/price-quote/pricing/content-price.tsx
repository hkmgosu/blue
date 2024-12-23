import styles from 'components/price-quote/pricing/content-price.module.scss';
import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import Skeleton from 'components/utils/skeleton';

type Props = {
  price: number;
  tax: number;
  totalValue: number;
  isLoading: boolean;
};

function PriceQuotePricingContentPrice({
  price,
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
          <div className={styles.contentText}>IVA:</div>
          <div className={styles.contentValue}>
            {isLoading ? (
              <Skeleton width='50px' height='20px' />
            ) : (
              parseToMoney(Math.floor(tax))
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

export default PriceQuotePricingContentPrice;
