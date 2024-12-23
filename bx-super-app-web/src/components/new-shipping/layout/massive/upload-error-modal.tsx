import { FC } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import { Button } from 'components/ui-bx/button';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import styles from './upload-error-modal.module.scss';

type SuccessModalType = {
  isOpen: boolean;
  toggle: () => void;
  error: string;
};

const MasiveEmissionErrorModal: FC<SuccessModalType> = (
  props: SuccessModalType
) => (
  <Modal isOpen={props.isOpen} size={'lg'} toggle={props.toggle} centered>
    <ModalBody>
      <Row>
        <Col col='12'>
          <p className={styles.title}>
            Opps! Hubo un error al enviar el archivo
          </p>
        </Col>
        <Col col='12'>
          <div className={styles.centered}>
            <Button onClick={props.toggle}>Aceptar</Button>
          </div>
        </Col>
      </Row>
    </ModalBody>
  </Modal>
);

export default MasiveEmissionErrorModal;
