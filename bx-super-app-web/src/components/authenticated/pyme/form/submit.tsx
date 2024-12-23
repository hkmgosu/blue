import { Col } from '@bx-design/react-grid';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import BillingInfoSuccesModal from 'components/authenticated/pyme/billing-info-confirmation-modal';
import { ShowAlert } from 'components/ui-bx/alert';
import { Button } from 'components/ui-bx/button';
import {
  pymeFormModalAtom,
  pymeFormErrorAtom,
  pymeFormIsErrorAtom,
  pymeFormSubmit,
  pymeFormIsLoadingAtom,
  pymeFormYupValidationAtom,
} from 'atoms/pyme-billing-info';
import { BillingInfoType, PymeType } from 'types/auth';
import { putPymeBillingInfo } from 'api/pyme';

type Props = {
  billingInfo: BillingInfoType;
  pymeInfo: PymeType;
  isEdit: boolean;
};

export default function PymeFormSubmit({
  pymeInfo,
  isEdit,
}: Props): JSX.Element {
  const [pymeFormData] = useAtom(pymeFormSubmit);
  const [showModal, setShowModal] = useAtom(pymeFormModalAtom);
  const [isError, setIsError] = useAtom(pymeFormIsErrorAtom);
  const [error, setError] = useAtom(pymeFormErrorAtom);
  const [isLoading, setIsLoading] = useAtom(pymeFormIsLoadingAtom);
  const [isValid] = useAtom(pymeFormYupValidationAtom);

  const handleSubmit = async (): Promise<void> => {
    setIsError(false);
    setIsLoading(true);
    try {
      const data = {
        rut: pymeFormData.rut,
        commune: pymeFormData.commune,
        address: pymeFormData.address,
        address_number: String(pymeFormData.address_number),
        postal_code: pymeFormData.postal_code,
        city_name: pymeFormData.city_name,
        region: pymeFormData.region,
        phone: pymeFormData.phone,
        email: pymeFormData.email,
        address_office: pymeFormData.address_office,
        department: pymeFormData.department,
      };
      await putPymeBillingInfo(pymeInfo ? pymeInfo.id : '', data);
      setShowModal(true);
    } catch (err) {
      setError((err as Error).message);
      setIsError(true);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isEdit ? (
        <Col>
          <Button
            type='submit'
            isLoading={isLoading}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Guardar
          </Button>
        </Col>
      ) : (
        <></>
      )}

      <BillingInfoSuccesModal
        isOpen={showModal}
        toggle={() => setShowModal(false)}
      />
      <ShowAlert
        variant='danger'
        isOpen={isError}
        handleClose={() => setIsError(false)}
      >
        <AlertMessage>{error}</AlertMessage>
      </ShowAlert>
    </>
  );
}

const AlertMessage = styled.div`
  font-weight: 800;
  font-size: 12px;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;
