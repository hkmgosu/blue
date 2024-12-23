import { Row, Col } from '@bx-design/react-grid';
import cs from 'classnames';
import styles from './address.module.scss';
import PriceQuoteFormsOriginRegion from './forms/origin-region';
import PriceQuoteFormsOriginCommune from './forms/origin-commune';
import PriceQuoteFormsDestinyRegion from './forms/destiny-region';
import PriceQuoteFormsDestinyCommune from './forms/destiny-commune';
import { useAtom } from 'jotai';
import {
  toggleCollapseDestinyAtom,
  toggleCollapseOriginAtom,
} from 'atoms/price-quote';
import { BxChevronDown } from '@bx-design/react-icons';
import { Collapse } from 'components/ui-bx/collapse';

function PriceQuoteAddress(): JSX.Element {
  const [toggleOrigin, setToggleOrigin] = useAtom(toggleCollapseOriginAtom);
  const [toggleDestiny, setToggleDestiny] = useAtom(toggleCollapseDestinyAtom);
  return (
    <>
      <Row className='mb-12'>
        <Col col='12' xl='12' className='order-1 xl:order-0'>
          <Row gLgX='5' className='mb-4'>
            <Col col='12'>
              <div className={styles.containerSender}>
                <div>
                  <h1 className={styles.title}>Dirección de origen</h1>
                  <p className={styles.text}>
                    Debes seleccionar región y comuna
                  </p>
                  <div
                    className={cs(styles.toggle, {
                      [styles.toggleRotate]: toggleOrigin,
                    })}
                    onClick={() => setToggleOrigin(!toggleOrigin)}
                  >
                    <BxChevronDown />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Collapse in={toggleOrigin}>
            <Row gLgX='5' className='mb-4'>
              <Col col='12' xl='6' className='mb-6 xl:mb-0'>
                <PriceQuoteFormsOriginRegion />
              </Col>
              <Col col='12' xl='6'>
                <PriceQuoteFormsOriginCommune />
              </Col>
            </Row>
          </Collapse>
        </Col>
      </Row>

      <Row className='mb-12'>
        <Col col='12' xl='12' className='order-1 xl:order-0'>
          <Row gLgX='5' className='mb-4 xl:mb-6'>
            <Col col='12'>
              <div className={styles.containerSender}>
                <div>
                  <h1 className={styles.title}>Dirección de destino</h1>
                  <p className={styles.text}>
                    Debes seleccionar región y comuna
                  </p>
                  <div
                    className={cs(styles.toggle, {
                      [styles.toggleRotate]: toggleDestiny,
                    })}
                    onClick={() => setToggleDestiny(!toggleDestiny)}
                  >
                    <BxChevronDown />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Collapse in={toggleDestiny}>
            <Row gLgX='5' className='mb-4 xl:mb-4'>
              <Col col='12' xl='6' className='mb-6 xl:mb-0'>
                <PriceQuoteFormsDestinyRegion />
              </Col>
              <Col col='12' xl='6'>
                <PriceQuoteFormsDestinyCommune />
              </Col>
            </Row>
          </Collapse>

          <Row className='xl:justify-center'>
            <Col>
              <p className={styles.required}>( * ) Campo obligatorio</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default PriceQuoteAddress;
