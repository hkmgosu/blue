import { useCallback, ChangeEvent } from 'react';

import styles from 'components/new-shipping/layout/shipping/shipping-input.module.scss';
import NewShippingLayoutInputSize from 'components/new-shipping/layout/input/size';
import {
  useShippingPackageSizesLength,
  useShippingPackageSizesLengthError,
  useShippingPackageSizesVolumetricError,
} from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutShippingInputLengthUnitary(): JSX.Element {
  const [length, setLength] = useShippingPackageSizesLength();
  const volumetricError = useShippingPackageSizesVolumetricError();
  const lengthError = useShippingPackageSizesLengthError();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        setLength(0);
      } else {
        setLength(Number(e.target.value));
      }
    },
    [setLength]
  );
  return (
    <NewShippingLayoutInputSize
      sizeTitle={
        <>
          Largo <span className={styles.required}>*</span>
        </>
      }
      hasError={volumetricError || lengthError}
      measure={length}
      handleChange={handleChange}
      sizeType='length'
    />
  );
}

export default NewShippingLayoutShippingInputLengthUnitary;
