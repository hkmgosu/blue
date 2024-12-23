import { FC } from 'react';
import { useAtom } from 'jotai';

import {
  passwordChangeValuesIsValidAtom,
  passwordChangeIsLoadingAtom,
} from 'atoms/password-change';
import { Button } from 'components/ui-bx/button';

const PasswordChangePasswordSubmit: FC = () => {
  const [isValid] = useAtom(passwordChangeValuesIsValidAtom);
  const [isLoading] = useAtom(passwordChangeIsLoadingAtom);

  return (
    <Button type='submit' fullWidth disabled={!isValid} isLoading={isLoading}>
      Guardar
    </Button>
  );
};

export default PasswordChangePasswordSubmit;
