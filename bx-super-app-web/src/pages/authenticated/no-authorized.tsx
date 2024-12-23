import { FC } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Page } from 'components/layout';
import BoxSadIcon from 'components/icons/box-sad';
import { Button } from 'components/ui-bx/button';

const NotAuthorized: FC = () => {
  const history = useHistory();

  return (
    <Page>
      <Container>
        <BoxSadIcon size={80} />

        <h1>No estás autorizado a ver esta página</h1>
        <Button onClick={() => history.goBack()}>Volver</Button>
      </Container>
    </Page>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
`;

export default NotAuthorized;
