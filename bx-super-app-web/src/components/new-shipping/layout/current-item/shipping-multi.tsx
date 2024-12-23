import { Col } from '@bx-design/react-grid';

import NewShippingLayoutCurrentItemSizesGridMulti from './sizes-grid-multi';
import NewShippingLayoutShippingInputLengthUnitary from 'components/new-shipping/layout/shipping/shipping-input-length-unitary';
import NewShippingLayoutShippingInputWidthUnitary from 'components/new-shipping/layout/shipping/shipping-input-width-unitary';
import NewShippingLayoutShippingInputHeightUnitary from 'components/new-shipping/layout/shipping/shipping-input-height-unitary';
import NewShippingLayoutShippingInputWeightUnitary from 'components/new-shipping/layout/shipping/shipping-input-weight-unitary';
import NewShippingLayoutSizesManual from './size-buttons-manual';

function NewShippingLayoutCurrentItemShippingMulti(): JSX.Element {
  return (
    <Col col='12' xl='12'>
      <NewShippingLayoutSizesManual />
      <NewShippingLayoutCurrentItemSizesGridMulti
        length={<NewShippingLayoutShippingInputLengthUnitary />}
        width={<NewShippingLayoutShippingInputWidthUnitary />}
        height={<NewShippingLayoutShippingInputHeightUnitary />}
        weight={<NewShippingLayoutShippingInputWeightUnitary />}
      />
    </Col>
  );
}

export default NewShippingLayoutCurrentItemShippingMulti;
