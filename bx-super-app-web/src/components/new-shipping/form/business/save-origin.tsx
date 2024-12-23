import NewShippingLayoutToggleForSave from 'components/new-shipping/layout/toggle';
import { useShippingSaveFrequentOrigin } from 'emission-lib/hooks/shipping-save';

function NewShippingFormBusinessSaveOrigin(): JSX.Element {
  const [saveRefund, setSaveRefund] = useShippingSaveFrequentOrigin();
  return (
    <div className='pt-4'>
      <NewShippingLayoutToggleForSave
        initialChecked={saveRefund}
        handleChange={() => setSaveRefund((prev) => !prev)}
      >
        <div className='flex'>
          <div>Quiero guardar los datos ingresados como origen frecuente</div>
        </div>
      </NewShippingLayoutToggleForSave>
    </div>
  );
}

export default NewShippingFormBusinessSaveOrigin;
