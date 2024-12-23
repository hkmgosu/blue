import { FC } from 'react';
import styled from 'styled-components';
import LogoBx from 'components/logo-bx';

const RegisterHeader: FC = () => {
  return (
    <Header>
      <LogoBox>
        <LogoBx inverted width={70} />
      </LogoBox>
    </Header>
  );
};

const Header = styled.header`
  height: var(--bx-register-header-height);
  background: var(--bx-register-header-bg);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 48px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: var(--bx-register-header-shadow);

  @media (min-width: 768px) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    justify-content: flex-start;
  }
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default RegisterHeader;
