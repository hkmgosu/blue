import { FC } from 'react';
import { Provider } from 'jotai';
import { Container, Row, Col } from '@bx-design/react-grid';

import styles from './register.module.scss';
import Page from 'components/layout/page';
import RegisterHeader from 'components/unauthenticated/account/register/header';
import { Card, CardBody } from 'components/ui-bx/card';
import RegisterAvatar from 'components/unauthenticated/account/register/avatar';
import RegisterForm from 'components/unauthenticated/account/register/form';
import Footer from 'components/layout/footer';
import AvatarModal from 'components/unauthenticated/account/register/avatar-modal';
import RegisterMailErrors from './register-email-error';

const Register: FC = () => {
  return (
    <Page
      title='Crear cuenta'
      description='Crea tu cuenta y gestiona tus envíos rápidamente'
    >
      <RegisterHeader />
      <main className={styles.main}>
        <Container fluid>
          <RegisterMailErrors />
          <Row className='items-center'>
            <Col col='12'>
              <Card>
                <CardBody>
                  <Row className='items-center justify-around mb-12'>
                    <Col col='12' lg='5'>
                      <h1 className={styles.title}>Crea tu cuenta</h1>
                      <p className={styles.text}>
                        ¡Y gestiona tus envíos rápidamente!
                      </p>
                    </Col>
                    <Col col='12' lg='5'>
                      <RegisterAvatar />
                    </Col>
                  </Row>
                  <Provider>
                    <RegisterForm />
                  </Provider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
      <AvatarModal />
    </Page>
  );
};

export default Register;
