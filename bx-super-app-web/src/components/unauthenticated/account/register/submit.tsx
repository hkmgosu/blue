import { FC } from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row } from '@bx-design/react-grid';

import {
  registerSubmitIsValidAtom,
  registerIsLoadingAtom,
} from 'atoms/register';
import { Button } from 'components/ui-bx/button';

const RegisterSubmit: FC = () => {
  const [isValid] = useAtom(registerSubmitIsValidAtom);
  const [isLoading] = useAtom(registerIsLoadingAtom);

  return (
    <>
      <Button type='submit' fullWidth disabled={!isValid} isLoading={isLoading}>
        Registrarme
      </Button>
      <Row className='items-center justify-center'>
        <Links to={'/login'}>Volver</Links>
      </Row>
    </>
  );
};

const Links = styled(Link)`
  width: max-content;
  margin: 10px auto;
  padding: 30px 0 0 0;
`;

export default RegisterSubmit;
