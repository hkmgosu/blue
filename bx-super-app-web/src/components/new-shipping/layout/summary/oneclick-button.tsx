import { BxInfo } from '@bx-design/react-icons';

import styles from 'components/new-shipping/layout/summary/oneclick-button.module.scss';
import oneClick from 'images/pay-methods/one-click-image.png';
import { RadioButton } from 'components/ui-bx/forms';
import { Tooltip } from 'components/ui-bx/tooltip';
import { useCreditCards } from 'hooks/use-credit-cards';
import { usePaymentMethod } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutSummaryOneclickButton(): JSX.Element {
  const [payment, setPayment] = usePaymentMethod();
  const { isLoading, data } = useCreditCards();

  if (isLoading) return <></>;
  if (data?.length === 0) return <></>;
  return (
    <div className={styles.box} onClick={() => setPayment('oneclick')}>
      <div className={styles.firstChild}>
        <div>
          <RadioButton
            initialChecked={payment === 'oneclick'}
            checked={payment === 'oneclick'}
          />
        </div>
        <div className={styles.imageWebpayOneclick}>
          <img src={oneClick} alt='Webpay One Click' className={styles.image} />
        </div>
      </div>

      <div className={styles.imageBox}>
        <div className={styles.iconContainer}>
          <Tooltip
            content={
              'Este servicio te permite realizar pagos de forma rápida, sin tener que ingresar los datos de su tarjetade crédito cada vez que realices un pago. Inscribe tu tarjeta una sola vez.'
            }
            direction='center'
            style={{
              left: 'calc(80%)',
              top: 'calc(53%)',
            }}
          >
            <BxInfo size={20} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default NewShippingLayoutSummaryOneclickButton;
