import { Row, Col } from '@bx-design/react-grid';

import NewShippingFormSummaryBack from 'components/new-shipping/form/summary/back';
import NewShippingLayoutSummaryMultiLeft from 'components/new-shipping/layout/summary/multi-left';
import NewShippingLayoutSummaryMultiRight from 'components/new-shipping/layout/summary/multi-right';

type Props = {
  isMassive?: boolean;
};

function NewShippingLayoutSummaryMulti({ isMassive }: Props): JSX.Element {
  return (
    <Row>
      <Col col='12'>
        <Row>
          <Col col='12' xl='6' className='mb-12 xl:mb-0'>
            <Row>
              <Col col='12'>
                <NewShippingLayoutSummaryMultiLeft />
              </Col>
            </Row>
          </Col>

          <Col col='12' xl='6' className='mb-6 xl:mb-0'>
            <NewShippingLayoutSummaryMultiRight isMassive={isMassive} />
          </Col>

          <Col col='12' className='xl:hidden'>
            <NewShippingFormSummaryBack isMassive={isMassive} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default NewShippingLayoutSummaryMulti;
