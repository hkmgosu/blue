import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Card, CardBody } from 'components/ui-bx/card';
import Page from 'components/layout/page';
import MainWithBg from 'components/layout/main-with-bg';
import LogoBx from 'components/logo-bx';
import PasswordResetEmailGoBack from 'components/unauthenticated/account/password-reset-email/go-back';
import { useHistory, useLocation } from 'react-router-dom';

const PasswordResetPage: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const emailURL = queryParams.get('email');
  if (!emailURL) {
    history.push('/not-found');
  }
  return (
    <Page
      title={t('password-recover.recover.metas.title')}
      description={t('password-recover.recover.metas.description')}
    >
      <MainWithBg>
        <Wrapper>
          <Content>
            <Card>
              <CardBody>
                <CardContent>
                  <LogoBox>
                    <LogoBx width={142} />
                  </LogoBox>
                  <Title>El mensaje ha sido enviado con éxito al correo</Title>
                  <Text>{emailURL}</Text>
                  <PasswordResetEmailGoBack />
                </CardContent>
              </CardBody>
            </Card>
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
`;

const Content = styled.div`
  display: flex;
  max-width: 576px;
  max-height: 584px;
`;

const CardContent = styled.div`
  padding: 32px;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 38px;
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 26px;
  text-align: center;
  margin-bottom: 38px;
`;

const Text = styled.p`
  text-align: center;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 2rem;
`;

export default PasswordResetPage;
