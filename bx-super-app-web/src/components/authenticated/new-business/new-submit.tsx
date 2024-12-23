import {
  newBusinessErrorAtom,
  newBusinessIsErrorAtom,
  newBusinessIsSuccessAtom,
  newBusinessValuesAtom,
  newBusinessValuesIsValidAtom,
} from 'atoms/new-business';
import { Button } from 'components/ui-bx/button';
import { useAtom } from 'jotai';

import style from './content.module.scss';
import { useAuth } from 'contexts/auth-context';
import { useTranslation } from 'react-i18next';
import { pymeRegisterApi } from 'api/pyme-register';
import { useState } from 'react';
import { putPymeBillingInfo } from 'api/pyme';

export default function NewBusinessFormSubmit(): JSX.Element {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [businessData] = useAtom(newBusinessValuesAtom);
  const [isValid] = useAtom(newBusinessValuesIsValidAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsSuccess] = useAtom(newBusinessIsSuccessAtom);
  const [, setIsError] = useAtom(newBusinessIsErrorAtom);
  const [, setError] = useAtom(newBusinessErrorAtom);

  const handleClick = async (): Promise<void> => {
    try {
      setIsLoading(true);
      if (user) {
        const res = await pymeRegisterApi({
          ...businessData,
          user_id: user.sub,
        });
        if (res.is_success) {
          const data = {
            rut: businessData.rut,
            commune: businessData.commune,
            address: businessData.billing_address,
            address_number: String(businessData.address_number),
            postal_code: '',
            city_name: businessData.city_name,
            region: businessData.region,
            phone: businessData.billing_phone,
            email: businessData.billing_email,
            address_office: businessData.billing_office,
            department: businessData.billing_depto,
          };
          try {
            await putPymeBillingInfo(res.pyme ? res.pyme._id : '', data);
            setIsSuccess(true);
            setIsLoading(false);
          } catch (error) {
            setError('Ocurrió un error');
            setIsSuccess(false);
            setIsLoading(false);
          }
        } else {
          setIsError(true);
          setIsLoading(false);
          setIsSuccess(false);
          if (res.rut) {
            setError(t('new_business.form.errors.exist_rut'));
          } else {
            setError(t('new_business.form.errors.exist_name'));
          }
        }
      }
    } catch (e) {}
  };

  return (
    <div className={style.submit}>
      <Button disabled={!isValid} isLoading={isLoading} onClick={handleClick}>
        Inscribir
      </Button>
    </div>
  );
}
