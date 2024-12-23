import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import FrequentQuestion from 'components/authenticated/frequent-question';

function TermsPage(): JSX.Element {
  return (
    <Page
      title='Preguntas frecuentes | BlueEnvio de BlueExpress'
      description='Preguntas frecuentes de BlueEnvio de BlueExpress'
    >
      <AuthenticatedLayout>
        <FrequentQuestion />
      </AuthenticatedLayout>
    </Page>
  );
}

export default TermsPage;
