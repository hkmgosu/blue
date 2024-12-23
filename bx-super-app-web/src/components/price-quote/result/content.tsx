import { Col, Container, Row } from '@bx-design/react-grid';
import {
  BxClock,
  BxInfo,
  BxPackage,
  BxPin,
  BxWeight,
} from '@bx-design/react-icons';
import { cotizationMail } from 'api/appraisal/index';
import { PriceQuoteSummaryType } from 'atoms/price-quote/types';
import ShareIcon from 'components/icons/share';
import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import { slaToServiceText } from 'components/new-shipping/utils/sla-to-service-text';
import styles from 'components/price-quote/result/content.module.scss';
import PriceQuoteGoBack from 'components/price-quote/result/go-back';
import { Button, ButtonLink } from 'components/ui-bx/button';
import { Card, CardBody } from 'components/ui-bx/card';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import { Tooltip } from 'components/ui-bx/tooltip';
import { DateTime } from 'luxon';
import { ChangeEvent, createRef, KeyboardEvent, useState } from 'react';
import AutosizeInput from 'react-input-autosize';
import * as yup from 'yup';
import InfoModal from './info-modal';

type Props = {
  state: PriceQuoteSummaryType;
};

const forDate = DateTime.local();

function PriceQuoteResultContent({ state }: Props): JSX.Element {
  const inputRef = createRef<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [emails, setEmails] = useState<Array<string>>([]);
  const [error, setError] = useState<any>(null);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const handlerMail = async (): Promise<any> => {
    if (isOpen) {
      if (emails.length < 1) {
        setError('Debes escribir al menos un correo');
        return false;
      }

      const date = new Date();
      const options: any = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      await cotizationMail({
        EMAILS: emails,
        PYME: state.businessName,
        PRICE: parseToMoney(state.price?.totalValue),
        DATE: date.toLocaleDateString('es-ES', options),
        ORIGIN: state.originCommune,
        DESTINY: state.destinyCommune,
        SIZE: state.size,
        WEIGHT: state.price?.weight || 0,
        HOURS: state.price?.sla || 0 * 24,
        DAYS: state.price?.sla || 0,
        HEIGHT: state.sizes.height.toString(),
        LENGTH: state.sizes.length.toString(),
        WIDTH: state.sizes.width.toString(),
      });
    }
    setIsOpen(!isOpen);
  };
  const handleChange = (evt: ChangeEvent<HTMLInputElement>): boolean => {
    if (emails.length >= 5) {
      setError('Solo puedes tener 5 correos');
      return false;
    }
    setValue(evt.target.value);
    setError(null);
    return true;
  };

  const handleDelete = (item: string): any => {
    setEmails(emails.filter((e) => e !== item));
    inputRef.current.focus();
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>): void => {
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault();
      const email = value.trim();

      if (email && isValid(value)) {
        setEmails([...emails, email]);
        setValue('');
        inputRef.current.focus();
      }
    }
  };

  const isValid = (email: string): any => {
    let _error = null;

    if (isInList(email)) {
      _error = `${email} este correo ya existe.`;
    }

    if (!isEmail(email)) {
      _error = `${email} no es un correo válido.`;
    }

    if (_error) {
      setError(_error);
      return false;
    }

    return true;
  };

  const isInList = (email: string): any => {
    return emails.includes(email);
  };

  const isEmail = (email: string): boolean => {
    const pattern = yup.string().email();
    return pattern.isValidSync(email);
  };

  return (
    <main className={styles.main}>
      <Container>
        <Row className='xl:justify-center'>
          <Col xl='12' xxl='10' className='hidden xl:block xl:mb-12'>
            <PriceQuoteGoBack />
          </Col>
          <Col xl='10'>
            <Card>
              <CardBody>
                <Row className='mb-6 xl:mb-4'>
                  <Col col='12'>
                    <h1 className={styles.title}>Resumen de la cotización</h1>
                    <p className={styles.subtitle}>
                      Fecha cotización:{' '}
                      {forDate.toLocaleString(DateTime.DATE_HUGE)}
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col col='12'>
                    <h2 className={styles.infoTitle}>Origen - Destino</h2>
                  </Col>

                  <Col xl='12'>
                    <div className={styles.originDestiny}>
                      <div className={styles.originCommune}>
                        {state.originCommune}
                      </div>
                      <div className={styles.originDestinyCenter}>
                        <div className={styles.iconBox}>
                          <BxPin />
                        </div>
                        <div className={styles.originDestinyLine} />
                        <div className={styles.iconBox}>
                          <BxPin />
                        </div>
                      </div>
                      <div className={styles.destinyCommune}>
                        {state.destinyCommune}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col col='12'>
                    <div className={styles.separatorLine} />
                  </Col>
                </Row>

                <Row className='mb-6 xl:mb-4'>
                  <Col col='12'>
                    <h2 className={styles.infoTitle}>
                      Información de tu envío
                    </h2>
                  </Col>
                </Row>

                <Row className='xl:justify-evenly'>
                  <Col col='12' xl='3' className='mb-6 xl:mb-0'>
                    <div className={styles.detailBox}>
                      <div className={styles.detailBoxIcon}>
                        <BxPackage size={38} />
                      </div>

                      <div className={styles.detailBoxInfo}>
                        <div className={styles.detailSizes}>
                          <div>
                            <div className={styles.detailBoxText}>
                              {state.size}
                            </div>
                            <div className={styles.detailSizesDown}>Tamaño</div>
                          </div>

                          <div>
                            <div className={styles.detailBoxText}>
                              {state.sizes.width} cm
                            </div>
                            <div className={styles.detailSizesDown}>Largo</div>
                          </div>

                          <div>
                            <div className={styles.detailBoxText}>
                              {state.sizes.height} cm
                            </div>
                            <div className={styles.detailSizesDown}>Ancho</div>
                          </div>

                          <div>
                            <div className={styles.detailBoxText}>
                              {state.sizes.length} cm
                            </div>
                            <div className={styles.detailSizesDown}>Alto</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col col='12' xl='3' className='mb-6 xl:mb-0'>
                    <div className={styles.detailBox}>
                      <div className={styles.detailBoxIcon}>
                        <BxWeight size={38} />
                      </div>

                      <div className={styles.detailBoxInfo}>
                        <div className={styles.detailBoxTitle}>
                          Peso máximo {state.price?.weight} kg
                        </div>
                        <div className={styles.detailSizesDown}>
                          Peso máximo
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col col='12' xl='3' className='mb-6 xl:mb-0'>
                    <div className={styles.detailBox}>
                      <div className={styles.detailBoxIcon}>
                        <BxClock size={38} />
                      </div>

                      <div className={styles.detailBoxInfo}>
                        <div className={styles.detailBoxText}>
                          {state.price?.sla &&
                            slaToServiceText(state.price?.sla)}
                        </div>
                        <div className={styles.detailSizesDown}>
                          Tipo de envío
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col col='12'>
                    <div className={styles.separatorLine} />
                  </Col>
                </Row>

                <Row className='justify-center xl:justify-evenly xl:items-center mb-6 xl:mb-12'>
                  <Col col='12' xl='4'>
                    <div className={styles.priceBox}>
                      <div className={styles.price}>
                        Valor envío{' '}
                        {state.price?.totalValue &&
                          parseToMoney(Math.round(state.price?.totalValue))}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className='xl:justify-center'>
                  <Col col='12' xl='4' className='mb-6 xl:mb-0'>
                    <ButtonLink to='/price-quote' fullWidth>
                      Realizar otra cotización
                    </ButtonLink>
                  </Col>
                  <Col col='12' xl='4'>
                    <Button onClick={() => setShowInfoModal(true)} fullWidth>
                      Realizar envío
                    </Button>
                  </Col>
                </Row>
                <Row className='justify-center'>
                  <Col col='8' xl='3'>
                    <div className={styles.share} onClick={handlerMail}>
                      <ShareIcon color='var(--bx-color-black)' />
                      <span className={styles.space}>Compartir cotización</span>
                      <div className={styles.info}>
                        <Tooltip
                          content={
                            'Al hacer clic en el botón compartir, puedes enviar la cotización a tus clientes ingresando su correo electrónico.'
                          }
                          direction='right'
                          style={{
                            left: 'calc(57% + 10px)',
                            top: 'calc(93%)',
                          }}
                        >
                          <BxInfo size={16} />
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <InfoModal
        isOpen={showInfoModal}
        originCommune={state.originCommuneData}
        originRegion={state.originRegionData}
        destinyCommune={state.destinyCommuneData}
        destinyRegion={state.destinyRegionData}
        package={{
          size: state.size,
          sizes: state.sizes,
          bxShippingService: state.bxShippingService,
        }}
        price={state.price}
        onClose={() => setShowInfoModal(false)}
      />
      <Modal
        isOpen={isOpen}
        toggle={() => setIsOpen(false)}
        backdrop={true}
        centered
        keyboard={true}
      >
        <ModalBody>
          <Row className='justify-center'>
            <Col xl='12'>
              <div className={styles.title}>Compartir cotización con:</div>
              <div className={styles.description}>
                Puedes enviar la cotización hasta 5 correos electrónicos
                diferentes. Agrega cada correo pulsando la tecla enter.
              </div>
              <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                onClick={() => inputRef.current.focus()}
                className={styles.textarea}
              >
                {emails.map((email) => (
                  <div className={styles.tagItem} key={email}>
                    {email}
                    <button
                      type='button'
                      className={styles.button}
                      onClick={() => handleDelete(email)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <AutosizeInput
                  placeholder='Escribe los correos aquí, ejemplo@mail.com'
                  className={styles.input}
                  value={value}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  inputStyle={{
                    border: 'none',
                    outline: 'none',
                  }}
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <br />
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col col='4'>
              <div className={styles.buttonBox}>
                <Button onClick={handlerMail}>Compartir</Button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </main>
  );
}

export default PriceQuoteResultContent;
