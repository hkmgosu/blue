import cs from 'classnames';

import styles from './current-multi-tab.module.scss';
import { useMultiSelectedTab } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutCurrentTabMulti(): JSX.Element {
  const [tab, selecTab] = useMultiSelectedTab();

  return (
    <div className={styles.container}>
      <div
        className={cs(styles.tab, {
          [styles.active]: tab === 1,
        })}
        onClick={() => selecTab(1)}
      >
        <p className={styles.text}> Datos destinatario</p>
      </div>
      <div
        className={cs(styles.tab, {
          [styles.active]: tab === 2,
        })}
        onClick={() => selecTab(2)}
      >
        <p className={styles.text}>Servicio</p>
      </div>
    </div>
  );
}

export default NewShippingLayoutCurrentTabMulti;
