import { FC } from 'react';
import styled from 'styled-components';
import LoginCurveHorizontal from 'components/unauthenticated/account/login/curve-horizontal';
import LoginCurve from 'components/unauthenticated/account/login/curve';
import patternBg from 'images/bg-pattern.png';

const MainRightBg: FC = () => {
  return (
    <MainRight>
      <MainRightWrapper>
        <CurveBoxMobile>
          <CurveMobile>
            <LoginCurveHorizontal width='100%' />
          </CurveMobile>
        </CurveBoxMobile>
        <CurveBox>
          <LoginCurve height='100%' />
        </CurveBox>
        <BgImage src={patternBg} />
        <IntroImageBox>
          <IntroImage src='https://static.blue.cl/images/bluenvio/campaign/banner-home.png' />
        </IntroImageBox>
      </MainRightWrapper>
    </MainRight>
  );
};

const MainRight = styled.section`
  background: var(--bx-bg-login);
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 10;
  height: 384px;
  @media (min-width: 768px) {
    height: 584px;
  }
  @media (min-width: 992px) {
    height: 700px;
  }
  @media (min-width: 1200px) {
    background: var(--bx-bg-login);
    width: 52%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    z-index: 100;
  }
`;

const MainRightWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: 100%;
  z-index: 11;
`;

const CurveBoxMobile = styled.div`
  z-index: 11;
  width: 100%;
  display: flex;
  position: absolute;
  top: 260px;
  @media (min-width: 768px) {
    top: 370px;
  }
  @media (min-width: 992px) {
    top: 520px;
  }
  @media (min-width: 1200px) {
    display: none;
  }
`;

const CurveMobile = styled.div`
  width: 100%;
`;

const CurveBox = styled.div`
  height: 100%;
  display: none;
  @media (min-width: 1200px) {
    display: flex;
    z-index: 10;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  @media (min-width: 1400px) {
    left: 0;
  }
  @media (min-width: 3000px) {
    left: 0;
  }
`;

const IntroImageBox = styled.div`
  display: none;
  @media (min-width: 1200px) {
    position: absolute;
    z-index: 11;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const IntroImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  display: block;
  border-radius: 1rem;
`;

const BgImage = styled.img`
  visibility: inherit;
  position: absolute;
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 0px;
  height: 0px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  object-fit: cover;
  z-index: 9;
  opacity: 0.3;
`;

export default MainRightBg;
