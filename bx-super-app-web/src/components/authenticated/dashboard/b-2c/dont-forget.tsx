import { FC } from 'react';

import styles from './dont-forget.module.scss';
import Form from 'images/form1.png';
import { Card, CardBody } from 'components/ui-bx/card';
import { Row, Col } from '@bx-design/react-grid';

const DontForgetDashboard: FC = () => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col className='lg:hidden'>
            <h5 className={styles.titleMobile}>¡No olvides! </h5>
          </Col>
          <Col col='12' lg='6' xl='4'>
            <img className={styles.img} src={Form} alt='form' />
          </Col>
          <Col col='12' lg='6' xl='8'>
            <h5 className={styles.title}>¡No olvides! </h5>
            <p>Inscribe tu empresa para acceder a nuestros servicios</p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default DontForgetDashboard;
