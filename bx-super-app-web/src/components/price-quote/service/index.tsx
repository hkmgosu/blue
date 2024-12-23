import { Suspense } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { useAtom } from 'jotai';

import { pricingDtoAtom } from 'atoms/price-quote';

import PriceQuotePricing from '../pricing';

function PriceQuoteService(): JSX.Element {
  const [pricingDto] = useAtom(pricingDtoAtom);

  return (
    <Col col='12'>
      <Row>
        <Suspense fallback={<div />}>
          <PriceQuotePricing pricingDto={pricingDto} />
        </Suspense>
      </Row>
    </Col>
  );
}

export default PriceQuoteService;
