import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import { Card, CardBody } from 'components/ui-bx/card';
import { Button } from 'components/ui-bx/button';
import styles from './appraisal.module.scss';
import icon from 'images/icon-haz-tu-envio.png';

const NoPymeShippingsDashboard: FC = () => {
  return (
    <Card>
      <CardBody padding='dashboard'>
        <div className={styles.cardHeight}>
          <Row>
            <Col col='12' xl='12' className='mb-6'>
              <div className={styles.header}>
                <div className={styles.calculatorImageContainer}>
                  <img
                    className={styles.imgCalculator}
                    src={icon}
                    alt='Calculator'
                  />
                </div>
                <h5 className={styles.title}>Haz tu envío</h5>
              </div>
            </Col>
            <Col col='12' xl='12'>
              <Row className='justify-center'>
                <Col col='12' xl='12'>
                  <p className={styles.appraisalText}>
                    Hazlo fácil, realiza tus envíos de manera simple en un par
                    de clicks.
                  </p>
                </Col>
                <Col col='12' xl='8'>
                  <Button disabled fullWidth>
                    Nuevo envío
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default NoPymeShippingsDashboard;
