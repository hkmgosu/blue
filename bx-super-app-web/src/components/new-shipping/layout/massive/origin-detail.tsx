import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { BxEnvelope, BxPhone, BxWarehouse } from '@bx-design/react-icons';

import HandWithForm from 'components/icons/hand-and-form';

import styles from './origin-detail.module.scss';
import {
  useEmitterPymeEmail,
  useEmitterPymeName,
  useEmitterPymePhone,
} from 'emission-lib/hooks/emitter';
import { useRefund } from 'emission-lib/hooks/refund';

const OriginDetail: FC = () => {
  const [emitterPymeName] = useEmitterPymeName();
  const [email] = useEmitterPymeEmail();
  const [phone] = useEmitterPymePhone();
  const [refundAddress] = useRefund();

  return (
    <>
      <Row>
        <Col col='12'>
          <div className={styles.title}>Datos de quién envía</div>
          <br />
          <br />
        </Col>
      </Row>
      <div className={styles.body}>
        <Row>
          <Col col='3'>
            <div className={styles.label}>
              <div className={styles.icon}>
                <BxWarehouse size={24} />
              </div>
              <div>
                <b> Empresa que envía:</b> <br /> {emitterPymeName}
              </div>
            </div>
          </Col>
          <Col col='3'>
            <div className={styles.label}>
              <div className={styles.icon}>
                <BxPhone size={24} />
              </div>
              <div>
                <b>
                  Teléfono móvil: <br />
                </b>
                {phone}
              </div>
            </div>
          </Col>
          <Col col='3'>
            <div className={styles.label}>
              <div className={styles.icon}>
                <BxEnvelope size={24} />
              </div>
              <div>
                <b>
                  Correo electrónico: <br />
                </b>
                {email}
              </div>
            </div>
          </Col>
          <Col col='3'>
            <div className={styles.label}>
              <div className={styles.icon}>
                <HandWithForm size={24} color='var(--bx-color-black)' />
              </div>
              <div>
                <b>
                  Dirección del remitente: <br />
                </b>
                {`${refundAddress.address.street} ${refundAddress.address.street_number}, ${refundAddress.address.city}`}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OriginDetail;
