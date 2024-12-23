import cs from 'classnames';

import styles from 'components/new-shipping/layout/summary/summary-unitary-right-pay.module.scss';
import { Spinner } from 'components/ui-bx/spinner';
import { useCreateEmissionIsLoading } from 'emission-lib/hooks/create-emission-state';
import { useTerms } from 'emission-lib/hooks/terms';

function NewShippingLayoutSummaryUnitaryRightPay(): JSX.Element {
  const [bxTerms] = useTerms();
  const [isLoading] = useCreateEmissionIsLoading();
  return (
    <button
      type='submit'
      className={cs(styles.button)}
      disabled={!bxTerms || isLoading}
    >
      {isLoading && <Spinner />}
      {!isLoading && <span className={styles.text}>Pagar</span>}
    </button>
  );
}

export default NewShippingLayoutSummaryUnitaryRightPay;
