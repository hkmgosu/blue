import FrequentOriginProvider from 'contexts/frequent-origin-context';
import Multi from '../pages/authenticated/new-shipping/multi';

function NewMultipleShipment({ view }: { view?: string }): JSX.Element {
  return (
    <FrequentOriginProvider>
      <Multi view={view} />
    </FrequentOriginProvider>
  );
}

export default NewMultipleShipment;
