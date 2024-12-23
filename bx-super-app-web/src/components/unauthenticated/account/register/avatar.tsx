import { FC } from 'react';
import styled from 'styled-components';
import { BxEdit } from '@bx-design/react-icons';

import { useAvatar } from 'contexts/avatar-context';

type PropTypes = {
  withoutRight?: boolean;
};

const RegisterAvatar: FC<PropTypes> = ({ withoutRight }) => {
  const { toggleAvatarModal, avatar } = useAvatar();

  return (
    <Wrapper>
      <Left>
        <AvatarBox>
          <Image src={avatar} alt='avatar' />
        </AvatarBox>
        <EditBox onClick={toggleAvatarModal}>
          <IconBox>
            <BxEdit color='#fff' size={13} />
          </IconBox>
        </EditBox>
      </Left>
      {!withoutRight && <Right>Elige tu avatar o sube tu foto</Right>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Left = styled.div`
  display: flex;
  position: relative;
  width: 86px;
  height: 86px;
  @media (min-width: 768px) {
    width: 70px;
    height: 70px;
    margin-right: 16px;
  }
`;

const AvatarBox = styled.div`
  background: #ffa55b;
  border-radius: 50%;
  width: 86px;
  height: 86px;
  @media (min-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const Image = styled.img`
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  object-fit: cover;
  border-radius: 50%;
`;

const EditBox = styled.div`
  background: var(--bx-register-avatar-edit-bg);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

export default RegisterAvatar;
