import { FC } from 'react';
import styled from 'styled-components';
import { Provider } from 'jotai';

import Page from 'components/layout/page';
import MainLeftJoinPymeAlternativeContent from 'components/layout/main-left-join-pyme-content';
import JoinToBusinessContent from 'components/authenticated/join-to-business/content';
import JoinToBusinessErrors from 'components/authenticated/join-to-business/errors';
import Breadcrumb from 'components/ui-bx/breadcrumb/breadcrumb';
import BreadcrumbItem from 'components/ui-bx/breadcrumb/breadcrumb-item';

const JoinToBusinessPage: FC = () => {
  return (
    <Page
      title='Unirse a empresa | Super App BlueExpress'
      description='Unirse a empresa para poder utilizar todos los servicios de BlueExpress para empresas.'
    >
      <Main>
        <Provider>
          <MainLeftJoinPymeAlternativeContent
            title='Únete a una Empresa'
            extraContent={<JoinToBusinessErrors />}
          >
            <NavContainer>
              <Breadcrumb>
                <BreadcrumbItem href='/dashboard'>Dashboard</BreadcrumbItem>
                <BreadcrumbItem active={true}>Unirse a empresa</BreadcrumbItem>
              </Breadcrumb>
            </NavContainer>
            <JoinToBusinessContent />
          </MainLeftJoinPymeAlternativeContent>
        </Provider>
      </Main>
    </Page>
  );
};

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  background: var(--bx-bg);
  position: relative;
`;

const NavContainer = styled.div`
  position: relative;
  top: -48%;
  left: -14%;

  @media (min-width: 768px) {
    top: -64%;
    left: -32%;
  }
  @media (min-width: 1200px) {
    top: -39%;
    left: -35%;
  }
`;

export default JoinToBusinessPage;
