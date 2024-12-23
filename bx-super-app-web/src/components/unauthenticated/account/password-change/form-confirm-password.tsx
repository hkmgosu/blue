import { FC, useState } from 'react';
import { useAtom } from 'jotai';

import ShowPasswordButton from 'components/layout/show-password-button';
import {
  passwordChangeConfirmPasswordAtom,
  passwordChangeConfirmPasswordIsValidAtom,
} from 'atoms/password-change';
import { InputWithIcon, Label, Feedback } from 'components/ui-bx/forms';

const PasswordChangeFormConfirmPassword: FC = () => {
  const [password, setPassword] = useAtom(passwordChangeConfirmPasswordAtom);
  const [validate] = useAtom(passwordChangeConfirmPasswordIsValidAtom);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Label htmlFor='confirm-password'>
        Vuelve a escribir tu contraseña nueva.
      </Label>
      <InputWithIcon
        type={showPassword ? 'text' : 'password'}
        name='confirm-password'
        id='confirm-password'
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

export default PasswordChangeFormConfirmPassword;
