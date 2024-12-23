import { createContext, FC, useCallback, useContext, useEffect } from 'react';
import {
  useQueryClient,
  useQuery,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';

import { getUserApi } from 'api/user';
import * as auth from 'api/auth';
import WideLoader from 'components/utils/wide-loader';
import type { UserType } from 'types/auth';
import { sendEvent } from 'utils/gtm';
import { ddSetUser } from 'utils/dd';

export type StateType = {
  user: UserType | undefined;
  isLoading: boolean;
  isIdle: boolean;
  isSuccess: boolean;
  logout: () => void;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<UserType | undefined, Error>>;
};

const AuthContext = createContext({} as StateType);

const AuthProvider: FC = (props) => {
  const {
    data: user,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<UserType | undefined, Error>('user', getUserApi, {
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();
  const logout = useCallback(async () => {
    let userId: string = '';
    if (user) {
      userId = user.sub;
    }
    auth.deleteSession(userId);
    auth.logout();
    queryClient.removeQueries('user');
    window.location.assign('/');
  }, [queryClient, user]);

  useEffect(() => {
    if (user) {
      sendEvent({
        userId: user.sub,
      });
      ddSetUser({
        id: user.sub,
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  if (isLoading && !user) {
    return <WideLoader />;
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isIdle, isSuccess, logout, refetch }}
      {...props}
    />
  );
};

const useAuth = (): StateType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
