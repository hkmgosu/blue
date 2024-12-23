import { FC } from 'react';
import { Col, Row } from '@bx-design/react-grid';
import cs from 'classnames';

import tourImg from 'images/tour/tour-1.png';
import Commonstyles from './tour-components.module.scss';
import styles from './second-layer.module.scss';

const SecondLayer: FC = () => {
  return (
    <div>
      <Row className='items-center justify-center'>
        <Col col='9' xl='3'>
          <div className={styles.imageContainer}>
            <img className={styles.img} src={tourImg} alt='' />
          </div>
        </Col>
      </Row>
      <Row className='items-center justify-center mb-4'>
        <Col col='12' xl='6'>
          <div className={cs(Commonstyles.title, styles.title)}>
            Envía tus productos a todas partes
          </div>
        </Col>
      </Row>
      <Row className='items-center justify-center'>
        <Col col='12' xl='7'>
          <div className={Commonstyles.subtitle}>
            Haz tus envíos de manera simple y rápida. Paga tu envío y entrégalo
            en uno de nuestros puntos Blue Express cercanos a tu domicilio
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SecondLayer;
