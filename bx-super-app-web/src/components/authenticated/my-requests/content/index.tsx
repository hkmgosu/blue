import { useState } from 'react';
import { Col, Row } from '@bx-design/react-grid';
import cs from 'classnames';

import { Tab, TabContent } from 'components/ui-bx/tab';
import MyRequestsReceived from 'components/authenticated/my-requests/received';
import MyRequestsSent from 'components/authenticated/my-requests/sent';
import styles from './styles.module.scss';
import { useAuth } from 'contexts/auth-context';

export default function MyRequestsContent(): JSX.Element {
  const { user } = useAuth();
  const [tab, setTab] = useState(1);
  if (!user) return <></>;
  return (
    <Row>
      <Col col='12'>
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <nav className={styles.nav}>
              <div className={styles.navItem}>
                <button
                  className={styles.navItemButton}
                  onClick={() => setTab(1)}
                >
                  <span
                    className={cs(styles.navItemButtonText, {
                      [styles.navItemButtonTextIsActive]: tab === 1,
                    })}
                  >
                    Recibidas
                  </span>
                  <div
                    className={cs(styles.navItemButtonBorder, {
                      [styles.navItemButtonBorderIsActive]: tab === 1,
                    })}
                  />
                </button>
              </div>
              <div className={styles.navItem}>
                <button
                  className={styles.navItemButton}
                  onClick={() => setTab(2)}
                >
                  <span
                    className={cs(styles.navItemButtonText, {
                      [styles.navItemButtonTextIsActive]: tab === 2,
                    })}
                  >
                    Enviadas
                  </span>
                  <div
                    className={cs(styles.navItemButtonBorder, {
                      [styles.navItemButtonBorderIsActive]: tab === 2,
                    })}
                  />
                </button>
              </div>
              <div className={styles.navItem}>
                <button className={styles.navItemButton} disabled>
                  <span
                    className={cs(styles.navItemButtonText, {
                      [styles.navItemButtonTextIsActive]: tab === 3,
                    })}
                  >
                    Historial de solicitudes
                  </span>
                  <div
                    className={cs(styles.navItemButtonBorder, {
                      [styles.navItemButtonBorderIsActive]: tab === 3,
                    })}
                  />
                </button>
              </div>
            </nav>
          </header>
          <div className={styles.cardBody}>
            <Tab>
              <TabContent activeTabId={tab} tabId={1}>
                <Row>
                  <Col col='12'>
                    <MyRequestsReceived userEmail={user.email} />
                  </Col>
                </Row>
              </TabContent>
              <TabContent activeTabId={tab} tabId={2}>
                <Row>
                  <Col col='12'>
                    <MyRequestsSent />
                  </Col>
                </Row>
              </TabContent>
              <TabContent activeTabId={tab} tabId={3}></TabContent>
            </Tab>
          </div>
        </div>
      </Col>
    </Row>
  );
}
