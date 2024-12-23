import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { RegisterProvider } from 'contexts/account/register-context';
import PasswordResetRoutes from 'routes/password-reset';
import LoginRoutes from 'routes/login';
import WideLoader from 'components/utils/wide-loader';

const LoginPage = lazy(() => import('pages/unauthenticated/account/login'));
const Register = lazy(() => import('pages/unauthenticated/account/register'));
const EmailConfirmed = lazy(() => import('pages/unauthenticated/confirmed'));
const NotFound = lazy(() => import('pages/not-found'));
const PoliciesPage = lazy(() => import('pages/unauthenticated/policies'));

export default function UnauthenticatedApp(): JSX.Element {
  return (
    <Suspense fallback={<WideLoader />}>
      <Switch>
        <Route exact path='/'>
          <LoginPage />
        </Route>
        <Route path='/login'>
          <LoginRoutes />
        </Route>
        <Route path='/register'>
          <RegisterProvider>
            <Register />
          </RegisterProvider>
        </Route>
        <Route path='/privacy-policies'>
          <PoliciesPage />
        </Route>
        <Route path='/confirmed-email'>
          <EmailConfirmed />
        </Route>
        <Route path='/password-reset'>
          <PasswordResetRoutes />
        </Route>
        <Route path='/dashboard'>
          <Redirect to='/' />
        </Route>
        <Route path='/emissions'>
          <Redirect to='/' />
        </Route>
        <Route path='/business-members'>
          <Redirect to='/' />
        </Route>
        <Route path='/payment'>
          <Redirect to='/' />
        </Route>
        <Route path='/pyme-billing-info-form'>
          <Redirect to='/' />
        </Route>
        <Route
          path='/bridge/be/:id'
          render={(props) => (
            <Redirect to={`/payment-order/${props.match.params.id}`} />
          )}
        ></Route>
        <Route path='/payment-order/:id'>
          <Redirect to='/' />
        </Route>
        <Route path='/shipments'>
          <Redirect to='/' />
        </Route>
        <Route path='/new-shipping/*'>
          <Redirect to='/' />
        </Route>
        <Route path='/pyme-register'>
          <Redirect to='/' />
        </Route>
        <Route path='/new-business'>
          <Redirect to='/' />
        </Route>
        <Route path='/join-to-business'>
          <Redirect to='/' />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}
