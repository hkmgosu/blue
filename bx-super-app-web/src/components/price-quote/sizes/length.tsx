import { useCallback, ChangeEvent } from 'react';
import { useAtom } from 'jotai';

import styles from './styles.module.scss';
import {
  priceQuoteVolumetricErrorAtom,
  sizeLengthAtom,
  showLengthErrorAtom,
} from 'atoms/price-quote';
import NewShippingLayoutInputSize from 'components/new-shipping/layout/input/size';

function PriceQouteSizesLength(): JSX.Element {
  const [size, setSize] = useAtom(sizeLengthAtom);
  const [isError] = useAtom(priceQuoteVolumetricErrorAtom);
  const [lengthError, setLengthError] = useAtom(showLengthErrorAtom);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const moreThan60 = Number(e.target.value) > 60;
      if (e.target.value === '') {
        setSize(0);
      } else {
        setSize(parseInt(e.target.value));
      }
      if (moreThan60) {
        setLengthError(true);
      } else {
        setLengthError(false);
      }
    },
    [setSize, setLengthError]
  );

  return (
    <NewShippingLayoutInputSize
      sizeTitle={
        <>
          Largo <span className={styles.required}>*</span>
        </>
      }
      hasError={isError || lengthError}
      measure={size}
      handleChange={handleChange}
      sizeType='length'
      max='60'
    />
  );
}

export default PriceQouteSizesLength;
