import { Tab, TabContent } from 'components/ui-bx/tab';
import NewShippingMassiveStep1 from './step-1';
import NewShippingMassiveStep2 from './step-2';
import NewShippingMassiveStep3 from './step-3-table';
import NewShippingMassiveStep4 from './step-4-checkout';
import { useStep } from 'emission-lib/hooks/emission-state';

function NewShippingMassiveTabs(): JSX.Element {
  const [step] = useStep();
  return (
    <Tab>
      <TabContent activeTabId={step} tabId={1}>
        <NewShippingMassiveStep1 />
      </TabContent>
      <TabContent activeTabId={step} tabId={2}>
        <NewShippingMassiveStep2 />
      </TabContent>
      <TabContent activeTabId={step} tabId={3}>
        <NewShippingMassiveStep3 />
      </TabContent>
      <TabContent activeTabId={step} tabId={4}>
        <NewShippingMassiveStep4 />
      </TabContent>
    </Tab>
  );
}

export default NewShippingMassiveTabs;
