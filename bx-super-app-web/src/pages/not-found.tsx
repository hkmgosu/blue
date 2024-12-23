import { FC } from 'react';
import { Container, Row, Col } from '@bx-design/react-grid';

import styles from './not-found.module.scss';
import { Page } from 'components/layout';
import { ButtonLink } from 'components/ui-bx/button';
import notFoundImg from 'images/bx-404.png';

const NotFound: FC = () => (
  <Page
    title='¡Oh no! la página que buscas no existe |Blue Express'
    description='Quizás hay un error en la dirección o lo que buscas ya no está aquí.'
  >
    <main className={styles.main}>
      <Container>
        <Row className='items-center justify-center'>
          <Col col='12' lg='5'>
            <div className={styles.imageBox}>
              <img
                className={styles.image}
                src={notFoundImg}
                width='244'
                height='212'
                alt='404'
              />
            </div>
            <h1 className={styles.title}>
              ¡Oh no! la página que buscas no existe
            </h1>
            <p className={styles.text}>
              Quizás hay un error en la dirección o lo que buscas ya no está
              aquí.
            </p>
            <div className={styles.buttonBox}>
              <ButtonLink to='/'>Volver a la página principal</ButtonLink>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  </Page>
);

export default NotFound;
