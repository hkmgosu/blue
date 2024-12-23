import { FC, lazy, Suspense } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import WideLoader from 'components/utils/wide-loader';

const LoginWithPasswordPage = lazy(
  () => import('pages/unauthenticated/account/login-with-password')
);
const SocialLoginPage = lazy(
  () => import('pages/unauthenticated/account/social-login')
);

const LoginRoutes: FC = () => {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<WideLoader />}>
      <Switch>
        <Route exact path={url}>
          <Redirect to='/' />
        </Route>
        <Route path={`${url}/social`}>
          <SocialLoginPage />
        </Route>
        <Route path={`${url}/with-password`}>
          <LoginWithPasswordPage />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default LoginRoutes;
