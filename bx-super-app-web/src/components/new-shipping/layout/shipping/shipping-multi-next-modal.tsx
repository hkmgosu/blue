import { Col, Container, Row } from '@bx-design/react-grid';
import { BxX } from '@bx-design/react-icons';

import { Button } from 'components/ui-bx/button';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import NewShippinngMultiModalShipping from './shipping-multi-next-modal-shipping';
import styles from './shipping-multi-next-modal.module.scss';
import { useShippings, useShippingsAtom } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';
import { useNextModalOpen, useStep } from 'emission-lib/hooks/emission-state';
import { initialShippingState } from 'emission-lib/utils';

function NewShippingLayoutNextModal(): JSX.Element {
  const [, setShipping] = useShippingsAtom();
  const [shippingAtoms, removeShippingAtom] = useShippings();
  const [, setStep] = useStep();
  const [isOpen, setIsOpen] = useNextModalOpen();

  const handleAddShipping = (): void => {
    setIsOpen(false);
    setShipping((prev) => [...prev, initialShippingState]);
  };

  return (
    <Modal
      centered
      isOpen={isOpen}
      size='lg'
      toggle={() => setIsOpen(false)}
      keyboard={false}
      backdrop='static'
    >
      <div onClick={() => setIsOpen((prev) => !prev)} className={styles.close}>
        <BxX size={25} />
      </div>
      <ModalBody>
        <Container>
          <Row>
            <Col col='12'>
              <div className={styles.center}>
                <p className={styles.title}>
                  {`¡Tienes ${shippingAtoms.length} envíos en tu listado!`}
                </p>
                <p className={styles.subtitle}>
                  Recuerda que aún puedes seguir añandiendo envíos con un tope
                  de 5 o puedes proceder al pago.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <div className={styles.container}>
              {shippingAtoms.map((shippingAtom, index) => (
                <ShippingProvider
                  shippingAtom={shippingAtom}
                  key={shippingAtom.toString()}
                  removeShippingAtom={removeShippingAtom}
                >
                  <NewShippinngMultiModalShipping index={index} />
                </ShippingProvider>
              ))}
            </div>
          </Row>
          <Row className='justify-around my-4'>
            <Col lg='5'>
              <Button onClick={handleAddShipping} variant='outline'>
                + Añadir otro envío
              </Button>
            </Col>
            <Col lg='4'>
              <div className={styles.right}>
                <Button
                  fullWidth
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo(0, 0);
                    setStep(3);
                  }}
                >
                  Pagar
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
}

export default NewShippingLayoutNextModal;
