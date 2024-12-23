import { Col } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/summary/summary-unitary-right.module.scss';
import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import NewShippingLayoutPromotionalCode from 'components/new-shipping/layout/promotional-code';
import NewShippingLayoutSummaryUnitaryRightPaymentMethod from './summary-unitary-right-payment-method';
import NewShippingLayoutSummaryUnitaryRightPay from 'components/new-shipping/layout/summary/summary-unitary-right-pay';
import NewShippingLayoutModalTerms from 'components/new-shipping/layout/terms/modal-terms';
import NewShippingLayoutSummarySubmit from 'components/new-shipping/layout/summary/summary-submit';
import NewShippingLayoutPaymentSubmit from 'components/new-shipping/layout/payment/payment-submit';
import NewShippingFormSummaryBack from 'components/new-shipping/form/summary/back';
import { useTotalPrice } from 'emission-lib/hooks/pricing';

function NewShippingLayoutSummaryUnitaryRight(): JSX.Element {
  const totalPrice = useTotalPrice();
  return (
    <>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.headerText}>Total a pagar:</div>
          <div className={styles.total}>
            {parseToMoney(Math.round(totalPrice))}
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.contentTitle}>¿Cómo quieres pagar?</div>
          <div className={styles.contentText}>Selecciona un método de pago</div>
        </div>
        <NewShippingLayoutSummaryUnitaryRightPaymentMethod />
      </div>
      <NewShippingLayoutPromotionalCode />

      <div className={styles.wrapperButton}>
        <NewShippingLayoutSummarySubmit>
          <Col className='hidden xl:block'>
            <NewShippingFormSummaryBack />
          </Col>
          <NewShippingLayoutSummaryUnitaryRightPay />
        </NewShippingLayoutSummarySubmit>
      </div>

      <NewShippingLayoutModalTerms />
      <NewShippingLayoutPaymentSubmit />
    </>
  );
}

export default NewShippingLayoutSummaryUnitaryRight;
