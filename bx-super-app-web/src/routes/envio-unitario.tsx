import FrequentOriginProvider from 'contexts/frequent-origin-context';
import Unitary from '../pages/authenticated/new-shipping/unitary';

function NewUnitShipment({ view }: { view?: string }): JSX.Element {
  return (
    <FrequentOriginProvider>
      <Unitary view={view} />
    </FrequentOriginProvider>
  );
}

export default NewUnitShipment;
