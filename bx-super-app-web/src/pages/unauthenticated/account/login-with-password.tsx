import { FC } from 'react';
import styled from 'styled-components';
import { Provider } from 'jotai';

import Page from 'components/layout/page';
import MainLeftAlternativeContent from 'components/layout/main-left-alternative-content';
import LoginWithPasswordContent from 'components/unauthenticated/account/login-with-password/content';
import LoginWithPasswordErrors from 'components/unauthenticated/account/login-with-password/errors';

const LoginWithPasswordPage: FC = () => {
  return (
    <Page
      title='Iniciar Sesión con email y contraseña'
      description='Inicia Sesión'
    >
      <Main>
        <Provider>
          <MainLeftAlternativeContent
            description='Ingresa con tu correo electrónico'
            extraContent={<LoginWithPasswordErrors />}
          >
            <LoginWithPasswordContent />
          </MainLeftAlternativeContent>
        </Provider>
      </Main>
    </Page>
  );
};

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  background: var(--bx-bg);
  position: relative;
`;

export default LoginWithPasswordPage;
