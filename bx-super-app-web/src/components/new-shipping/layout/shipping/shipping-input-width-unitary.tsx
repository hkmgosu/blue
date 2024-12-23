import { useCallback, ChangeEvent } from 'react';

import styles from 'components/new-shipping/layout/shipping/shipping-input.module.scss';

import NewShippingLayoutInputSize from 'components/new-shipping/layout/input/size';
import {
  useShippingPackageSizesVolumetricError,
  useShippingPackageSizesWidth,
  useShippingPackageSizesWidthError,
} from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutShippingInputWidthUnitary(): JSX.Element {
  const [width, setWidth] = useShippingPackageSizesWidth();
  const volumetricError = useShippingPackageSizesVolumetricError();
  const widthError = useShippingPackageSizesWidthError();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        setWidth(0);
      } else {
        setWidth(Number(e.target.value));
      }
    },
    [setWidth]
  );

  return (
    <NewShippingLayoutInputSize
      sizeTitle={
        <>
          Ancho <span className={styles.required}>*</span>
        </>
      }
      hasError={volumetricError || widthError}
      measure={width}
      handleChange={handleChange}
      sizeType='width'
    />
  );
}

export default NewShippingLayoutShippingInputWidthUnitary;
