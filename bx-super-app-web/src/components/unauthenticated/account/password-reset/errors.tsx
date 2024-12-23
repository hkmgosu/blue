import { FC } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import { passwordResetIsErrorAtom } from 'atoms/password-reset';
import { ShowAlert } from 'components/ui-bx/alert';

const PasswordResetErrors: FC = () => {
  const [isError, setIsError] = useAtom(passwordResetIsErrorAtom);
  return (
    <Wrapper>
      <ShowAlert
        variant='danger'
        isOpen={isError}
        handleClose={() => setIsError(false)}
      >
        <ErrorText>
          Parece que aún no tienes cuenta. Regístrate para que puedas gestionar
          tus envíos.
        </ErrorText>
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
  }
`;

const ErrorText = styled.div`
  font-weight: 800;
  font-size: 12px;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

export default PasswordResetErrors;
