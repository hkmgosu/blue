import { FC } from 'react';

const ButtonContainer: FC = ({ children }) => (
  <span className='btn-container'>{children}</span>
);

ButtonContainer.displayName = 'ButtonContainer';

export default ButtonContainer;
