import { useHistory } from 'react-router-dom';
import { BxLeft } from '@bx-design/react-icons';

import styles from 'components/price-quote/result/go-back.module.scss';

function PriceQuoteGoBack(): JSX.Element {
  const history = useHistory();
  return (
    <div className={styles.link} onClick={() => history.push('/price-quote')}>
      <div className={styles.boxIcon}>
        <BxLeft color='var(--bx-color-lblue)' />
      </div>
      <div>Volver</div>
    </div>
  );
}

export default PriceQuoteGoBack;
