import { FC, SyntheticEvent } from 'react';
import { useAtom } from 'jotai';

import {
  joinToBusinessValuesAtom,
  joinToBusinessIsLoadingAtom,
  joinToBusinessIsErrorAtom,
  joinToBusinessErrorAtom,
  joinToBusinessIsSuccessAtom,
} from 'atoms/join-to-business';
import { joinToPymeApi } from 'api/pyme-register';
import { useAuth } from 'contexts/auth-context';

const JoinToBusinessFormSubmit: FC = ({ children }) => {
  const { user } = useAuth();
  const [values] = useAtom(joinToBusinessValuesAtom);
  const [, setIsLoading] = useAtom(joinToBusinessIsLoadingAtom);
  const [, setIsSuccess] = useAtom(joinToBusinessIsSuccessAtom);
  const [, setIsError] = useAtom(joinToBusinessIsErrorAtom);
  const [, setError] = useAtom(joinToBusinessErrorAtom);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setIsSuccess(false);

    try {
      if (user) {
        const res = await joinToPymeApi({
          ...values,
          user_id: user.sub,
        });

        if (res.is_success) {
          setIsSuccess(true);
          setIsLoading(false);
        } else {
          setIsError(true);
          setError(
            res?.payload?.message || 'Ha ocurrido un error, inténtelo más tarde'
          );
          setIsLoading(false);
          setIsSuccess(false);
        }
      }
    } catch (err) {
      setIsError(true);
      setError('Ha ocurrido un error, inténtelo más tarde');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default JoinToBusinessFormSubmit;
