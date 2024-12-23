import { FC } from 'react';
import styled from 'styled-components';

import LogoBx from 'components/logo-bx';

const WideLoader: FC = () => (
  <Container>
    <Loader>
      <LogoBx width={100} />
    </Loader>
  </Container>
);

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  display: flex;
  padding: 10px;
`;

export default WideLoader;
