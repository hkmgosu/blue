import { Col, Row } from '@bx-design/react-grid';
import { Button } from 'components/ui-bx/button';
import { Input, Label } from 'components/ui-bx/forms';
import { ModalBody } from 'components/ui-bx/modal';
import React, { useState } from 'react';
import styles from './modal.module.scss';
import {
  validateRut,
  cleanRut,
  formatRutOnlyScript,
} from '@bx-design/validate-rut';
import { useAtom } from 'jotai';
import { newShippingModalAtom } from 'atoms/new-shipping/new';
import { useAuth } from 'contexts/auth-context';
import {
  newBusinessIsLoadingAtom,
  newBusinessIsErrorAtom,
  newBusinessErrorAtom,
  newBusinessIsSuccessAtom,
} from 'atoms/new-business';
import { pymeRegisterApi } from 'api/pyme-register';
import { useTranslation } from 'react-i18next';
import { ShowAlert } from 'components/ui-bx/alert';
import { putPymeBillingInfo } from 'api/pyme';

function NewShippingLayoutModalRut(): JSX.Element {
  const { user } = useAuth();
  const [rut, setRut] = useState('');
  const [validRut, setIsRutValid] = useState(false);
  const [rutError, setRutError] = useState('');
  const { t } = useTranslation();
  const [, setShowEnvios] = useAtom(newShippingModalAtom);
  const [isLoading, setIsLoading] = useAtom(newBusinessIsLoadingAtom);
  const [, setIsSuccess] = useAtom(newBusinessIsSuccessAtom);
  const [, setIsError] = useAtom(newBusinessIsErrorAtom);
  const [error, setError] = useAtom(newBusinessErrorAtom);
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
    setIsError(false);
    setError(null);
    setIsSuccess(false);
    const newPyme = {
      social_reason: user?.name ? user?.name : '',
      user_id: user?.sub ? user?.sub : '',
      email: user?.email,
      rut: rut,
      is_natural_person: true,
    };
    try {
      const res = await pymeRegisterApi(newPyme);
      if (res.is_success) {
        await putPymeBillingInfo(res.pyme._id, {
          rut: rut,
          email: user?.email,
        });
        setIsSuccess(true);
        setIsLoading(false);
        setShowEnvios(false);

        window.location.assign('/dashboard');
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
    } catch (error) {}
  };
  return (
    <ModalBody>
      <Row className='xl:items-stretch xl:justify-center'>
        <Col col='12' lg='6'>
          <div className={styles.rutWrapper}>
            Para realizar envíos necesitamos tu RUT. <br /> Solo te lo pediremos
            esta vez
          </div>
        </Col>
        <Col col='12' lg='10' className='my-4'>
          <Label htmlFor='rut'>
            RUT <span className={styles.required}>*</span>
          </Label>
          <Input
            type='text'
            name='rut'
            id='rut'
            placeholder='12345678-9'
            value={rut}
            onChange={(e) => handleValidRut(e)}
            maxLength={100}
            error={!validRut}
          />
          <p className={styles.error}>{rutError}</p>
        </Col>
        <Col className='mt-2'>
          <div className={styles.rutButtons}>
            <Button onClick={() => setShowEnvios(false)}>Cancelar</Button>
            <Button
              disabled={!validRut}
              onClick={() => handleSubmit()}
              isLoading={isLoading}
            >
              Aceptar
            </Button>
          </div>
        </Col>
        <Col col='12' className='mt-6'>
          {error && (
            <ShowAlert variant='danger' isOpen>
              {error}
            </ShowAlert>
          )}
        </Col>
      </Row>
    </ModalBody>
  );
}

export default NewShippingLayoutModalRut;
