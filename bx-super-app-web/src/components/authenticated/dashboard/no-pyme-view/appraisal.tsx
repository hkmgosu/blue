import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import { Card, CardBody } from 'components/ui-bx/card';
import { ButtonLink } from 'components/ui-bx/button';
import icon from 'images/icon-cotiza-tus-envios.png';
import styles from 'components/authenticated/dashboard/no-pyme-view/shippings.module.scss';

const AppraisalDashboard: FC = () => {
  return (
    <Card>
      <CardBody padding='dashboard'>
        {window.innerWidth < 680 ? (
          <Row>
            <Col col='12' xl='4'>
              <div className={styles.header}>
                <div className={styles.headerImage}>
                  <img src={icon} alt='Calculator' />
                </div>
                <h5 className={styles.title}>Cotizador</h5>
              </div>
            </Col>
            <Col col='12' xl='8'>
              <Row>
                <Col col='12' xl='6'>
                  <p className={styles.appraisalText}>
                    Cotiza el valor de los envíos que quieras, en todo momento.
                  </p>
                </Col>
                <Col col='12' xl='6'>
                  <ButtonLink fullWidth to='/price-quote'>
                    Nueva cotización
                  </ButtonLink>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <div className={styles.cardHeight}>
            <Row>
              <Col col='12' xl='12' className='mb-6'>
                <div className={styles.header}>
                  <div className={styles.headerImage}>
                    <img src={icon} alt='Calculator' />
                  </div>
                  <h5 className={styles.title}>Cotiza tus envíos</h5>
                </div>
              </Col>
              <Col col='12'>
                <Row className='justify-center'>
                  <Col col='12'>
                    <p className={styles.appraisalText}>
                      Cotiza el valor de los envíos que quieras,
                      <br /> en todo momento.
                    </p>
                  </Col>
                  <Col col='10'>
                    <ButtonLink to='/price-quote' fullWidth>
                      Cotización
                    </ButtonLink>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default AppraisalDashboard;
