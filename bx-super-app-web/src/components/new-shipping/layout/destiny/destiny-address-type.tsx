import NewShippingLayoutFadeContent from 'components/new-shipping/layout/fade';
import NewShippingLayoutDestinyPickup from 'components/new-shipping/layout/destiny/destiny-pickup';
import NewShippingLayoutDestinyAddressDomicile from 'components/new-shipping/layout/destiny/destiny-address-domicile';
import { useShippingDestinyIsPickup } from 'emission-lib/hooks/shipping-destiny';

function NewShippingLayoutDestinyAddressType(): JSX.Element {
  const [isPickup] = useShippingDestinyIsPickup();

  return (
    <>
      <NewShippingLayoutFadeContent isOpen={isPickup === true}>
        <NewShippingLayoutDestinyPickup />
      </NewShippingLayoutFadeContent>

      <NewShippingLayoutFadeContent isOpen={isPickup === false}>
        <NewShippingLayoutDestinyAddressDomicile />
      </NewShippingLayoutFadeContent>
    </>
  );
}

export default NewShippingLayoutDestinyAddressType;
