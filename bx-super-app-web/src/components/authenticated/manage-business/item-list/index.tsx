import cs from 'classnames';
import { DateTime } from 'luxon';

import styles from './styles.module.scss';

type Props = {
  businessName: string;
  role: string;
  date: Date;
  isActive: boolean;
  onClick: () => void;
};

export default function ManageBusinessItemList({
  businessName,
  role,
  date,
  isActive,
  onClick,
}: Props): JSX.Element {
  return (
    <div
      className={cs(styles.Box, {
        [styles.BoxIsActive]: isActive,
      })}
      onClick={onClick}
    >
      <header className={styles.BoxHeader}>
        <div
          className={cs(styles.BoxBadge, {
            [styles.BoxBadgeIsActive]: isActive,
          })}
        >
          <span className={styles.BoxBadgeText}>{role}</span>
        </div>
      </header>
      <div
        className={cs(styles.BoxContent, {
          [styles.BoxContentIsActive]: isActive,
        })}
      >
        <h5 className={styles.BoxContentTitle}>
          {businessName.length > 14
            ? `${businessName.substring(0, 14)} ...`
            : businessName}
        </h5>
      </div>
      <footer
        className={cs(styles.BoxFooter, {
          [styles.BoxFooterIsActive]: isActive,
        })}
      >
        <div className={styles.BoxFooterDate}>
          {date && DateTime.fromISO(date.toString()).toLocaleString()}
        </div>
      </footer>
    </div>
  );
}
