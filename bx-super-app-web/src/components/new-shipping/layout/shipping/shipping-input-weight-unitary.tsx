import { useCallback, ChangeEvent } from 'react';

import styles from 'components/new-shipping/layout/shipping/shipping-input.module.scss';
import NewShippingLayoutInputSize from 'components/new-shipping/layout/input/size';
import { useShippingPackageSizesWeight } from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutShippingInputWeightUnitary(): JSX.Element {
  const [weight, setWeight] = useShippingPackageSizesWeight();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        setWeight(0);
      } else {
        setWeight(Number(e.target.value));
      }
    },
    [setWeight]
  );
  return (
    <NewShippingLayoutInputSize
      sizeTitle={
        <>
          Peso <span className={styles.required}>*</span>
        </>
      }
      hasError={Number(weight) > 16}
      measure={weight}
      handleChange={handleChange}
      sizeType='weight'
      max='50'
      step='0.1'
    />
  );
}

export default NewShippingLayoutShippingInputWeightUnitary;
