import { FC } from 'react';
import { useAtom } from 'jotai';
import { Col, Row } from '@bx-design/react-grid';
import styled from 'styled-components';

import { newBusinessIsSuccessAtom } from 'atoms/new-business';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import celebrateImg from 'images/celebrate.png';
import { Button } from 'components/ui-bx/button';

const NewBusinessSucessModal: FC = () => {
  const [isOpen, setIsOpen] = useAtom(newBusinessIsSuccessAtom);

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
            <ImageBox>
              <Image src={celebrateImg} alt='Wow' />
            </ImageBox>
          </Col>
        </Row>

        <Row>
          <Col col='12'>
            <Title>¡Felicidades!</Title>
            <SubTitle>Tu Empresa ya está inscrita</SubTitle>
            <Text>
              Comienza a crecer y cambia la forma en que manejas la logística de
              tus envíos.
            </Text>
            <ButtonBox>
              <Button onClick={handleClick}>Empezamos</Button>
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

const Title = styled.h2`
  font-weight: 900;
  text-align: center;
  margin-bottom: 12px;
  user-select: none;
  font-size: 26px;
  @media (min-width: 1200px) {
    font-size: 50px;
  }
`;

const SubTitle = styled.h3`
  font-weight: 800;
  font-family: var(--bx-font-secondary);
  margin-bottom: 34px;
  text-align: center;
  user-select: none;
  font-size: 22px;
  @media (min-width: 1200px) {
    font-size: 36px;
  }
`;

const Text = styled.p`
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

export default NewBusinessSucessModal;
