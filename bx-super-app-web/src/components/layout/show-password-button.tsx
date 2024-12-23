import { FC } from 'react';
import styled from 'styled-components';
import { BxEye, BxEyeOff } from '@bx-design/react-icons';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

const ShowPasswordButton: FC<Props> = ({ isActive, onClick }) => {
  return (
    <Button onClick={onClick} type='button'>
      {isActive ? <BxEyeOff /> : <BxEye />}
    </Button>
  );
};

const Button = styled.button`
  border: none;
  background: transparent;
`;

export default ShowPasswordButton;
