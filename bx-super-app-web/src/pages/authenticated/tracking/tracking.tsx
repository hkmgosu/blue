import { Page } from 'components/layout';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import TrackingComponent from 'components/authenticated/tracking';

const Tracking = ({ os }: { os?: string }): JSX.Element => (
  <Page title='Tracking'>
    <AuthenticatedLayout overflow>
      <TrackingComponent os={os} />
    </AuthenticatedLayout>
  </Page>
);

export default Tracking;
