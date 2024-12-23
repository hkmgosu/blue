import Page from 'components/layout/page';
import AuthenticatedShippingLayout from 'components/layout/shipping-layout';
import PriceQuoteLayout from 'components/price-quote/layout';
import PriceQuoteContent from 'components/price-quote/content';
import { ToastContainer } from 'react-toastify';
import { usePyme } from 'contexts/pyme/pyme-context';
import { priceQuoteUrl } from 'config';
import style from './styles.module.scss';
import PriceQuoteGoBack from 'components/price-quote/go-back';

function PriceQuotePage(): JSX.Element {
  const { defaultPyme } = usePyme();

  return (
    <Page title='Cotiza el valor de tu envío | Tu Envío by Blue Express'>
      <AuthenticatedShippingLayout>
        {defaultPyme ? (
          <PriceQuoteLayout title='Cotiza el valor de tu envío'>
            <ToastContainer />
            <PriceQuoteContent />
          </PriceQuoteLayout>
        ) : (
          <>
            <PriceQuoteGoBack showBackground={true} backToDashboard={true} />

            <div className={style.container}>
              <iframe
                src={priceQuoteUrl}
                title='Cotiza el valor de tu envío'
                className={style.responsiveIframe}
              ></iframe>
            </div>
          </>
        )}
      </AuthenticatedShippingLayout>
    </Page>
  );
}

export default PriceQuotePage;
