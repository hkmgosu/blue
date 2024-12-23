import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import TermsContent from 'components/authenticated/terms';

function TermsPage(): JSX.Element {
  return (
    <Page
      title='Términos y condiciones | BlueEnvío de BlueExpress'
      description='Términos y condiciones de BlueEnvío de BlueExpress'
    >
      <AuthenticatedLayout>
        <TermsContent />
      </AuthenticatedLayout>
    </Page>
  );
}

export default TermsPage;
