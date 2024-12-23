import { FC } from 'react';
import { useAtom } from 'jotai';
import { Col, Row } from '@bx-design/react-grid';

import { joinToBusinessIsSuccessAtom } from 'atoms/join-to-business';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import celebrateImg from 'images/celebrate.png';
import { Button } from 'components/ui-bx/button';
import styles from './success-modal.module.scss';

const JoinToBusinessSucessModal: FC = () => {
  const [isOpen, setIsOpen] = useAtom(joinToBusinessIsSuccessAtom);

  const handleClick = (): void => {
    window.location.assign('/dashboard');
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
      <ModalBody>
        <Row>
          <Col col='12'>
            <div className={styles.imageBox}>
              <img className={styles.image} src={celebrateImg} alt='Wow' />
            </div>
          </Col>
        </Row>

        <Row>
          <Col col='12'>
            <h2 className={styles.title}>¡Felicidades!</h2>
            <h3 className={styles.subtitle}>Eres miembro de la Empresa</h3>
            <div className={styles.buttonBox}>
              <Button onClick={handleClick}>Empezamos</Button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default JoinToBusinessSucessModal;
