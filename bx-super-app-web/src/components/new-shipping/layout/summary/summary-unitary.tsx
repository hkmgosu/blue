import { Row, Col } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/summary/summary-unitary.module.scss';
import { Card, CardBody } from 'components/ui-bx/card';
import NewShippingFormSummaryBack from 'components/new-shipping/form/summary/back';
import NewShippingLayoutSummaryUnitaryLeft from 'components/new-shipping/layout/summary/summary-unitary-left';
import NewShippingLayoutSummaryUnitaryRight from 'components/new-shipping/layout/summary/summary-unitary-right';
import { ElabelSummary } from 'components/new-shipping/layout/service/e-label/e-label';
import { useStep } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutSummaryUnitary(): JSX.Element {
  const [step, setStep] = useStep();
  return (
    <Row>
      <Col col='12'>
        <Row>
          <Col col='12' xl='6' className='mb-12 xl:mb-0'>
            <Card>
              <CardBody padding='dashboard'>
                <h1 className={styles.title}>Resumen del envío</h1>
                <ElabelSummary
                  onReplace={() => {
                    setStep(step - 1);
                  }}
                ></ElabelSummary>
                <div className={styles.line} />
                <NewShippingLayoutSummaryUnitaryLeft />
              </CardBody>
            </Card>
          </Col>

          <Col col='12' xl='6' className='mb-6 xl:mb-0'>
            <NewShippingLayoutSummaryUnitaryRight />
          </Col>

          <Col col='12' className='xl:hidden'>
            <NewShippingFormSummaryBack />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default NewShippingLayoutSummaryUnitary;
