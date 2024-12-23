import NewShippingLayoutFadeContent from 'components/new-shipping/layout/fade';
import NewShippingLayoutCurrentItemDestinyPickupMulti from 'components/new-shipping/layout/current-item/destiny-pickup-multi';
import NewShippingLayoutCurrentItemDestinyDomicileMulti from 'components/new-shipping/layout/current-item/destiny-domicile-multi';
import { useShippingDestinyIsPickup } from 'emission-lib/hooks/shipping-destiny';

function NewShippingLayoutCurrentItemDestinyAddressMulti(): JSX.Element {
  const [isPickup] = useShippingDestinyIsPickup();
  return (
    <>
      <NewShippingLayoutFadeContent isOpen={isPickup === true}>
        <NewShippingLayoutCurrentItemDestinyPickupMulti />
      </NewShippingLayoutFadeContent>

      <NewShippingLayoutFadeContent isOpen={isPickup === false}>
        <NewShippingLayoutCurrentItemDestinyDomicileMulti />
      </NewShippingLayoutFadeContent>
    </>
  );
}

export default NewShippingLayoutCurrentItemDestinyAddressMulti;
