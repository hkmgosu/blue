import { useState } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import { Modal, ModalBody } from 'components/ui-bx/modal';
import { ButtonLink } from 'components/ui-bx/button';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
};

export default function DashboardInvitationsCollaboratorModal({
  isOpen,
}: Props): JSX.Element {
  const [modalOpen, setModalOpen] = useState(isOpen);

  return (
    <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} centered>
      <ModalBody>
        <Row className='items-center justify-center'>
          <Col col='12'>
            <h2 className={styles.Title}>Tienes una invitación pendiente</h2>
            <p className={styles.Text}>
              <span className={styles.TextPyme}>
                Te han invitado a formar parte de un equipo.
              </span>
            </p>
          </Col>
          <Col col='12'>
            <Row className='items-center justify-center'>
              <Col col='6'>
                <ButtonLink to='/account/my-requests'>
                  Ir a Mis Solicitudes
                </ButtonLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
