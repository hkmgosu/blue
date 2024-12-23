import { lazy, Suspense } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import WideLoader from 'components/utils/wide-loader';
import WideLoaderMassive from 'components/utils/wide-loader-massive';
import FrequentOriginProvider from 'contexts/frequent-origin-context';

const NewShippingUnitaryPage = lazy(
  () => import('pages/authenticated/new-shipping/unitary')
);
const NewShippingMultiPage = lazy(
  () => import('pages/authenticated/new-shipping/multi')
);
const NewShippingMassivePage = lazy(
  () => import('pages/authenticated/new-shipping/massive')
);

function NewShippingRoutes(): JSX.Element {
  const { url } = useRouteMatch();
  return (
    <FrequentOriginProvider>
      <Switch>
        <Route exact path={`${url}/unitary`}>
          <Suspense fallback={<WideLoader />}>
            <NewShippingUnitaryPage />
          </Suspense>
        </Route>
        <Route exact path={`${url}/multi`}>
          <Suspense fallback={<WideLoader />}>
            <NewShippingMultiPage />
          </Suspense>
        </Route>
        <Route exact path={`${url}/massive`}>
          <Suspense fallback={<WideLoaderMassive />}>
            <NewShippingMassivePage />
          </Suspense>
        </Route>
      </Switch>
    </FrequentOriginProvider>
  );
}

export default NewShippingRoutes;
