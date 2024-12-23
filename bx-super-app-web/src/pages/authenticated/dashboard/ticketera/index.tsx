import { useMemo } from 'react';
import { useAuth } from 'contexts/auth-context';
import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import DashboardInvitations from 'components/authenticated/dashboard/invitations';
import styles from '../saleforce/index.module.css';
import { ticketeraTrackUrl } from 'config';

export default function SaleForce(): JSX.Element {
  const { user } = useAuth();

  const currentAccounts = useMemo(
    () =>
      btoa(
        JSON.stringify(
          user?.pymes.map((data) => data.billing_information.current_account)
        )
      ),
    [user]
  );

  return (
    <Page
      title='Dashboard | BlueEnvío de BlueExpress'
      description='Dashboard de BlueEnvío de BlueExpress'
    >
      <AuthenticatedLayout overflow>
        <div className={styles.main}>
          <iframe
            title='saleforce'
            className={styles.iframe}
            scrolling='auto'
            src={`${ticketeraTrackUrl}?currentAccount=${currentAccounts}&channel=SUAPP&better-ux=true`}
          ></iframe>
        </div>
      </AuthenticatedLayout>
      <DashboardInvitations />
    </Page>
  );
}
