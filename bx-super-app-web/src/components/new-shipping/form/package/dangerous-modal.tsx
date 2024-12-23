import { FC } from 'react';
import { BxX } from '@bx-design/react-icons';

import { Modal, ModalBody } from 'components/ui-bx/modal';
import ProhibitedCargoImages from 'components/authenticated/tips/prohibited-cargo-images';

type PropTypes = {
  toggle: () => void;
  isOpen: boolean;
};

const DangerousMerchandisingModal: FC<PropTypes> = ({ isOpen, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle} centered size='lg'>
    <ModalBody>
      <div className='flex justify-end items-center'>
        <div
          className='w-[35px] h-[35px] flex justify-center items-center cursor-pointer'
          onClick={toggle}
        >
          <BxX size={25} />
        </div>
      </div>
      <br />
      <h2 className='text-center'>Cargas Prohibidas</h2>
      <ProhibitedCargoImages spacing='reduced' />
    </ModalBody>
  </Modal>
);

export default DangerousMerchandisingModal;
