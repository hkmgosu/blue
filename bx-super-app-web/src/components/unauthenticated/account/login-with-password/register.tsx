import { FC } from 'react';
import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

const LoginWithPasswordRecoverRegister: FC = () => {
  return (
    <Wrapper>
      <Text>
        <Span>¿Todavía no eres usuario?</Span>
        <Link to='/register'>Regístrate aquí</Link>
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

export default LoginWithPasswordRecoverRegister;
