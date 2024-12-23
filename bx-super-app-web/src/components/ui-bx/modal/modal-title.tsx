import { FC } from 'react';

const ModalTitle: FC = ({ children }) => (
  <h5 className='modal-title'>{children}</h5>
);

ModalTitle.displayName = 'ModalTitle';

export default ModalTitle;
