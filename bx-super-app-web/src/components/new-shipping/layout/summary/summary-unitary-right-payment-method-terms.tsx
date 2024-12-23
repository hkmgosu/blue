import { useEffect } from 'react';
import { DateTime } from 'luxon';

import styles from 'components/new-shipping/layout/summary/summary-unitary-right-payment-method-terms.module.scss';
import { Checkbox } from 'components/ui-bx/forms';
import { useTerms, useTermsDate } from 'emission-lib/hooks/terms';
import { useModalTerms } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutSummaryUnitaryRightPaymentMethodTerms(): JSX.Element {
  const [, setBxModalTerms] = useModalTerms();
  const [bxTerms, setBxTerms] = useTerms();
  const [, setTacAcceptedDate] = useTermsDate();
  useEffect(() => {
    if (bxTerms) {
      setTacAcceptedDate(DateTime.local().setZone('America/Santiago').toISO());
    } else {
      setTacAcceptedDate(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bxTerms]);
  return (
    <div className={styles.wrapper}>
      <Checkbox
        checked={bxTerms}
        initialChecked={bxTerms}
        onChange={() => setBxTerms((prev) => !prev)}
      />
      <span className={styles.text}>
        Acepto los{' '}
        <span className={styles.terms} onClick={() => setBxModalTerms(true)}>
          términos y condiciones
        </span>{' '}
        Blue Express
      </span>
    </div>
  );
}

export default NewShippingLayoutSummaryUnitaryRightPaymentMethodTerms;
