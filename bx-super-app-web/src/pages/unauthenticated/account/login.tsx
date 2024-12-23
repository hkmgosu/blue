import { FC } from 'react';
import styled from 'styled-components';
import Page from 'components/layout/page';
import MainLeftContent from 'components/layout/main-left-content';
import LoginContent from 'components/unauthenticated/account/login/login-content';

const LoginPage: FC = () => {
  return (
    <Page title='Iniciar Sesión' description='Inicia Sesión'>
      <Main>
        <MainLeftContent
          title={'¡Bienvenido!'}
          description='Realiza tus envíos a todo Chile'
        >
          <SubTitle>Ingresa con la plataforma que más te acomode</SubTitle>
          <LoginContent />
        </MainLeftContent>
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

const SubTitle = styled.p`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 145%;
  text-align: center;
  letter-spacing: 0.03em;
  color: #333333;
`;

export default LoginPage;
