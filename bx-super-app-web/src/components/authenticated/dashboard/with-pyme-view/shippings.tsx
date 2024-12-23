import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { useAtom } from 'jotai';

import { Card, CardBody } from 'components/ui-bx/card';
import { Button } from 'components/ui-bx/button';
import styles from 'components/authenticated/dashboard/no-pyme-view/shippings.module.scss';
import icon from 'images/icon-haz-tu-envio.png';
import { newShippingModalAtom } from 'atoms/new-shipping/new';

const ShippingsDashboard: FC = () => {
  const [, setShowEnvios] = useAtom(newShippingModalAtom);

  return (
    <Card>
      <CardBody padding='dashboard'>
        <Row>
          <Col col='12' className='mb-4'>
            <div className={styles.header}>
              <div className={styles.headerImage}>
                <img src={icon} alt='Calculator' />
              </div>
              <h5 className={styles.title}>Haz tu envío</h5>
            </div>
          </Col>
          <Col col='12'>
            <Row>
              <Col col='12'>
                <p className={styles.appraisalText}>
                  Realiza tus envíos individuales y masivos en simples pasos
                </p>
              </Col>
            </Row>
            <Row className='justify-center'>
              <Col col='10'>
                <Button onClick={() => setShowEnvios(true)} fullWidth>
                  Nuevo Envío
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ShippingsDashboard;
