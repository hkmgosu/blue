import cs from 'classnames';
import { BxChevronDown } from '@bx-design/react-icons';
import { SetStateAction } from 'jotai';

import styles from './multi-item-arrow-left.module.scss';

type Props = {
  isOpen: boolean;
  setSummaryButton: (update: SetStateAction<boolean>) => void;
};

function NewShippingSummaryMultiItemArrowLeft({
  isOpen,
  setSummaryButton,
}: Props): JSX.Element {
  const handleClick = (): void => setSummaryButton((prev) => !prev);

  return (
    <button className={styles.button} onClick={handleClick}>
      <div
        className={cs(styles.wrapper, {
          [styles.wrapperIsOpen]: isOpen,
        })}
      >
        <div className={styles.iconBox}>
          <BxChevronDown color='var(--bx-color-orange)' size={18} />
        </div>
      </div>
    </button>
  );
}

export default NewShippingSummaryMultiItemArrowLeft;
