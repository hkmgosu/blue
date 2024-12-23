import { FC } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import persons from 'images/tour/persons.png';
import commonstyles from './tour-components.module.scss';
import styles from './third-layer.module.scss';

const ThirdLayer: FC = () => (
  <div>
    <Row className='items-center justify-center'>
      <Col col='12' xl='4'>
        <div className={styles.imageContainer}>
          <img
            className={commonstyles.img}
            src={persons}
            alt='Para personas y empresas'
          />
        </div>
      </Col>
    </Row>
    <Row className='items-center justify-center mb-4'>
      <Col col='12' xl='7'>
        <div className={commonstyles.title}>Para personas y empresas</div>
      </Col>
    </Row>
    <Row className='items-center justify-center'>
      <Col col='12' xl='6'>
        <div className={commonstyles.subtitle}>
          Haz tus envíos como persona natural o inscribe tu empresa, agrega
          colaboradores y pide factura. ¡Comienza con tus envíos!
        </div>
      </Col>
    </Row>
  </div>
);

export default ThirdLayer;
