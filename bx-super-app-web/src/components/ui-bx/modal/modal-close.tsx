import { FC } from 'react';

import XModalIcon from './icons/x';

type Props = {
  closeButton: () => void;
};

const ModalClose: FC<Props> = ({ closeButton }) => (
  <div className='modal-close'>
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
  </div>
);

ModalClose.displayName = 'ModalClose';

export default ModalClose;
