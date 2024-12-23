import { FC, useState } from 'react';
import { useAtom } from 'jotai';

import ShowPasswordButton from 'components/layout/show-password-button';
import { loginPasswordAtom } from 'atoms/login';
import { InputWithIcon, Label } from 'components/ui-bx/forms';

const LoginWithPasswordFormPassword: FC = () => {
  const [password, setPassword] = useAtom(loginPasswordAtom);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Label htmlFor='password'>Contraseña</Label>
      <InputWithIcon
        type={showPassword ? 'text' : 'password'}
        name='password'
        id='password'
        placeholder='Introduce contraseña'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rightIcon={
          <ShowPasswordButton
            isActive={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        }
      />
    </>
  );
};

export default LoginWithPasswordFormPassword;
