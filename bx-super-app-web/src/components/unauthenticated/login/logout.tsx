import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import { authLogout } from 'api/auth';
import * as configApp from 'config/';

const Logout: FC = () => {
  const { i18n } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const logout = async (): Promise<void> => {
    const res = await authLogout();
    if (res) {
      configApp.cleanTokens();
      queryClient.invalidateQueries('user').then(() => {
        history.push('/');
      });
    }
  };

  return <button onClick={logout}>{i18n.t('login.logout')}</button>;
};

export default memo(Logout);
