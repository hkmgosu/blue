import { FC, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Row, Col } from '@bx-design/react-grid';

import { Card, CardBody } from 'components/ui-bx/card';
import Page from 'components/layout/page';
import MainWithBg from 'components/layout/main-with-bg';
import LogoBx from 'components/logo-bx';
import PasswordChangeGoBack from 'components/unauthenticated/account/password-change/go-back';
import PasswordChangeParams from 'components/unauthenticated/account/password-change/params';
import PasswordChangeForm from 'components/unauthenticated/account/password-change/form';
import PasswordChangeErrors from 'components/unauthenticated/account/password-change/errors';

const PasswordResetChangePage: FC = () => {
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const isValid = useMemo(
    () => queryParams.get('username') && queryParams.get('code'),
    [queryParams]
  );
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    if (!isValid) {
      history.push('/error');
    }
  }, [isValid, history]);

  return (
    <Page
      title={t('password-recover.recover.metas.title')}
      description={t('password-recover.recover.metas.description')}
    >
      <PasswordChangeParams />
      <MainWithBg>
        <Wrapper>
          <Content>
            <PasswordChangeErrors />
            <Container fluid>
              <Row>
                <Col col='12'>
                  <Card>
                    <CardBody>
                      <CardContent>
                        <LogoBoxMobile>
                          <LogoBx width={82} />
                        </LogoBoxMobile>
                        <LogoBox>
                          <LogoBx width={142} />
                        </LogoBox>
                        <Title>Crea tu nueva contraseña</Title>
                        <Text>
                          Elige una contraseña que tenga al menos una
                          mayúsucula, un número y 8 caracteres, para proteger tu
                          cuenta.
                        </Text>
                        <PasswordChangeForm />
                        <PasswordChangeGoBack />
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

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  @media (min-width: 1200px) {
    padding: 0;
  }
`;

const Content = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;

  @media (min-width: 1200px) {
    width: 931px;
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

const Title = styled.h1`
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
  font-weight: 700;

  @media (min-width: 1200px) {
    font-size: 26px;
    text-align: left;
    margin-bottom: 38px;
    font-weight: 900;
  }
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 1200px) {
    text-align: left;
  }
`;

export default PasswordResetChangePage;
