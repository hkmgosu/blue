import { FC, useState } from 'react';
import styled from 'styled-components';
import { BxApps } from '@bx-design/react-icons';

import service from 'images/service.svg';

const Services: FC = () => {
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
          <img width='36px' height='36px' src={service} alt='Service' />
          <Label>Servicio</Label>
        </ServiceBox>
        <ServiceBox>
          <img width='36px' height='36px' src={service} alt='Service' />
          <Label>Servicio</Label>
        </ServiceBox>
        <ServiceBox>
          <img width='36px' height='36px' src={service} alt='Service' />
          <Label>Servicio</Label>
        </ServiceBox>
        <ServiceBox>
          <img width='36px' height='36px' src={service} alt='Service' />
          <Label>Servicio</Label>
        </ServiceBox>
        <ServiceBox>
          <img width='36px' height='36px' src={service} alt='Service' />
          <Label>Servicio</Label>
        </ServiceBox>
        <ServiceBox>
          <img width='36px' height='36px' src={service} alt='Service' />
          <Label>Servicio</Label>
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
`;

const Dropdown = styled.div`
  position: relative;
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
  z-index: 100;
  background: white;
  box-shadow: 0px 8px 8px -4px rgb(24, 39, 75, 0.2);
  border-radius: 15px;
  position: absolute;
  justify-content: space-between;
  flex-wrap: wrap;
  width: max-content;
  padding: 20px;
  transform: translate(-93%, 0);
`;

const ServiceBox = styled.div`
  flex: 1 0 30%;
  margin: 5px;
  width: min-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export default Services;
