import { FC } from 'react';
import styled from 'styled-components';

import LogoBx from 'components/logo-bx';
import ProfileUser from './profile-user';
import { useHistory, useLocation } from 'react-router-dom';
import { useExitModal } from 'emission-lib/hooks/emission-state';

const ShippingHeader: FC = () => {
  const history = useHistory();
  const [, setExitModal] = useExitModal();
  const location = useLocation();

  const handleClick = (): void => {
    if (location.pathname.includes('new-shipping')) {
      setExitModal(true);
    } else {
      history.push('/dashboard');
    }
  };

  return (
    <Header>
      <Wrapper>
        <Left>
          <LogoBox onClick={handleClick}>
            <LogoBx height={43} inverted />
          </LogoBox>
        </Left>
        <Right>
          <ProfileBox>
            <ProfileUser shiptment={true} />
          </ProfileBox>
        </Right>
      </Wrapper>
    </Header>
  );
};

const Header = styled.header`
  height: 64px;
  background-color: var(--bx-color-blue);
  display: flex;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Wrapper = styled.div`
  padding: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ShippingHeader;
