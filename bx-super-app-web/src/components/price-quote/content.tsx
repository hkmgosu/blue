import { Row, Col } from '@bx-design/react-grid';

import PriceQouteEmitter from './emitter';
import PriceQuoteAddress from './address';
import PriceQuotePackage from './package';
import PriceQuoteShipping from './shipping';
import PriceQuoteSubmit from './submit';
import { Card, CardBody } from 'components/ui-bx/card';

function PriceQuoteContent(): JSX.Element {
  return (
    <>
      <Row className='justify-center'>
        <Col col='12'>
          <Row>
            <Col col='12' md='5' className='mb-6 xl:mb-12'>
              <Card>
                <CardBody>
                  <Row gLgX='5'>
                    <PriceQouteEmitter />
                    <PriceQuoteAddress />
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col col='12' md='7' className='mb-6 xl:mb-12'>
              <Card>
                <CardBody>
                  <PriceQuotePackage />
                  <PriceQuoteShipping />
                </CardBody>
              </Card>
            </Col>

            <Col col='6' className='mb-6 xl:mb-12'>
              <Row className='xl:justify-end'>
                <Col xl='2' />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='justify-end'>
        <PriceQuoteSubmit />
      </Row>
    </>
  );
}

export default PriceQuoteContent;
