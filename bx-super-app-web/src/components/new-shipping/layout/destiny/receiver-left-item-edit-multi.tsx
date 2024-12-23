import { useEffect } from 'react';
import { BxEdit } from '@bx-design/react-icons';

import styles from './receiver-left-item-edit-multi.module.scss';
import {
  useShippingId,
  useShippingSelected,
} from 'emission-lib/hooks/shipping';
import { useMultiSelectedTab } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutDestinyReceiverLeftItemEditMulti(): JSX.Element {
  const shippingId = useShippingId();
  const [selected, setSelected] = useShippingSelected();
  const [, selecTab] = useMultiSelectedTab();

  const handleClick = (): void => {
    window.scroll(0, 0);
    if (selected !== shippingId) {
      setSelected(shippingId);
    }
  };

  useEffect(() => {
    selecTab(1);
  }, [selecTab, selected]);

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      disabled={selected === shippingId}
    >
      <BxEdit size={16} />
    </button>
  );
}

export default NewShippingLayoutDestinyReceiverLeftItemEditMulti;
