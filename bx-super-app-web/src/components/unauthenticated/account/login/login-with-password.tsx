import { FC } from 'react';
import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';
import { BxEnvelope } from '@bx-design/react-icons';
import { useAtomValue } from 'jotai/utils';

import {
  loginGoogleIsLoadingAtom,
  loginFacebookIsLoadingAtom,
} from 'atoms/login';
import { sendEvent } from 'utils/gtm';

const LoginWithPasswordButton: FC = () => {
  const isGoogleLoading = useAtomValue(loginGoogleIsLoadingAtom);
  const isFacebookLoading = useAtomValue(loginFacebookIsLoadingAtom);
  return (
    <Wrapper>
      <LoginWithPassword
        to='/login/with-password'
        disabled={isGoogleLoading || isFacebookLoading}
        onClick={() => {
          sendEvent({
            event: 'try_login',
            method: 'email',
          });
        }}
      >
        <Span>Iniciar sesión con Email y contraseña</Span>
        <IconBox>
          <BxEnvelope size={29} />
        </IconBox>
      </LoginWithPassword>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type LoginProps = {
  disabled: boolean;
};

const LoginWithPassword = styled(LinkRouter)<LoginProps>`
  background: var(--bx-login-button-bg);
  border-radius: 1rem;
  box-shadow: var(--bx-login-button-shadow);
  padding: 26px;
  color: var(--bx-fg);
  &:hover {
    color: var(--bx-fg);
  }
  ${({ disabled }) =>
    disabled
      ? `
        pointer-events: none;
        opacity: 0.65;
      `
      : ''}
  @media (min-width: 1200px) {
    padding: 20px 26px;
    margin-bottom: 36px;
  }
`;

const Span = styled.span`
  display: none;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoginWithPasswordButton;
