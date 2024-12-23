import { Row, Col } from '@bx-design/react-grid';
import cs from 'classnames';
import styles from './emitter.module.scss';
import PriceQouteFormsBusiness from './forms/business';
import { Collapse } from 'components/ui-bx/collapse';
import { useAtom } from 'jotai';
import { toggleCollapseSenderAtom } from 'atoms/price-quote';
import { BxChevronDown } from '@bx-design/react-icons';
function PriceQouteEmitter(): JSX.Element {
  const [toggle, setCollapse] = useAtom(toggleCollapseSenderAtom);
  return (
    <Row className='mb-12'>
      <Col col='12' xl='12' className='order-1 xl:order-0'>
        <Row className='mb-4 xl:mb-6'>
          <Col xl='12'>
            <div className={styles.containerSender}>
              <div>
                <h2 className={styles.title}>¿Quien envía?</h2>
                <p className={styles.text}>
                  Debes completar los datos del emisor
                </p>
                <div
                  className={cs(styles.toggle, {
                    [styles.toggleRotate]: toggle,
                  })}
                  onClick={() => setCollapse(!toggle)}
                >
                  <BxChevronDown />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Collapse in={toggle}>
          <Row className='xl:justify-center mb-4 xl:mb-6'>
            <Col xl='12'>
              <PriceQouteFormsBusiness />
            </Col>
          </Row>

          <Row className='xl:justify-center'>
            <Col xl='12'>
              <p className={styles.required}>( * ) Campo obligatorio</p>
            </Col>
          </Row>
        </Collapse>
      </Col>
    </Row>
  );
}

export default PriceQouteEmitter;
