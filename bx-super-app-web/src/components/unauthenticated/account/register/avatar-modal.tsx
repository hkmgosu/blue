import { FC } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '@bx-design/react-grid';

import { useAvatar } from 'contexts/avatar-context';
import { Card, CardBody } from 'components/ui-bx/card';
import CloseIcon from 'components/icons/x';
import { Modal } from 'components/ui-bx/modal';
import CameraImg from 'images/camera.png';

type AvatarProps = {
  selected: boolean;
};

const AvatarModal: FC = () => {
  const {
    showAvatars,
    toggleAvatarModal,
    avatars,
    changeAvatarHandler,
    photoInputRef,
    handleSelectPhoto,
    avatar: avatarSelected,
    error,
  } = useAvatar();

  return (
    <Modal isOpen={showAvatars} toggle={toggleAvatarModal} centered>
      <Card>
        <Header>
          <ContentIcon onClick={toggleAvatarModal}>
            <CloseIcon />
          </ContentIcon>
        </Header>
        <Title>Elige tu avatar o sube tu foto</Title>
        {error && <Error>{error}</Error>}
        <CardBody>
          <Container>
            <Row>
              {avatars.map((avatar) => (
                <Col col='6' xl='4' key={avatar}>
                  <ContentImage>
                    <Avatar
                      alt={avatar}
                      src={avatar}
                      max-width='134'
                      max-height='134'
                      selected={avatar === avatarSelected}
                      onClick={() => changeAvatarHandler(avatar)}
                    />
                  </ContentImage>
                </Col>
              ))}
              <Col col='6' xl='4'>
                <ContentImage>
                  <PhotoButton onClick={() => photoInputRef.current?.click()}>
                    <img alt='' src={CameraImg} width='40' height='40' />
                  </PhotoButton>
                  <InputFileHidden
                    ref={photoInputRef}
                    type='file'
                    id='massive-emission-file'
                    onChange={handleSelectPhoto}
                    accept='.png,.jpg'
                  />
                </ContentImage>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </Modal>
  );
};

const Header = styled.div`
  padding: 22px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ContentIcon = styled.div`
  float: right;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 145%;
  text-align: center;
  letter-spacing: 0.03em;
  padding: 10px 0px;
`;

const ContentImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img<AvatarProps>`
  ${(props) =>
    props.selected
      ? `
          max-width: 150px;
          max-height: 150px;
          border: 2px solid var(--bx-color-blue);
          width: 100%;
      `
      : `
          max-width: 134px;
          max-height: 134px;
          width: 90%;
      `}
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 32px;
  margin-top: 10px;
`;

const PhotoButton = styled.div`
  background: var(--bx-color-white);
  box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.12),
    0px 10px 32px -4px rgba(24, 39, 75, 0.1);
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;

const InputFileHidden = styled.input`
  display: none;
`;

const Error = styled(Title)`
  color: var(--bx-color-red-alert);
`;

export default AvatarModal;
