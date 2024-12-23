import { useState } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import { Modal, ModalBody } from 'components/ui-bx/modal';
import { ButtonLink } from 'components/ui-bx/button';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  pymeName: string;
  invitationId: string;
};

export default function DashboardInvitationsAdminModal({
  isOpen,
  pymeName,
}: Props): JSX.Element {
  const [modalOpen, setModalOpen] = useState(isOpen);

  return (
    <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} centered>
      <ModalBody>
        <Row>
          <Col col='12'>
            <h2 className={styles.Title}>
              Te han invitado a ser administrador
            </h2>
            <p className={styles.Text}>
              <span className={styles.TextPyme}>{pymeName}</span> te ha invitado
              a ser administrador. <br />
              ¡Puedes invitar a otros usuarios a colaborar con el negocio!
            </p>
          </Col>
          <Col col='12'>
            <Row>
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
