import { FC, useState } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import { Card, CardBody } from 'components/ui-bx/card';
import { ButtonLink } from 'components/ui-bx/button';
import styles from 'components/authenticated/dashboard/no-pyme-view/shippings.module.scss';
import icon from 'images/icon-seguimiento.png';
import { Input } from 'components/ui-bx/forms';

const NoPymeTrackingDashboard: FC = () => {
  const [value, setValue] = useState<string>('');
  return (
    <Card>
      <CardBody padding='dashboard'>
        <div className={styles.cardHeight}>
          <Row>
            <Col col='12' xl='12' className='mb-4'>
              <div className={styles.header}>
                <div className={styles.headerImage}>
                  <img src={icon} alt='Calculator' />
                </div>
                <h5 className={styles.title}>Realiza seguimiento</h5>
              </div>
            </Col>
            <Col col='12' xl='12'>
              <Row className='justify-center'>
                <Col col='12' xl='12'>
                  <Input
                    placeholder='Ingresa la Orden de Servicio'
                    value={value}
                    onChange={(event) => {
                      setValue(event.currentTarget.value);
                    }}
                  ></Input>
                  <br />
                </Col>
                <Col col='10'>
                  <ButtonLink
                    to={`/tracking/${value}`}
                    fullWidth
                    disabled={!value}
                  >
                    Consultar
                  </ButtonLink>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default NoPymeTrackingDashboard;
