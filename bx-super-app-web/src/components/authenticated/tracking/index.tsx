import { FC } from 'react';
import styled from 'styled-components';

const TrackingComponent: FC<{ os?: string }> = ({ os }) => {
  return (
    <Main>
      {process.env.REACT_APP_TRACKING && (
        <Iframe src={`${process.env.REACT_APP_TRACKING}${os || ''}`}></Iframe>
      )}
    </Main>
  );
};

const Iframe = styled.iframe`
  width: 100%;
  height: auto;
`;

const Main = styled.main`
  background-color: var(--bx-color-lblue-day);
  display: flex;
  min-height: calc(100vh - 120px);
`;

export default TrackingComponent;
