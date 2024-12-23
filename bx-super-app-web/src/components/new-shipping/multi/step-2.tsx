import { Row, Col } from '@bx-design/react-grid';

import NewShippingLayoutCurrentItemNextMulti from 'components/new-shipping/layout/current-item/next-multi';
import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import NewShippingLayoutStatusLegend from 'components/new-shipping/layout/status/legend';
import NewShippingLayoutDestinyReceiverLeftMulti from 'components/new-shipping/layout/destiny/receiver-left-multi';
import NewShippingLayoutCurrentItemCurrentMulti from 'components/new-shipping/layout/current-item/current-multi';
import styles from 'components/new-shipping/layout/shipping/shipping-multi-left-side.module.scss';
import NewShippingLayoutNextModal from '../layout/shipping/shipping-multi-next-modal';
import NewShippingMultiAssistedList from './assisted/list';
import NewShippingLayoutErrorNextProvider from '../layout/error-next/provider';
import { useShippingState } from 'emission-lib/hooks/shipping';
import { useEffect } from 'react';

function NewShippingMultiStep2(): JSX.Element {
  const [shippingState, setShippingState] = useShippingState();

  useEffect(() => {
    return () => {
      window.localStorage.setItem(
        'shippingState',
        JSON.stringify(shippingState)
      );
    };
  }, [shippingState]);

  useEffect(() => {
    let shipping = JSON.parse(
      window.localStorage.getItem('shippingState') || '[]'
    );
    if (shipping.length > 0) {
      setShippingState(shipping);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <NewShippingLayoutStep>
      <NewShippingLayoutErrorNextProvider />
      <NewShippingMultiAssistedList />
      <Col col='12' className='mb-2 xl:mb-12'>
        <Row gX='3'>
          <Col col='12' xl='4'>
            <div className={styles.sticky}>
              <Row>
                <Col col='12' className='mb-4'>
                  <NewShippingLayoutStatusLegend />
                </Col>
                <Col col='12'>
                  <NewShippingLayoutDestinyReceiverLeftMulti />
                </Col>
                <Col col='12'></Col>
              </Row>
            </div>
          </Col>
          <Col col='12' xl='8'>
            <Row>
              <Col col='12' className='mb-2 xl:mb-6'>
                <NewShippingLayoutCurrentItemCurrentMulti />
              </Col>
              <Col col='12'>
                <NewShippingLayoutCurrentItemNextMulti />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <NewShippingLayoutNextModal />
    </NewShippingLayoutStep>
  );
}

export default NewShippingMultiStep2;
