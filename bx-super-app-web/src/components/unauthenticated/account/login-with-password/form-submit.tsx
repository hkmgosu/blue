import { FC, SyntheticEvent } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import {
  loginSubmitAtom,
  loginIsLoadingAtom,
  loginIsErrorAtom,
  loginErrorAtom,
  loginIsSuccessAtom,
} from 'atoms/login';
import { login as loginApi } from 'api/auth';
import type { LoginResponseNok } from 'types/auth';
import { sendEvent } from 'utils/gtm';

const LoginWithPasswordFormSubmit: FC = ({ children }) => {
  const { t } = useTranslation();
  const [values] = useAtom(loginSubmitAtom);
  const [, setIsLoading] = useAtom(loginIsLoadingAtom);
  const [, setIsSuccess] = useAtom(loginIsSuccessAtom);
  const [, setIsError] = useAtom(loginIsErrorAtom);
  const [, setError] = useAtom(loginErrorAtom);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const res = await loginApi({ ...values });

      if (res.type === 'success' && res.data) {
        sendEvent({
          event: 'login',
          method: 'email',
        });
        setIsSuccess(true);
        window.location.assign('/dashboard');

        return;
      }

      if (res.type === 'incorrect') {
        const responseData = res.data as LoginResponseNok;

        if (responseData.disabled) {
          setIsError(true);
          setIsSuccess(false);
          setError(t('login.errors.locked'));
          return;
        }

        setIsError(true);
        setIsSuccess(false);
        setError(t('login.errors.bad_password'));
        return;
      }

      if (res.type === 'notConfirmed') {
        setIsError(true);
        setIsSuccess(false);
        setError(t('login.errors.not_confirmed'));
        return;
      }

      if (res.type === 'invalid') {
        setIsError(true);
        setIsSuccess(false);
        setError(t('login.errors.invalid'));
        return;
      }
    } catch (err) {
      setIsError(true);
      setError(t('login.errors.unknown'));
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete='on'>
      {children}
    </form>
  );
};

export default LoginWithPasswordFormSubmit;
