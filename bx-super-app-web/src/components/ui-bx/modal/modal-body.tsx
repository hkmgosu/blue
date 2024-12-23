import { FC } from 'react';

const ModalBody: FC = ({ children }) => (
  <div className='modal-body'>{children}</div>
);

ModalBody.displayName = 'ModalBackdrop';

export default ModalBody;
