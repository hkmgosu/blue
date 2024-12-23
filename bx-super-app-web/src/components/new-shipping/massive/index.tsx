import { useEmissionGtm, useRemoveCache } from 'emission-lib/hooks/events';
import { useStepPathControl } from '../use-step-path-control';
import NewShippingMassiveNav from './nav';
import NewShippingMassiveTabs from './tabs';
/**
 * se quita modal de paso 1 de masivo
 */
// import NewShippingMassiveModal from './modal';

function NewShippingMassiveContent({ view }: { view?: string }): JSX.Element {
  useEmissionGtm({ type: 'massive' });
  useRemoveCache();
  useStepPathControl('massive', view);

  return (
    <>
      {/* <NewShippingMassiveModal /> */}
      <NewShippingMassiveNav />
      <NewShippingMassiveTabs />
    </>
  );
}

export default NewShippingMassiveContent;
