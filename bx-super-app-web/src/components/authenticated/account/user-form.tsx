import { FC, useState } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';
import { BxChevronRight, BxEdit, BxX } from '@bx-design/react-icons';

import { setAccessToken } from 'config';
import { useAuth } from 'contexts/auth-context';
import { usePyme } from 'contexts/pyme/pyme-context';
import { userUpdateApi } from 'api/user';
import { Label, Input, Feedback } from 'components/ui-bx/forms';
import { Card, CardBody } from 'components/ui-bx/card';
import { Button } from 'components/ui-bx/button';
import AvatarRegister from 'components/unauthenticated/account/register/avatar';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { businessPhoneSchema } from 'utils/validations/new-shipping/basic/business-phone.validation';
import styles from './user-form.module.scss';

type UserFormType = {
  firstName: string;
  lastName: string;
  phone: string;
};

const UserForm: FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { defaultPyme } = usePyme();
  const [userUpdated, setUserUpdate] = useState<UserFormType>({
    firstName: user?.given_name || '',
    lastName: user?.family_name || '',
    phone: user?.phone ? user.phone : '',
  });
  const [phone, setPhone] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { isValid, error } = useYupValidate(businessPhoneSchema, { phone });

  const handleEdit = (): void => {
    setPhone(user?.phone ? user.phone : '');
    setUserUpdate({
      firstName: user?.given_name || '',
      lastName: user?.family_name || '',
      phone: user?.phone ? user.phone : '',
    });

    setIsEdit((prev) => !prev);
  };

  const handleChange =
    (attr: keyof UserFormType) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (attr === 'phone') {
        setPhone(event.target.value);
      }
      setUserUpdate((prevState) => ({
        ...prevState,
        [attr]: event.target.value,
      }));
    };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (
        userUpdated.firstName !== user?.given_name ||
        userUpdated.lastName !== user?.family_name ||
        userUpdated.phone !== user?.phone
      ) {
        await userUpdateApi({
          firstName: userUpdated.firstName,
          lastName: userUpdated.lastName,
          phone: userUpdated.phone,
        });

        setAccessToken('lol');
        window.location.reload();
      }
    } catch (err) {
    } finally {
      setIsEdit(false);
    }
  };

  const EditIconOrClose = isEdit ? <BxX size={20} /> : <BxEdit size={20} />;

  return (
    <Card marginBottom>
      <CardBody>
        <Row className='justify-center'>
          <Col col='12'>
            <div className={styles.contentDatailUser}>
              <div className={styles.avatarSection}>
                <div className={styles.contentImage}>
                  <AvatarRegister withoutRight />
                </div>
                <div className={styles.avatarTextSection}>
                  <div className={styles.textName}>{user?.name}</div>
                  <p className={styles.subtitle}>
                    Creada:{' '}
                    {defaultPyme &&
                      DateTime.fromISO(
                        defaultPyme.created.toString()
                      ).toLocaleString({
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })}
                  </p>
                </div>
              </div>
              <div className={styles.editContent} onClick={handleEdit}>
                <p className={styles.text}>
                  {isEdit ? 'Cancelar' : 'Editar tu cuenta'}
                </p>
                {EditIconOrClose}
              </div>
              <div className={styles.absolute} onClick={handleEdit}>
                {EditIconOrClose}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col col='12'>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              type='text'
              name='name'
              value={userUpdated.firstName}
              onChange={handleChange('firstName')}
              placeholder={userUpdated.firstName}
              disabled={!isEdit}
            />
            <br />
          </Col>
          <Col col='12'>
            <Label htmlFor='family_name'>Apellido</Label>
            <Input
              type='text'
              name='family_name'
              value={userUpdated.lastName}
              onChange={handleChange('lastName')}
              placeholder={userUpdated.lastName}
              disabled={!isEdit}
            />
            <br />
          </Col>
        </Row>
        <Row className='mb-6'>
          <Col col='12'>
            <Label htmlFor='email'>Correo electrónico</Label>
            <Input
              type='text'
              name='email'
              value={user?.email}
              placeholder={user?.email}
              disabled
            />
            <br />
          </Col>
          <Col col='12'>
            <Label htmlFor='phone'>Teléfono móvil</Label>
            <Input
              type='tel'
              name='phone'
              onChange={handleChange('phone')}
              placeholder='+569 9999 9999'
              value={userUpdated.phone}
              disabled={!isEdit}
              error={isValid === false}
            />
            {isValid === false && (
              <Feedback type='invalid' isActive={isValid === false}>
                {error}
              </Feedback>
            )}
            <br />
          </Col>
        </Row>
        <Row className='justify-between'>
          <Col col='12' xl='6'>
            <div
              className={styles.textButton}
              onClick={() => history.push('/account/change-password')}
            >
              Cambiar contraseña
              <span>
                <BxChevronRight size={12} />
              </span>
            </div>
          </Col>
          {isEdit && (
            <Col col='12' xl='6'>
              <Button fullWidth onClick={handleSubmit} disabled={!isValid}>
                Guardar cambios
              </Button>
            </Col>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserForm;
