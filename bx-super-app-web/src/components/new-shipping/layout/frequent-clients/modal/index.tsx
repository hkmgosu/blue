import { Row, Col } from '@bx-design/react-grid';

import { Modal, ModalBody, ModalClose } from 'components/ui-bx/modal';
import { useFrequentClientsModal } from 'emission-lib/hooks/emission-state';
import { useEmitterPymeId } from 'emission-lib/hooks/emitter';
import { useGetFrequentClientsByPymeId } from 'hooks/frequent-clients/use-get-frequent-clients-by-pyme-id';
import NewShippingLayoutFrequentClientsList from '../clients';

export default function NewShippingLayoutFrequentClientsModal(): JSX.Element {
  const [isOpen, setIsOpen] = useFrequentClientsModal();
  const [emitterPymeId] = useEmitterPymeId();
  const { isLoading, frequentClients } =
    useGetFrequentClientsByPymeId(emitterPymeId);

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
      <ModalClose closeButton={() => setIsOpen(false)} />
      <ModalBody>
        <Row>
          <Col col='12' className='mb-4'>
            <h3 className='font-black text-[1.375rem]'>
              Destinatarios Frecuentes
            </h3>
          </Col>
          <Col col='12'>
            {isLoading && !frequentClients && <p>Loading ...</p>}
            {!isLoading && frequentClients && (
              <NewShippingLayoutFrequentClientsList clients={frequentClients} />
            )}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
