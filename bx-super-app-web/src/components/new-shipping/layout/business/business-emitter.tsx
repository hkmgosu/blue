import { useCallback } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import cs from 'classnames';
import { BxDown } from '@bx-design/react-icons';

import { Card, CardBody } from 'components/ui-bx/card';
import { Collapse } from 'components/ui-bx/collapse';
import styles from './business-emitter.module.scss';
import NewShippingFormBusiness from '../../form/business/business';
import NewShippingFormBusinessEmail from '../../form/business/email';
import NewShippingFormBusinessPhone from '../../form/business/phone';
import NewShippingFormBusinessRefund from '../../form/business/refund';
import NewShippingFormBusinessRefundDepto from '../../form/business/refund-depto';
import NewShippingFormBusinessRefundOffice from '../../form/business/refund-office';
import NewShippingLayoutAutofillFrequentOrigin from 'components/new-shipping/layout/autofill/frequent-origin';
import {
  useMeasureWidth,
  useEmitterDataIsCollapsed,
} from 'emission-lib/hooks/emission-state';
import NewShippingFormBusinessSaveOrigin from 'components/new-shipping/form/business/save-origin';

function NewShippingLayoutBusinessEmitter({
  title,
  description,
  disabledBusinessSaveOrigin,
}: {
  title?: string;
  description?: string;
  disabledBusinessSaveOrigin?: boolean;
}): JSX.Element {
  const [, setWidth] = useMeasureWidth();
  const [isCollapsed, setIsCollapsed] = useEmitterDataIsCollapsed();

  const measuredRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        setWidth(node.getBoundingClientRect().width);
      }
    },
    [setWidth]
  );

  const handleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card>
      <CardBody padding='dashboard'>
        <div className={styles.boxHeight}>
          <Row className='mb-4 lg:mb-4'>
            <Col col='12' ref={measuredRef}>
              <div
                className={cs(styles.collapseButton, {
                  [styles.collapseButtonOn]: isCollapsed,
                })}
                onClick={handleCollapse}
              >
                <BxDown size={16} />
              </div>
              <h1 className={styles.title}>
                {title || 'Datos de quién envía'}
              </h1>
              <p className={styles.text}>
                {description || 'Completa los datos de origen de la empresa'}
              </p>
            </Col>
          </Row>
          <Collapse in={isCollapsed}>
            <Row>
              <Col xl='12'>
                <Row gX='3' className='mb-2 xl:mb-2'>
                  <Col col='12' xl='12' className='mb-2 xl:mb-0'>
                    <NewShippingFormBusiness />
                  </Col>
                </Row>
                <Row gX='3' className='mb-6 xl:mb-2'>
                  <Col col='12' xl='12' className='mb-2'>
                    <NewShippingFormBusinessPhone />
                  </Col>
                  <Col col='12' xl='12' className='mb-2'>
                    <NewShippingFormBusinessEmail />
                  </Col>
                  <Col col='12' xl='12' className='mb-2 xl:mb-2'>
                    <NewShippingFormBusinessRefund />
                  </Col>
                  <Col col='12' xl='6'>
                    <NewShippingFormBusinessRefundDepto />
                  </Col>
                  <Col col='12' xl='6' className='mb-2 xl:mb-4'>
                    <NewShippingFormBusinessRefundOffice />
                  </Col>
                  <Col col='12' xl='6' className='mb-0 xl:mb-0'>
                    <p className={styles.required}>( * ) Campo obligatorio</p>
                  </Col>
                  {!disabledBusinessSaveOrigin && (
                    <Col col='12' xl='12' className='my-0 xl:mb-0'>
                      <NewShippingFormBusinessSaveOrigin />
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </Collapse>
        </div>
      </CardBody>
      <NewShippingLayoutAutofillFrequentOrigin />
    </Card>
  );
}

export default NewShippingLayoutBusinessEmitter;
