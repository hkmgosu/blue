import { ReactNode } from 'react';
import cs from 'classnames';

import styles from './multi-item-wrapper-left.module.scss';
import NewShippingLayoutSummaryMultiItemHeaderLeft from './multi-item-header-left';
import NewShippingLayoutSummaryMultiNameLeft from './multi-item-name-left';
import NewShippingSummaryMultiItemArrowLeft from 'components/new-shipping/layout/summary/multi-item-arrow-left';
import NewShippingLayoutSummaryItemContentLeft from 'components/new-shipping/layout/summary/multi-item-content-left';
import { useShippingSummaryButtonArrow } from 'emission-lib/hooks/shipping';

type Props = {
  children: ReactNode;
  position: number;
  totals: number;
};

function NewShippingLayoutSummaryMultiItemWrapperLeft({
  children,
  position,
  totals,
}: Props): JSX.Element {
  const [isOpen, setSummaryButton] = useShippingSummaryButtonArrow();
  return (
    <div
      className={cs(styles.wrapper, {
        [styles.wrapperFirst]: position === 1,
        [styles.wrapperUnique]: position === totals,
      })}
    >
      <NewShippingLayoutSummaryMultiItemHeaderLeft
        position={position}
        totals={totals}
      >
        <div className={styles.headerLeft}>
          <NewShippingLayoutSummaryMultiNameLeft />
          <div className={styles.summary}>Resumen del envío nº {position}</div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.headerRightItem}></div>
          <div className={styles.headerRightItem}></div>
          <div className={styles.headerRightItem}>
            <NewShippingSummaryMultiItemArrowLeft
              isOpen={isOpen}
              setSummaryButton={setSummaryButton}
            />
          </div>
        </div>
      </NewShippingLayoutSummaryMultiItemHeaderLeft>
      <NewShippingLayoutSummaryItemContentLeft summaryButton={isOpen}>
        {children}
      </NewShippingLayoutSummaryItemContentLeft>
    </div>
  );
}

export default NewShippingLayoutSummaryMultiItemWrapperLeft;
