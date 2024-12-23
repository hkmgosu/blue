import { useCallback, useState, useEffect } from 'react';

import styles from 'components/new-shipping/form/package/styles.module.scss';
import { Checkbox } from 'components/ui-bx/forms';
import { useShippingPackageDangerousMerchandise } from 'emission-lib/hooks/shipping-package';
import DangerousMerchandisingModal from './dangerous-modal';
import { BxInfo } from '@bx-design/react-icons';
import { Tooltip } from 'components/ui-bx/tooltip';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';

function NewShippingFormPackageDangerous(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeShipping] = useAtom(shipmentTypeAtom);
  const [dangerousMerchandise, setPackageContent] =
    useShippingPackageDangerousMerchandise();

  const handleChange = useCallback(
    (e) => {
      setPackageContent((prev) => !prev);
      if (typeShipping === 'unitary') {
        window.localStorage.setItem(
          'dangerous-destiny-form',
          e.target.checked.toString()
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setPackageContent]
  );

  const onToggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  useEffect(() => {
    if (typeShipping === 'unitary') {
      const isDangerous = window.localStorage.getItem(
        'dangerous-destiny-form' || dangerousMerchandise
      );
      const boolIsDangerous = isDangerous === 'true';
      setPackageContent(boolIsDangerous);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.container}>
      <Checkbox
        onChange={handleChange}
        checked={dangerousMerchandise}
        label={
          <>
            <div className={styles.label}>
              <div>
                Mi envío no contiene{' '}
                <span
                  className={styles.orangeDangerousUnderline}
                  onClick={onToggleModal}
                >
                  Mercancías Peligrosas *
                </span>
              </div>{' '}
              <div className={styles.icon}>
                <Tooltip
                  content={
                    'Mercancías peligrosas: ácidos, alcoholes, combustibles, explosivos, material radioactivo y aerosoles.'
                  }
                  direction='right'
                  style={{ left: 'calc(100% + 10px)' }}
                >
                  <BxInfo size={16} />
                </Tooltip>
              </div>
            </div>
            <div className={styles.sublabel}>
              Debes marcar el check para que tu envío se pueda realizar.
            </div>
          </>
        }
      />
      <DangerousMerchandisingModal isOpen={showModal} toggle={onToggleModal} />
    </div>
  );
}

export default NewShippingFormPackageDangerous;
