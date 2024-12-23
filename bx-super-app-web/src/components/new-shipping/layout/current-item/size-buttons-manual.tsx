import { useEffect, useMemo } from 'react';

import { sizesToSize } from 'components/new-shipping/utils/sizes-to-size';
import {
  useShippingPackageSize,
  useShippingPackageSizes,
} from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutSizesManual(): JSX.Element {
  const [, setPackageSize] = useShippingPackageSize();
  const [packageSizes] = useShippingPackageSizes();

  const size = useMemo(
    () =>
      sizesToSize({
        length: packageSizes.length,
        width: packageSizes.width,
        height: packageSizes.height,
        weight: packageSizes.weight,
      }),
    [
      packageSizes.length,
      packageSizes.width,
      packageSizes.height,
      packageSizes.weight,
    ]
  );

  useEffect(() => {
    setPackageSize(size);
  }, [size, setPackageSize]);

  return <></>;
}

export default NewShippingLayoutSizesManual;
