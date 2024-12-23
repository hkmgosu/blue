import Page from 'components/layout/page';
import AuthenticatedShippingLayout from 'components/layout/shipping-layout';
import NewShippingLayoutMain from 'components/new-shipping/layout/main';
import NewShippingUnitaryContent from 'components/new-shipping/unitary';

function NewShippingUnitaryPage({ view }: { view?: string }): JSX.Element {
  return (
    <Page title='Nuevo Envío | Tu Envío by Blue Express'>
      <AuthenticatedShippingLayout>
        <NewShippingLayoutMain>
          <NewShippingUnitaryContent view={view} />
        </NewShippingLayoutMain>
      </AuthenticatedShippingLayout>
    </Page>
  );
}

export default NewShippingUnitaryPage;
