import { FC } from 'react';
import { useAtom } from 'jotai';

import {
  joinToBusinessValuesIsValidAtom,
  joinToBusinessIsLoadingAtom,
} from 'atoms/join-to-business';
import { Button } from 'components/ui-bx/button';

const JoinToBusinessSubmit: FC = () => {
  const [isValid] = useAtom(joinToBusinessValuesIsValidAtom);
  const [isLoading] = useAtom(joinToBusinessIsLoadingAtom);

  return (
    <Button type='submit' fullWidth disabled={!isValid} isLoading={isLoading}>
      Acceder
    </Button>
  );
};

export default JoinToBusinessSubmit;
