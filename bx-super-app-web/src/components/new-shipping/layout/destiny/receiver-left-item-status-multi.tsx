import styles from './receiver-left-item-status-multi.module.scss';
import { useShippingStatus } from 'emission-lib/hooks/shipping';
import { BxCheck, BxExclamation } from '@bx-design/react-icons';

function NewShippingLayoutDestinyReceiverLeftItemStatusMulti(): JSX.Element {
  const isValid = useShippingStatus();

  return (
    <div className={styles.box}>
      {!isValid && <BxExclamation color='#E5713D' size={20} />}
      {isValid && <BxCheck color='#408D5C' size={20} />}
    </div>
  );
}

export default NewShippingLayoutDestinyReceiverLeftItemStatusMulti;
