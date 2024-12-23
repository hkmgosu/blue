import { InputHTMLAttributes, useState, useCallback } from 'react';
import cs from 'classnames';
import styles from './for-sizes.module.scss';

type Props = {
  sizeType: 'length' | 'width' | 'height' | 'weight';
  hasError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

function NewShippingLayoutInputForSizes({
  sizeType,
  hasError,
  ...props
}: Props): JSX.Element {
  const [focused, setFocused] = useState(false);
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${cs(styles.inputForSizes, {
          [styles.inputForSizesFocus]: focused,
        })} ${hasError ? styles.inputForSizesError : ''}`}
      >
        <input
          className={styles.inputComponent}
          type='number'
          onFocus={handleFocus}
          onBlur={handleBlur}
          min='0'
          {...props}
        />
      </div>
      <div className={styles.measurement}>
        {sizeType === 'weight' ? 'kg' : 'cm'}
      </div>
    </div>
  );
}

export default NewShippingLayoutInputForSizes;
