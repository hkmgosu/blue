import { FC } from 'react';
import { useAtom } from 'jotai';

import {
  newBusinessValuesIsValidAtom,
  newBusinessIsLoadingAtom,
} from 'atoms/new-business';
import { Button } from 'components/ui-bx/button';

const NewBusinessSubmit: FC = () => {
  const [isValid] = useAtom(newBusinessValuesIsValidAtom);
  const [isLoading] = useAtom(newBusinessIsLoadingAtom);

  return (
    <Button type='submit' fullWidth disabled={!isValid} isLoading={isLoading}>
      Inscribir Empresa
    </Button>
  );
};

export default NewBusinessSubmit;
