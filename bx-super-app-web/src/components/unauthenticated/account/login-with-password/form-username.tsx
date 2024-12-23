import { FC } from 'react';
import { useAtom } from 'jotai';

import { loginUsernameAtom, loginUsernameIsValidAtom } from 'atoms/login';
import { Input, Label, Feedback } from 'components/ui-bx/forms';

const LoginWithPasswordFormUsername: FC = () => {
  const [validate] = useAtom(loginUsernameIsValidAtom);
  const [username, setUsername] = useAtom(loginUsernameAtom);

  return (
    <>
      <Label htmlFor='username'>Correo electrónico</Label>
      <Input
        type='text'
        name='username'
        id='username'
        placeholder='ejemplo@mail.com'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={validate.isValid === false}
      />
      {validate.isValid === false && (
        <Feedback type='invalid' isActive={validate.isValid === false}>
          {validate.error}
        </Feedback>
      )}
    </>
  );
};

export default LoginWithPasswordFormUsername;
