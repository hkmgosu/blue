import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import styles from './content.module.scss';
import joinPyme from 'images/joinpyme.png';
import { useAuth } from 'contexts/auth-context';
import DontForgetDashboard from './dont-forget';
import RegisterPymeDashboard from './register-pyme';
import TracingDashboard from './tracing';

const B2CDashboardContent: FC = () => {
  const { user } = useAuth();
  return (
    <Row>
      <Col col='12' lg='6'>
        <h3 className={styles.title}>Bienvenido</h3>
        <h5 className={styles.subtitle}>{user && user.name}</h5>
        <DontForgetDashboard />
      </Col>
      <Col lg='6' className='hidden lg:block'>
        <Row className='mb-12'></Row>
        <Row className='mb-2'></Row>
        <img src={joinPyme} alt='join' width='355' height='209' />
      </Col>
      <Col lg='6'>
        <br />
        <RegisterPymeDashboard />
      </Col>

      <Col lg='6'>
        <br />
        <TracingDashboard />
      </Col>
    </Row>
  );
};

export default B2CDashboardContent;
