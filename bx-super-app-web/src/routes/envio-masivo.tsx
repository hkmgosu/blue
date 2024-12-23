import FrequentOriginProvider from 'contexts/frequent-origin-context';
import Massive from 'pages/authenticated/new-shipping/massive';

function NewShippingMassive({ view }: { view?: string }): JSX.Element {
  return (
    <FrequentOriginProvider>
      <Massive view={view}></Massive>
    </FrequentOriginProvider>
  );
}

export default NewShippingMassive;
