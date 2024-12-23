import { Container, Row, Col } from '@bx-design/react-grid';

import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import styles from './styles.module.scss';
import ManageBusinessContent from 'components/authenticated/manage-business/content';

export default function ManageBusinessPage(): JSX.Element {
  return (
    <Page title='Gestión de Equipo | BlueEnvío by BlueExpress'>
      <AuthenticatedLayout>
        <main className={styles.Main}>
          <Container fluid>
            <Row>
              <Col col='12' className='mb-6'>
                <h1 className={styles.Title}>Gestionar mi equipo</h1>
              </Col>
              <Col col='12'>
                <ManageBusinessContent />
              </Col>
            </Row>
          </Container>
        </main>
      </AuthenticatedLayout>
    </Page>
  );
}
