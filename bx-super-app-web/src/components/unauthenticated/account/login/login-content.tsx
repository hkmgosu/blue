import { FC } from 'react';
import styled from 'styled-components';

import LoginWithPasswordButton from './login-with-password';
import LoginGoogle from './login-google';
import LoginFacebook from './login-facebook';
import LoginToRegister from './to-register';

const LoginContent: FC = () => {
  return (
    <Wrapper>
      <ButtonsGroup>
        <LoginWithPasswordButton />
        <LoginGoogle />
        <LoginFacebook />
      </ButtonsGroup>
      <LoginToRegister />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  @media (min-width: 1200px) {
    width: 310px;
    padding: 0;
  }
`;

const ButtonsGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 30px;
`;

export default LoginContent;
