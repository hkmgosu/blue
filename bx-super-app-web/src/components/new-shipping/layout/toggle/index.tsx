import { ReactNode } from 'react';

import { Toggle } from 'components/ui-bx/forms';
import styles from './toggle-for-save.module.scss';

type Props = {
  children: ReactNode;
  initialChecked: boolean;
  handleChange: () => void;
};

function NewShippingLayoutToggleForSave({
  children,
  initialChecked,
  handleChange,
}: Props): JSX.Element {
  return (
    <div className={styles.toggleForSave}>
      <div className={styles.toggleForSaveContent}>
        <Toggle
          initialChecked={initialChecked}
          onChange={handleChange}
          toggleSize='lg'
        />
        <span className={styles.text}>{children}</span>
      </div>
    </div>
  );
}

export default NewShippingLayoutToggleForSave;
