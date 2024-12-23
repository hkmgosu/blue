import cs from 'classnames';

import styles from 'components/new-shipping/layout/summary/webpay-button.module.scss';
import webpayPlus from 'images/pay-methods/webpay-plus-image.png';
import { RadioButton } from 'components/ui-bx/forms';
import { usePaymentMethod } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutSummaryWebpayButton(): JSX.Element {
  const [payment, setPayment] = usePaymentMethod();
  return (
    <div className={styles.box} onClick={() => setPayment('webpay')}>
      <div>
        <RadioButton
          initialChecked={payment === 'webpay'}
          checked={payment === 'webpay'}
        />
      </div>
      <div className={styles.imageBox}>
        <div className={cs(styles.imageWebpayPlus)}>
          <img src={webpayPlus} alt='WebPay' className={styles.image} />
        </div>
      </div>
    </div>
  );
}

export default NewShippingLayoutSummaryWebpayButton;
