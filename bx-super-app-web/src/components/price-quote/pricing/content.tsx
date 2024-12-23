import { ReactNode } from 'react';

import styles from 'components/price-quote/pricing/content.module.scss';
import type { SlaType } from 'types/pricing';

type Props = {
  sla: SlaType;
  children: ReactNode;
};

function PriceQuotePricingContent({ children }: Props): JSX.Element {
  return <div className={styles.contentWrapper}>{children}</div>;
}

export default PriceQuotePricingContent;
