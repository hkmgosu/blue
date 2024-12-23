import { FC } from 'react';
import styled from 'styled-components';
import LoginCurveHorizontal from 'components/unauthenticated/account/login/curve-horizontal';
import LoginCurve from 'components/unauthenticated/account/login/curve';
import joinPyme from 'images/joinpyme.png';
import patternBg from 'images/bg-pattern.png';

const MainRightJoinToPymeAlternativeBg: FC = () => {
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
          <IntroImage src={joinPyme} />
        </IntroImageBox>
      </MainRightWrapper>
    </MainRight>
  );
};

const MainRight = styled.section`
  background: var(--bx-color-blue);
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 10;
  height: 310px;

  @media (min-width: 768px) {
    height: 584px;
  }

  @media (min-width: 992px) {
    height: 700px;
  }

  @media (min-width: 1200px) {
    background: var(--bx-bg-login);
    width: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
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
  top: 200px;

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
    left: calc(((100vw / 2) - (475px)) * -1);
  }
  @media (min-width: 1400px) {
    left: calc(((100vw / 2) - (700px)) * -1);
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
    left: -130px;
  }
`;

const IntroImage = styled.img`
  width: 620px;
  height: 400px;
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

export default MainRightJoinToPymeAlternativeBg;
