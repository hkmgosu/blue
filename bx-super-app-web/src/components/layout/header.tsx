import { FC, memo } from 'react';
import styled from 'styled-components';
import cs from 'classnames';
import { BxMenu } from '@bx-design/react-icons';

import { useMediaQuery } from 'react-responsive';
import { b2CMenuShowAtom } from 'atoms/menu';
import { useAtom } from 'jotai';
import ProfileUser from './profile-user';
import LogoBx from 'components/logo-bx';
import B2CServices from './b2c-services';

type HeaderType = {
  toggleSidebar: any;
  isExtendedSidebar: boolean;
};

const MenuIconMemo: FC<HeaderType> = memo((props) => (
  <MenuIcon
    onClick={() => props.toggleSidebar()}
    style={{ width: '30px', marginTop: '0px' }}
  >
    <WrapperSvg className={cs({ '__is-active': !props.isExtendedSidebar })}>
      <BxMenu color='var(--bx-color-white)' />
    </WrapperSvg>
  </MenuIcon>
));

const Header: FC<HeaderType> = (props: HeaderType) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [menu] = useAtom(b2CMenuShowAtom);

  return (
    <HeaderBar>
      <AlignLeft>
        {isMobile ? <LogoBx inverted height={43} /> : <></>}
      </AlignLeft>
      <AlignRight>
        {menu ? (
          <Content>
            <B2CServices />
          </Content>
        ) : (
          <></>
        )}
        <Content>
          <ProfileUser />
        </Content>
        {isMobile && <MenuIconMemo {...props} />}
      </AlignRight>
    </HeaderBar>
  );
};

const AlignLeft = styled.div`
  margin: 5px;
  display: flex;
  flex-flow: nowrap;
  flex: 6;
`;

const AlignRight = styled.div`
  color: white;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-flow: nowrap;
`;

const HeaderBar = styled.div`
  height: 64px;
  background-color: var(--bx-color-blue);
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0px 20px;
  @media (min-width: 768px) {
    padding: 0px;
  }
`;

const Content = styled.div`
  margin-left: 8px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MenuIcon = styled.div`
  cursor: pointer;
  margin-left: 15px;
  height: 100%;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const WrapperSvg = styled.div`
  @media (max-width: 768px) {
    transition: transform 0.5s ease-in-out;
    &.__is-active {
      transform: rotate(180deg);
    }
  }
`;

export default Header;
