import { BxInfo } from '@bx-design/react-icons';
import styles from 'components/new-shipping/layout/summary/receiver-pay.module.scss';

import { RadioButton } from 'components/ui-bx/forms';
import { Tooltip } from 'components/ui-bx/tooltip';
import { usePaymentMethod } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutSummaryFreePay(): JSX.Element {
  const [payment, setPayment] = usePaymentMethod();
  return (
    <div className={styles.freeBox} onClick={() => setPayment('free')}>
      <div>
        <RadioButton
          initialChecked={payment === 'free'}
          checked={payment === 'free'}
        />
      </div>
      <div className={styles.text}>Envío gratis</div>
      <div className={styles.iconContainer}>
        <Tooltip
          content={'Disfruta de tu envío totalmente gratis!'}
          direction='center'
          style={{
            left: 'calc(30%)',
            top: 'calc(53%)',
          }}
        >
          <BxInfo size={20} />
        </Tooltip>
      </div>
    </div>
  );
}

export default NewShippingLayoutSummaryFreePay;
