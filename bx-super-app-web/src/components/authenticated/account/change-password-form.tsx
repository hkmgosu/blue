import React, { FC, useState } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { useHistory } from 'react-router-dom';
import { BxEye, BxEyeOff, BxX } from '@bx-design/react-icons';

import { useAuth } from 'contexts/auth-context';
import { userChangePassword } from 'api/user';
import { validateSchema } from 'utils/validate-schema';
import { passwordSchemaValidation } from 'utils/validations/login/submit.validation';
import { Label, InputWithIcon, Feedback } from 'components/ui-bx/forms';
import { Card, CardBody } from 'components/ui-bx/card';
import { Button } from 'components/ui-bx/button';
import { Spinner } from 'components/ui-bx/spinner';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import styles from './change-password-form.module.scss';
import {
  passwordChangeIsLoadingAtom,
  passwordChangeIsErrorAtom,
  passwordChangeErrorAtom,
  passwordChangeIsSuccessAtom,
} from 'atoms/password-change';
import { useAtom } from 'jotai';
import { ShowAlert } from 'components/ui-bx/alert';

type PasswordType = {
  password: {
    value: string;
    showPassword: boolean;
    error: string | null;
  };
  confirm: {
    value: string;
    showPassword: boolean;
    error: string | null;
  };
};

const UserForm: FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [, setIsLoading] = useAtom(passwordChangeIsLoadingAtom);
  const [isError, setIsError] = useAtom(passwordChangeIsErrorAtom);
  const [error, setError] = useAtom(passwordChangeErrorAtom);
  const [, setIsSuccess] = useAtom(passwordChangeIsSuccessAtom);
  const [password, setPassword] = useState<PasswordType>({
    password: {
      value: '',
      showPassword: false,
      error: null,
    },
    confirm: {
      value: '',
      showPassword: false,
      error: null,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showFinallyModal, setShowFinallyModal] = useState<boolean>(false);

  const handleChangePassword =
    (attr: keyof PasswordType) =>
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const value = event.target.value;
      const { error: validateError } = await validateSchema(
        passwordSchemaValidation,
        {
          password: value,
        }
      );

      setPassword((prevState) => ({
        ...prevState,
        [attr]: {
          ...prevState[attr],
          value,
          error: validateError,
        },
      }));
    };

  const handleShowPassword = (attr: keyof PasswordType) => (): void => {
    setPassword((prevState) => ({
      ...prevState,
      [attr]: {
        ...prevState[attr],
        showPassword: !prevState[attr].showPassword,
      },
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      setIsLoading(true);
      setIsError(false);
      setError(null);
      setIsSuccess(false);

      if (password.password.error || password.confirm.error) {
        return;
      }

      const result: any = await userChangePassword({
        email: user?.email || '',
        password: password.password.value,
        confirmPassword: password.confirm.value,
      });

      if (result.isSuccess) {
        setShowFinallyModal(true);
      } else {
        setError(result.payload.message);
        setIsError(true);
        setIsSuccess(false);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card marginBottom>
        <CardBody>
          <Row className='justify-center'>
            <Col col='12'>
              <div className={styles.contentTitle}>
                <span className={styles.title}>Cambiar Contraseña</span>
                <div
                  className={styles.closeIconContent}
                  onClick={history.goBack}
                >
                  <BxX size='16' />
                </div>
              </div>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col col='12'>
              <p className={styles.info}>
                Elige una contraseña única que tenga al menos 8 caracteres, para
                proteger tu cuenta.
              </p>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col col='12' xl='6'>
              <Label htmlFor='password'>Escribe tu contraseña nueva</Label>
              <InputWithIcon
                type={password.password.showPassword ? 'text' : 'password'}
                name='password'
                value={password.password.value}
                onChange={handleChangePassword('password')}
                placeholder='Tu nueva contraseña'
                rightIcon={
                  <span onClick={handleShowPassword('password')}>
                    {password.password.showPassword ? (
                      <BxEyeOff size={20} />
                    ) : (
                      <BxEye size={20} />
                    )}
                  </span>
                }
                autoComplete='off'
                disabled={loading}
                error={password.password.error !== null}
              />
              <Feedback
                type='invalid'
                isActive={password.password.error !== null}
              >
                {password.password.error}
              </Feedback>
              <br />
            </Col>
            <Col col='12' xl='6'>
              <Label htmlFor='password'>Escribe tu contraseña nueva</Label>
              <InputWithIcon
                type={password.confirm.showPassword ? 'text' : 'password'}
                name='confirm'
                value={password.confirm.value}
                onChange={handleChangePassword('confirm')}
                placeholder='Tu nueva contraseña'
                rightIcon={
                  <span onClick={handleShowPassword('confirm')}>
                    {password.confirm.showPassword ? (
                      <BxEyeOff size={20} />
                    ) : (
                      <BxEye size={20} />
                    )}
                  </span>
                }
                autoComplete='off'
                disabled={loading}
                error={password.confirm.error !== null}
              />
              <Feedback
                type='invalid'
                isActive={
                  password.confirm.error !== null ||
                  (password.confirm.value.length > 0 &&
                    password.password.value !== password.confirm.value)
                }
              >
                {password.confirm.error || 'Las contraseñas no coinciden'}
              </Feedback>
              <br />
            </Col>
          </Row>
          <Row className='justify-end'>
            <Col col='12' xl='6' xxl='4'>
              <Button
                fullWidth
                onClick={handleSubmit}
                disabled={
                  loading ||
                  password.password.error !== null ||
                  password.confirm.error !== null ||
                  password.password.value !== password.confirm.value
                }
              >
                {loading ? <Spinner /> : 'Guardar cambios'}
              </Button>
              <br />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <ShowAlert
        variant='danger'
        isOpen={isError}
        handleClose={() => setIsError(false)}
      >
        <div className={styles.errorText}>{error}</div>
      </ShowAlert>
      <Modal isOpen={showFinallyModal} size={'lg'} toggle={() => {}} centered>
        <ModalBody>
          <Row>
            <Col col='12'>
              <span className={styles.title}>Actualización de contraseña</span>
            </Col>
            <Col col='12'>
              <p className={styles.text}>
                La contraseña se ha actualizado correctamente
              </p>
            </Col>
            <Col col='12'>
              <div className={styles.centered}>
                <Button onClick={history.goBack}>Finalizar</Button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default UserForm;
