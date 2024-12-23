import { FC } from 'react';
import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

const LoginWithPasswordRecoverPassword: FC = () => {
  return (
    <Wrapper>
      <Link to='/password-reset'>Solicitar nueva contraseña</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Link = styled(LinkRouter)`
  color: var(--bx-color-lblue);
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

export default LoginWithPasswordRecoverPassword;
