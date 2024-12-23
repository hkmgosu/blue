import { Row, Col } from '@bx-design/react-grid';
import { Button } from 'components/ui-bx/button';
import {
  Feedback,
  Input,
  RadioButton,
  Select,
  Textarea,
} from 'components/ui-bx/forms';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import { FC, useCallback, useEffect, useState } from 'react';
import CheckImg from 'images/check.png';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { orderServiceInputAtom } from 'atoms/shipments';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import {
  bankInformationValidationSchema,
  orderServiceValidation,
} from 'utils/validations/shipments/cancel-order-service';
import { BxExclamation } from '@bx-design/react-icons';

import { cancelOrderServiceAPI } from 'api/emissions/cancel-order-service';
import { ShowAlert } from 'components/ui-bx/alert';
import { accountType, banksOptions } from './bank-options';
import { usePyme } from 'contexts/pyme/pyme-context';
import { PymeBankInformation } from 'types/pyme';
import { putPymeBankInfo } from 'api/pyme';
import {
  cleanRut,
  formatRutOnlyScript,
  validateRut,
} from '@bx-design/validate-rut';
import cx from 'clsx';

const CancelOrderServiceComponent: FC = () => {
  const { defaultPyme } = usePyme();
  const [orderService, setOrderService] = useAtom(orderServiceInputAtom);
  const [reason, setReason] = useState('0');
  const [, setIsRutValid] = useState(false);
  const [rutError, setRutError] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState('');
  const [hide, sethide] = useState(false);
  const [bankInformation, setBankInformation] = useState<PymeBankInformation>({
    client_name: defaultPyme?.bank_account_information?.client_name
      ? defaultPyme?.bank_account_information?.client_name
      : '',
    last_name: defaultPyme?.bank_account_information?.last_name
      ? defaultPyme?.bank_account_information?.last_name
      : '',
    rut: defaultPyme?.bank_account_information?.rut
      ? defaultPyme?.bank_account_information?.rut
      : '',
    bank: defaultPyme?.bank_account_information?.bank
      ? defaultPyme?.bank_account_information?.bank
      : accountType[0].value,
    account_type: defaultPyme?.bank_account_information?.account_type
      ? defaultPyme?.bank_account_information?.account_type
      : accountType[0].value,
    account_number: defaultPyme?.bank_account_information?.account_number
      ? defaultPyme?.bank_account_information?.account_number
      : '',
  });

  const { isValid, error } = useYupValidate(orderServiceValidation, {
    orderService,
  });

  const handleClick = (): void => {
    window.location.assign('/dashboard');
  };

  const handleSubmit = useCallback(async () => {
    const isValidBankInfo = await bankInformationValidationSchema.isValid({
      ...bankInformation,
    });

    let reasonDescription = '';
    switch (reason) {
      case '1':
        reasonDescription = 'Desisto de envío';
        break;
      case '2':
        reasonDescription = 'Cambio de dirección destino';
        break;
      case '3':
        reasonDescription = 'Problemas con Blue Express';
        break;
      case '4':
        reasonDescription = `Otro - ${otherReason}`;
        break;
    }

    if (defaultPyme && isValidBankInfo) {
      setLoading(true);
      const responseUpdate = await putPymeBankInfo(
        defaultPyme?.id,
        bankInformation
      );

      if (responseUpdate.isSuccess) {
        try {
          const result = await cancelOrderServiceAPI(
            orderService,
            {
              reason: reasonDescription,
              otherReason: otherReason,
              bankInformation: bankInformation,
            },
            defaultPyme.billing_information.current_account,
            defaultPyme.rut
          );

          if (result === 'OK') {
            setOpen(true);
            setBankInformation({
              client_name: '',
              last_name: '',
              rut: '',
              bank: accountType[0].value,
              account_type: accountType[0].value,
              account_number: '',
            });
          } else {
            setErrorApi(result);
            setLoading(false);
            setBankInformation({
              client_name: '',
              last_name: '',
              rut: '',
              bank: banksOptions[0].value,
              account_type: accountType[0].value,
              account_number: '',
            });
          }
        } catch (e) {
          setLoading(false);
          setBankInformation({
            client_name: '',
            last_name: '',
            rut: '',
            bank: accountType[0].value,
            account_type: accountType[0].value,
            account_number: '',
          });
        }
      } else {
        setErrorApi(
          'Los datos bancarios de la empresa no se pudieron actualizar'
        );
        setBankInformation({
          client_name: '',
          last_name: '',
          rut: '',
          bank: accountType[0].value,
          account_type: accountType[0].value,
          account_number: '',
        });
      }
    }
  }, [orderService, reason, otherReason, defaultPyme, bankInformation]);

  const isReason = (): boolean => {
    return reason !== '0';
  };

  const handleValidRut = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBankInformation({
      ...bankInformation,
      rut: e.target.value,
    });
  };
  const handleBlurRut = (e: React.FocusEvent<HTMLInputElement>): void => {
    const rutD = e.target.value.trim();
    const validation = validateRut(rutD);
    if (validation) {
      setIsRutValid(true);
      setRutError('');
      setBankInformation({
        ...bankInformation,
        rut: formatRutOnlyScript(cleanRut(rutD)),
      });
    } else {
      setIsRutValid(false);
      setRutError('Ingrese un RUT válido');
    }
  };

  function changeVale(e: any): void {
    if (e.target.value === 'Retiro de Vale Vista mesón') {
      sethide(true);
    }
    sethide(false);
  }
  useEffect(() => {
    if (bankInformation.bank === 'Retiro de Vale Vista mesón') {
      sethide(true);
    }
  }, [bankInformation.bank]);

  return (
    <>
      <Row className='justify-between'>
        <Col col='12'>
          <BoxAlert>
            <PrecautionBox>
              <BoxIcon>
                <BxExclamation color='var(--bx-color-orange)' size={32} />
              </BoxIcon>
              <Contentd>
                <div>
                  <TextOne>
                    Solo puedes solicitar la anulación de los envíos creados
                    hace{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      menos de 5 días hábiles que NO han sido entregados en un
                      Punto Blue Express.
                    </span>
                  </TextOne>
                  <SubOrange>
                    De acuerdo a nuestros Términos y Condiciones se reembolsará
                    hasta el 50% de su pedido.
                  </SubOrange>
                </div>
              </Contentd>
            </PrecautionBox>
          </BoxAlert>
          <br />
        </Col>
        <Col col='12' md='4'>
          <Row>
            <Col col='12'>
              <label>
                1. Orden de Servicio a anular
                <Orange>*</Orange>
              </label>
              <br />
              <br />
              <Row>
                <Col col='12' md='9'>
                  <Input
                    type='text'
                    onChange={(e) =>
                      (/^\d+$/.test(e.target.value) || e.target.value === '') &&
                      setOrderService(e.target.value)
                    }
                    value={orderService}
                  ></Input>
                </Col>
              </Row>
              <br />
              2. Motivo de la anulación <Orange>*</Orange>
              <RadioGroup>
                <RadioButton
                  initialChecked={false}
                  checked={reason === '1'}
                  onClick={() => setReason('1')}
                  label={'Desisto de envío'}
                />
                <RadioButton
                  initialChecked={false}
                  checked={reason === '2'}
                  onClick={() => setReason('2')}
                  label={'Cambio de dirección destino'}
                />
                <RadioButton
                  initialChecked={false}
                  checked={reason === '3'}
                  onClick={() => setReason('3')}
                  label={'Problemas con Blue Express'}
                />
                <RadioButton
                  name='other'
                  initialChecked={false}
                  checked={reason === '4'}
                  onClick={() => setReason('4')}
                  label={'Otros'}
                />
                <Row>
                  <Col
                    col='12'
                    className={cx({
                      hidden: reason !== '4',
                    })}
                  >
                    <Textarea
                      onChange={(e) => {
                        setOtherReason(e.target.value);
                      }}
                      value={otherReason}
                      maxLength={250}
                    ></Textarea>
                  </Col>
                </Row>
              </RadioGroup>
            </Col>
            <Col col='12' className='hidden md:block'>
              <RequiredFields>(*) Campos Obligatorios</RequiredFields>
            </Col>
          </Row>
        </Col>

        <Col col='12' md='8'>
          <Row>
            <Col col='12' md='12'>
              <label>
                3. Datos del remitente asociados a la Orden de Servicio
                <Orange>*</Orange>
              </label>
              <br />
              <br />
            </Col>
            <Col col='12' md='12'>
              <Row>
                <Col col='12' lg='3'>
                  <Label>
                    RUT Emisor<Orange>*</Orange>
                  </Label>
                  <Input
                    type='text'
                    data-testid='rut-cancel-order'
                    value={bankInformation.rut}
                    onChange={(e) => {
                      handleValidRut(e);
                    }}
                    onBlur={(e) => {
                      handleBlurRut(e);
                    }}
                  ></Input>
                  <ErrorAlert>{rutError}</ErrorAlert>
                  <br />
                </Col>
                <Col col='12' lg='3'>
                  <Label>
                    Nombre<Orange>*</Orange>
                  </Label>
                  <Input
                    type='text'
                    value={bankInformation.client_name}
                    onChange={(e) => {
                      setBankInformation({
                        ...bankInformation,
                        client_name: e.target.value,
                      });
                    }}
                  ></Input>
                </Col>
                <Col col='12' lg='3'>
                  <Label>
                    Apellido<Orange>*</Orange>
                  </Label>
                  <Input
                    type='text'
                    value={bankInformation.last_name}
                    onChange={(e) => {
                      setBankInformation({
                        ...bankInformation,
                        last_name: e.target.value,
                      });
                    }}
                  ></Input>
                </Col>
              </Row>
            </Col>
            <Col col='12' md='12'>
              <label>
                Debe ser el RUT Asociado a la Orden de servicio a anular. En
                caso contrario emitiremos un vale vista para que sea retirado en
                el mesón de cualquier sucursal del Banco de Chile una vez
                terminado el proceso de anulación.
              </label>
              <br />
              <br />
            </Col>
            <Col col='12' md='12'>
              <label>
                4. Datos de reembolso
                <Orange>*</Orange>
              </label>
              <br />
              <br />
            </Col>
            {!hide ? (
              <>
                <Col col='12' md='4' sm='12'>
                  <Label>
                    Seleccione medio de pago<Orange>*</Orange>
                  </Label>
                  <Select
                    options={banksOptions}
                    value={bankInformation.bank}
                    onChange={(e) => {
                      setBankInformation({
                        ...bankInformation,
                        bank: e.target.value,
                      });
                      changeVale(e);
                    }}
                  />
                  <br />
                </Col>
                <Col col='12' md='4'>
                  <Label>
                    Tipo de cuenta<Orange>*</Orange>
                  </Label>
                  <Select
                    options={accountType}
                    value={bankInformation.account_type}
                    onChange={(e) => {
                      setBankInformation({
                        ...bankInformation,
                        account_type: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col col='12' md='4'>
                  <Label>
                    Número de cuenta<Orange>*</Orange>
                  </Label>
                  <Input
                    value={bankInformation.account_number}
                    onChange={(e) => {
                      setBankInformation({
                        ...bankInformation,
                        account_number: e.target.value,
                      });
                    }}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col col='12' md='4'>
                  <Label>
                    Seleccione medio de pago<Orange>*</Orange>
                  </Label>
                  <Select
                    options={banksOptions}
                    value={bankInformation.bank}
                    onChange={(e) => {
                      setBankInformation({
                        ...bankInformation,
                        bank: e.target.value,
                      });
                      changeVale(e);
                    }}
                  />
                  <br />
                </Col>
                <Col col='12' md='4'></Col>
                <Col col='12' md='4'></Col>
              </>
            )}

            <Col col='12' md='12'>
              <Row>
                <br />
                <Col col='12' md='7'></Col>
                <Col col='12' md='5'>
                  <Button
                    type='submit'
                    fullWidth
                    isLoading={isLoading}
                    onClick={() => {
                      isValid && !isLoading && isReason() && handleSubmit();
                    }}
                  >
                    Solicitar anulación
                  </Button>
                </Col>
              </Row>
              <br />
            </Col>
          </Row>
        </Col>

        <Col col='12' md='4'>
          <Col col='12' className='md:hidden block'>
            <br />
            <RequiredFields>(*) Campos Obligatorios</RequiredFields>
          </Col>
          <Col col='12' md='12'>
            <br />
            {!isValid && (
              <Feedback type={'invalid'} isActive>
                {error}
              </Feedback>
            )}
          </Col>
          <Col col='12'>
            <br />
            <ShowAlert
              isOpen={!!errorApi}
              variant={'danger'}
              handleClose={() => {
                setErrorApi('');
              }}
            >
              {errorApi}
            </ShowAlert>
          </Col>
        </Col>
      </Row>
      <Modal centered size='xl' isOpen={isOpen} toggle={() => {}}>
        <ModalBody>
          <Row>
            <Col col='12'>
              <ImageBox>
                <Image src={CheckImg} alt='Wow' />
              </ImageBox>
            </Col>
          </Row>
          <Row className='items-center justify-center'>
            <Col col='10'>
              <SubTitle>Solicitud de anulación enviada con éxito</SubTitle>
              <br />
              <Text>
                Su solicitud está siendo revisada por el equipo de Blue Express,
                prontamente tendrás respuesta a través de tu correo electrónico.
              </Text>
              <ButtonBox>
                <Button onClick={handleClick}>Volver al Inicio</Button>
              </ButtonBox>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

const ErrorAlert = styled.p`
  font-weight: 800;
  font-size: 12px;
  color: var(--bx-color-red-alert);
  margin-bottom: 0px;
`;

const Label = styled.div`
  margin-bottom: 10px;
`;

const RadioGroup = styled.div`
  margin-bottom: 50px;
  margin-top: 10px;
  display: grid;
  line-height: 30px;
`;

const Orange = styled.span`
  color: var(--bx-color-orange);
`;

const RequiredFields = styled.div`
  margin-top: 30px;
  font-size: 12px;
`;

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 38px;
  user-select: none;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  user-select: none;
`;

const SubTitle = styled.h3`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 95%;
  text-align: center;
  letter-spacing: 0.03em;
  color: #212121;
  @media (min-width: 1200px) {
    font-size: 36px;
  }
`;
const Text = styled.p`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 145%;
  text-align: center;
  letter-spacing: 0.03em;
  color: #212121;
  text-align: center;
  margin-bottom: 21px;
  user-select: none;
`;
const BoxAlert = styled.div`
  margin-top: 0;
`;
const PrecautionBox = styled.div`
  background: var(--bx-color-grey-on);
  border: 0.6px solid var(--bx-color-blue-clear);
  border-radius: 10px;
  padding: 26px 16px;
  display: flex;
  align-items: center;
`;
const BoxIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;
const Contentd = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TextOne = styled.div`
  color: var(--bx-color-blue);
  margin: 0;
  font-size: 12px;
`;
const SubOrange = styled.div`
  color: var(--bx-color-orange);
  font-size: 12px;
  margin-top: 3px;
`;

export default CancelOrderServiceComponent;
