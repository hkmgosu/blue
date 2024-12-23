import cs from 'classnames';

import styles from './receiver-left-multi.module.scss';
import NewShippingLayoutDestinyReceiverLeftListMulti from './receiver-left-list-multi';

function NewShippingLayoutDestinyReceiverLeftMulti(): JSX.Element {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.grid}>
          <div className={cs(styles.gridColGeneric, styles.gridCol)}>
            Cliente
          </div>
          <div className={cs(styles.gridColGeneric, styles.gridCol3)}>
            Tipo <br /> envío
          </div>
          <div className={cs(styles.gridColGeneric, styles.gridCol3)}>
            Estado
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <NewShippingLayoutDestinyReceiverLeftListMulti />
      </div>
    </div>
  );
}

export default NewShippingLayoutDestinyReceiverLeftMulti;
