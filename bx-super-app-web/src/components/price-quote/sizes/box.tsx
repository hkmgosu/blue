import { useAtom } from 'jotai';

import { sizePackageAtom } from 'atoms/price-quote';
import NewShippingLayoutSizesBox from 'components/new-shipping/layout/sizes/sizes-box';

function PriceQuoteSizesBox(): JSX.Element {
  const [size] = useAtom(sizePackageAtom);

  return <NewShippingLayoutSizesBox size={size} />;
}

export default PriceQuoteSizesBox;
