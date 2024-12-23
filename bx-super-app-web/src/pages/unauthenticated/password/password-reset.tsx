import { FC, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from '@bx-design/react-grid';

import styles from './password-reset.module.scss';
import { Card, CardBody } from 'components/ui-bx/card';
import Page from 'components/layout/page';
import MainWithBg from 'components/layout/main-with-bg';
import LogoBx from 'components/logo-bx';
import PasswordResetForm from 'components/unauthenticated/account/password-reset/form';
import PasswordResetGoBack from 'components/unauthenticated/account/password-reset/go-back';
import PasswordResetErrors from 'components/unauthenticated/account/password-reset/errors';

const PasswordResetPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page
      title={t('password-recover.recover.metas.title')}
      description={t('password-recover.recover.metas.description')}
    >
      <MainWithBg>
        <div className={styles.wrapper}>
          <Suspense fallback={<div />}>
            <PasswordResetErrors />
          </Suspense>
          <div className={styles.content}>
            <Container fluid>
              <Row>
                <Col col='12'>
                  <Card>
                    <CardBody>
                      <div className={styles.cardContent}>
                        <div className={styles.logoBoxMobile}>
                          <LogoBx width={82} />
                        </div>
                        <div className={styles.logoBox}>
                          <LogoBx width={142} />
                        </div>
                        <h1 className={styles.title}>Recuperar Contraseña</h1>
                        <p className={styles.text}>
                          ¡No te preocupes! Sólo ingresa la dirección de correo
                          electrónico con la que te has registrado y te llegará
                          un correo donde te indicaremos los pasos a seguir.
                        </p>
                        <Suspense fallback={<div />}>
                          <PasswordResetForm />
                        </Suspense>
                        <PasswordResetGoBack />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </MainWithBg>
    </Page>
  );
};

export default PasswordResetPage;
