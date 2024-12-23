import { useAuth } from 'contexts/auth-context';
import { FC, useState } from 'react';
import styles from './current-account-modal.module.scss';
import { Button } from 'components/ui-bx/button';
import { Input, Label } from 'components/ui-bx/forms';
import {
  validateRut,
  cleanRut,
  formatRutOnlyScript,
} from '@bx-design/validate-rut';
import { newBusinessIsLoadingAtom } from 'atoms/new-business';
import { useAtom } from 'jotai';
import { pymeUpdatePyme } from 'api/pyme-register';
import { putPymeBillingInfo } from 'api/pyme';
import { errorAtom, isRutValidAtom } from 'atoms/dashboard';

export const NaturalPersonModal: FC = () => {
  const { user } = useAuth();
  const [rut, setRut] = useState('');
  const [, setError] = useAtom(errorAtom);
  const [, setIsError] = useAtom(isRutValidAtom);
  const [validRut, setIsRutValid] = useState(false);
  const [rutError, setRutError] = useState('');
  const [isLoading, setIsLoading] = useAtom(newBusinessIsLoadingAtom);
  const [defaultPyme] = useState(() =>
    user?.pymes?.find((pyme) => pyme.id === user?.default_pyme)
  );
  const handleValidRut = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRut(e.target.value);
    const validation = validateRut(e.target.value);
    if (validation) {
      setIsRutValid(true);
      setRutError('');
      setRut(formatRutOnlyScript(cleanRut(e.target.value)));
    } else {
      setIsRutValid(false);
      setRutError('Ingrese un RUT válido');
    }
  };
  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    if (defaultPyme) {
      try {
        const billing = await putPymeBillingInfo(defaultPyme.id, {
          rut: rut,
          email: user?.email,
        });
        if (billing) {
          const updatedPyme = {
            ...defaultPyme,
            is_natural_person: true,
            has_billing_information: true,
          };
          const updated = await pymeUpdatePyme(defaultPyme?.id, updatedPyme);
          if (updated.is_success) {
            window.location.assign('/dashboard');
          }
        }
        setIsError(true);
        setError('Ha ocurrido un error');
      } catch (error: any) {
        setIsError(true);
        setError(error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.subtitle}>
        ¿Quieres enviar como persona natural ?
      </h3>
      <p>
        Podrás seguir realizando envíos como persona natural. Solo necesitamos
        tu RUT.
      </p>
      <Label htmlFor='rut'>Ingresa tu RUT</Label>
      <Input
        type='text'
        name='rut'
        id='rut'
        placeholder='12345678-9'
        value={rut}
        onChange={(e) => handleValidRut(e)}
        maxLength={100}
        error={!validRut}
        size={100}
      />
      <p className={styles.error}>{rutError}</p>
      <Button
        disabled={!validRut}
        onClick={() => handleSubmit()}
        isLoading={isLoading}
        size='md'
      >
        Aceptar
      </Button>
    </div>
  );
};
