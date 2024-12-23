import Page from 'components/layout/page';
import AuthenticatedShippingLayout from 'components/layout/shipping-layout';
import NewShippingLayoutMain from 'components/new-shipping/layout/main';
import NewShippingMultiContent from 'components/new-shipping/multi';

function NewShippingMultiPage({ view }: { view?: string }): JSX.Element {
  return (
    <Page title='Nuevo Envío | Tu Envío by Blue Express'>
      <AuthenticatedShippingLayout>
        <NewShippingLayoutMain>
          <NewShippingMultiContent view={view} />
        </NewShippingLayoutMain>
      </AuthenticatedShippingLayout>
    </Page>
  );
}

export default NewShippingMultiPage;
