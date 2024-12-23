import Page from 'components/layout/page';
import PoliciesContent from 'components/unauthenticated/policies';
import Header from 'components/unauthenticated/policies/header';
import HomeFooter from 'components/unauthenticated/policies/footer';

function PoliciesPage(): JSX.Element {
  return (
    <Page
      title='Políticas de Privacidad | BlueEnvío de BlueExpress'
      description='Políticas de Privacidad de BlueEnvío de BlueExpress'
    >
      <Header />
      <PoliciesContent />
      <HomeFooter />
    </Page>
  );
}

export default PoliciesPage;
