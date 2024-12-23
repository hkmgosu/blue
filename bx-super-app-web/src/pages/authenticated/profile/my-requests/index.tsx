import { Container, Row, Col } from '@bx-design/react-grid';

import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import styles from './styles.module.scss';
import { Breadcrumb, BreadcrumbItem } from 'components/ui-bx/breadcrumb';
import MyRequestsContent from 'components/authenticated/my-requests/content';

export default function MyRequestsPage(): JSX.Element {
  return (
    <Page title='Mis Solicitudes | BlueEnvío by BlueExpress'>
      <AuthenticatedLayout>
        <main className={styles.Main}>
          <Container fluid>
            <Row className='mb-6'>
              <Col col='12'>
                <Breadcrumb>
                  <BreadcrumbItem href='/account'>Mi cuenta</BreadcrumbItem>
                  <BreadcrumbItem active>Mis solicitudes</BreadcrumbItem>
                </Breadcrumb>
              </Col>
            </Row>
            <Row>
              <Col col='12' className='mb-6'>
                <h1 className={styles.Title}>Mis solicitudes</h1>
              </Col>
              <Col col='12'>
                <MyRequestsContent />
              </Col>
            </Row>
          </Container>
        </main>
      </AuthenticatedLayout>
    </Page>
  );
}
