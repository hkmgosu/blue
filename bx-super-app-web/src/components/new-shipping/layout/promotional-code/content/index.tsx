import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import { parteToPercentage } from 'components/new-shipping/utils/parse-to-percentage';
import { Col, Row } from '@bx-design/react-grid';
import styles from './styles.module.scss';
import {
  usePrice,
  useTax,
  useTotalPrice,
  useWarranty,
} from 'emission-lib/hooks/pricing';
import { useDiscount } from 'emission-lib/hooks/promotion';
import { usePromotionalCodeFraction } from 'emission-lib/hooks/emission-state';

export default function NewShippingLayoutPromotionalCodeContent(): JSX.Element {
  const price = usePrice();
  const tax = useTax();
  const warranty = useWarranty();
  const totalPrice = useTotalPrice();
  const [discount] = useDiscount();
  const [isFraction] = usePromotionalCodeFraction();

  return (
    <div className={styles.wrapper}>
      <Row>
        <Col col='12'>
          <div className={styles.content}>
            <div className={styles.line} />
            <div className={styles.contentBox}>
              <div className={styles.contentBoxInfo}>
                <div className={styles.infoText}>Valor envío:</div>
                <div className={styles.infoPrice}>
                  {parseToMoney(Math.round(price))}
                </div>
              </div>
              <div className={styles.contentBoxInfo}>
                <div className={styles.infoText}>Código de descuento:</div>
                <div className={styles.infoPrice}>
                  {isFraction
                    ? parteToPercentage(Math.round(discount))
                    : (Math.round(discount) > 0 ? '-' : '') +
                      parseToMoney(Math.round(discount))}
                </div>
              </div>
              <div className={styles.contentBoxInfo}>
                <div className={styles.infoTextBold}>Subtotal:</div>
                <div className={styles.infoPriceBold}>
                  {isFraction
                    ? parseToMoney(Math.round(price - (price * discount) / 100))
                    : parseToMoney(Math.round(price - discount))}
                </div>
              </div>
            </div>
            <div className={styles.line} />
            <div className={styles.contentBox}>
              <div className={styles.contentBoxInfo}>
                <div className={styles.infoText}>Garantía extendida:</div>
                <div className={styles.infoPrice}>
                  {parseToMoney(Math.round(warranty))}
                </div>
              </div>
              <div className={styles.contentBoxInfo}>
                <div className={styles.infoText}>Iva:</div>
                <div className={styles.infoPrice}>
                  {parseToMoney(Math.round(tax))}
                </div>
              </div>
            </div>
            <div className={styles.line} />
            <div className={styles.contentBox}>
              <div className={styles.contentBoxInfo}>
                <div className={styles.infoTextBold}>Total:</div>
                <div className={styles.infoPriceBold}>
                  {parseToMoney(Math.round(totalPrice))}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
