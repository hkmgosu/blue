import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from '@bx-design/react-grid';
import { BxEdit, BxUpload, BxX } from '@bx-design/react-icons';

import { Card, CardBody } from 'components/ui-bx/card';
import { useAuth } from 'contexts/auth-context';
import { usePyme } from 'contexts/pyme/pyme-context';
import PymeFormRut from './form/rut';
import PymeGoogleAddress from './form/google-address';
import PymeFormPhone from './form/phone';
import PymeFormEmail from './form/email';
import PymeForm from './form';
import styles from './pyme-billing-info-form.module.scss';
import PymeAddressDepto from './form/department';
import PymeAddressOffice from './form/office';
import { useAtom } from 'jotai';
import { isBillingEditableAtom } from 'atoms/pyme-billing-info';

const PymeBillingInfoForm: FC = () => {
  const { user } = useAuth();
  const { defaultPyme } = usePyme();
  // const [isEdit, setIsEdit] = useState(false);
  const [isEdit, setIsEdit] = useAtom(isBillingEditableAtom);

  useEffect(() => {
    if (!defaultPyme?.has_billing_information) {
      setIsEdit(true);
    }
  }, [setIsEdit, defaultPyme]);

  const EditIconOrClose = isEdit ? <BxX size={18} /> : <BxEdit size={18} />;

  return (
    <Container>
      <Row className='items-center justify-center my-4'>
        <div
          className={styles.link}
          onClick={() => window.location.assign('/dashboard')}
        >
          <div className={styles.iconContainer}>
            <BxUpload size={16} />
          </div>
          <div className={styles.exitText}>Volver al Inicio</div>
        </div>
        <h2 className={styles.center}>Datos de facturación</h2>
      </Row>
      <Row>
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            {defaultPyme && user && (
              <>
                <Card>
                  <CardBody>
                    <Row>
                      {!defaultPyme?.has_billing_information ? (
                        <Col col='12'>
                          <h2 className={styles.cardTitle}>
                            Debes completar los datos de tu empresa
                          </h2>
                        </Col>
                      ) : (
                        <Col col='12'>
                          <IconContainer onClick={() => setIsEdit(!isEdit)}>
                            <EditText>Editar datos</EditText>
                            {EditIconOrClose}
                          </IconContainer>
                          <h2 className={styles.cardTitle}>
                            Datos de facturación
                          </h2>
                        </Col>
                      )}
                    </Row>
                    <Row gX='5' gY='4'>
                      <PymeFormRut />
                      <PymeFormPhone />
                      <PymeFormEmail />
                      <PymeGoogleAddress fromBilling={true} />
                      <PymeAddressDepto />
                      <PymeAddressOffice />
                      <Col col='12'>
                        <p className={styles.mandatory}>
                          <span className={styles.orange}>*</span> Campos
                          obligatorios
                        </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <div className={styles.containerSubmit}>
                  <PymeForm
                    pymeInfo={defaultPyme}
                    billingInfo={defaultPyme.billing_information}
                    isEdit={isEdit}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Row>
    </Container>
  );
};

const IconContainer = styled.div`
  font-size: 12px;
  line-height: 158%;
  letter-spacing: 0.03em;
  color: var(--bx-color-black);
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const EditText = styled.div`
  margin: 5px 5px 0 0;
`;

export default PymeBillingInfoForm;
