import { ReactNode } from 'react';

import styles from 'components/new-shipping/layout/service/content.module.scss';
import type { SlaType } from 'types/pricing';
import { slaToServiceText } from 'components/new-shipping/utils/sla-to-service-text';

type Props = {
  sla: SlaType;
  children: ReactNode;
  loading?: boolean;
};

function NewShippingLayoutServiceContent({
  sla,
  children,
  loading,
}: Props): JSX.Element {
  return (
    <>
      <div className={styles.title}>
        {loading ? 'Cargando...' : slaToServiceText(sla)}
      </div>
      <div className={styles.line} />
      <div className={styles.contentWrapper}>{children}</div>
    </>
  );
}

export default NewShippingLayoutServiceContent;
