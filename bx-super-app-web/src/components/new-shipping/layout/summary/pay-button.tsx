import cs from 'classnames';
import { PaymentMethod } from 'types/payment';
import styles from 'components/new-shipping/layout/summary/pay-button.module.scss';
import { RadioButton } from 'components/ui-bx/forms';
import { usePaymentMethod } from 'emission-lib/hooks/emission-state';

export interface Props {
  image: string;
  method: Lowercase<PaymentMethod>;
}

export function NewShippingLayoutSummaryPayButton({
  image,
  method,
}: Props): JSX.Element {
  const [payment, setPayment] = usePaymentMethod();
  return (
    <div
      className={styles.box}
      onClick={() => setPayment(method)}
      title={method}
    >
      <div>
        <RadioButton
          initialChecked={payment === method}
          checked={payment === method}
        />
      </div>
      <div className={styles.imageMask}>
        <div className={cs(styles.imageBox)}>
          <img src={image} alt={method} className={styles.image} />
        </div>
      </div>
    </div>
  );
}
