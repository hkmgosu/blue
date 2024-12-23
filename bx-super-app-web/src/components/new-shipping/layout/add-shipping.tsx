import styles from './add-shipping.module.scss';

import { useShippingState } from 'emission-lib/hooks/shipping';
import { initialShippingState } from 'emission-lib/utils';

function NewShippingLayoutAddShipping(): JSX.Element {
  const [shippingState, setShippingState] = useShippingState();

  const handleAdd = (): void => {
    setShippingState((prev) => [...prev, initialShippingState]);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        disabled={shippingState.length >= 5}
        onClick={handleAdd}
      >
        + Añadir otro envío
      </button>
    </div>
  );
}

export default NewShippingLayoutAddShipping;
