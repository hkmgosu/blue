import { FC } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import {
  passwordChangeIsErrorAtom,
  passwordChangeErrorAtom,
} from 'atoms/password-change';
import { ShowAlert } from 'components/ui-bx/alert';

const PasswordChangeErrors: FC = () => {
  const [isError, setIsError] = useAtom(passwordChangeIsErrorAtom);
  const [error] = useAtom(passwordChangeErrorAtom);
  return (
    <Wrapper>
      <ShowAlert
        variant='danger'
        isOpen={isError}
        handleClose={() => setIsError(false)}
      >
        <ErrorText>{error}</ErrorText>
      </ShowAlert>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50px;
  z-index: 30;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ErrorText = styled.div`
  font-weight: 800;
  font-size: 12px;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

export default PasswordChangeErrors;
