import { FC, useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from '@bx-design/react-grid';

import { usePyme } from 'contexts/pyme/pyme-context';
import { useAuth } from 'contexts/auth-context';
import { deletePymeMember } from 'api/pyme';
import { Modal, ModalBody, ModalHeader } from 'components/ui-bx/modal';
import { Button } from 'components/ui-bx/button';
import globoalert from 'images/globoalert.png';

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  toggle: () => void;
  pymeId?: string;
};

const ConfirmMemberDeleteModal: FC<ConfirmDeleteModalProps> = ({
  isOpen,
  toggle,
  pymeId,
}) => {
  const { user } = useAuth();
  const { defaultPyme } = usePyme();
  const pyme = user?.pymes?.find((p) => p.id === (pymeId || defaultPyme?.id));
  const [displays, setDisplays] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (): Promise<void> => {
    setLoading(true);
    await deletePymeMember(pyme ? pyme?.id : '');
    setLoading(false);
    setDisplays(false);
  };

  const handleCLose = (): void => {
    window.location.assign(window.location.href);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      backdrop='static'
      centered
      keyboard={true}
    >
      <ModalHeader closeButton={toggle} />
      <ModalBody>
        {displays ? (
          <>
            <Row className='items-center justify-center'>
              <Col col='8'>
                <Box>
                  <Img src={globoalert} alt='Globo Alert' />
                </Box>
                <Text>
                  ¿Estás seguro que quieres autoeliminarte como miembro de la
                  empresa {pyme?.social_reason}?
                </Text>
                <Row className='items-center justify-between'>
                  <Col col='6'>
                    <Button
                      onClick={handleDelete}
                      fullWidth={false}
                      isLoading={loading}
                    >
                      Si
                    </Button>
                  </Col>
                  <Col col='4'>
                    <Button
                      onClick={toggle}
                      fullWidth={false}
                      disabled={loading}
                    >
                      No
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className='items-center justify-center'>
              <Col col='8'>
                <Box>
                  <Ilustration />
                </Box>
                <Text>
                  Eliminado exitosamente, ya no formas parte de la empresa{' '}
                  {pyme?.social_reason}
                </Text>
                <Row className='items-center justify-center'>
                  <Button
                    onClick={handleCLose}
                    fullWidth={false}
                    isLoading={loading}
                  >
                    Aceptar
                  </Button>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Ilustration = styled.div`
  width: 100px;
  height: 100px;
  background: var(--bx-color-grey-you);
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: var(--bx-fg);
  margin-bottom: 30px;
`;

const Img = styled.img`
  width: 105px;
  height: auto;
`;

export default ConfirmMemberDeleteModal;
