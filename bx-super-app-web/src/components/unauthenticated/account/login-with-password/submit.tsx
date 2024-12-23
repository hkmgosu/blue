import { FC } from 'react';
import { useAtom } from 'jotai';

import { loginUsernameIsValidAtom, loginIsLoadingAtom } from 'atoms/login';
import { Button } from 'components/ui-bx/button';

const LoginWithPasswordSubmit: FC = () => {
  const [validate] = useAtom(loginUsernameIsValidAtom);
  const [isLoading] = useAtom(loginIsLoadingAtom);

  return (
    <Button
      type='submit'
      fullWidth
      disabled={!validate.isValid}
      isLoading={isLoading}
    >
      Ingresar
    </Button>
  );
};

export default LoginWithPasswordSubmit;
