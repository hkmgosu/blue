import { FC } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import styled from 'styled-components';

import { sendEvent } from 'utils/gtm';

const LoginToRegister: FC = () => {
  return (
    <Wrapper>
      <Text>
        <Span>¿No estás inscrito?</Span>
        <Link
          to='/register'
          onClick={() => {
            sendEvent({
              event: 'try_sign_up',
              method: 'email',
            });
          }}
        >
          Regístrate aquí
        </Link>
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 14px;
  @media (min-width: 1200px) {
    font-size: 1rem;
  }
`;

const Span = styled.span`
  margin-right: 5px;
`;

const Link = styled(LinkRouter)`
  color: var(--bx-color-orange);
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  @media (min-width: 1200px) {
    font-size: 1rem;
  }
`;

export default LoginToRegister;
