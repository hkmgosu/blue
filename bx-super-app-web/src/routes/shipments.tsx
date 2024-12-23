import React, { FC, lazy, Suspense } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import WideLoader from 'components/utils/wide-loader';
import CancelOrderServicePage from 'pages/authenticated/shipments/cancel-order-service';
const ShipmentsList = lazy(() => import('pages/authenticated/shipments/list'));

const ShipmentsRoutes: FC = () => {
  const { url } = useRouteMatch();

  return (
    <Suspense fallback={<WideLoader />}>
      <Switch>
        <Route exact path={`${url}/list`}>
          <ShipmentsList />
        </Route>
        <Route exact path={`${url}/cancel-order-service`}>
          <CancelOrderServicePage />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default ShipmentsRoutes;
