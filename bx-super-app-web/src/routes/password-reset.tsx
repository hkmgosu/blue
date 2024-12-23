import { FC, lazy, Suspense } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Provider } from 'jotai';

import WideLoader from 'components/utils/wide-loader';
const PasswordResetPage = lazy(
  () => import('pages/unauthenticated/password/password-reset')
);
const PasswordResetEmailPage = lazy(
  () => import('pages/unauthenticated/password/password-reset-email')
);
const PasswordResetChangePage = lazy(
  () => import('pages/unauthenticated/password/password-reset-change')
);
const PasswordChangedSuccess = lazy(
  () => import('pages/unauthenticated/password/password-changed-success')
);

const PasswordResetRoutes: FC = () => {
  const { url } = useRouteMatch();

  return (
    <Provider>
      <Suspense fallback={<WideLoader />}>
        <Switch>
          <Route exact path={url}>
            <PasswordResetPage />
          </Route>
          <Route path={`${url}/email`}>
            <PasswordResetEmailPage />
          </Route>
          <Route path={`${url}/new`}>
            <PasswordResetChangePage />
          </Route>
          <Route path={`${url}/success`}>
            <PasswordChangedSuccess />
          </Route>
        </Switch>
      </Suspense>
    </Provider>
  );
};

export default PasswordResetRoutes;
