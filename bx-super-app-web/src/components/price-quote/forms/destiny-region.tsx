import { useAtom } from 'jotai';

import NewShippingFormRegion from 'components/new-shipping/layout/region';
import { destinyRegionAtom } from 'atoms/price-quote';

function PriceQuoteFormsDestinyRegion(): JSX.Element {
  const [destinyRegion, setDestinyRegion] = useAtom(destinyRegionAtom);

  return (
    <NewShippingFormRegion
      regionIso={destinyRegion.region_iso_3166}
      dispatchCommunes={setDestinyRegion}
      type='destino'
      regionKey='price-quote-destiny-region'
    />
  );
}

export default PriceQuoteFormsDestinyRegion;
