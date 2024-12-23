import { BxTrash } from '@bx-design/react-icons';

import styles from './receiver-left-item-edit-multi.module.scss';
import {
  useShippingAtom,
  useShippings,
  useShippingSelected,
  useShippingSelectedAtom,
} from 'emission-lib/hooks/shipping';

function NewShippingLayoutDestinyReceiverLeftItemRemoveMulti(): JSX.Element {
  const shippingAtom = useShippingAtom();
  const [shippingAtoms, removeShippingAtom] = useShippings();
  const [, setSelected] = useShippingSelected();
  const [, setSelectedAtom] = useShippingSelectedAtom();

  const handleClick = (): void => {
    removeShippingAtom(shippingAtom);
    setSelected(shippingAtoms[0].toString());
    setSelectedAtom(shippingAtoms[0]);
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      disabled={shippingAtoms.length === 2}
    >
      <BxTrash />
    </button>
  );
}

export default NewShippingLayoutDestinyReceiverLeftItemRemoveMulti;
