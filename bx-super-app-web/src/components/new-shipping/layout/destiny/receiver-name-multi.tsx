import styles from './receiver-name-multi.module.scss';
import {
  useShippingReceiverLastname,
  useShippingReceiverName,
} from 'emission-lib/hooks/shipping';

function NewShippingLayoutDestinyReceiverNameMulti(): JSX.Element {
  const [receiverName] = useShippingReceiverName();
  const [receiverLastName] = useShippingReceiverLastname();

  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>
        {receiverName.length + receiverLastName.length > 18
          ? `${receiverName} ${receiverLastName}`.substring(0, 18) + '...'
          : receiverName.length + receiverLastName.length > 0
          ? `${receiverName} ${receiverLastName}`
          : 'Nombre Apellido'}
      </span>
    </div>
  );
}

export default NewShippingLayoutDestinyReceiverNameMulti;
