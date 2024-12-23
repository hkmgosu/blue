import { useCallback, useState, useEffect } from 'react';
import { BxInfo } from '@bx-design/react-icons';

import { Checkbox } from 'components/ui-bx/forms';
import { Tooltip } from 'components/ui-bx/tooltip';
import WarrantyModal from './warranty-modal';
import { useShippingPackageWarranty } from 'emission-lib/hooks/shipping-package';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';
import { useShippingPackageWarrantyValue } from 'emission-lib/hooks/shipping-package/use-shipping-packages-warranty-value';

function NewShippingFormPackageWarranty(): JSX.Element {
  const [warranty, setWarranty] = useShippingPackageWarranty();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeShipping] = useAtom(shipmentTypeAtom);
  const [packagevalue] = useShippingPackageWarrantyValue();
  const [statusCheckBox, stateCheckbox] = useState(
    window.localStorage.getItem('warranty-destiny-form')
  );

  useEffect(() => {
    if (statusCheckBox === null) {
      stateCheckbox('false');
    } else {
      stateCheckbox(window.localStorage.getItem('warranty-destiny-form'));
    }

    if (Number(packagevalue) >= 85000 && statusCheckBox) {
      setWarranty(true);
      window.localStorage.setItem('warranty-destiny-form', 'true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packagevalue, setWarranty, stateCheckbox]);

  const handleChange = useCallback(
    (e) => {
      setWarranty((prev) => !prev);
      if (typeShipping === 'unitary') {
        window.localStorage.setItem(
          'warranty-destiny-form',
          e.target.checked.toString()
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setWarranty]
  );

  const onToggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  useEffect(() => {
    if (Number(packagevalue) >= 85000 && !warranty) {
      setWarranty(false);
    } else {
      if (typeShipping === 'unitary') {
        const isWarranty = window.localStorage.getItem(
          'warranty-destiny-form' || warranty
        );
        const boolIsWarranty = isWarranty === 'true';
        setWarranty(boolIsWarranty);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex text-sm xl:text-lg flex-col'>
      <Checkbox
        onChange={handleChange}
        checked={warranty}
        label={
          <>
            <div className='flex justify-start items-center text-[13px]'>
              Quiero la
              <p
                onClick={onToggleModal}
                className='font-bold text-bx-orange underline text-xs cursor-pointer mb-0 pl-2'
              >
                Garantía extendida
              </p>
              {'  '}
              <div className='relative flex justify-center items-center ml-[10px]'>
                <Tooltip
                  content={
                    'Tu envío solo cuenta con la cobertura básica hasta un tope de $85.000. Este valor no será descontado si utilizas un código de descuento gratis.'
                  }
                  direction='right'
                  style={{ left: 'calc(100% + 10px)' }}
                >
                  <BxInfo size={16} />
                </Tooltip>
              </div>
            </div>
            <div className='text-xs text-bx-grey-press'>
              Opcional si tu carga supera los $85.000
            </div>
          </>
        }
      />

      <WarrantyModal isOpen={showModal} toggle={onToggleModal} />
    </div>
  );
}

export default NewShippingFormPackageWarranty;
