import { FC, useMemo, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAtom } from 'jotai';

import Page from 'components/layout/page';
import WideLoader from 'components/utils/wide-loader';
import { codeLogin } from 'api/auth';
import { redirectUri } from 'config';
import { loginIsErrorAtom, loginErrorAtom } from 'atoms/login';
import { sendEvent } from 'utils/gtm';

const SocialLoginPage: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [, setLoginIsError] = useAtom(loginIsErrorAtom);
  const [, setLoginError] = useAtom(loginErrorAtom);

  const urlCode = useMemo(
    () => new URLSearchParams(location.search).get('code'),
    [location]
  );

  useEffect(() => {
    if (!urlCode) {
      history.push('/login');
    }
  }, [urlCode, history]);

  useEffect(() => {
    const socialLoginStore = window.localStorage.getItem('social_login');
    async function socialAuth(code: string): Promise<void> {
      try {
        const res = await codeLogin(code, redirectUri + '/login/social');
        sendEvent({
          event: 'login',
          method: socialLoginStore,
        });
        if (res.access_token && socialLoginStore) {
          window.location.assign('/dashboard');
        }
      } catch (err) {
        setLoginIsError(true);
        setLoginError('Error al iniciar seción con redes sociales');
        history.push('/login');
      }
    }

    if (urlCode) {
      socialAuth(urlCode);
    }
  }, [urlCode, history, setLoginIsError, setLoginError]);

  return (
    <Page title='Inicio de Sesión con Redes Sociales'>
      <WideLoader />
    </Page>
  );
};

export default SocialLoginPage;
