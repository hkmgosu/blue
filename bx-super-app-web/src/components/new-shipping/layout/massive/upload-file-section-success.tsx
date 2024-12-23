import { FC } from 'react';
import { BxCheck } from '@bx-design/react-icons';

import CheckImg from 'images/check.png';
import styles from './upload-file-section-success.module.scss';
import { useMassiveProcessDetail } from 'emission-lib/hooks/massive';

const SuccessSection: FC = () => {
  const [listDetail] = useMassiveProcessDetail();

  return (
    <div className={styles.container}>
      <div className={styles.contentImg}>
        <img alt='loading' width='88' height='87' src={CheckImg} />
      </div>
      <br />
      <h5 className={styles.title}>
        Proceso completado{' '}
        <span>
          <BxCheck color='var(--bx-color-blue)' />
        </span>
      </h5>
      <br />
      <p className={styles.subtitle}>
        A continuación te mostramos los resultados de tu carga masiva. Puedes
        revisar y enmendar en la lista de envíos, para realizar esta acción sólo
        debes dar clic en el botón continuar para visualizar la tabla.
      </p>
      <br />
      <div className={styles.contentDetail}>
        <div className={styles.boxDetail}>
          <p className={styles.titleDetail}>Procesados</p>
          <div className={styles.countDetail}>
            {listDetail && listDetail.process}
          </div>
        </div>
        <div className={styles.boxDetail}>
          <p className={styles.titleDetail}>Error</p>
          <div className={styles.countDetail}>{listDetail.error}</div>
        </div>
        <div className={styles.boxDetail}>
          <p className={styles.titleDetail}>Éxito</p>
          <div className={styles.countDetail}>
            {listDetail.process - listDetail.error}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessSection;
