import { FC, useState } from 'react';
import { useAtom } from 'jotai';

import ShowPasswordButton from 'components/layout/show-password-button';
import {
  passwordChangePasswordAtom,
  passwordChangePasswordIsValidAtom,
} from 'atoms/password-change';
import { InputWithIcon, Label, Feedback } from 'components/ui-bx/forms';

const PasswordChangeFormPassword: FC = () => {
  const [password, setPassword] = useAtom(passwordChangePasswordAtom);
  const [validate] = useAtom(passwordChangePasswordIsValidAtom);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Label htmlFor='new-password'>Escribe tu contraseña nueva</Label>
      <InputWithIcon
        type={showPassword ? 'text' : 'password'}
        name='new-password'
        id='new-password'
        placeholder='Tu nueva contraseña'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={validate.isValid === false}
        rightIcon={
          <ShowPasswordButton
            isActive={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        }
      />
      {validate.isValid === false && (
        <Feedback type='invalid' isActive={validate.isValid === false}>
          {validate.error}
        </Feedback>
      )}
    </>
  );
};

export default PasswordChangeFormPassword;
