import { FC } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import { loginIsErrorAtom, loginErrorAtom } from 'atoms/login';
import { ShowAlert } from 'components/ui-bx/alert';

const LoginWithPasswordErrors: FC = () => {
  const [isError, setIsError] = useAtom(loginIsErrorAtom);
  const [error] = useAtom(loginErrorAtom);
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
  top: 8px;
  padding: 0 16px;
  @media (min-width: 1200px) {
    top: 50px;
  }
`;

const ErrorText = styled.div`
  font-weight: 800;
  font-size: 12px;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

export default LoginWithPasswordErrors;
