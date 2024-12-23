import { ReactNode } from 'react';

import styles from './sizes-grid-multi.module.scss';

type Props = {
  length: ReactNode;
  width: ReactNode;
  height: ReactNode;
  weight: ReactNode;
};

function NewShippingLayoutCurrentItemSizesGridMulti({
  length,
  width,
  height,
  weight,
}: Props): JSX.Element {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.box}>{length}</div>
        <div className={styles.box}>{width}</div>
        <div className={styles.box}>{height}</div>
        <div className={styles.box}>{weight}</div>
      </div>
    </>
  );
}

export default NewShippingLayoutCurrentItemSizesGridMulti;
