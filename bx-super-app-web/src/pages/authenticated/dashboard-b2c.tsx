import { FC } from 'react';
import styled from 'styled-components';
import { Container } from '@bx-design/react-grid';

import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import B2CHeader from 'components/authenticated/dashboard/b-2c/content';
import { useAtom } from 'jotai';
import { b2CMenuShowAtom } from 'atoms/menu';
import { useEffect } from 'react';

const DashboardB2C: FC = () => {
  const [, setShowMenu] = useAtom(b2CMenuShowAtom);

  useEffect(() => {
    setShowMenu(true);
  }, [setShowMenu]);

  return (
    <Page
      title='Dashboard | BlueEnvío de BlueExpress'
      description='Dashboard de BlueEnvío de BlueExpress'
    >
      <AuthenticatedLayout>
        <Main>
          <Container fluid>
            <B2CHeader />
          </Container>
        </Main>
      </AuthenticatedLayout>
    </Page>
  );
};

const Main = styled.main`
  min-height: calc(100vh - 120px);
  background: var(--bx-bg-register);
  display: flex;
  padding: 15px 20px;
  @media (min-width: 768px) {
    padding: 15px 40px;
  }
  @media (min-width: 1200px) {
    padding: 15px 40px;
  }
`;

export default DashboardB2C;
