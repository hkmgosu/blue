import { Col } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/summary/summary-multi-right.module.scss';
import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import NewShippingLayoutPromotionalCode from 'components/new-shipping/layout/promotional-code';
import NewShippingLayoutSummaryUnitaryRightPaymentMethod from 'components/new-shipping/layout/summary/summary-unitary-right-payment-method';
import NewShippingLayoutSummaryUnitaryRightPay from 'components/new-shipping/layout/summary/summary-unitary-right-pay';
import NewShippingLayoutModalTerms from 'components/new-shipping/layout/terms/modal-terms';
import NewShippingLayoutSummarySubmit from 'components/new-shipping/layout/summary/summary-submit';
import NewShippingLayoutPaymentSubmit from 'components/new-shipping/layout/payment/payment-submit';
import NewShippingFormSummaryBack from 'components/new-shipping/form/summary/back';
import { useTotalPrice } from 'emission-lib/hooks/pricing';
import { usePaymentMethod } from 'emission-lib/hooks/emission-state';

type Props = {
  isMassive?: boolean;
};

function NewShippingLayoutSummaryMultiRight({ isMassive }: Props): JSX.Element {
  const totalPrice = useTotalPrice();
  const [payment] = usePaymentMethod();
  return (
    <>
      {!isMassive && <NewShippingLayoutPromotionalCode />}
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
      {isMassive && payment !== 'receiver' && (
        <NewShippingLayoutPromotionalCode />
      )}
      <div className={styles.wrapperButton}>
        <Col col='6' className='hidden xl:block'>
          <NewShippingFormSummaryBack isMassive={isMassive} />
        </Col>
        <NewShippingLayoutSummarySubmit>
          <NewShippingLayoutSummaryUnitaryRightPay />
        </NewShippingLayoutSummarySubmit>
      </div>

      <NewShippingLayoutModalTerms />
      <NewShippingLayoutPaymentSubmit />
    </>
  );
}

export default NewShippingLayoutSummaryMultiRight;
