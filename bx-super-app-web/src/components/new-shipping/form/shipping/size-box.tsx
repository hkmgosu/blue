import NewShippingLayoutSizesBox from 'components/new-shipping/layout/sizes/sizes-box';
import { useShippingPackageSize } from 'emission-lib/hooks/shipping-package';

function NewShippingFormShippingSizeBox(): JSX.Element {
  const [packageSize] = useShippingPackageSize();

  return <NewShippingLayoutSizesBox size={packageSize} />;
}

export default NewShippingFormShippingSizeBox;
