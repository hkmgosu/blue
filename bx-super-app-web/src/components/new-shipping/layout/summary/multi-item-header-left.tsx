import { ReactNode } from 'react';
import cs from 'classnames';

import styles from './multi-item-header-left.module.scss';
import { useShippingSummaryButtonArrow } from 'emission-lib/hooks/shipping';

type Props = {
  children: ReactNode;
  position: number;
  totals: number;
};

function NewShippingLayoutSummaryMultiItemHeaderLeft({
  children,
  position,
  totals,
}: Props): JSX.Element {
  const [summaryButton] = useShippingSummaryButtonArrow();
  return (
    <header
      className={cs(styles.header, {
        [styles.headerUnique]: position === totals,
        [styles.headerContentIsOpen]: summaryButton,
      })}
    >
      {children}
    </header>
  );
}

export default NewShippingLayoutSummaryMultiItemHeaderLeft;
