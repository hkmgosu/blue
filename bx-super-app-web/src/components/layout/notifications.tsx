import { FC, useState } from 'react';
import styled from 'styled-components';
import { BxBell } from '@bx-design/react-icons';

import { Badge } from 'components/ui-bx/badge';

const Notification: FC = () => {
  const [notificationHover, setNotificationHover] = useState(false);

  return (
    <Dropdown
      onMouseEnter={() => setNotificationHover(true)}
      onMouseLeave={() => setNotificationHover(false)}
    >
      <DropdownHeader>
        <ContainerIcon>
          <ContainerBadge>
            <Badge variant='primary' size='small'>
              1
            </Badge>
          </ContainerBadge>

          <BxBell />
        </ContainerIcon>
      </DropdownHeader>
      <DropdownBody notificationHover={notificationHover}>
        <NotHeader>
          <Label>Notificaciones</Label>
          <a
            style={{
              fontFamily: 'Lato',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 700,
            }}
            href='/'
          >
            Borrar todo
          </a>
        </NotHeader>
        <div style={{ width: '100%', marginTop: '20px' }}>
          <Ul>
            <Li>
              <Icon></Icon>
              <Description>
                <Title>Lorem ipsum dolor sit..</Title>
                <Time>Have 5 minutos</Time>
              </Description>
            </Li>
          </Ul>
        </div>
      </DropdownBody>
    </Dropdown>
  );
};

const ContainerIcon = styled.div`
  cursor: pointer;
  position: relative;
`;
const ContainerBadge = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  line-height: 0px;
`;
type DropdownType = {
  notificationHover?: boolean;
};

const Title = styled.label`
  font-family: 'Paragraph 2 app';
  font-size: 12px;
  font-weight: 400;
  width: 100%;
`;

const Time = styled.label`
  font-size: 10px;
  font-weight: 300;
`;

const Icon = styled.div`
  background: var(--bx-color-blue-fun);
  width: 28px;
  height: 28px;
  border-radius: 28px;
`;

const Description = styled.div`
  text-align: left;
  margin-left: 20px;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Ul = styled.ul`
  text-align: left;
  list-style: none;
  width: 100%;
  margin: 0px;
  padding: 0px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 800;
`;

const NotHeader = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const DropdownBody = styled.div<DropdownType>`
  display: ${(props) => (props.notificationHover ? 'block' : 'none')};
  z-index: 100;
  background: var(--bx-color-white);
  box-shadow: 0px 8px 8px -4px rgb(24, 39, 75, 0.2);
  border-radius: 15px;
  position: absolute;
  left: 100%;
  width: max-content;
  transform: translate(-93%, 0);
  color: var(--bx-color-grey-one);
  padding: 30px;
`;

export default Notification;
