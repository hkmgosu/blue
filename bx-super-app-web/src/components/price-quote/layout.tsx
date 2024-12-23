import { ReactNode } from 'react';
import { Container, Row, Col } from '@bx-design/react-grid';
import { Provider } from 'jotai';

import styles from './layout.module.scss';
import PriceQuoteGoBack from './go-back';

type Props = {
  title?: string;
  children: ReactNode;
};

function PriceQuoteLayout({ title, children }: Props): JSX.Element {
  return (
    <main className={styles.main}>
      <Container fluid>
        <Row className='justify-center'>
          <Col xl='12' xxl='10'>
            <PriceQuoteGoBack />
          </Col>
          <Col col='12' xl='12' xxl='10'>
            <h1 className={styles.title}>{title || 'Envíos'}</h1>
          </Col>
        </Row>

        <Row className='justify-center'>
          <Col xl='12' xxl='10'>
            <Provider>{children}</Provider>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default PriceQuoteLayout;
