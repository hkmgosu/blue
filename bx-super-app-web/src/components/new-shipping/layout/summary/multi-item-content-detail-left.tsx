import { BxPersonCircle, BxStore } from '@bx-design/react-icons';

import styles from './multi-item-content-detail-left.module.scss';
import NewShippingLayoutSummaryMultiItemContentDetailDataLeft from './multi-item-content-detail-data-left';
import { useEmissionSummaryDto } from 'emission-lib/hooks/dto/use-emission-summary-dto';
import NewShippingLayoutPackageProvider from 'components/new-shipping/provider/package-provider';

function NewShippingLayoutSummaryMultiItemContentDetailLeft(): JSX.Element {
  const summary = useEmissionSummaryDto();

  return (
    <div className={styles.wrapper}>
      <div className={styles.subTitle}>Quién envía</div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxPersonCircle size={15} />
          </div>
          <div className={styles.text}>{summary.whoSend.business_name}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxStore size={15} />
          </div>
          <div className={styles.text}>{summary.whoSend.pickup}</div>
        </div>
      </div>
      <div className={styles.line} />
      <NewShippingLayoutPackageProvider>
        <NewShippingLayoutSummaryMultiItemContentDetailDataLeft />
      </NewShippingLayoutPackageProvider>
    </div>
  );
}

export default NewShippingLayoutSummaryMultiItemContentDetailLeft;
