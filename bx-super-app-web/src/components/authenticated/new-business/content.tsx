import { FC, Suspense } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { Card, CardBody } from 'components/ui-bx/card';

import style from './content.module.scss';
import NewBusinessFormSocialReason from './form-social-reason';
import NewBusinessFormRut from './form-rut';
import NewBusinessSuccessModal from './success-modal';
import NewBusinessFormShippingQuantity from './shipping-quantity';
import NewBusinessFormShippingType from './shipping-type';
import NewBusinessFormBusinessCollaboratorQuantity from './business-collaborator-quantity';
import NewBusinessFormSubmit from './new-submit';
import NewBusinessFormShippingOtherType from './other';
import {
  newBusinessErrorAtom,
  newBusinessIsErrorAtom,
  newBusinessShippingOtherTypeAtom,
} from 'atoms/new-business';
import { useAtom } from 'jotai';
import { ShowAlert } from 'components/ui-bx/alert';
import styles from './content.module.scss';
import NewBusinessBillingPhone from './billing-phone';
import NewBusinessBillingEmail from './billing-email';
import NewBusinessBillingAddress from './billing-address';
import NewBusinessBillingDepto from './billing-depto';
import NewBusinessBillingOffice from './billing-office';
import { BxUpload } from '@bx-design/react-icons';

const NewBusinessContent: FC = () => {
  const [showInput] = useAtom(newBusinessShippingOtherTypeAtom);
  const [isError, setIsError] = useAtom(newBusinessIsErrorAtom);
  const [error] = useAtom(newBusinessErrorAtom);

  return (
    <>
      {isError && (
        <Row className='justify-center'>
          <Col col='6' lg='6'>
            <ShowAlert
              variant='danger'
              isOpen={isError}
              handleClose={() => setIsError(false)}
            >
              <div className={styles.errorText}>{error}</div>
            </ShowAlert>
          </Col>
        </Row>
      )}
      <Row className='justify-center items-center my-4'>
        <div className={styles.headerContent}>
          <div
            className={styles.link}
            onClick={() => window.location.assign('/dashboard')}
          >
            <div className={styles.iconContainer}>
              <BxUpload size='16' />
            </div>
            <div className={styles.exitText}>Volver al Inicio</div>
          </div>
          <h1 className={styles.title}>Inscribe tu empresa</h1>
        </div>
      </Row>
      <Row>
        <Col col='12' md='6' mb-4>
          <Card>
            <CardBody padding='dashboard'>
              <Row>
                <Col col='12'>
                  <h3 className={style.subtitle}>Ingresa tus datos</h3>
                </Col>
                <Col col='12'>
                  <div className={style.inputContainer}>
                    <Suspense fallback={<div />}>
                      <NewBusinessFormSocialReason />
                    </Suspense>
                  </div>
                </Col>
                <Col col='12' md='6'>
                  <div className={style.inputContainer}>
                    <Suspense fallback={<div />}>
                      <NewBusinessFormRut />
                    </Suspense>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col col='12'>
                  <h3 className={style.subtitle}>Datos de facturación</h3>
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col col='12'>
                  <NewBusinessBillingAddress />
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col col='6'>
                  <NewBusinessBillingDepto />
                </Col>
                <Col col='6'>
                  <NewBusinessBillingOffice />
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col col='12'>
                  <NewBusinessBillingPhone />
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col col='12'>
                  <NewBusinessBillingEmail />
                </Col>
              </Row>

              <Row className='mt-6'>
                <Col>
                  <div>
                    <span className={style.required}>*</span> Campos
                    obligatorios
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <br />
        </Col>

        <Col col='12' md='6'>
          <Card>
            <CardBody padding='dashboard'>
              <Row>
                <Col col='12'>
                  <h3 className={style.subtitle}>
                    Responde estas breves preguntas
                  </h3>
                </Col>
                <Col col='12'>
                  <NewBusinessFormShippingQuantity />
                </Col>
                <Col col='12'>
                  <NewBusinessFormShippingType />
                  {showInput ? (
                    <Col col='12' lg='6' className='lg:mb-12'>
                      <br />
                      <NewBusinessFormShippingOtherType />
                    </Col>
                  ) : (
                    <></>
                  )}
                </Col>
                <Col col='12'>
                  <NewBusinessFormBusinessCollaboratorQuantity />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='justify-end'>
        <Col col='12' lg='2'>
          <NewBusinessFormSubmit />
        </Col>
      </Row>

      <NewBusinessSuccessModal />
    </>
  );
};

export default NewBusinessContent;
