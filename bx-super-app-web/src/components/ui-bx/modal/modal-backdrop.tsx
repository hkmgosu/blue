import { FC, useRef } from 'react';

import Fade from '../utils/fade';

type ModalBackdropProps = {
  modalOpen: boolean;
};

const ModalBackdrop: FC<ModalBackdropProps> = ({ modalOpen }) => {
  const _fade = useRef<HTMLDivElement | null>(null);

  return (
    <Fade
      in={modalOpen}
      classNames='modal-backdrop'
      appear
      unmountOnExit
      ref={_fade}
    />
  );
};
ModalBackdrop.displayName = 'ModalBackdrop';

export default ModalBackdrop;
