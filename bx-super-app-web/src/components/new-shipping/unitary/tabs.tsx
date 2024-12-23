import { useStep } from 'emission-lib/hooks/emission-state';
import { Tab, TabContent } from 'components/ui-bx/tab';
import NewShippingUnitaryStep1 from './step-1';
import NewShippingUnitaryStep2 from './step-2';
import NewShippingUnitaryStep3 from './step-3';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';
import { useEffect } from 'react';

function NewShippingUnitaryTabs(): JSX.Element {
  const [step] = useStep();
  const [, setType] = useAtom(shipmentTypeAtom);
  useEffect(() => {
    setType('unitary');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Tab>
      <TabContent activeTabId={step} tabId={1}>
        <NewShippingUnitaryStep1 />
      </TabContent>
      <TabContent activeTabId={step} tabId={2}>
        <NewShippingUnitaryStep2 destinyView={1} />
      </TabContent>
      <TabContent activeTabId={step} tabId={3}>
        <NewShippingUnitaryStep2 destinyView={2} />
      </TabContent>
      <TabContent activeTabId={step} tabId={4}>
        <NewShippingUnitaryStep3 />
      </TabContent>
    </Tab>
  );
}

export default NewShippingUnitaryTabs;
