import { Col, Row } from '@bx-design/react-grid';
import { ButtonLink } from 'components/ui-bx/button';
import { Card, CardBody } from 'components/ui-bx/card';
import { FC } from 'react';
import styles from './shippings.module.scss';
import icon from 'images/icon-empresa.png';

const NoPymeCompanyDashboard: FC = () => {
  return (
    <Card>
      <CardBody padding='dashboard'>
        <div className={styles.cardHeight}>
          <Row>
            <Col col='12' xl='12' className='mb-6'>
              <div className={styles.header}>
                <div className={styles.headerImage}>
                  <img src={icon} alt='list' />
                </div>
                <h5 className={styles.title}>¿Tienes una empresa?</h5>
              </div>
            </Col>
            <Col col='12' xl='12'>
              <Row className='justify-center'>
                <Col col='12' xl='12'>
                  <p className={styles.appraisalText}>
                    Inscribe tu negocio si necesitas factura o si te ayudamos en
                    algun convenio
                  </p>
                </Col>
                <Col col='10'>
                  <ButtonLink to='/new-business' fullWidth>
                    Inscribe tu empresa
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

export default NoPymeCompanyDashboard;
