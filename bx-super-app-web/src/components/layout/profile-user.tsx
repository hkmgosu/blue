import { FC, useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import {
  BxCheckCircle,
  BxChevronRight,
  BxLeft,
  BxLogOut,
  BxPerson,
  BxSettings,
  BxStore,
} from '@bx-design/react-icons';
import { useQueryClient } from 'react-query';

import { useAuth } from 'contexts/auth-context';
import { useAvatar } from 'contexts/avatar-context';
import { usePyme } from 'contexts/pyme/pyme-context';
import { useHistory } from 'react-router-dom';
import { useIsNaturalPerson } from 'hooks/pyme/use-is-natural-person';
import { authLogout } from 'api/auth';
import * as configApp from 'config/';
import { useMediaQuery } from 'react-responsive';
import styles from './dropdown.module.scss';
type ProfileProps = {
  shiptment?: boolean;
};

const ProfileUser: FC<ProfileProps> = ({ shiptment = false }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery({
    maxDeviceWidth: 680,
  });
  const { user } = useAuth();
  const { pymeList, defaultPyme, changeDefaultPyme } = usePyme();
  const { isNaturalPerson } = useIsNaturalPerson();
  const [profileHover, setProfileHover] = useState(false);
  const [showPymes, setShowPymes] = useState(false);
  const [rotate, setRotate] = useState('rotate(0deg)');
  const avatar = useAvatar();
  const node = useRef<HTMLInputElement>(null);
  const _transition1 = useRef<HTMLDivElement>(null);
  const _transition2 = useRef<HTMLDivElement>(null);

  const pymes = pymeList?.filter((pyme) => pyme?.is_natural_person === false);
  const hasNaturalPersonPyme = pymeList?.filter(
    (pyme) => pyme?.is_natural_person === true
  );

  const logout = async (): Promise<void> => {
    const res = await authLogout();
    if (res) {
      configApp.cleanTokens();
      queryClient.invalidateQueries('user').then(() => {
        history.push('/');
      });
    }
  };

  const handleToggleDropdown = (): void => {
    setShowPymes(false);
    setProfileHover(!profileHover);
    setRotate(!profileHover ? 'rotate(90deg)' : 'rotate(0deg)');
  };
  const goToMain = (): void => {
    setShowPymes(false);
    setProfileHover(true);
  };
  const handleClick = (itemList: string): void => {
    if (itemList === 'Salir') {
      logout();
    }
    if (itemList === 'Mis empresas') {
      setProfileHover(false);
      setShowPymes(true);
    }
    if (itemList === 'Yo') {
      hasNaturalPersonPyme && changeDefaultPyme(hasNaturalPersonPyme[0].id);
    }
    if (itemList === 'Mis Datos') {
      history.push('/account');
    }
  };
  const handleOutsideClick = useCallback(
    (e: any): void => {
      if (node?.current?.contains(e.target)) {
        return;
      }

      if (profileHover || showPymes) {
        setShowPymes(false);
        setProfileHover(false);
        setRotate('rotate(0deg)');
      }
    },
    [profileHover, showPymes]
  );
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <Dropdown ref={node}>
      <DropdownHeader onClick={handleToggleDropdown}>
        <Img src={avatar.avatar} alt='avatar' />
        <ContainerName>
          <Label>{user ? user.name : ''}</Label>
          {!isNaturalPerson && (
            <PymeName>
              {defaultPyme && defaultPyme?.social_reason.length > 14
                ? `${defaultPyme?.social_reason.substring(0, 14)} ...`
                : defaultPyme?.social_reason}
            </PymeName>
          )}
        </ContainerName>
        <ContainerIcon rotate={rotate}>
          <BxChevronRight color={'var(--bx-color-lorange-summer)'} />
        </ContainerIcon>
      </DropdownHeader>
      <CSSTransition
        in={profileHover}
        timeout={500}
        classNames='slideDown'
        unmountOnExit
        nodeRef={_transition1}
      >
        <DropdownBody
          shiptment={shiptment}
          profileHover={profileHover}
          ref={_transition1}
        >
          <div style={{ margin: '20px 0' }}>
            {isMobile && (
              <>
                <div className={styles.namesContainer}>
                  <span className={styles.username}>
                    {user ? user.name : ''}
                  </span>
                  {!isNaturalPerson && (
                    <span className={styles.pymename}>
                      {defaultPyme && defaultPyme?.social_reason.length > 14
                        ? `${defaultPyme?.social_reason.substring(0, 14)} ...`
                        : defaultPyme?.social_reason}
                    </span>
                  )}
                </div>
                <hr className={styles.hr} />
              </>
            )}
            {hasNaturalPersonPyme && hasNaturalPersonPyme?.length > 0 && (
              <Item className='flex items-center'>
                <span className='flex items-center mr-2'>
                  <BxPerson color='var(--bx-color-blue-fun)' />
                </span>
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                  }}
                  onClick={() => handleClick('Yo')}
                >
                  Mi Cuenta personal
                </button>
              </Item>
            )}
            {pymes && pymes?.length > 4 ? (
              <Item className='flex items-center mr-2'>
                <span className='flex items-center mr-2'>
                  <BxStore color='var(--bx-color-blue-fun)' />
                </span>
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                  }}
                  className='flex items-center'
                  onClick={() => handleClick('Mis empresas')}
                >
                  Mis empresas
                  <BxChevronRight size='15' />
                </button>
              </Item>
            ) : (
              pymes?.map((pyme) => {
                return (
                  <Item key={pyme.id}>
                    <div className='flex items-center'>
                      <span className='flex items-center mr-2'>
                        <BxStore color='var(--bx-color-blue-fun)' />
                      </span>
                      <button
                        style={{
                          background: 'transparent',
                          border: 'none',
                        }}
                        onClick={() => changeDefaultPyme(pyme.id)}
                      >
                        {pyme.social_reason}
                      </button>
                    </div>
                  </Item>
                );
              })
            )}
            <hr className={styles.hr} />
            <Item className='flex items-center mr-2'>
              <span className='flex items-center mr-2'>
                <BxSettings color='var(--bx-color-blue-fun)' />
              </span>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                }}
                onClick={() => handleClick('Mis Datos')}
              >
                Mis Datos
              </button>
            </Item>
            <Item className='flex items-center'>
              <span className='flex items-center mr-2'>
                <BxLogOut color='var(--bx-color-blue-fun)' />
              </span>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                }}
                onClick={() => handleClick('Salir')}
              >
                Salir
              </button>
            </Item>
          </div>
        </DropdownBody>
      </CSSTransition>
      <CSSTransition
        in={showPymes}
        timeout={500}
        classNames='slideLeft'
        unmountOnExit
        nodeRef={_transition2}
      >
        <GlobalSelectPyme
          shiptment={shiptment}
          showPymes={showPymes}
          ref={_transition2}
        >
          <GoBack onClick={goToMain}>
            <BxLeft color='#745c91' />
          </GoBack>
          <Title>
            <BxStore color='#745c91' /> Mis empresas
          </Title>
          <ContainerPymes>
            {pymeList?.map((pyme, i) => {
              if (!pyme.is_natural_person) {
                return (
                  <Pyme key={i} onClick={() => changeDefaultPyme(pyme.id)}>
                    <Image>
                      <Circle />
                    </Image>
                    <Name selected={defaultPyme?.id === pyme.id}>
                      {pyme.social_reason}
                    </Name>
                    {defaultPyme?.id === pyme.id && (
                      <Status>
                        <BxCheckCircle color='#745c91' />
                      </Status>
                    )}
                  </Pyme>
                );
              } else {
                return <></>;
              }
            })}
          </ContainerPymes>
        </GlobalSelectPyme>
      </CSSTransition>
    </Dropdown>
  );
};

const ContainerName = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    display: none;
  }
`;
const PymeName = styled.div`
  color: var(--bx-color-lorange-summer);
`;
const GoBack = styled.div`
  padding: 0 8px;
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 15px;
  font-weight: 800;
  margin: 8px 0;
  color: var(--bx-color-grey-one);
  display: flex;
  justify-content: center;
`;
const ContainerPymes = styled.div``;
const Pyme = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 24px;
  transition: background ease 0.4s;
  cursor: pointer;
  &:hover {
    background: #e7e7e7;
  }
`;
const Circle = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--bx-color-grey-me);
`;
const Image = styled.div``;
type NameProps = {
  selected: boolean;
};
const Name = styled.div<NameProps>`
  font-weight: ${(props) => (props.selected ? 600 : 400)};
  font-size: 16px;
  color: var(--bx-color-black);
  padding: 0 8px;
  margin-right: auto;
`;
const Status = styled.div``;

const Dropdown = styled.div<DropdownType>`
  position: relative;
`;
type ChevProps = {
  rotate: string;
};
const ContainerIcon = styled.div<ChevProps>`
  transition: all ease 0.4s;
  transform: ${(props) => props.rotate};
  margin-right: 50px;
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;

const Label = styled.label`
  margin-right: 10px;
  cursor: pointer;
  color: var(--bx-color-white);
`;

type DropdownType = {
  profileHover?: boolean;
  showPymes?: boolean;
  shiptment?: boolean;
};

const Img = styled.img`
  width: 46px;
  height: 46px;
  margin-right: 15px;
  border-radius: 50%;
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;

const DropdownHeader = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;
  cursor: pointer;
`;
const GlobalSelectPyme = styled.div<DropdownType>`
  display: ${(props) => (props.showPymes ? 'flex' : 'none')};
  z-index: 100;
  background: white;
  box-shadow: 0px 8px 8px -4px rgb(24, 39, 75, 0.2);
  border-radius: 15px;
  position: absolute;
  padding-bottom: 20px;
  width: 100%;
  flex-direction: column;
  @media (max-width: 768px) {
    position: absolute;
    width: max-content;
    right: ${(props) => (props.shiptment ? '-12px' : '-40px')};
    padding: 5px 15px;
  }
`;
const DropdownBody = styled.div<DropdownType>`
  display: flex;
  color: black;
  z-index: 100;
  background: white;
  box-shadow: 0px 8px 8px -4px rgb(24, 39, 75, 0.2);
  border-radius: 15px;
  position: absolute;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 768px) {
    position: absolute;
    width: max-content;
    right: ${(props) => (props.shiptment ? '-12px' : '-40px')};
    padding: 5px 15px;
  }
`;

const Item = styled.div`
  padding: 8px;
  transition: all ease 0.4s;
`;

export default ProfileUser;
