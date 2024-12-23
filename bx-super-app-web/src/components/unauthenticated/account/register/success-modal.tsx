import { FC } from 'react';
import { useAtom } from 'jotai';
import { Col, Row } from '@bx-design/react-grid';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { registerSuccessAtom } from 'atoms/register';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import celebrateImg from 'images/celebrate.png';
import { Button } from 'components/ui-bx/button';

const RegisterSuccessModal: FC = () => {
  const [isOpen, setIsOpen] = useAtom(registerSuccessAtom);
  const history = useHistory();
  const handleClick = (): void => {
    history.push('/login/with-password');
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
            <ImageBox>
              <Image src={celebrateImg} alt='Wow' />
            </ImageBox>
          </Col>
        </Row>

        <Row>
          <Col col='12'>
            <SubTitle>¡Ya casi eres parte</SubTitle>
            <SubTitle>de Blue Express!</SubTitle>
            <Text>
              Sólo falta un paso más. Debes ir a tu correo para confimar la
              cuenta. <br /> Recuerda que, si no aparece en tu bandeja de
              entrada, revisa tu spam <br /> (el link de confirmación tiene
              vigencia de 3 días).
            </Text>
            <ButtonBox>
              <Button onClick={handleClick}>Confirmar e ingresar</Button>
            </ButtonBox>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 38px;
  user-select: none;
`;

const Image = styled.img`
  width: 280px;
  height: 217px;
`;

const SubTitle = styled.h3`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 95%;
  text-align: center;
  letter-spacing: 0.03em;
  color: #212121;
  @media (min-width: 1200px) {
    font-size: 36px;
  }
`;

const Text = styled.p`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 145%;
  text-align: center;
  letter-spacing: 0.03em;
  color: #212121;
  text-align: center;
  margin-bottom: 21px;
  user-select: none;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  user-select: none;
`;

export default RegisterSuccessModal;
