import styles from 'components/new-shipping/form/package/styles.module.scss';
import { useHistory } from 'react-router-dom';

function NewShippingFormPackageDangerousLink(): JSX.Element {
  const history = useHistory();
  const handleClick = (): void => {
    history.push('/tips');
  };

  return (
    <div className={styles.orangeDangerousUnderline} onClick={handleClick}>
      ver mercancías peligrosas
    </div>
  );
}

export default NewShippingFormPackageDangerousLink;
