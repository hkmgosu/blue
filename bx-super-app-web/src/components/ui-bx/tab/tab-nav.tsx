import { FC } from 'react';
import styled from 'styled-components';

const TabNav: FC = ({ children }) => {
  return <Nav role='tablist'>{children}</Nav>;
};

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`;

export default TabNav;
