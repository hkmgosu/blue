import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Page from 'components/layout/page';
import AuthenticatedShippingLayout from 'components/layout/shipping-layout';
import { PriceQuoteSummaryType } from 'atoms/price-quote/types';
import PriceQuoteResultContent from 'components/price-quote/result/content';

function PriceQuoteResultPage(): JSX.Element {
  const location = useLocation<PriceQuoteSummaryType>();
  const history = useHistory();

  useEffect(() => {
    if (!location.state.businessName) {
      history.push('/not-found');
    }
  }, [location, history]);
  return (
    <Page title='Resumen de la cotización | Tu Envío by Blue Express'>
      <AuthenticatedShippingLayout>
        <PriceQuoteResultContent state={location.state} />
      </AuthenticatedShippingLayout>
    </Page>
  );
}

export default PriceQuoteResultPage;
