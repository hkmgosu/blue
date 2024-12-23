import { ReactNode } from 'react';

import styles from './size-button-grid.module.scss';

type Props = {
  children: ReactNode;
};

function NewShippingLayoutSizeButtonGrid({ children }: Props): JSX.Element {
  return <div className={styles.wrapper}>{children}</div>;
}

export default NewShippingLayoutSizeButtonGrid;
