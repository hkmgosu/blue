import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import { Card, CardBody } from 'components/ui-bx/card';
import { ButtonLink } from 'components/ui-bx/button';
import styles from './shippings.module.scss';
import icon from 'images/icon-seguimiento.png';

const NoPymeTrackingDashboard: FC = () => {
  return (
    <Card>
      <CardBody padding='dashboard'>
        <div className={styles.cardHeight}>
          <Row>
            <Col col='12' xl='12' className='mb-6'>
              <div className={styles.header}>
                <div className={styles.headerImage}>
                  <img src={icon} alt='Calculator' />
                </div>
                <h5 className={styles.title}>Realiza seguimiento</h5>
              </div>
            </Col>
            <Col col='12' xl='12'>
              <Row className='justify-center'>
                <Col col='12' xl='12'>
                  <p className={styles.appraisalText}>
                    ¿Quieres saber dónde está tu pedido? Solo ingresa la orden
                    de seguimiento
                  </p>
                </Col>
                <Col col='10'>
                  <ButtonLink to='/tracking' fullWidth>
                    Seguimiento
                  </ButtonLink>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default NoPymeTrackingDashboard;
