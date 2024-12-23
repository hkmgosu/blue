import NewShippingLayoutCurrentItemSizesBoxMulti from 'components/new-shipping/layout/current-item/sizes-box-multi';
import { useShippingPackageSize } from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutCurrentItemSizeBoxMulti(): JSX.Element {
  const [packageSize] = useShippingPackageSize();

  return <NewShippingLayoutCurrentItemSizesBoxMulti size={packageSize} />;
}

export default NewShippingLayoutCurrentItemSizeBoxMulti;
