import { FC } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '@bx-design/react-grid';
import { useHistory } from 'react-router-dom';

import { Card, CardBody } from 'components/ui-bx/card';
import Page from 'components/layout/page';
import MainWithBg from 'components/layout/main-with-bg';
import { Button } from 'components/ui-bx/button';
import celebrate from 'images/celebrate.png';

const PasswordChangedSuccess: FC = () => {
  const history = useHistory();

  const handleClick = (): void => history.push('/login/with-password');

  return (
    <Page title='Contraseña cambiada con éxito'>
      <MainWithBg>
        <Wrapper>
          <Content>
            <Container>
              <Row>
                <Col col='12'>
                  <Card>
                    <CardBody>
                      <CardContent>
                        <LogoBoxMobile>
                          <Img src={celebrate} />
                        </LogoBoxMobile>
                        <LogoBox>
                          <Img src={celebrate} />
                        </LogoBox>
                        <Title>¡wow!</Title>
                        <Text>Tu contraseña ha sido cambiada con éxito</Text>
                        <Litle>Ahora puedes volver a iniciar sesión</Litle>
                        <ButtonBox>
                          <Button onClick={handleClick}>Iniciar Sesión</Button>
                        </ButtonBox>
                      </CardContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Content>
        </Wrapper>
      </MainWithBg>
    </Page>
  );
};

const Img = styled.img`
  width: 100%;
`;

const Text = styled.p`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 95%;
  text-align: center;
  letter-spacing: 0.03em;
  color: #212121;
`;

const Litle = styled.p`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 145%;
  text-align: center;
  letter-spacing: 0.03em;
  color: #212121;
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 32px;

  @media (min-width: 1200px) {
    padding: 0;
  }
`;

const Content = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;

  @media (min-width: 1200px) {
    max-width: 576px;
  }
`;

const CardContent = styled.div`
  @media (min-width: 1200px) {
    padding: 32px;
  }
`;

const LogoBox = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
    align-items: center;
    margin-bottom: 38px;
    justify-content: center;
  }
`;

const LogoBoxMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  @media (min-width: 1200px) {
    display: none;
  }
`;

const Title = styled.p`
  font-family: var(--bx-font-primary);
  font-style: normal;
  font-weight: 900;
  font-size: 50px;
  line-height: 121.2%;
  text-align: center;
  color: #212121;
  text-align: center;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default PasswordChangedSuccess;
