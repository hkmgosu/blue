import { FC } from 'react';
import styled from 'styled-components';
import { Container } from '@bx-design/react-grid';
import Page from 'components/layout/page';
import NewBusinessContent from 'components/authenticated/new-business/content';

import AuthenticatedLayout from 'components/layout/authenticated-layout';

const NewBusinessPage: FC = () => {
  return (
    <Page
      title='Registra tu empresa | Super App BlueExpress'
      description='Registra tu empresa para poder utilizar todos los servicios de BlueExpress para empresas.'
    >
      <AuthenticatedLayout>
        <Main>
          <Container>
            <NewBusinessContent />
          </Container>
        </Main>
      </AuthenticatedLayout>
    </Page>
  );
};

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  background: var(--bx-bg-register);
  position: relative;
`;

export default NewBusinessPage;
