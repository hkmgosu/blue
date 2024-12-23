import cs from 'classnames';

import type { ShippingSizeType } from 'types/shipping';
import NewShippingSizesS from 'components/new-shipping/sizes/size-s';
import NewShippingSizesM from 'components/new-shipping/sizes/size-m';
import styles from './sizes-box.module.scss';
import NewShippingSizesNone from 'components/new-shipping/sizes/size-none';
import NewShippingSizesSobre from 'components/new-shipping/sizes/size-sobre';
import NewShippingSizesL from 'components/new-shipping/sizes/size-l';

type Props = {
  size: ShippingSizeType;
  isPriceQuote?: boolean;
};

type SizeComponentType = {
  [key in ShippingSizeType]: JSX.Element;
};

const sizeComponent: SizeComponentType = {
  none: <NewShippingSizesNone />,
  XS: <NewShippingSizesSobre />,
  S: <NewShippingSizesS />,
  M: <NewShippingSizesM />,
  L: <NewShippingSizesL />,
};

function NewShippingLayoutSizesBox({ size }: Props): JSX.Element {
  return (
    <div className={cs(styles.box, styles.boxPriceQuote)}>
      <div className={cs(styles.content)}>{sizeComponent[size]}</div>
    </div>
  );
}

export default NewShippingLayoutSizesBox;
