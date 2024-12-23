import { Row, Col } from '@bx-design/react-grid';

import styles from './package.module.scss';
import PriceQuoteSizesBox from 'components/price-quote/sizes/box';
import NewShippingLayoutInputSizesGrid from 'components/new-shipping/layout/input/sizes-grid';
import PriceQouteSizesLength from 'components/price-quote/sizes/length';
import PriceQouteSizesWidth from 'components/price-quote/sizes/width';
import PriceQouteSizesHeight from 'components/price-quote/sizes/height';
import PriceQouteSizesWeight from 'components/price-quote/sizes/weight';
import PriceQuoteSizesButtons from 'components/price-quote/sizes/buttons';
import NewShippingLayoutInputSizesUseEffect from './input-sizes';
import PriceQuoteVolumetricError from './volumetric-error';
import PriceQuoteEdgeError from './edge-error';
import PriceQuoteWeightError from './weight-error';
import cs from 'classnames';
import { useAtom } from 'jotai';
import { toggleCollapseMeasuresAtom } from 'atoms/price-quote';
import { BxChevronDown } from '@bx-design/react-icons';
import { Collapse } from 'components/ui-bx/collapse';
function PriceQuotePackage(): JSX.Element {
  const [toggle, setToggle] = useAtom(toggleCollapseMeasuresAtom);
  return (
    <>
      <Row className='mb-4 xl:mb-6'>
        <Col col='12'>
          <div className={styles.containerSender}>
            <div>
              <h1 className={styles.title}>Tamaño de tu envío</h1>
              <p className={styles.text}>
                Selecciona uno de nuestros tamaños predefinidos o personaliza
                tus dimensiones
              </p>
              <div
                className={cs(styles.toggle, {
                  [styles.toggleRotate]: toggle,
                })}
                onClick={() => setToggle(!toggle)}
              >
                <BxChevronDown />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Collapse in={toggle}>
        <Row className='mb-6 xl:mb-12'>
          <Col xl='12'>
            <Row>
              <Col col='12' lg='6' xl='6'>
                <PriceQuoteSizesButtons />
              </Col>
              <Col col='12' lg='6' xl='6'>
                <Row>
                  <Col>
                    <NewShippingLayoutInputSizesGrid
                      length={<PriceQouteSizesLength />}
                      width={<PriceQouteSizesWidth />}
                      height={<PriceQouteSizesHeight />}
                      weight={<PriceQouteSizesWeight />}
                      isPriceQuote
                    />
                  </Col>
                  <Col>
                    <PriceQuoteVolumetricError />
                    <PriceQuoteEdgeError />
                    <PriceQuoteWeightError />
                    <NewShippingLayoutInputSizesUseEffect />
                    <PriceQuoteSizesBox />
                  </Col>
                </Row>
              </Col>

              <Col col='7' lg='7' md='4'></Col>
              <Col xl='5'></Col>
              <Col col='12'>
                <p className={styles.info}>
                  - Carga mal notificada será retenida y puede llegar al bloqueo
                  de la cuenta. <br /> <br />
                  * Peso máximo de 16 y 60 cm por arista. <br /> <br /> * Los
                  tamaños estandarizados son seleccionados según el mayor valor
                  entre peso físico (kg) y volumétrico (largo*ancho*alto/4.000).
                </p>
              </Col>
              <Col xl='12'>
                <p className={styles.required}>( * ) Campo obligatorio</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Collapse>
    </>
  );
}

export default PriceQuotePackage;
