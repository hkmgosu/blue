import { FC } from 'react';
import styled from 'styled-components';

import ShippingHeader from './shipping-header';
import Footer from 'components/layout/footer';

const AuthenticatedShippingLayout: FC = ({ children }) => {
  return (
    <Container>
      <ShippingHeader />
      {children}
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export default AuthenticatedShippingLayout;
