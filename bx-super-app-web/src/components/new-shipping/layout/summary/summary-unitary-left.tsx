import {
  BxClock,
  BxPackage,
  BxPersonCircle,
  BxPin,
  BxStore,
} from '@bx-design/react-icons';

import styles from './summary-unitary-left.module.scss';
import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import { slaToService } from 'components/new-shipping/utils/sla-to-service';
import { useEmissionSummaryDto } from 'emission-lib/hooks/dto/use-emission-summary-dto';

function NewShippingLayoutSummaryUnitaryLeft(): JSX.Element {
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

      <div className={styles.subTitle}>Destino</div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxPersonCircle size={15} />
          </div>
          <div className={styles.text}>{summary.destiny[0].name}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxPin size={15} />
          </div>
          <div className={styles.text}>{summary.destiny[0].address}</div>
        </div>
      </div>

      <div className={styles.line} />

      <div className={styles.subTitle}>Encomienda</div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxPackage size={15} />
          </div>
          <div className={styles.text}>{summary.destiny[0].package.size}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxClock size={15} />
          </div>
          <div className={styles.text}>
            Tipo de envío:{' '}
            {slaToService(summary.destiny[0].shipping_service?.sla)}
          </div>
        </div>
      </div>

      <div className={styles.line} />

      <div className={styles.subTitle}>Valor de envío</div>

      <div className={styles.contentValue}>
        <div className={styles.contentValueInfo}>
          <div className={styles.contentValueText}>Valor de envío:</div>
          <div className={styles.contentValueVal}>
            {parseToMoney(Math.round(summary.destiny[0].shipping_value.value))}
          </div>
        </div>

        <div className={styles.contentValueInfo}>
          <div className={styles.contentValueText}>Garantía extendida:</div>
          <div className={styles.contentValueVal}>
            {parseToMoney(
              Math.round(summary.destiny[0].shipping_value.warrantyExtended)
            )}
          </div>
        </div>

        <div className={styles.contentValueInfo}>
          <div className={styles.contentValueText}>IVA:</div>
          <div className={styles.contentValueVal}>
            {parseToMoney(Math.round(summary.destiny[0].shipping_value.tax))}
          </div>
        </div>
      </div>
      <div className={styles.line} />

      <div className={styles.contentTotal}>
        <div className={styles.contentTotalText}>Total</div>
        <div className={styles.contentTotalValue}>
          {parseToMoney(Math.round(summary.destiny[0].shipping_value.total))}
        </div>
      </div>
    </div>
  );
}

export default NewShippingLayoutSummaryUnitaryLeft;
