import { useAtom } from 'jotai';

import NewShippingFormRegion from 'components/new-shipping/layout/region';
import { originRegionAtom } from 'atoms/price-quote';

function PriceQuoteFormsOriginRegion(): JSX.Element {
  const [originRegion, setOriginRegion] = useAtom(originRegionAtom);

  return (
    <NewShippingFormRegion
      regionIso={originRegion.region_iso_3166}
      dispatchCommunes={setOriginRegion}
      type='origen'
      regionKey='price-quote-origin-region'
    />
  );
}

export default PriceQuoteFormsOriginRegion;
