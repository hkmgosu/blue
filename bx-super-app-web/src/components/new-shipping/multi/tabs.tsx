import { Tab, TabContent } from 'components/ui-bx/tab';
import NewShippingMultiStep1 from './step-1';
import NewShippingMultiStep2 from './step-2';
import NewShippingMultiStep3 from './step-3';
import { useStep } from 'emission-lib/hooks/emission-state';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';
import { useEffect } from 'react';

function NewShippingMultiTabs(): JSX.Element {
  const [step] = useStep();
  const [, setType] = useAtom(shipmentTypeAtom);
  useEffect(() => {
    setType('multi');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Tab>
      <TabContent activeTabId={step} tabId={1}>
        <NewShippingMultiStep1 />
      </TabContent>
      <TabContent activeTabId={step} tabId={2}>
        <NewShippingMultiStep2 />
      </TabContent>
      <TabContent activeTabId={step} tabId={3}>
        <NewShippingMultiStep3 />
      </TabContent>
    </Tab>
  );
}

export default NewShippingMultiTabs;
