import { FC } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import tourImg from 'images/tour/trucktur.png';
import Commonstyles from './tour-components.module.scss';
import styles from './first-layer.module.scss';

const FirstLayer: FC = () => {
  return (
    <>
      <Row className='items-center justify-center'>
        <Col col='12' xl='4'>
          <div className={styles.imageContainer}>
            <img
              className={Commonstyles.img}
              src={tourImg}
              alt='¡Bienvenido a Blue Express!'
            />
          </div>
        </Col>
      </Row>
      <Row className='items-center justify-center mb-4'>
        <Col col='12' xl='5'>
          <div className={Commonstyles.title}>¡Bienvenido a Blue Express!</div>
        </Col>
      </Row>
      <Row className='items-center justify-center'>
        <Col col='12' xl='6'>
          <div className={Commonstyles.subtitle}>
            Somos una empresa líder en distribución y logística. Estamos
            presentes en todo el país y llegamos a cada rincón de Chile.
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FirstLayer;
