import { BxInfo } from '@bx-design/react-icons';
import styles from 'components/new-shipping/layout/summary/receiver-pay.module.scss';
import cs from 'classnames';

import { RadioButton } from 'components/ui-bx/forms';
import { Tooltip } from 'components/ui-bx/tooltip';
import { usePaymentMethod } from 'emission-lib/hooks/emission-state';
import { useWithPromotion } from 'emission-lib/hooks/promotion';

function NewShippingLayoutSummaryReceiverPay(): JSX.Element {
  const [payment, setPayment] = usePaymentMethod();
  const [isWithPromotion] = useWithPromotion();
  return (
    <div
      className={cs(styles.box, {
        [styles.disabledBox]: isWithPromotion,
      })}
      onClick={() => {
        if (isWithPromotion) return;
        setPayment('receiver');
      }}
    >
      <div className={styles.content}>
        <div>
          <RadioButton
            disabled={isWithPromotion}
            initialChecked={payment === 'receiver'}
            checked={payment === 'receiver'}
          />
        </div>
        <div className={styles.text}>Envío por pagar destinatario</div>
        <div className={styles.iconContainer}>
          <Tooltip
            content={'El destinatario pagará cuando reciba o retire el envío.'}
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
      <div className={styles.alert}>
        El destinatario deberá pagar cuando reciba el envío.
        <br />
        Esta opción no permite aplicar códigos de descuento
      </div>
    </div>
  );
}

export default NewShippingLayoutSummaryReceiverPay;
