import { Modal, ModalBody } from 'components/ui-bx/modal';
import { Row } from '@bx-design/react-grid';
import { useState } from 'react';
import { Col } from '@bx-design/react-grid';
import { Button } from 'components/ui-bx/button';
import styles from './modal.module.scss';
import { useHistory } from 'react-router-dom';
import { useRepayEmission } from 'emission-lib/hooks/repay';
import { useCallback } from 'react';
import imgSuccess from 'images/new-shipping/payment-success.png';

export default function NewShippingMassiveModal(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(true);
  const history = useHistory();
  const [, setRepayEmission] = useRepayEmission();

  const handleClick = useCallback(() => {
    setRepayEmission(null);
    setModalOpen(false);
    setTimeout(() => history.push('/dashboard'), 500);
  }, [history, setModalOpen, setRepayEmission]);
  return (
    <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} centered>
      <ModalBody>
        <Row>
          <Col col='12'>
            <div className={styles.box}>
              <div className={styles.imageBox}>
                <img className={styles.img} src={imgSuccess} alt='success' />
              </div>
            </div>
            <div className={styles.text}>
              Por ahora las cargas masivas sólo están disponibles para envíos
              pre-pagados con servicio de entrega Express. Pronto podrás hacer
              cargas masivas por pagar.
            </div>
          </Col>
        </Row>
        <Row className='justify-evenly'>
          <Col col='12' xl='6'>
            <div className={styles.buttonContainer}>
              <Button variant='outline' onClick={handleClick} fullWidth>
                Salir
              </Button>
            </div>
          </Col>
          <Col col='12' xl='6'>
            <div className={styles.buttonContainer}>
              <Button onClick={() => setModalOpen(false)} fullWidth>
                Continuar
              </Button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
