import { ReactNode } from 'react';

import styles from './buttons-grid.module.scss';

type Props = {
  children: ReactNode;
};

function PriceQuoteSizesButtonsGrid({ children }: Props): JSX.Element {
  return <div className={styles.wrapper}>{children}</div>;
}

export default PriceQuoteSizesButtonsGrid;
