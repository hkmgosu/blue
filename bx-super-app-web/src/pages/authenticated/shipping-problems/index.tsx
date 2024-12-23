import { useAtom } from 'jotai';
import { Col, Row } from '@bx-design/react-grid';
import { Card, CardBody } from 'components/ui-bx/card';
import { Tab, TabContent } from 'components/ui-bx/tab';

import { activeTabCompensationAtom } from 'atoms/compensation';
import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import style from './style.module.scss';
import { BxLogOut } from '@bx-design/react-icons';
import { useHistory } from 'react-router-dom';
import ShippingIssues from 'components/authenticated/compensation/menu';
import { useEffect } from 'react';

export default function CompensationPage(): JSX.Element {
  const history = useHistory();
  const [tab, setTab] = useAtom(activeTabCompensationAtom);

  useEffect(() => {
    setTab(1);
  }, [setTab]);

  return (
    <Page title='Problemas con envio | BlueEnvío by BlueExpress'>
      <AuthenticatedLayout>
        <div className={style.TipsMain}>
          <Row className='mb-2 lg:mb-6'>
            <Col lg='2'>
              <Row className='items-center justify-center'>
                <div className={style.outContainer}>
                  <BxLogOut size={16} />
                  <div
                    className={style.outText}
                    onClick={() => history.push('/dashboard')}
                  >
                    Salir
                  </div>
                </div>
              </Row>
            </Col>
            <Col lg='8'>
              {tab === 1 && (
                <div className={style.mainTitle}>Problemas con envío</div>
              )}
              {tab === 2 && (
                <div className={style.mainTitle}>Indemnización</div>
              )}
            </Col>
            <Col lg='2'></Col>
          </Row>
          <Row>
            <Card>
              <CardBody padding='dashboard'>
                <Tab>
                  <TabContent activeTabId={tab} tabId={1}>
                    <ShippingIssues />
                  </TabContent>
                </Tab>
              </CardBody>
            </Card>
          </Row>
        </div>
      </AuthenticatedLayout>
    </Page>
  );
}
