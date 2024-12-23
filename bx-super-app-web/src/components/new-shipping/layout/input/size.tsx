import { ReactNode, ChangeEvent, InputHTMLAttributes } from 'react';

import styles from './size.module.scss';
import NewShippingLayoutInputForSizes from './for-sizes';

type Props = {
  sizeTitle: ReactNode;
  measure: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  sizeType: 'length' | 'width' | 'height' | 'weight';
  hasError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

function NewShippingLayoutInputSize({
  sizeTitle,
  measure,
  handleChange,
  sizeType,
  hasError,
  ...props
}: Props): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{sizeTitle}</p>
      <div className={styles.inputWrapper}>
        <div className={styles.inputBox}>
          <NewShippingLayoutInputForSizes
            sizeType={sizeType}
            value={measure}
            onChange={handleChange}
            hasError={hasError}
            {...props}
          />
        </div>
      </div>
    </div>
  );
}

export default NewShippingLayoutInputSize;
