import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import { Card, CardBody } from 'components/ui-bx/card';
import { ButtonLink } from 'components/ui-bx/button';
import { useAuth } from 'contexts/auth-context';
import icon from 'images/icon-cotiza-tus-envios.png';
import styles from 'components/authenticated/dashboard/no-pyme-view/shippings.module.scss';

const AppraisalDashboard: FC = () => {
  const { user } = useAuth();

  return (
    <Card>
      <CardBody padding='dashboard'>
        {window.innerWidth < 680 ? (
          <Row>
            <Col col='12'>
              <div className={styles.header}>
                <div className={styles.headerImage}>
                  <img src={icon} alt='Calculator' />
                </div>
                <h5 className={styles.title}>Cotiza tus envíos</h5>
              </div>
            </Col>
            <Col col='12'>
              <Row>
                <Col col='12'>
                  <p className={styles.appraisalText}>
                    Los mejores precios de acuerdo al peso y destino de tu envío
                  </p>
                </Col>
                <Col col='10'>
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
              <Col col='12' className='mb-6'>
                <div className={styles.header}>
                  <div className={styles.headerImage}>
                    <img src={icon} alt='Calculator' />
                  </div>
                  <h5 className={styles.title}>Cotiza tus envíos</h5>
                </div>
              </Col>
              <Col col='12' xl='12'>
                <Row className='justify-center'>
                  <Col col='12'>
                    <p className={styles.appraisalText}>
                      Cotiza el valor de los envíos que quieras,
                      <br /> en todo momento.
                    </p>
                  </Col>
                  <Col col='10'>
                    <ButtonLink
                      to='/price-quote'
                      disabled={!user?.roles.includes('pyme')}
                      fullWidth
                    >
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
