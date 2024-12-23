import {
  sizeHeightAtom,
  sizeLengthAtom,
  sizePackageAtom,
  sizeWeightAtom,
  sizeWidthAtom,
} from 'atoms/price-quote';
import { sizesToSize } from 'components/new-shipping/utils/sizes-to-size';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

function NewShippingLayoutInputSizesUseEffect(): JSX.Element {
  const [, setSize] = useAtom(sizePackageAtom);
  const [length] = useAtom(sizeLengthAtom);
  const [width] = useAtom(sizeWidthAtom);
  const [height] = useAtom(sizeHeightAtom);
  const [weight] = useAtom(sizeWeightAtom);

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

  useEffect(() => {
    setSize(theSize);
  }, [setSize, theSize]);

  return <></>;
}

export default NewShippingLayoutInputSizesUseEffect;
