import { useCallback, ChangeEvent } from 'react';
import { useAtom } from 'jotai';

import styles from './styles.module.scss';

import {
  sizeWidthAtom,
  priceQuoteVolumetricErrorAtom,
  showWidthErrorAtom,
} from 'atoms/price-quote';
import NewShippingLayoutInputSize from 'components/new-shipping/layout/input/size';

function PriceQouteSizesWidth(): JSX.Element {
  const [size, setSize] = useAtom(sizeWidthAtom);
  const [isError] = useAtom(priceQuoteVolumetricErrorAtom);
  const [widthError, setWidthError] = useAtom(showWidthErrorAtom);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const moreThan60 = Number(e.target.value) > 60;
      if (e.target.value === '') {
        setSize(0);
      } else {
        setSize(parseInt(e.target.value));
      }
      if (moreThan60) {
        setWidthError(true);
      } else {
        setWidthError(false);
      }
    },
    [setSize, setWidthError]
  );

  return (
    <NewShippingLayoutInputSize
      sizeTitle={
        <>
          Ancho <span className={styles.required}>*</span>
        </>
      }
      hasError={isError || widthError}
      measure={size}
      handleChange={handleChange}
      sizeType='width'
      max='60'
    />
  );
}

export default PriceQouteSizesWidth;
