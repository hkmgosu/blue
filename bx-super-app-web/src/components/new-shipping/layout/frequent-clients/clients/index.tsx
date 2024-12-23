import { useState, useEffect } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import { Input, RadioButton } from 'components/ui-bx/forms';
import NewShippingLayoutFrequentClientsAddButton from '../add-button';
import type { FrequentClientsResponseType } from 'types/frequent-clients';

type Props = {
  clients: FrequentClientsResponseType[];
};

export default function NewShippingLayoutFrequentClientsList({
  clients,
}: Props): JSX.Element {
  const [filter, setFilter] = useState('');
  const [clientsState, setClients] = useState(clients);
  const [selectedClient, setSelectedClient] =
    useState<FrequentClientsResponseType | null>(null);

  useEffect(() => {
    if (filter.length > 0) {
      const timer = setTimeout(() => {
        const clientsFiltered = clients.filter((cli) =>
          (cli.receiver.name + cli.receiver.lastName)
            .toLowerCase()
            .includes(filter.toLowerCase())
        );
        setClients(clientsFiltered);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setClients(clients);
    }
  }, [clients, filter]);

  return (
    <Row>
      <Col col='12' className='mb-6'>
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder='Introduce el nombre del destinatario frecuente'
        />
      </Col>
      <Col col='12' className='mb-6'>
        <div className='w-full flex flex-col justify-center max-h-[400px] overflow-y-auto'>
          {clientsState.map((clientState, index) => (
            <div
              key={clientState._id}
              className='flex justify-center flex-col pt-3'
            >
              <div className='w-full flex items-center'>
                <div className='mr-[10px]'>
                  <RadioButton
                    initialChecked={false}
                    checked={selectedClient === clientState}
                    onChange={() => setSelectedClient(clientState)}
                  />
                </div>
                <div className='text-sm whitespace-nowrap overflow-hidden text-ellipsis'>
                  {`${clientState.receiver.name} ${clientState.receiver.lastName}`}
                  ,{' '}
                  {`${clientState.destiny.address.commune.name}, ${clientState.destiny.address.region.name}`}
                </div>
              </div>
              <div
                className={
                  index + 1 === clientsState.length
                    ? ''
                    : 'mt-3 h-[1px] bg-bx-blue-clear w-full'
                }
              />
            </div>
          ))}
        </div>
      </Col>
      <Col col='12'>
        <NewShippingLayoutFrequentClientsAddButton
          client={selectedClient}
          isActive={!selectedClient}
        />
      </Col>
    </Row>
  );
}
