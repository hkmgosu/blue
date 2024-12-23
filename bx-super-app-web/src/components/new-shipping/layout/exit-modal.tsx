import { useCallback } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { useHistory } from 'react-router-dom';

import imgAlert from 'images/new-shipping/globoalert.png';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import styles from './exit-modal.module.scss';

import { Button } from 'components/ui-bx/button';
import { useExitModal } from 'emission-lib/hooks/emission-state';
import { useRepayEmission } from 'emission-lib/hooks/repay';

function NewShippingLayoutExitModal(): JSX.Element {
  const [exitModal, setExitModal] = useExitModal();
  const [, setRepayEmission] = useRepayEmission();
  const history = useHistory();

  const handleClick = useCallback(() => {
    setRepayEmission(null);
    setExitModal(false);
    setTimeout(() => history.push('/dashboard'), 500);
  }, [history, setExitModal, setRepayEmission]);

  return (
    <Modal
      isOpen={exitModal}
      toggle={() => setExitModal(false)}
      centered
      backdrop='static'
      keyboard={false}
    >
      <ModalBody>
        <Row>
          <Col col='12'>
            <div className={styles.box}>
              <div className={styles.imageBox}>
                <img className={styles.img} src={imgAlert} alt='Salir' />
              </div>
            </div>

            <div className={styles.text}>
              Vas a perder los datos de este proceso. Puedes dar clic en
              continuar para seguir con el proceso de emisión o salir y volver a
              la pantalla de inicio
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
              <Button onClick={() => setExitModal(false)} fullWidth>
                Continuar
              </Button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default NewShippingLayoutExitModal;
