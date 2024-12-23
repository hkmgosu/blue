import { FC } from 'react';

import styles from './register-pyme.module.scss';
import inscribeempresa from 'images/inscribeempresa.png';
import { Card, CardBody } from 'components/ui-bx/card';
import { Row, Col } from '@bx-design/react-grid';
import { ButtonLink } from 'components/ui-bx/button';

const RegisterPymeDashboard: FC = () => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg='12'>
            <h6 className={styles.title}>Inscribe tu empresa</h6>
          </Col>
          <Col lg='5' xxl='4'>
            <div className={styles.imgContainer}>
              <img className={styles.img} src={inscribeempresa} alt='form' />
            </div>
          </Col>
          <Col lg='7' xxl='8'>
            <Col className='hidden lg:block'>
              <Row className='mb-4'></Row>
            </Col>
            <br />
            <p className={styles.text}>Registra tu empresa en pocos pasos</p>
            <Col className='hidden lg:block'>
              <Row className='mb-6'></Row>
            </Col>
            <ButtonLink to='/new-business' fullWidth>
              Inscríbela Aquí
            </ButtonLink>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default RegisterPymeDashboard;
