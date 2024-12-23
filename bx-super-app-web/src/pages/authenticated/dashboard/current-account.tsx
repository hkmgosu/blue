import { Modal, ModalClose } from 'components/ui-bx/modal';
import { useAuth } from 'contexts/auth-context';
import { FC, useState } from 'react';
import { CurrentAccountBody } from './current-account-body';

export const CurrentAccount: FC = () => {
  const { user } = useAuth();

  const [defaultPyme] = useState(() =>
    user?.pymes?.find((pyme) => pyme.id === user?.default_pyme)
  );
  const [isOpen, setIsOpen] = useState(!defaultPyme?.has_billing_information);
  return (
    <>
      {defaultPyme && !defaultPyme?.has_billing_information && (
        <Modal
          isOpen={isOpen}
          toggle={() => {}}
          centered
          size='xl'
          backdrop='static'
        >
          <ModalClose closeButton={() => setIsOpen(false)} />
          <CurrentAccountBody />
        </Modal>
      )}
    </>
  );
};
