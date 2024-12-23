import { FC, SyntheticEvent } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import {
  newBusinessValuesAtom,
  newBusinessIsLoadingAtom,
  newBusinessIsErrorAtom,
  newBusinessErrorAtom,
  newBusinessIsSuccessAtom,
} from 'atoms/new-business';
import { pymeRegisterApi } from 'api/pyme-register';
import { useAuth } from 'contexts/auth-context';

const NewBusinessFormSubmit: FC = ({ children }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [values] = useAtom(newBusinessValuesAtom);
  const [, setIsLoading] = useAtom(newBusinessIsLoadingAtom);
  const [, setIsSuccess] = useAtom(newBusinessIsSuccessAtom);
  const [, setIsError] = useAtom(newBusinessIsErrorAtom);
  const [, setError] = useAtom(newBusinessErrorAtom);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setIsSuccess(false);

    try {
      if (user) {
        const res = await pymeRegisterApi({
          ...values,
          user_id: user.sub,
        });
        if (res.is_success) {
          setIsSuccess(true);
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
          setIsSuccess(false);
          if (res.rut) {
            setError(t('new_business.form.errors.exist_rut'));
          } else {
            setError(t('new_business.form.errors.exist_name'));
          }
        }
      }
    } catch (err) {
      setIsError(true);
      setError(t('new_business.form.errors.error'));
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default NewBusinessFormSubmit;
