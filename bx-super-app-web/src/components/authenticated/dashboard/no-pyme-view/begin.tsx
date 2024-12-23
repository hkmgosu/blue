import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { Card, CardBody } from 'components/ui-bx/card';
import styles from './begin.module.scss';
import celebration from 'images/celebration.png';
import { ButtonLink } from 'components/ui-bx/button';

const BeginDashboard: FC = () => {
  return (
    <Card>
      <CardBody padding='dashboard'>
        <Row>
          <Col col='12' lg='3'>
            <div className={styles.imageContainer}>
              <img src={celebration} alt='Celebration' className={styles.img} />
            </div>
          </Col>
          <Col col='12' lg='9'>
            <Row className='items-center justify-center'>
              <Col>
                <div className={styles.title}>¡Comencemos con tus envíos!</div>
                <div className={styles.text}>
                  Inscríbete para realizar tu primer envío
                </div>
                <div>
                  <ButtonLink to='/new-business'>Inscríbete</ButtonLink>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default BeginDashboard;
