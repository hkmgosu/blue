import { Button } from 'components/ui-bx/button';
import { useFrequentClientsModal } from 'emission-lib/hooks/emission-state';
import { useShippingReceiver } from 'emission-lib/hooks/shipping';
import { useShippingDestiny } from 'emission-lib/hooks/shipping-destiny';
import type { FrequentClientsResponseType } from 'types/frequent-clients';

type Props = {
  client: FrequentClientsResponseType | null;
  isActive: boolean;
};

export default function NewShippingLayoutFrequentClientsAddButton({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  client,
  isActive,
}: Props): JSX.Element {
  const [, setIsOpen] = useFrequentClientsModal();
  const [, setReceiver] = useShippingReceiver();
  const [, setDestiny] = useShippingDestiny();

  const handleClick = (): void => {
    if (client) {
      setReceiver(client.receiver);
      setDestiny(client.destiny);
      setIsOpen(false);
    }
  };
  return (
    <Button onClick={handleClick} disabled={isActive}>
      Agregar
    </Button>
  );
}
