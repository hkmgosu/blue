import { Row, Col } from '@bx-design/react-grid';
import cs from 'classnames';
import styles from './shipping.module.scss';
import PriceQuoteService from './service';
import PriceQuoteInfoBox from 'components/price-quote/info-box';
import { toggleCollapseServiceAtom } from 'atoms/price-quote';
import { useAtom } from 'jotai';
import { BxChevronDown } from '@bx-design/react-icons';
import { Collapse } from 'components/ui-bx/collapse';

function PriceQuoteShipping(): JSX.Element {
  const [toggle, setCollapse] = useAtom(toggleCollapseServiceAtom);
  return (
    <>
      <Row className='mb-6'>
        <Col col='12'>
          <div className={styles.containerSender}>
            <div>
              <h1 className={styles.title}>Tipo de servicio</h1>
              <p className={styles.text}>
                Selecciona tipo de envío que necesitas
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
        <Row className='mb-6'>
          <Col xl='12'>
            <Row gX='5' className='xl:items-center'>
              <Col col='12' className='mb-12 xl:mb-0'>
                <PriceQuoteService />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='mb-6'>
          <Col col='12' xl='8'>
            <PriceQuoteInfoBox
              title={
                <>
                  Envío sujeto a los horarios de gestión de cada{' '}
                  <span className={styles.orangeText}>Punto Blue Express</span>
                </>
              }
              secondaryText={
                <>
                  *Si entregas después de las 16.00 horas, tu encomienda
                  <b>será enviada durante las siguientes 24hrs</b>.
                </>
              }
            />
          </Col>
        </Row>
      </Collapse>
    </>
  );
}

export default PriceQuoteShipping;
