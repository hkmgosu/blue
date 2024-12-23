import Page from 'components/layout/page';
import PoliciesContent from 'components/authenticated/policies';
import AuthenticatedLayout from 'components/layout/authenticated-layout';

function PoliciesPage(): JSX.Element {
  return (
    <Page
      title='Políticas de Privacidad | BlueEnvío de BlueExpress'
      description='Políticas de Privacidad de BlueEnvío de BlueExpress'
    >
      <AuthenticatedLayout>
        <PoliciesContent />
      </AuthenticatedLayout>
    </Page>
  );
}

export default PoliciesPage;
