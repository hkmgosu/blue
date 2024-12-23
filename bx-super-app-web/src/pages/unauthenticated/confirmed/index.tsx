import { FC, useEffect, useMemo, useState } from 'react';
import { Container, Row } from '@bx-design/react-grid';
import { useLocation, useHistory } from 'react-router-dom';

import styles from './confirmed.module.scss';
import { Button } from 'components/ui-bx/button';
import RegisterHeader from 'components/unauthenticated/account/register/header';
import Page from 'components/layout/page';
import celebration from 'images/celebration.png';
import { userConfirmAccountApi } from 'api/user';

const EmailConfirmed: FC = () => {
  const history = useHistory();
  const handleClick = (): void => history.push('/login/with-password');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const isValid = useMemo(
    () => queryParams.get('username') && queryParams.get('code'),
    [queryParams]
  );

  useEffect(() => {
    async function asyncFunction(): Promise<void> {
      if (!isValid) {
        history.push('/error');
      }

      const payload = {
        user: queryParams.get('username'),
        code: queryParams.get('code'),
      };

      try {
        await userConfirmAccountApi(payload);
        setIsLoading(false);
      } catch (e) {
        history.push('/error');
      }
    }

    asyncFunction();
  }, [isValid, history, queryParams]);

  return !isLoading ? (
    <Page title='Email confirmado' description='Email confirmado con exito'>
      <RegisterHeader />
      <main className={styles.main}>
        <Container fluid>
          <Row className='items-center justify-center'>
            <div className={styles.imageContainer}>
              <img className={styles.img} src={celebration} alt='Avatar' />
            </div>
          </Row>
          <Row className='items-center justify-center'>
            {' '}
            <h1 className={styles.title}>¡Felicidades!</h1>
          </Row>
          <Row className='items-center justify-center'>
            <div className={styles.subTitle}>Email confirmado con éxito.</div>
          </Row>
          <Row className='items-center justify-center'>
            {' '}
            <span className={styles.normalText}>
              Puedes ingresar a tu cuenta.
            </span>
          </Row>
          <Row className='items-center justify-center'>
            {' '}
            <div className={styles.buttonContainer}>
              <Button onClick={handleClick}>Ingresar</Button>
            </div>
          </Row>
        </Container>
      </main>
    </Page>
  ) : (
    <></>
  );
};

export default EmailConfirmed;
