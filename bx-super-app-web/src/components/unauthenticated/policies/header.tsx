import { FC, useState } from 'react';
import styled from 'styled-components';

import logo from 'images/landing/logoblue.png';
import { Container, Row, Col } from '@bx-design/react-grid';
import { useHistory } from 'react-router';

const PoliciesHeader: FC = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Main>
      <Container>
        <Row className='items-center'>
          <Col col='2'>
            <LogoContainer>
              <Img src={logo} alt='BlueExpress' />
            </LogoContainer>
          </Col>
          <Col col='6' className='hidden md:block'></Col>
          <Col className='hidden md:block' col='4'>
            <RegisterContainer>
              <BlueButton onClick={() => history.push('/login')}>
                Ingresar
              </BlueButton>
            </RegisterContainer>
          </Col>
          <Col className='hidden md:block'>
            <ContainerHamburguer>
              <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <Line isOpen={isOpen}></Line>
                <Line isOpen={isOpen}></Line>
              </Hamburger>
            </ContainerHamburguer>
          </Col>
        </Row>
        <Row className='items-center'>
          <Col className='hidden md:block'>
            <MenuResponsive isOpen={isOpen}>
              <LinkResponsive>
                <BlueButton onClick={() => history.push('/login')}>
                  Ingresar
                </BlueButton>
              </LinkResponsive>
            </MenuResponsive>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};
type LineType = {
  isOpen: boolean;
};
const Main = styled.div`
  height: auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0;
  width: 100%;
  background: white;
  z-index: 1000;
  padding: 16px 0;
`;

const MenuResponsive = styled.div<LineType>`
  text-align: center;
  overflow: hidden;
  height: 0;
  opacity: 0;
  transition: height 0ms 400ms, opacity 400ms 0ms;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.isOpen &&
    'height:auto;opacity:1;transition:height 0s 0s, opacity 0.6s 0s;'};
`;
const LinkResponsive = styled.a`
  cursor: pointer;
  margin: 8px 0;
  color: var(--bx-color-blue-clip);
`;
const ContainerHamburguer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const BlueButton = styled.button`
  display: flex;
  background-color: var(--bx-color-light-express);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  outline: none !important;
`;

const LogoContainer = styled.div``;

const Img = styled.img`
  margin: 0 auto;
  width: 90px;
`;

const RegisterContainer = styled.div`
  text-align: end;
`;

const Hamburger = styled.div<LineType>`
  width: 40px;
  height: auto;
  cursor: pointer;
  transition: all ease 0.4s;
  ${(props) => {
    if (props.isOpen) {
      return 'transform:rotate(45deg)';
    }
  }};
`;

const Line = styled.div<LineType>`
  width: 100%;
  height: 5px;
  background: var(--bx-color-blue);
  margin: 7px 0;
  border-radius: 56px;
  transition: all ease 0.4s;
  &:nth-child(1) {
    ${(props) => {
      if (props.isOpen) {
        return 'transform:rotate(90deg) translateX(5px)';
      }
    }};
  }
  &:nth-child(2) {
    ${(props) => {
      if (props.isOpen) {
        return 'transform:translateY(-7px)';
      }
    }};
  }
`;

export default PoliciesHeader;
