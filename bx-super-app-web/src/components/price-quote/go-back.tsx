import { useHistory } from 'react-router-dom';
import { BxLeft } from '@bx-design/react-icons';
import cs from 'classnames';

import styles from 'components/price-quote/go-back.module.scss';

type PriceQuoteGoBackProp = {
  showBackground?: boolean;
  backToDashboard?: boolean;
};

function PriceQuoteGoBack({
  showBackground,
  backToDashboard,
}: PriceQuoteGoBackProp): JSX.Element {
  const history = useHistory();

  return (
    <div
      className={cs(styles.link, {
        [styles.linkBackground]: showBackground === true,
      })}
      onClick={() => history.push('/dashboard')}
    >
      <div className={styles.boxIcon}>
        <BxLeft color='var(--bx-color-lblue)' />
      </div>
      <div>{backToDashboard ? 'Volver al Dashboard' : 'Volver'}</div>
    </div>
  );
}

export default PriceQuoteGoBack;
