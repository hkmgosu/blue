import { FC, ReactNode } from 'react';
import styled from 'styled-components';

import LogoBx from 'components/logo-bx';
import loginBgIntro from 'images/bg-login-z1.webp';
import MainRightBg from 'components/layout/main-right-bg';

type Props = {
  title?: ReactNode;
  description?: ReactNode;
  extraContent?: ReactNode;
};

const MainLeftAlternativeContent: FC<Props> = ({
  title,
  description,
  extraContent,
  children,
}) => {
  return (
    <Wrapper>
      <MainRightBg />
      <Content>
        {extraContent}
        <InnerContent>
          <LogoBoxMobile>
            <LogoBx width={95} inverted />
          </LogoBoxMobile>
          <LogoBox>
            <LogoBx width={132} />
          </LogoBox>
          <Title>{title}</Title>
          <SubTitle>{description}</SubTitle>
          <IntroImageBox>
            <IntroImage src={loginBgIntro} />
          </IntroImageBox>
          {children}
        </InnerContent>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const Content = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 20;
  padding: 25px 0;
  @media (min-width: 1200px) {
    width: 49%;
    padding: 0 60px;
    z-index: 20;
  }
  @media (min-width: 1400px) {
    width: 49%;
    padding: 0 82px;
    z-index: 20;
  }
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LogoBoxMobile = styled.div`
  margin-bottom: 15px;
  @media (min-width: 1200px) {
    display: none;
  }
`;

const LogoBox = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
  }
`;

const Title = styled.h1`
  font-weight: 900;
  text-align: center;
  font-size: 24px;
  color: var(--bx-bg);
  @media (min-width: 768px) {
    font-size: 50px;
    margin-bottom: 28px;
  }
  @media (min-width: 1200px) {
    color: var(--bx-fg);
  }
`;

const SubTitle = styled.p`
  font-size: 1rem;
  color: var(--bx-bg);
  @media (min-width: 768px) {
    font-size: 22px;
  }
  @media (min-width: 1200px) {
    color: var(--bx-fg);
  }
`;

const IntroImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  @media (min-width: 1200px) {
    display: none;
  }
`;

const IntroImage = styled.img`
  width: 167px;
  height: 146px;

  @media (min-width: 768px) {
    width: 396px;
    height: 346px;
  }

  @media (min-width: 992px) {
    width: 540px;
    height: 472px;
  }
`;

export default MainLeftAlternativeContent;
