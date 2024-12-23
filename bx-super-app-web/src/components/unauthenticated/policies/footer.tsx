import { FC } from 'react';
import styled from 'styled-components';
import { BxPin } from '@bx-design/react-icons';

const PoliciesFooter: FC = () => {
  return (
    <FirstSection>
      <LocationText>
        <BxPin color='#fff' size={20} /> Av. El Retiro 9800, Parque Industrial
        Los Maitenes, Pudahuel, Santiago
      </LocationText>
      <BxText>© 2021 Blue Express - Todos los derechos reservados</BxText>
    </FirstSection>
  );
};

const FirstSection = styled.section`
  padding: 50px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #3551a2;
  @media (max-width: 736px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const LocationText = styled.div`
  color: #ffffff;
  @media (max-width: 736px) {
    margin-bottom: 24px;
  }
`;

const BxText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 158%;
  letter-spacing: 0.03em;
  color: #ffffff;
  width: max-content;
  text-align: center;
`;

export default PoliciesFooter;
