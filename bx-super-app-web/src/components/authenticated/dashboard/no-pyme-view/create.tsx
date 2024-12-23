import { FC } from 'react';
import { useAtom } from 'jotai';
import { Row, Col } from '@bx-design/react-grid';

import styles from './create.module.scss';
import listnotebook from 'images/dashboard/listnotebook.png';
import { Card, CardBody } from 'components/ui-bx/card';
import { ButtonLink } from 'components/ui-bx/button';
import { butonActivateOnStepper } from 'atoms/dashboard';
import { useAuth } from 'contexts/auth-context';

const NoPymeCreateDashboard: FC = () => {
  const [butonState] = useAtom(butonActivateOnStepper);
  const { user } = useAuth();
  return (
    <Card>
      <CardBody padding='dashboard'>
        <div className={styles.title}>Crea y desarrolla tu empresa</div>
        <Row>
          <Col>
            <Row className='items-center justify-center'>
              <Col col='12' xl='5' sm='12'>
                <div className={styles.imageContainer}>
                  <img className={styles.img} src={listnotebook} alt='List' />
                </div>
              </Col>
              <Col col='12' xl='7'>
                <div className={styles.mainText}>
                  Si no tienes un negocio, te puedes registrar con tu nombre y
                  rut.
                </div>
                <div className={styles.buttonMargin}>
                  <ButtonLink
                    to='/new-business'
                    fullWidth
                    disabled={user?.first_steps && butonState}
                  >
                    Inscribe tu empresa
                  </ButtonLink>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        {window.innerWidth > 680 ? (
          <>
            <br />
            <br />
            <br />
          </>
        ) : (
          <></>
        )}
      </CardBody>
    </Card>
  );
};

export default NoPymeCreateDashboard;
