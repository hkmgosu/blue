import { ReactNode } from 'react';
import styles from './sizes-grid.module.scss';

type Props = {
  length: ReactNode;
  width: ReactNode;
  height: ReactNode;
  weight: ReactNode;
  isPriceQuote?: boolean;
};

function NewShippingLayoutInputSizesGrid({
  length,
  width,
  height,
  weight,
  isPriceQuote = false,
}: Props): JSX.Element {
  return (
    <div className={styles.row}>
      {!isPriceQuote && (
        <h2 className={styles.title}>O personaliza las medidas</h2>
      )}
      <div className={styles.rowGrid}>
        <div className={styles.sizeBox}>{length}</div>
        <div className={styles.sizeBox}>{width}</div>
        <div className={styles.sizeBox}>{height}</div>
        <div className={styles.sizeBox}>{weight}</div>
      </div>
    </div>
  );
}

export default NewShippingLayoutInputSizesGrid;
