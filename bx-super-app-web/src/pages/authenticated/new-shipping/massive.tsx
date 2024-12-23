import Page from 'components/layout/page';
import AuthenticatedShippingLayout from 'components/layout/shipping-layout';
import NewShippingLayoutMain from 'components/new-shipping/layout/main';
import NewShippingMassiveContent from 'components/new-shipping/massive';

function NewShippingMassivePage({ view }: { view?: string }): JSX.Element {
  return (
    <Page title='Nuevo Envío | Tu Envío by Blue Express'>
      <AuthenticatedShippingLayout>
        <NewShippingLayoutMain title='Envío masivo'>
          <NewShippingMassiveContent view={view} />
        </NewShippingLayoutMain>
      </AuthenticatedShippingLayout>
    </Page>
  );
}

export default NewShippingMassivePage;
