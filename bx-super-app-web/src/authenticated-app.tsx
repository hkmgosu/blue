import { lazy, Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LocationProvider from 'contexts/locations-context';
import { PaymentProvider } from 'contexts/payment-context';
import AccountRoutes from 'routes/account';
import ShipmentsRoutes from 'routes/shipments';

import Chatbot from 'components/chatbot';
import { Modal } from 'components/ui-bx/modal';
import WideLoader from 'components/utils/wide-loader';
import { shippingPaths } from 'config';
import { usePyme } from 'contexts/pyme/pyme-context';
import { CurrentAccountBody } from 'pages/authenticated/dashboard/current-account-body';
import PoliciesPage from 'pages/authenticated/policies';
import NewShippingRoutes from 'routes/new-shipping';

const Dashboard = lazy(() => import('pages/authenticated/dashboard'));
const DashboardSaleforce = lazy(
  () => import('pages/authenticated/dashboard/saleforce')
);
const DashboardTicketera = lazy(
  () => import('pages/authenticated/dashboard/ticketera')
);
// const DashboardB2C = lazy(() => import('pages/authenticated/dashboard-b2c'));
const NotFound = lazy(() => import('pages/not-found'));
const PymeMembers = lazy(() => import('pages/authenticated/pyme/pyme-members'));
const PymeBillingInfo = lazy(
  () => import('pages/authenticated/pyme/billing-info')
);
const PaymentResume = lazy(() => import('pages/authenticated/payment/payment'));
const Tracking = lazy(() => import('pages/authenticated/tracking/tracking'));
const NewBusinessPage = lazy(
  () => import('pages/authenticated/business/new-business')
);
const JoinToBusinessPage = lazy(
  () => import('pages/authenticated/business/join-to-business')
);
const TermsPage = lazy(() => import('pages/authenticated/terms'));
const FrequentQuestion = lazy(
  () => import('pages/authenticated/frequent-question')
);
const PriceQuotePage = lazy(() => import('pages/authenticated/price-quote'));
const PriceQuoteResultPage = lazy(
  () => import('pages/authenticated/price-quote/result')
);
const TipsPage = lazy(() => import('pages/authenticated/tips'));
const DangerousPage = lazy(
  () => import('pages/authenticated/tips/dangerous-merchandise')
);
const ManageBusinessPage = lazy(
  () => import('pages/authenticated/business/manage-business')
);
const ShippingProblemsPage = lazy(
  () => import('pages/authenticated/shipping-problems')
);
const CompensationPage = lazy(
  () => import('pages/authenticated/compensations')
);
const ProblemSolutionPage = lazy(
  () => import('pages/authenticated/problem-solution')
);

const Massive = lazy(() => import('routes/envio-masivo'));
const Unitary = lazy(() => import('routes/envio-unitario'));
const Multiple = lazy(() => import('routes/envio-multiple'));

export default function AuthenticatedApp(): JSX.Element {
  const { defaultPyme } = usePyme();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (window.location.pathname !== '/pyme-billing-info-form') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, setShowModal]);

  return (
    <>
      <LocationProvider>
        <Suspense fallback={<WideLoader />}>
          {defaultPyme &&
          !defaultPyme?.has_billing_information &&
          window.location.pathname !== '/pyme-billing-info-form' ? (
            <>
              <Modal
                isOpen={showModal}
                toggle={() => {}}
                centered
                size='xl'
                backdrop='static'
              >
                <CurrentAccountBody />
              </Modal>
              <Route path='/pyme-billing-info-form'>
                <PymeBillingInfo />
              </Route>
            </>
          ) : (
            <Switch>
              <Route path='/dashboard'>
                <Dashboard />
              </Route>
              <Route
                path='/saleforce/:view?'
                render={(props) => (
                  <DashboardSaleforce view={props.match.params.view} />
                )}
              ></Route>
              <Route path='/ticketera'>
                <DashboardTicketera />
              </Route>
              <Route path='/business-members/:id'>
                <PymeMembers />
              </Route>
              <Route path='/pyme-billing-info-form'>
                <PymeBillingInfo />
              </Route>
              <Route
                path='/bridge/be/:id'
                render={(props) => (
                  <Redirect to={`/payment-order/${props.match.params.id}`} />
                )}
              ></Route>
              <Route path='/payment-order/:id'>
                <PaymentProvider>
                  <PaymentResume />
                </PaymentProvider>
              </Route>
              <Route path='/shipments'>
                <ShipmentsRoutes />
              </Route>
              <Route path='/new-business'>
                <NewBusinessPage />
              </Route>
              <Route path='/join-to-business'>
                <JoinToBusinessPage />
              </Route>
              <Route path='/manage-business'>
                <ManageBusinessPage />
              </Route>
              <Route path='/terms-and-conditions'>
                <TermsPage />
              </Route>
              <Route path='/frequent-question'>
                <FrequentQuestion />
              </Route>
              <Route path='/privacy-policies'>
                <PoliciesPage />
              </Route>
              <Route
                path={['/tracking/:os', '/tracking']}
                render={(props: any) => <Tracking os={props.match.params.os} />}
              />
              <Route path='/new-shipping'>
                <NewShippingRoutes></NewShippingRoutes>
              </Route>
              <Route
                path={shippingPaths.massive.default}
                render={(props) => <Massive view={props.match.params.view} />}
              ></Route>
              <Route
                path={[shippingPaths.unitary.default]}
                render={(props) => <Unitary view={props.match.params.view} />}
              ></Route>
              <Route
                path={[shippingPaths.multi.default]}
                render={(props) => <Multiple view={props.match.params.view} />}
              ></Route>

              <Route exact path='/price-quote'>
                <PriceQuotePage />
              </Route>
              <Route path='/price-quote/result'>
                <PriceQuoteResultPage />
              </Route>
              <Route path='/account'>
                <AccountRoutes />
              </Route>
              <Route exact path='/tips'>
                <TipsPage />
              </Route>
              <Route exact path='/shipping-problems'>
                <ShippingProblemsPage />
              </Route>
              <Route exact path='/compensations'>
                <CompensationPage />
              </Route>
              <Route exact path='/problem-solution'>
                <ProblemSolutionPage />
              </Route>
              <Route path='/tips/dangerous-merchandise'>
                <DangerousPage />
              </Route>
              <Route exact path='/'>
                <Redirect to='/dashboard' />
              </Route>
              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>
          )}
        </Suspense>
        <Chatbot />
      </LocationProvider>
    </>
  );
}
