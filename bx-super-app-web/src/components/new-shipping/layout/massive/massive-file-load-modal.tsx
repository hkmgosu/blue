import { FC } from 'react';
import check from 'images/check.png';

import { Modal, ModalBody } from 'components/ui-bx/modal';
import { Button } from 'components/ui-bx/button';
import { Container, Col, Row } from '@bx-design/react-grid';

import styles from './massive-file-load-modal.module.scss';

type PropTypes = {
  toggle: () => void;
  isOpen: boolean;
};

const MassiveFileLoadModal: FC<PropTypes> = ({ isOpen, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle} centered size='lg'>
    <ModalBody>
      <Container>
        <Row>
          <Col col='12' className='mb-6'>
            <Row className='items-center justify-center'>
              <Col col='2'>
                <img src={check} alt='check' className='h-[72px] m-auto' />
              </Col>
            </Row>
          </Col>
          <Col col='12' className='mb-4'>
            <Row className='items-center justify-center'>
              <Col col='8'>
                <h5 className={styles.title}>Archivo cargado correctamente</h5>
              </Col>
            </Row>
          </Col>
          <Col col='12' className='mb-6'>
            <Row className='items-center justify-center'>
              <Col col='8'>
                <p className='text-center'>
                  Para continuar recuerda marcar la casilla que indica que no
                  envías Mercancías Peligrosas.
                </p>
              </Col>
            </Row>
          </Col>
          <Col col='12'>
            <Row className='xl:justify-center'>
              <Col xl='5' className='mb-4'>
                <Button fullWidth onClick={toggle}>
                  Entendido
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </ModalBody>
  </Modal>
);

export default MassiveFileLoadModal;
