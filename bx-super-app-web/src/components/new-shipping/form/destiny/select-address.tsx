import cs from 'classnames';

import addressImg from 'images/new-shipping/domilicio.png';
import pickupImg from 'images/new-shipping/pickup.png';
import {
  useShippingDestinyIsPickup,
  useShippingDestiny,
} from 'emission-lib/hooks/shipping-destiny';
import { Button } from 'components/ui-bx/button';

function NewShippingFormDestinySelectAddress(): JSX.Element {
  const [isPickup, setIsPickup] = useShippingDestinyIsPickup();
  const [, setDestiny] = useShippingDestiny();

  const handleChangeAddressTypeData = (pickup: boolean): void => {
    setDestiny({
      address: {
        city: '',
        commune: {
          base_name: '',
          base_post: '',
          code: '',
          location_code: '',
          name: '',
          zone: '',
        },
        complement: '',
        country: '',
        depto: '',
        geolocation: {
          latitude: 0,
          longitude: 0,
        },
        office: '',
        reference: '',
        region: {
          country: 0,
          name: '',
          region_iso_3166: '',
          region_number: '',
        },
        street: '',
        street_number: '',
      },
      agency_id: '',
      agency_name: '',
      isPickup: pickup,
    });
  };

  return (
    <div className='flex justify-between items-center xl:justify-around'>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex rounded-full flex-col mb-4'>
          <button
            onClick={() => {
              handleChangeAddressTypeData(true);
              setIsPickup(true);
            }}
            className={cs(
              'bg-bx-lblue-easy rounded-full flex justify-center items-center border-white border-0 transition-colorsw w-[100px] h-[100px] p-0 focus:border-2 focus:border-bx-orange',
              {
                'border-2 border-bx-orange': isPickup === true,
              }
            )}
          >
            <img
              src={pickupImg}
              alt='Pickup'
              className='w-[82px] h-[82px] object-cover'
            />
          </button>
        </div>
        <Button
          onClick={() => {
            handleChangeAddressTypeData(true);
            setIsPickup(true);
          }}
        >
          <div className='text-sm text-center'>Punto Blue Express</div>
        </Button>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex rounded-full flex-col mb-4'>
          <button
            onClick={() => {
              handleChangeAddressTypeData(false);
              setIsPickup(false);
            }}
            className={cs(
              'bg-bx-lblue-easy rounded-full flex justify-center items-center border-white border-0 transition-colorsw w-[100px] h-[100px] p-0 focus:border-2 focus:border-bx-orange',
              {
                'border-2 border-bx-orange': isPickup === false,
              }
            )}
          >
            <img
              src={addressImg}
              alt='Domicilio'
              className='w-[82px] h-[82px] object-cover'
            />
          </button>
        </div>
        <Button
          onClick={() => {
            handleChangeAddressTypeData(false);
            setIsPickup(false);
          }}
        >
          <div className='text-sm text-center'>Domicilio</div>
        </Button>
      </div>
    </div>
  );
}

export default NewShippingFormDestinySelectAddress;
