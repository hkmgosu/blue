import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from 'contexts/auth-context';
import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import DashboardInvitations from 'components/authenticated/dashboard/invitations';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import { salesforceTrackUrl } from 'config';

export default function SaleForce({ view }: { view?: string }): JSX.Element {
  const { user } = useAuth();
  const history = useHistory();
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [initView] = useState(view);

  const currentAccounts = useMemo(
    () =>
      btoa(
        JSON.stringify(
          user?.pymes.map((data) => data.billing_information.current_account)
        )
      ),
    [user]
  );

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'saleforce') {
        const test = event.data.message.match(/redirect:\/(.+)/);
        if (test) {
          const [, path] = test;
          if (path) {
            history.push(`/saleforce/${path}`);
          }
        }
      }
    });
  }, [history]);

  useEffect(
    () =>
      ref?.current?.contentWindow?.postMessage(
        {
          type: 'saleforce',
          message: `redirect:/${view || ''}`,
        },
        '*'
      ),
    [view]
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
            ref={ref}
            className={styles.iframe}
            scrolling='auto'
            src={`${salesforceTrackUrl}${
              initView || ''
            }?currentAccount=${currentAccounts}&channel=SUAPP&better-ux=true`}
          ></iframe>
        </div>
      </AuthenticatedLayout>
      <DashboardInvitations />
    </Page>
  );
}
