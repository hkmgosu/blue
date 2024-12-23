import { useAtom } from 'jotai';

import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import styles from './styles.module.scss';
import { tipsViewAtom } from 'atoms/dashboard';
import { Tab, TabContent } from 'components/ui-bx/tab';
import MainTips from 'components/authenticated/tips/main';
import PickupPoints from 'components/authenticated/tips/pickup-points';
import StepByStep from 'components/authenticated/tips/step-by-step';
import { useEffect } from 'react';
import ServiceExceptions from 'components/authenticated/tips/service-exceptions';

export default function TipsPage(): JSX.Element {
  const [view, setView] = useAtom(tipsViewAtom);

  useEffect(() => {
    setView(1);
  }, [setView]);

  return (
    <Page>
      <AuthenticatedLayout>
        <main className={styles.TipsMain}>
          <Tab>
            <TabContent activeTabId={view} tabId={1}>
              <MainTips />
            </TabContent>
            <TabContent activeTabId={view} tabId={3}>
              <PickupPoints />
            </TabContent>
            <TabContent activeTabId={view} tabId={4}>
              <StepByStep />
            </TabContent>
            <TabContent activeTabId={view} tabId={5}>
              <ServiceExceptions />
            </TabContent>
          </Tab>
        </main>
      </AuthenticatedLayout>
    </Page>
  );
}
