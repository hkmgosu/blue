import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import styles from './styles.module.scss';
import ProhibitedCargo from 'components/authenticated/tips/prohibited-cargo';

export default function DangerousPage(): JSX.Element {
  return (
    <Page title='Cargas prohibidas'>
      <AuthenticatedLayout>
        <main className={styles.TipsMain}>
          <ProhibitedCargo backButton={true} spacing='default' />
        </main>
      </AuthenticatedLayout>
    </Page>
  );
}
