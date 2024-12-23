import styles from './multi-item-name-left.module.scss';
import {
  useShippingReceiverLastname,
  useShippingReceiverName,
} from 'emission-lib/hooks/shipping';

function NewShippingLayoutSummaryMultiNameLeft(): JSX.Element {
  const [receiverName] = useShippingReceiverName();
  const [receiverLastName] = useShippingReceiverLastname();
  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>{receiverName || 'Nombre'}</span>
      <span className={styles.lastName}>{receiverLastName || 'Apellido'}</span>
    </div>
  );
}

export default NewShippingLayoutSummaryMultiNameLeft;
