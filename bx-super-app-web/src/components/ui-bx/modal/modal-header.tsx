import { FC } from 'react';

import XModalIcon from './icons/x';

type ModalHeaderProps = {
  closeButton?: () => void;
};

const ModalHeader: FC<ModalHeaderProps> = ({ children, closeButton }) => (
  <div className='modal-header'>
    {children}
    {closeButton && (
      <button
        type='button'
        className='btn-close'
        aria-label='Cerrar'
        onClick={closeButton}
      >
        <div className='icon-box' aria-hidden='true'>
          <XModalIcon color='var(--bx-color-black)' />
        </div>
      </button>
    )}
  </div>
);

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
