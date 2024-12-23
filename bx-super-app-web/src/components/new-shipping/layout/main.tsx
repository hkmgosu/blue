import { ReactNode } from 'react';
import { Container, Row, Col } from '@bx-design/react-grid';
import { Provider } from 'jotai';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import styles from './main.module.scss';
import NewShippingLayoutMainBack from './main-back';
import NewShippingLayoutExitModal from './exit-modal';
import { storeAtom, emissionStateAtom } from 'emission-lib/store';
import {
  frequentOriginCache,
  initialEmission,
  initialEmissionState,
} from 'emission-lib/utils';
import { useRepayEmission } from 'emission-lib/hooks/repay';

type Props = {
  title?: string;
  children: ReactNode;
};

function NewShippingLayoutMain({ title, children }: Props): JSX.Element {
  const [repayEmission] = useRepayEmission();
  const location = useLocation();

  return (
    <main className={styles.main}>
      <Container fluid>
        <Row>
          <Col col='12' className='mb-6 xl:mb-0'>
            <NewShippingLayoutMainBack />
          </Col>
        </Row>
        <Row className='justify-center'>
          <Col xl='12' xxl='10'>
            <h1 className={styles.title}>{title || 'Envíos'}</h1>
          </Col>
        </Row>
        <Row className='justify-center'>
          <Col xl='12' xxl='10'>
            <Provider
              initialValues={
                repayEmission
                  ? [
                      [
                        storeAtom,
                        {
                          ...repayEmission,
                          shipping:
                            location.pathname === '/new-shipping/multi'
                              ? [
                                  ...repayEmission.shipping,
                                  ...repayEmission.shipping,
                                ]
                              : repayEmission.shipping,
                        },
                      ] as const,
                    ]
                  : frequentOriginCache
                  ? [
                      [
                        storeAtom,
                        {
                          ...initialEmission,
                          origin: frequentOriginCache.origin,
                          refund: frequentOriginCache.refund,
                          emitter: {
                            ...initialEmission.emitter,
                            pyme_id: frequentOriginCache.pyme_id,
                            email: frequentOriginCache.email,
                            phone: frequentOriginCache.phone,
                          },
                          shipping:
                            location.pathname === '/new-shipping/multi'
                              ? [
                                  ...initialEmission.shipping,
                                  ...initialEmission.shipping,
                                ]
                              : initialEmission.shipping,
                        },
                      ] as const,
                      [
                        emissionStateAtom,
                        {
                          ...initialEmissionState,
                          autoFilledFrequentOrigin: true,
                        },
                      ] as const,
                    ]
                  : location.pathname === '/new-shipping/multi'
                  ? [
                      [
                        storeAtom,
                        {
                          ...initialEmission,
                          shipping:
                            location.pathname === '/new-shipping/multi'
                              ? [
                                  ...initialEmission.shipping,
                                  ...initialEmission.shipping,
                                ]
                              : initialEmission.shipping,
                        },
                      ] as const,
                    ]
                  : undefined
              }
            >
              <ToastContainer />
              {children}
            </Provider>
          </Col>
        </Row>
      </Container>
      <NewShippingLayoutExitModal />
    </main>
  );
}

export default NewShippingLayoutMain;
