import { FC } from 'react';
import styled from 'styled-components';
import { Col } from '@bx-design/react-grid';
import { BxJourney, BxPackage, BxPin } from '@bx-design/react-icons';

import { useTrackingState } from 'contexts/tracking/tracking-context';

const TrackingInfo: FC = () => {
  const { os } = useTrackingState();
  const { remitente, destinatario } = os?.document || {};

  return (
    <Col sm='12'>
      <ContainerInfo>
        <Title>Información de envío</Title>
        <Info>
          <IconContent>
            <BxPackage />
            <InfoTitle>Tipo de servicio</InfoTitle>
          </IconContent>
          <Description>{os?.document?.nombreTipoServicio}</Description>
        </Info>
        <Info>
          <IconContent>
            <BxPin />
            <InfoTitle>Origen</InfoTitle>
          </IconContent>
          <Description>
            {`${remitente?.nombreRegion}, ${remitente?.nombreComuna}.`.toLowerCase()}
          </Description>
        </Info>
        <Info>
          <IconContent>
            <BxJourney />
            <InfoTitle>Destino</InfoTitle>
          </IconContent>
          <Description>
            {`${destinatario?.nombreRegion}, ${destinatario?.nombreComuna}, ${destinatario?.direccionCompleta}.`.toLowerCase()}
          </Description>
        </Info>
      </ContainerInfo>
    </Col>
  );
};

const ContainerInfo = styled.div`
  background: var(--bx-color-lblue-day);
  padding: 40px;
  border-radius: 4px;
  flex-direction: column;
`;

const IconContent = styled.div`
  flex: 2;
  min-width: 200px;
`;

const Title = styled.h3`
  font-family: var(--bx-font-primary);
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
  line-height: 28px;
`;

const Info = styled.div`
  display: flex;
  margin: 8px 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
`;

const InfoTitle = styled.b`
  font-family: var(--bx-font-primary);
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 109.9%;
  margin: 0 20px;
`;

const Description = styled.span`
  flex: 8;
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 145%;
  letter-spacing: 0.03em;
  text-transform: capitalize;
`;

export default TrackingInfo;
