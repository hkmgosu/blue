import { useEmissionGtm, useRemoveCache } from 'emission-lib/hooks/events';
import NewShippingUnitaryNav from './nav';
import NewShippingUnitaryTabs from './tabs';
import { useStepPathControl } from '../use-step-path-control';

function NewShippingUnitaryContent({ view }: { view?: string }): JSX.Element {
  useEmissionGtm({ type: 'unitary' });
  useRemoveCache();
  useStepPathControl('unitary', view);

  return (
    <>
      <NewShippingUnitaryNav />
      <NewShippingUnitaryTabs />
    </>
  );
}

export default NewShippingUnitaryContent;
