import { Row, Col } from '@bx-design/react-grid';

import NewShippingFormBusinessNext from '../../form/business/next';

function NewShippingLayoutBusinessNext(): JSX.Element {
  return (
    <Row className='justify-center'>
      <Col xl='12'>
        <Row>
          <Col xl='4' className='mb-6 xl:mb-0 hidden xl:block' />
          <Col xl='8'>
            <Row className='items-center'>
              <Col xl='6' col='12' className='mb-6 xl:mb-0'></Col>
              <Col xl='3' className='hidden xl:block' />
              <Col xl='3'>
                <NewShippingFormBusinessNext />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default NewShippingLayoutBusinessNext;
