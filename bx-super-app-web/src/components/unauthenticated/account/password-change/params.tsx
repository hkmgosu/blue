import { FC, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';

import {
  passwordChangeNonceAtom,
  passwordChangeUsernameAtom,
} from 'atoms/password-change';

const PasswordChangeParams: FC = () => {
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const [, setNonce] = useAtom(passwordChangeNonceAtom);
  const [, setUsername] = useAtom(passwordChangeUsernameAtom);

  useEffect(() => {
    if (queryParams.get('username') && queryParams.get('code')) {
      setNonce(queryParams.get('code'));
      setUsername(queryParams.get('username'));
    }
  }, [queryParams, setNonce, setUsername]);

  return null;
};

export default PasswordChangeParams;
