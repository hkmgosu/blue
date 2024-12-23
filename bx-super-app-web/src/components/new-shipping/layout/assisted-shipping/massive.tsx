import { isAssistedShippingMassiveAtom } from 'atoms/commons';
import { Toggle } from 'components/ui-bx/forms';
import { useAtom } from 'jotai';
import styles from './index.module.scss';
function AssistedShippingMassive(): JSX.Element {
  const [assistedShippingmassive, setAssistedShipping] = useAtom(
    isAssistedShippingMassiveAtom
  );
  const handleClick = (): void => {
    setAssistedShipping(!assistedShippingmassive);
  };

  return (
    <>
      <div className={styles.toggleContainer}>
        <span className={styles.text}>Envío asistido</span>
        <span className={styles.text}>No</span>
        <Toggle
          checked={assistedShippingmassive}
          onChange={handleClick}
        ></Toggle>
        <span className={styles.text}>Sí</span>
      </div>
    </>
  );
}

export default AssistedShippingMassive;
