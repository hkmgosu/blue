import { FC, useState } from 'react';
import styled from 'styled-components';
import { BxApps, BxBuilding, BxHandClean } from '@bx-design/react-icons';

const B2CServices: FC = () => {
  const [serviceHover, setServiceHover] = useState(false);

  return (
    <Dropdown
      onMouseEnter={() => setServiceHover(true)}
      onMouseLeave={() => setServiceHover(false)}
    >
      <DropdownHeader>
        <BxApps />
      </DropdownHeader>
      <DropdownBody serviceHover={serviceHover}>
        <ServiceBox>
          <IconContainer>
            <BxHandClean size={36} />
          </IconContainer>
          <Label>Grandes Empresas</Label>
        </ServiceBox>
        <ServiceBox>
          <IconContainer>
            <BxBuilding size={36} />
          </IconContainer>
          <Label>Servicios para Emprendedores</Label>
        </ServiceBox>
      </DropdownBody>
    </Dropdown>
  );
};

type DropdownType = {
  serviceHover?: boolean;
};

const Label = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: var(--bx-color-grey-one);
  width: max-content;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: relative;
  margin-right: 20px;
`;

const DropdownHeader = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;
  cursor: pointer;
`;

const DropdownBody = styled.div<DropdownType>`
  display: ${(props) => (props.serviceHover ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 100;
  background: white;
  box-shadow: 0px 8px 8px -4px rgb(24, 39, 75, 0.2);
  border-radius: 15px;
  position: absolute;
  justify-content: space-between;
  flex-wrap: wrap;
  width: max-content;
  padding: 20px;
  transform: translate(-30%, 0);
  @media (min-width: 1200px) {
    transform: translate(-93%, 0);
  }
`;

const ServiceBox = styled.div`
  flex: 1 0 30%;
  margin: 5px;
  width: min-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: #7092ff;
`;

const IconContainer = styled.div`
  margin-right: 15px;
`;

export default B2CServices;
