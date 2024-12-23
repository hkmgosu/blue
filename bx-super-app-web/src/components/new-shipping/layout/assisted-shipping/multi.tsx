import { isAssistedShippingMultiAtom } from 'atoms/commons';
import { Toggle } from 'components/ui-bx/forms';
import { useAtom } from 'jotai';
import styles from './index.module.scss';
function AssistedShippingMulti(): JSX.Element {
  const [assistedShippingMulti, setAssistedShipping] = useAtom(
    isAssistedShippingMultiAtom
  );
  const handleClick = (): void => {
    setAssistedShipping(!assistedShippingMulti);
  };

  return (
    <>
      <div className={styles.toggleContainer}>
        <span className={styles.text}>Envío asistido</span>
        <span className={styles.text}>No</span>
        <Toggle checked={assistedShippingMulti} onChange={handleClick}></Toggle>
        <span className={styles.text}>Sí</span>
      </div>
    </>
  );
}

export default AssistedShippingMulti;
