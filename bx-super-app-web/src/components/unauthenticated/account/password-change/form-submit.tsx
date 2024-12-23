import { FC, SyntheticEvent } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  passwordChangeValuesAtom,
  passwordChangeIsLoadingAtom,
  passwordChangeIsErrorAtom,
  passwordChangeErrorAtom,
  passwordChangeIsSuccessAtom,
} from 'atoms/password-change';
import { changePasswordApi } from 'api/password-recover';

const PasswordChangeFormSubmit: FC = ({ children }) => {
  const history = useHistory();
  const [values] = useAtom(passwordChangeValuesAtom);
  const [, setIsLoading] = useAtom(passwordChangeIsLoadingAtom);
  const [, setIsError] = useAtom(passwordChangeIsErrorAtom);
  const [, setError] = useAtom(passwordChangeErrorAtom);
  const [, setIsSuccess] = useAtom(passwordChangeIsSuccessAtom);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      setIsSuccess(false);

      const res = await changePasswordApi(values);
      if (res.isSuccess) {
        setIsSuccess(true);
        history.push('/password-reset/success');
      } else {
        setError(res.payload.message);
        setIsError(true);
        setIsSuccess(false);
      }
    } catch (err) {
      setIsError(true);
      setError((err as Error).message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return <Form onSubmit={handleSubmit}>{children}</Form>;
};

const Form = styled.form`
  margin-bottom: 40px;
`;

export default PasswordChangeFormSubmit;
