import { useCallback } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import NewShippingFormShippingBackOnStepTwo from 'components/new-shipping/form/shipping/back-step-two';
import NewShippingFormShippingNext from 'components/new-shipping/form/shipping/next';
import { useStep } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutDestinyNext(): JSX.Element {
  const [step, setStep] = useStep();

  const handleChange = useCallback(() => {
    window.scrollTo(0, 0);
    setStep(step + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStep]);

  return (
    <Row className='justify-center'>
      <Col xl='11'>
        <Row className='items-center justify-end'>
          <Col xl='6' className='hidden log:block'></Col>
          <Col col='12' xl='6'>
            <Row className='xl:justify-end items-center'>
              <Col xl='4'>
                <NewShippingFormShippingBackOnStepTwo step={1} />
              </Col>
              <Col xl='5'>
                <NewShippingFormShippingNext handleChange={handleChange} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default NewShippingLayoutDestinyNext;
