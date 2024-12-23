import { ReactNode } from 'react';
import { BxExclamation } from '@bx-design/react-icons';
import successEmoji from 'components/ui-bx/alert/images/success.png';
import styles from './info-box.module.scss';

type Props = {
  title?: ReactNode;
  header?: ReactNode;
  secondaryText?: ReactNode;
  relevant?: boolean;
  right?: any;
  status?: 'success' | 'warning';
};

function NewShippingLayoutInfoBox({
  title,
  header,
  secondaryText,
  relevant,
  right,
  status,
}: Props): JSX.Element {
  return (
    <div
      className={`${styles.box} ${relevant ? styles.relevant : ''} ${
        status === 'success' ? styles.success : ''
      }`}
    >
      <div className={styles.row}>
        <div className={styles.columnLeft}>
          <div className={styles.icon}>
            {status === 'success' ? (
              <img
                className={styles.img}
                src={successEmoji}
                alt='emoji success'
              />
            ) : (
              <BxExclamation color='var(--bx-color-orange)' size={32} />
            )}
          </div>
          <div className={styles.content}>
            {header && <div className={styles.title}>{header}</div>}
            <strong className={styles.subtitle}>{title}</strong>
            {secondaryText && (
              <span className={styles.text}>{secondaryText}</span>
            )}
          </div>
        </div>
        <div className={styles.columnRight}>{right}</div>
      </div>
    </div>
  );
}

export default NewShippingLayoutInfoBox;
