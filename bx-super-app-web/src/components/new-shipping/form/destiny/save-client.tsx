import NewShippingLayoutToggleForSave from 'components/new-shipping/layout/toggle';
import { useShippingSaveFrequentClient } from 'emission-lib/hooks/shipping-save';

type Props = {
  withCard?: boolean;
};

function NewShippingFormDestinySaveClient({
  withCard = true,
}: Props): JSX.Element {
  const [frequentClient, setReceiver] = useShippingSaveFrequentClient();
  if (withCard) {
    return (
      <div className='flex'>
        <NewShippingLayoutToggleForSave
          initialChecked={frequentClient}
          handleChange={() => setReceiver((prev) => !prev)}
        >
          <div className='flex'>
            <div>
              Quiero guardar los datos ingresados como destino frecuente
            </div>
          </div>
        </NewShippingLayoutToggleForSave>
      </div>
    );
  }
  return (
    <div className='flex'>
      <div>
        <NewShippingLayoutToggleForSave
          initialChecked={frequentClient}
          handleChange={() => setReceiver((prev) => !prev)}
        >
          <div className='flex'>
            <div>
              Quiero guardar los datos ingresados como destino frecuente
            </div>
          </div>
        </NewShippingLayoutToggleForSave>
      </div>
    </div>
  );
}

export default NewShippingFormDestinySaveClient;
