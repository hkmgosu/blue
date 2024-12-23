import styles from './legend.module.scss';
import { BxCheck, BxExclamation } from '@bx-design/react-icons';

function NewShippingLayoutStatusLegend(): JSX.Element {
  return (
    <div className={styles.box}>
      <div className={styles.dots}>
        <div className={styles.boxDot}>
          <span>
            <BxExclamation size={20} color='#E5713D' /> Datos incompletos
          </span>
        </div>
        <div className={styles.boxDot}>
          <span>
            <BxCheck size={20} color='#408D5C' />
            Envío Correcto
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewShippingLayoutStatusLegend;
