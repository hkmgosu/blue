import { FC } from 'react';
import styled from 'styled-components';

import patternBg from 'images/bg-pattern.png';

const MainWithBg: FC = ({ children }) => {
  return (
    <Main>
      <BgImage src={patternBg} />
      <Content>{children}</Content>
    </Main>
  );
};

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  background: var(--bx-bg-login);
  position: relative;
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

const Content = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  z-index: 10;
`;

export default MainWithBg;
