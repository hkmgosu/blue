import { FC, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@bx-design/react-grid';

import { useAuth } from 'contexts/auth-context';
import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import NoPyme from 'components/authenticated/dashboard/no-pyme';
import WithPyme from 'components/authenticated/dashboard/with-pyme';
import TourModal from 'components/authenticated/dashboard/tour/tour-modal';
import DashboardInvitations from 'components/authenticated/dashboard/invitations';
import DashboardHeader from './dashboard/header';
import { useIsNaturalPerson } from 'hooks/pyme/use-is-natural-person';
import { CurrentAccount } from './dashboard/current-account';
const Dashboard: FC = () => {
  const { user } = useAuth();
  const { isNaturalPerson } = useIsNaturalPerson();
  const [show, setShow] = useState(() => (user ? user.first_login : false));

  return (
    <Page
      title='Dashboard | BlueEnvío de BlueExpress'
      description='Dashboard de BlueEnvío de BlueExpress'
    >
      <AuthenticatedLayout>
        <Main>
          <Container>
            <CurrentAccount />
            <DashboardHeader />
            {isNaturalPerson || !user?.pymes ? <NoPyme /> : <WithPyme />}
          </Container>
        </Main>
        <TourModal toggle={() => setShow(false)} isOpen={show} />
      </AuthenticatedLayout>
      <DashboardInvitations />
    </Page>
  );
};

const Main = styled.div`
  min-height: calc(100vh - 120px);
  background: var(--bx-bg-register);
  display: flex;
  justify-content: center;
  padding: 20px 20px;
`;

export default Dashboard;
