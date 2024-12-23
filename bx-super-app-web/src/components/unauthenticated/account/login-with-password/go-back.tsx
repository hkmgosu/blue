import { FC } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const LoginWithPasswordRecoverGoBack: FC = () => {
  const history = useHistory();

  const handleClick = (): void => {
    history.push('/login');
  };

  return (
    <Wrapper>
      <Link onClick={handleClick}>Volver atrás</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Link = styled.a`
  color: var(--bx-color-lblue);
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

export default LoginWithPasswordRecoverGoBack;
