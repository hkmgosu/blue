import { useCallback, ChangeEvent } from 'react';
import { useAtom } from 'jotai';

import styles from './styles.module.scss';
import {
  priceQuoteVolumetricErrorAtom,
  showHeightErrorAtom,
  sizeHeightAtom,
} from 'atoms/price-quote';
import NewShippingLayoutInputSize from 'components/new-shipping/layout/input/size';

function PriceQouteSizesHeight(): JSX.Element {
  const [size, setSize] = useAtom(sizeHeightAtom);
  const [isError] = useAtom(priceQuoteVolumetricErrorAtom);
  const [heightError, setHeightError] = useAtom(showHeightErrorAtom);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const moreThan60 = Number(e.target.value) > 60;
      if (e.target.value === '') {
        setSize(0);
      } else {
        setSize(parseInt(e.target.value));
      }
      if (moreThan60) {
        setHeightError(true);
      } else {
        setHeightError(false);
      }
    },
    [setSize, setHeightError]
  );

  return (
    <NewShippingLayoutInputSize
      sizeTitle={
        <>
          Alto <span className={styles.required}>*</span>
        </>
      }
      hasError={isError || heightError}
      measure={size}
      handleChange={handleChange}
      sizeType='height'
      max='60'
    />
  );
}

export default PriceQouteSizesHeight;
