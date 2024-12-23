import { useCallback, ChangeEvent } from 'react';

import styles from 'components/new-shipping/layout/shipping/shipping-input.module.scss';
import NewShippingLayoutInputSize from 'components/new-shipping/layout/input/size';
import {
  useShippingPackageSizesHeight,
  useShippingPackageSizesHeightError,
  useShippingPackageSizesVolumetricError,
} from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutShippingInputHeightUnitary(): JSX.Element {
  const [height, setHeight] = useShippingPackageSizesHeight();
  const volumetricError = useShippingPackageSizesVolumetricError();
  const heightError = useShippingPackageSizesHeightError();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        setHeight(0);
      } else {
        setHeight(Number(e.target.value));
      }
    },
    [setHeight]
  );

  return (
    <NewShippingLayoutInputSize
      sizeTitle={
        <>
          Alto <span className={styles.required}>*</span>
        </>
      }
      hasError={volumetricError || heightError}
      measure={height}
      handleChange={handleChange}
      sizeType='height'
    />
  );
}

export default NewShippingLayoutShippingInputHeightUnitary;
