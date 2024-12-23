import { FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ChevronRightIcon from 'components/icons/chevron-right';
import { useAtom } from 'jotai';
import { newShippingModalAtom } from 'atoms/new-shipping/new';

type SubmenuType = {
  name: string;
  isCollapsed: boolean;
  icon: ReactNode;
  children: Array<{
    name: string;
    url: string;
  }>;
  link: string;
};

const Submenu: FC<SubmenuType> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState('rotate(0deg)');
  const [showMenu, setShowMenu] = useState(false);
  const [, setShowModal] = useAtom(newShippingModalAtom);
  const handleClick = (): void => {
    setIsOpen(!isOpen);
    setRotate(!isOpen ? 'rotate(90deg)' : 'rotate(0deg)');
  };
  const handleModalOpen = (): void => {
    setShowModal(true);
  };

  return (
    <>
      <BoxItem
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        {props.isCollapsed ? (
          <>
            {props.icon}
            <BoxMenu
              style={{ fontSize: '15px', fontWeight: 800 }}
              onClick={handleClick}
            >
              <Label>{props.name}</Label>
              <ChevIcon rotate={rotate}>
                <ChevronRightIcon color={'var(--bx-color-orange)'} size={16} />
              </ChevIcon>
            </BoxMenu>
          </>
        ) : (
          <>
            <ExpandableItem>{props.icon}</ExpandableItem>
          </>
        )}
        {showMenu && !props.isCollapsed && (
          <MenuContainer>
            <Relative>
              <Menu>
                {props.children.map((submenu, idx) => {
                  return (
                    <MenuItem key={idx}>
                      {submenu.name === 'Nuevo Envío' ? (
                        <SubMenuLinkModal onClick={handleModalOpen}>
                          {submenu.name}
                        </SubMenuLinkModal>
                      ) : (
                        <SubMenuLink to={submenu.url ? submenu.url : ''}>
                          {submenu.name}
                        </SubMenuLink>
                      )}
                    </MenuItem>
                  );
                })}
              </Menu>
              {/*   
              <Arrow></Arrow>
            */}
            </Relative>
          </MenuContainer>
        )}
      </BoxItem>
      {props.isCollapsed && (
        <MenuList isOpen={isOpen}>
          {props.children.map((submenu, idx) => {
            return (
              <MenuItem key={idx}>
                {submenu.name === 'Nuevo Envío' ? (
                  <SubMenuLinkModal onClick={handleModalOpen}>
                    {submenu.name}
                  </SubMenuLinkModal>
                ) : (
                  <MenuLink to={submenu.url ? submenu.url : ''}>
                    {submenu.name}
                  </MenuLink>
                )}
              </MenuItem>
            );
          })}
        </MenuList>
      )}
    </>
  );
};

type MenuListType = {
  isOpen: boolean;
};

type ChevProps = {
  rotate: string;
};
const ChevIcon = styled.div<ChevProps>`
  position: relative;
  transition: all ease 0.4s;
  transform: ${(props) => props.rotate};
`;

const ExpandableItem = styled.a``;
const Menu = styled.div`
  background: white;
  padding: 16px 0;
  box-shadow: 0px 8px 8px -4px rgb(24 39 75 / 20%);
  border-radius: 15px;
`;
/* const Arrow = styled.div``; */
const Relative = styled.div`
  position: fixed;
  left: 97px;
  z-index: 10;
  width: max-content;
`;
const MenuContainer = styled.div`
  position: relative;
`;
const MenuItem = styled.li`
  transition: all ease 0.4s;
  &:hover {
    background: white;
  }
`;

const Label = styled.label`
  position: relative;
  margin-left: 20px;
  cursor: pointer;
`;

const BoxItem = styled.div`
  display: flex;
  cursor: pointer;
`;

const BoxMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding-right: 25px;
`;

const MenuList = styled.ul<MenuListType>`
  text-align: left;
  list-style: none;
  padding-left: 15px;
  margin-top: 15px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: var(--bx-color-black) 012;
  font-weight: 400;
  font-size: 14px;
  margin-top: 0px;
  margin-left: 30px;
  padding: 8px 0px;
  &:hover {
    color: var(--bx-color-lblue);
  }
`;

const SubMenuLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: var(--bx-color-black) 012;
  font-weight: 400;
  font-size: 14px;
  padding: 8px 16px;
  margin-left: 13px;
`;
const SubMenuLinkModal = styled.a`
  display: block;
  text-decoration: none;
  color: var(--bx-color-black) 012;
  font-weight: 400;
  font-size: 14px;
  padding: 8px 16px;
  font-weight: 400;
  font-size: 14px;
  margin-left: 13px;
  cursor: pointer;
`;

export default Submenu;
