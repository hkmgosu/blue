import { useEmissionGtm, useRemoveCache } from 'emission-lib/hooks/events';
import NewShippingMultiNav from './nav';
import NewShippingMultiTabs from './tabs';
import { useStepPathControl } from '../use-step-path-control';

function NewShippingMultiContent({ view }: { view?: string }): JSX.Element {
  useEmissionGtm({ type: 'multi' });
  useRemoveCache();
  useStepPathControl('multi', view);
  return (
    <>
      <NewShippingMultiNav />
      <NewShippingMultiTabs />
    </>
  );
}

export default NewShippingMultiContent;
