import cs from 'classnames';
import { RadioButton } from 'components/ui-bx/forms';

import styles from './size-button.module.scss';

type SizesType = 'XS' | 'S' | 'M' | 'L' | 'none';

type Props = {
  size: SizesType;
  onClick: () => void;
  isActive: boolean;
};

type SizeTextType = {
  [key in SizesType]: string;
};

const sizeComponent: SizeTextType = {
  none: '',
  XS: 'Hasta 0,5 Kg - Kg/volumen',
  S: 'Hasta 3 Kg - Kg/volumen',
  M: 'Hasta 6 Kg - Kg/volumen',
  L: 'Hasta 16 Kg - Kg/volumen',
};
const sizeTitleComponent: SizeTextType = {
  none: '',
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
};
function NewShippingLayoutSizeButton({
  size,
  onClick,
  isActive,
}: Props): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <button
        className={cs(styles.button, {
          [styles.isActive]: isActive,
        })}
        onClick={onClick}
      >
        <div className={styles.radioButton}>
          <RadioButton initialChecked={false} checked={isActive} />
        </div>
        <span className={styles.title}>{sizeTitleComponent[size]}</span>
        <span className={styles.subtitle}>{sizeComponent[size]}</span>
      </button>
    </div>
  );
}

export default NewShippingLayoutSizeButton;
