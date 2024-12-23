import type { ShippingSizeType } from 'types/shipping';
import NewShippingSizesS from 'components/new-shipping/sizes/size-s';
import NewShippingSizesM from 'components/new-shipping/sizes/size-m';
import NewShippingSizesL from 'components/new-shipping/sizes/size-l';
import styles from './sizes-box-multi.module.scss';
import NewShippingSizesNone from 'components/new-shipping/sizes/size-none';
import NewShippingSizesSobre from 'components/new-shipping/sizes/size-sobre';

type Props = {
  size: ShippingSizeType;
};

type SizeComponentType = {
  [key in ShippingSizeType]: JSX.Element;
};

const sizeComponent: SizeComponentType = {
  none: <NewShippingSizesNone width='100%' />,
  XS: <NewShippingSizesSobre width='100%' />,
  S: <NewShippingSizesS width='100%' />,
  M: <NewShippingSizesM width='100%' />,
  L: <NewShippingSizesL width='100%' />,
};

function NewShippingLayoutCurrentItemSizesBoxMulti({
  size,
}: Props): JSX.Element {
  return (
    <div className={styles.box}>
      <div className={styles.content}>{sizeComponent[size]}</div>
    </div>
  );
}

export default NewShippingLayoutCurrentItemSizesBoxMulti;
