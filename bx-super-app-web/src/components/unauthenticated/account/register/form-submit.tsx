import { FC, SyntheticEvent, useEffect } from 'react';
import { useAtom } from 'jotai';

import {
  registerSubmitAtom,
  registerSuccessAtom,
  registerIsLoadingAtom,
} from 'atoms/register';
import {
  useRegisterDispatch,
  useRegisterState,
} from 'contexts/account/register-context';
import { useAvatar } from 'contexts/avatar-context';
import { sendEvent } from 'utils/gtm';

const RegisterFormSubmit: FC = ({ children }) => {
  const { avatar, isFile } = useAvatar();
  const [values] = useAtom(registerSubmitAtom);
  const [, setIsOpen] = useAtom(registerSuccessAtom);
  const [, setIsLoading] = useAtom(registerIsLoadingAtom);
  const { register } = useRegisterDispatch();
  const { isSuccess, error } = useRegisterState();

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
    if (isSuccess) {
      sendEvent({
        event: 'sign_up',
        method: 'email',
      });
      setIsOpen(true);
    }
  }, [isSuccess, error, setIsOpen, setIsLoading]);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    await register({
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      ...(isFile ? { file: avatar } : { avatar }),
    });
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default RegisterFormSubmit;
