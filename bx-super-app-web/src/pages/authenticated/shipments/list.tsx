import { FC } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '@bx-design/react-grid';

import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import ShipmentListContent from 'components/authenticated/shipments/list/content';

const ShipmentsList: FC = () => (
  <Page>
    <AuthenticatedLayout>
      <Main>
        <Container fluid>
          <Row>
            <Col col='12'>
              <Title>Lista de Envíos</Title>
            </Col>
            <Col col='12'>
              <ShipmentListContent />
            </Col>
          </Row>
        </Container>
      </Main>
    </AuthenticatedLayout>
  </Page>
);

const Main = styled.main`
  padding: 20px;
  background-color: var(--bx-color-lblue-day);
  min-height: calc(100vh - 120px);
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 21px;
  margin-bottom: 24px;
`;

ShipmentsList.displayName = 'ShipmentsListPage';

export default ShipmentsList;
