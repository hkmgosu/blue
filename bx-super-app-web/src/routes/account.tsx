import { FC, lazy, Suspense } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import WideLoader from 'components/utils/wide-loader';
const ProfilePage = lazy(() => import('pages/authenticated/profile'));
const ChangePasswordPage = lazy(
  () => import('pages/authenticated/profile/change-password')
);
const MyRequestsPage = lazy(
  () => import('pages/authenticated/profile/my-requests')
);

const AccountRoutes: FC = () => {
  const { url } = useRouteMatch();

  return (
    <Suspense fallback={<WideLoader />}>
      <Switch>
        <Route exact path={`${url}/`}>
          <ProfilePage />
        </Route>
        <Route path={`${url}/change-password`}>
          <ChangePasswordPage />
        </Route>
        <Route path={`${url}/my-requests`}>
          <MyRequestsPage />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default AccountRoutes;
