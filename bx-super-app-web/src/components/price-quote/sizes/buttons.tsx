import { useCallback, useMemo, useEffect } from 'react';
import { useAtom } from 'jotai';

import {
  sizeLengthAtom,
  sizeWidthAtom,
  sizeWeightAtom,
  sizeHeightAtom,
  sizePackageAtom,
} from 'atoms/price-quote';
import type { PriceQuoteSizeType } from 'atoms/price-quote/types';
import { sizeToMeasures } from 'components/new-shipping/utils/size-to-measures';
import { sizesToSize } from 'components/new-shipping/utils/sizes-to-size';
import NewShippingLayoutSizeButton from 'components/new-shipping/layout/sizes/size-button';
import PriceQuoteSizesButtonsGrid from './buttons-grid';
import styles from './styles.module.scss';
function PriceQuoteSizesButtons(): JSX.Element {
  const [size, setSize] = useAtom(sizePackageAtom);
  const [length, setLength] = useAtom(sizeLengthAtom);
  const [width, setWidth] = useAtom(sizeWidthAtom);
  const [height, setHeight] = useAtom(sizeHeightAtom);
  const [weight, setWeight] = useAtom(sizeWeightAtom);

  const theSize = useMemo(
    () =>
      sizesToSize({
        length,
        width,
        height,
        weight,
      }),
    [length, width, height, weight]
  );

  const handleSetSize = useCallback(
    (osize: PriceQuoteSizeType) => {
      const getSize = sizeToMeasures[osize];
      setLength(getSize.length);
      setHeight(getSize.height);
      setWidth(getSize.width);
      setWeight(getSize.weight);
      setSize(osize);
    },
    [setLength, setHeight, setWidth, setWeight, setSize]
  );

  useEffect(() => {
    setSize(theSize);
  }, [setSize, theSize]);

  return (
    <div className={styles.container}>
      <PriceQuoteSizesButtonsGrid>
        <NewShippingLayoutSizeButton
          size='XS'
          onClick={() => handleSetSize('XS')}
          isActive={size === 'XS'}
        />
        <NewShippingLayoutSizeButton
          size='S'
          onClick={() => handleSetSize('S')}
          isActive={size === 'S'}
        />

        <NewShippingLayoutSizeButton
          size='M'
          onClick={() => handleSetSize('M')}
          isActive={size === 'M'}
        />

        <NewShippingLayoutSizeButton
          size='L'
          onClick={() => handleSetSize('L')}
          isActive={size === 'L'}
        />
      </PriceQuoteSizesButtonsGrid>
    </div>
  );
}

export default PriceQuoteSizesButtons;
