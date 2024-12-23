import { Modal, ModalBody } from 'components/ui-bx/modal';
import { FC } from 'react';
import { Row } from '@bx-design/react-grid';
import { Col } from '@bx-design/react-grid';
import { Button } from 'components/ui-bx/button';
import styles from './warning.module.scss';
import imgSuccess from 'images/new-shipping/payment-success.png';

type PropTypes = {
  isOpen: boolean;
  toggle: () => void;
};
const WarrantyWarningModal: FC<PropTypes> = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalBody>
        <Row>
          <Col col='12'>
            <div className={styles.box}>
              <div className={styles.imageBox}>
                <img className={styles.img} src={imgSuccess} alt='success' />
              </div>
            </div>
            <div className={styles.text}>
              Si el numero de boleta y el valor declarado en este momento no
              coinciden con el documento a enviar en caso de indemnización, esta
              solicutud será rechazada.
            </div>
          </Col>
        </Row>
        <Row className='justify-evenly'>
          <Col col='12' xl='6'>
            <div className={styles.buttonContainer}>
              <Button onClick={toggle} fullWidth>
                Continuar
              </Button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};
export default WarrantyWarningModal;
