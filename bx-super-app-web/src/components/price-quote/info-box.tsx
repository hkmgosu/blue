import { ReactNode } from 'react';
import { BxExclamation } from '@bx-design/react-icons';

import styles from './info-box.module.scss';

type Props = {
  title?: ReactNode;
  secondaryText?: ReactNode;
};

function PriceQuoteInfoBox({ title, secondaryText }: Props): JSX.Element {
  return (
    <div className={styles.box}>
      <div className={styles.row}>
        <div className={styles.icon}>
          <BxExclamation color='var(--bx-color-orange)' size={32} />
        </div>
        <div className={styles.content}>
          <div className={styles.subtitle}>{title}</div>
          {secondaryText && <div className={styles.text}>{secondaryText}</div>}
        </div>
      </div>
    </div>
  );
}

export default PriceQuoteInfoBox;
