import { BxFile } from '@bx-design/react-icons';

import { Button } from 'components/ui-bx/button';
import { useFrequentClientsModal } from 'emission-lib/hooks/emission-state';

export default function NewShippingLayoutFrequentClients(): JSX.Element {
  const [, setIsOpen] = useFrequentClientsModal();
  return (
    <Button
      onClick={() => setIsOpen((prev) => !prev)}
      variant='outline'
      fullWidth
    >
      <div className='flex'>
        <div className='flex justify-center items-center mr-[10px]'>
          <BxFile color='var(--bx-color-orange)' />
        </div>
        <div className='flex text-[10px]'>Destinatario frecuente</div>
      </div>
    </Button>
  );
}
