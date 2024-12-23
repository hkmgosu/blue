import { useCallback, useMemo, useEffect } from 'react';

import { sizeToMeasures } from 'components/new-shipping/utils/size-to-measures';
import { sizesToSize } from 'components/new-shipping/utils/sizes-to-size';
import NewShippingLayoutSizeButtonGrid from 'components/new-shipping/layout/sizes/size-button-grid';
import NewShippingLayoutSizeButton from 'components/new-shipping/layout/sizes/size-button';
import type { ShippingSizeType } from 'types/shipping';
import {
  useShippingPackageSize,
  useShippingPackageSizes,
} from 'emission-lib/hooks/shipping-package';
import styles from './size-buttons.module.scss';
function NewShippingLayoutSizeButtons(): JSX.Element {
  const [packageSize, setPackageSize] = useShippingPackageSize();
  const [packageSizes, setPackageSizes] = useShippingPackageSizes();

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

  const handleSetSize = useCallback(
    (osize: ShippingSizeType) => {
      const getSize = sizeToMeasures[osize];
      setPackageSizes({
        length: Number(getSize.length) - 4,
        height: Number(getSize.height) - 4,
        width: Number(getSize.width) - 4,
        weight: Number(getSize.weight),
      });
      setPackageSize(osize);
      window.localStorage.setItem('package-destiny-form', osize);
    },
    [setPackageSize, setPackageSizes]
  );

  useEffect(() => {
    setPackageSize(size);
  }, [size, setPackageSize]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Elige un tamaño estándar</h2>
      <NewShippingLayoutSizeButtonGrid>
        <NewShippingLayoutSizeButton
          size='XS'
          onClick={() => handleSetSize('XS')}
          isActive={packageSize === 'XS'}
        />
        <NewShippingLayoutSizeButton
          size='S'
          onClick={() => handleSetSize('S')}
          isActive={packageSize === 'S'}
        />
        <NewShippingLayoutSizeButton
          size='M'
          onClick={() => handleSetSize('M')}
          isActive={packageSize === 'M'}
        />
        <NewShippingLayoutSizeButton
          size='L'
          onClick={() => handleSetSize('L')}
          isActive={packageSize === 'L'}
        />
      </NewShippingLayoutSizeButtonGrid>
    </div>
  );
}

export default NewShippingLayoutSizeButtons;
