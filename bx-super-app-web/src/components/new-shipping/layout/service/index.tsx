import { Row, Col } from '@bx-design/react-grid';

import NewShippingLayoutServicePricing from './pricing';
import { useShippingPackagePricingDto } from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutService(): JSX.Element {
  const pricingDto = useShippingPackagePricingDto();

  return (
    <Col col='12'>
      <Row>
        <NewShippingLayoutServicePricing pricingDto={pricingDto} />
      </Row>
    </Col>
  );
}

export default NewShippingLayoutService;
