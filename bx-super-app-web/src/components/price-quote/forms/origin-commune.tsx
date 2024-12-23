import { useAtom } from 'jotai';

import NewShippingLayoutCommune from 'components/new-shipping/layout/commune';
import { originRegionAtom, originCommuneAtom } from 'atoms/price-quote';

function PriceQuoteFormsOriginCommune(): JSX.Element {
  const [originRegion] = useAtom(originRegionAtom);
  const [originCommune, setOriginCommune] = useAtom(originCommuneAtom);

  return (
    <NewShippingLayoutCommune
      regionIso={originRegion.region_iso_3166}
      communeCode={originCommune.code}
      dispatchCommunes={setOriginCommune}
      type='origen'
      communeKey='price-quote-origin-communes'
    />
  );
}

export default PriceQuoteFormsOriginCommune;
