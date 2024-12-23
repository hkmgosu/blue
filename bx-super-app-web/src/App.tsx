import { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { useAuth } from 'contexts/auth-context';
import { useGTM } from 'hooks/use-gtm';
import UnauthenticatedApp from './unauthenticated-app';
import AuthenticatedApp from './authenticated-app';
import { Route, Switch } from 'react-router-dom';

const App: FC = () => {
  useGTM();
  const { user } = useAuth();

  return (
    <Switch>
      <Route>
        <HelmetProvider>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </HelmetProvider>
      </Route>
    </Switch>
  );
};

export default App;
