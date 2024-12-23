import styles from 'components/new-shipping/layout/main-back.module.scss';
import { BxUpload } from '@bx-design/react-icons';
import { useExitModal } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutMainBack(): JSX.Element {
  const [, setExitModal] = useExitModal();
  return (
    <div className={styles.link} onClick={() => setExitModal(true)}>
      <div className={styles.iconContainer}>
        <BxUpload size={16} />
      </div>
      <div className={styles.exitText}>Salir del envío</div>
    </div>
  );
}

export default NewShippingLayoutMainBack;
