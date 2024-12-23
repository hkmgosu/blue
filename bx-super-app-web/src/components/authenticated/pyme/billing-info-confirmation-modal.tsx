import { FC } from 'react';
import styled from 'styled-components';
import { Col, Row } from '@bx-design/react-grid';

import { Modal, ModalBody } from 'components/ui-bx/modal';
import { Button } from 'components/ui-bx/button';
import candado from 'images/candado.png';
type BillingInfoModalProps = {
  isOpen: boolean;
  toggle: () => void;
};

const BillingInfoSuccesModal: FC<BillingInfoModalProps> = ({
  isOpen,
  toggle,
}) => {
  const handleClick = (): void => {
    window.location.assign('/dashboard');
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      backdrop='static'
      centered
      keyboard={false}
    >
      <ModalBody>
        <Row className='items-center justify-center'>
          <Col col='8'>
            <Box>
              <Img src={candado} alt='candado' />
            </Box>
            <Text>
              Tus datos se han guardado con éxito. En tus próximos envíos
              emitiremos las facturas con esta información.
            </Text>
            <ButtonContainer>
              <Button onClick={handleClick}>Aceptar</Button>
            </ButtonContainer>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: var(--bx-fg);
  margin-bottom: 30px;
`;

export default BillingInfoSuccesModal;
