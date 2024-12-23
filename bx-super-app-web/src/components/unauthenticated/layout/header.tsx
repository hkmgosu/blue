import { FC } from 'react';
import styled from 'styled-components';

const Header: FC = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
`;

export default Header;
