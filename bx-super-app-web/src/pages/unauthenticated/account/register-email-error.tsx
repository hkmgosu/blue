import { FC } from 'react';
import styled from 'styled-components';

import {
  useRegisterDispatch,
  useRegisterState,
} from 'contexts/account/register-context';
import { ShowAlert } from 'components/ui-bx/alert';

const RegisterMailErrors: FC = () => {
  const { showErrorMailMessage, error } = useRegisterState();
  const { showRegisterEmailError } = useRegisterDispatch();
  return (
    <Wrapper>
      <ShowAlert
        variant='danger'
        isOpen={showErrorMailMessage}
        handleClose={() => {
          showRegisterEmailError(false);
        }}
      >
        {error === 'Nombre de usuario ya existe' && (
          <>
            ¡Oh no! La dirección de correo <br /> electrónico ya está
            registrada, <br />
            intenta con otro correo.
          </>
        )}
        {error === 'Rut ya se encuentra registrado' && (
          <>¡Oh no! El Rut ingresado ya se encuentra registrado</>
        )}
      </ShowAlert>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 90px;
  z-index: 30;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  @media (min-width: 1200px) {
    padding: 0;
    right: 10px;
  }
`;

export default RegisterMailErrors;
