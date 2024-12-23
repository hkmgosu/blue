import { FC, SyntheticEvent } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  passwordResetEmailAtom,
  passwordResetIsLoadingAtom,
  passwordResetIsSuccessAtom,
  passwordResetIsErrorAtom,
  passwordResetErrorAtom,
} from 'atoms/password-reset';
import { generateResetPasswordCodeApi } from 'api/password-recover';

const PasswordResetFormSubmit: FC = ({ children }) => {
  const [email] = useAtom(passwordResetEmailAtom);
  const [, setIsLoading] = useAtom(passwordResetIsLoadingAtom);
  const [, setIsSuccess] = useAtom(passwordResetIsSuccessAtom);
  const [, setIsError] = useAtom(passwordResetIsErrorAtom);
  const [, setError] = useAtom(passwordResetErrorAtom);
  const history = useHistory();

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setIsSuccess(false);

    try {
      const res = await generateResetPasswordCodeApi(email);

      if (res.user_exist) {
        setIsSuccess(true);
        history.push(`/password-reset/email?email=${email}`);
      } else {
        setError(res.payload.message);
        setIsError(true);
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

export default PasswordResetFormSubmit;
