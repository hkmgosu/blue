import { useAtom } from 'jotai';

import NewShippingLayoutCommune from 'components/new-shipping/layout/commune';
import { destinyRegionAtom, destinyCommuneAtom } from 'atoms/price-quote';

function PriceQuoteFormsDestinyCommune(): JSX.Element {
  const [destinyRegion] = useAtom(destinyRegionAtom);
  const [destinyCommune, setDestinyCommune] = useAtom(destinyCommuneAtom);

  return (
    <NewShippingLayoutCommune
      regionIso={destinyRegion.region_iso_3166}
      communeCode={destinyCommune.code}
      dispatchCommunes={setDestinyCommune}
      type='destino'
      communeKey='price-quote-destiny-communes'
    />
  );
}

export default PriceQuoteFormsDestinyCommune;
