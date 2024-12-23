import { isAssistedShippingAtom } from 'atoms/commons';
import { Toggle } from 'components/ui-bx/forms';
import { useAtom } from 'jotai';
import styles from './index.module.scss';

function AssistedShippingUnitary(): JSX.Element {
  const [assistedShippingUnitary, setAssistedShipping] = useAtom(
    isAssistedShippingAtom
  );
  const handleClick = (): void => {
    setAssistedShipping(!assistedShippingUnitary);
  };

  return (
    <>
      <div className={styles.toggleContainer}>
        <span className={styles.text}>Envío asistido</span>
        <span className={styles.text}>No</span>
        <Toggle
          checked={assistedShippingUnitary}
          onChange={handleClick}
        ></Toggle>
        <span className={styles.text}>Sí</span>
      </div>
    </>
  );
}

export default AssistedShippingUnitary;
