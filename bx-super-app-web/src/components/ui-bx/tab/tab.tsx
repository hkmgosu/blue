import { FC } from 'react';
import styled from 'styled-components';

const Tab: FC = ({ children }) => {
  return <TabWrapper>{children}</TabWrapper>;
};

const TabWrapper = styled.div``;

export default Tab;
