import { FC } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import finger from 'images/tour/fingerbox.png';
import Commonstyles from './tour-components.module.scss';
import styles from './fourth-layer.module.scss';

const FourthLayer: FC = () => {
  return (
    <div>
      <Row className='items-center justify-center'>
        <Col col='12' xl='4'>
          <div className={styles.imageContainer}>
            <img className={Commonstyles.img} src={finger} alt='' />
          </div>
        </Col>
      </Row>
      <Row className='items-center justify-center mb-4'>
        <Col col='12' xl='6'>
          <div className={Commonstyles.title}>¡Ya estamos listos!</div>
        </Col>
      </Row>
      <Row className='items-center justify-center'>
        <Col col='12' xl='6'>
          <div className={Commonstyles.subtitle}>
            Comienza haciendo tu primer envío con Blue Express
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FourthLayer;
