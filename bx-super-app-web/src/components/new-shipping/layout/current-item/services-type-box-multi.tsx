import { Row, Col } from '@bx-design/react-grid';

import NewShippingLayoutServiceBox from 'components/new-shipping/layout/service/service-box';
import NewShippingLayoutServiceBoxContent from 'components/new-shipping/layout/service/service-box-content';
import { useShippingPackagePricingDto } from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutCurrentItemServicesTypeBoxMulti(): JSX.Element {
  const pricingDto = useShippingPackagePricingDto();

  return (
    <Row>
      <Col col='12' xl='6' className='mb-6 xl:mb-0'>
        <NewShippingLayoutServiceBox serviceType='STANDARD'>
          <NewShippingLayoutServiceBoxContent
            serviceType='STANDARD'
            pricingDto={pricingDto}
          />
        </NewShippingLayoutServiceBox>
      </Col>

      <Col col='12' xl='6'>
        <NewShippingLayoutServiceBox serviceType='STANDARD'>
          <NewShippingLayoutServiceBoxContent
            serviceType='STANDARD'
            pricingDto={pricingDto}
          />
        </NewShippingLayoutServiceBox>
      </Col>
    </Row>
  );
}

export default NewShippingLayoutCurrentItemServicesTypeBoxMulti;
