import { useCallback, ChangeEvent } from 'react';
import { useAtom } from 'jotai';

import styles from './styles.module.scss';
import { showWeightErrorAtom, sizeWeightAtom } from 'atoms/price-quote';
import NewShippingLayoutInputSize from 'components/new-shipping/layout/input/size';

function PriceQouteSizesWeight(): JSX.Element {
  const [size, setSize] = useAtom(sizeWeightAtom);
  const [weightError, setWeightError] = useAtom(showWeightErrorAtom);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const moreThan16 = Number(e.target.value) > 16;
      if (e.target.value === '') {
        setSize(0);
        setWeightError(false);
      } else {
        setSize(Number(e.target.value));
      }
      if (moreThan16) {
        setWeightError(true);
      } else {
        setWeightError(false);
      }
    },
    [setSize, setWeightError]
  );

  return (
    <NewShippingLayoutInputSize
      sizeTitle={
        <>
          Peso <span className={styles.required}>*</span>
        </>
      }
      hasError={weightError}
      measure={size}
      handleChange={handleChange}
      sizeType='weight'
      max='16'
      step='0.1'
    />
  );
}

export default PriceQouteSizesWeight;
