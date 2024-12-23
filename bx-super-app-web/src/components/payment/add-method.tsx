import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Col, Row } from '@bx-design/react-grid';

import { Button } from 'components/ui-bx/button';
import { usePaymentDispatch, usePaymentState } from 'contexts/payment-context';

const AddPaymentMethods: FC = () => {
  const { isInitializing } = usePaymentState();
  const { addInscription } = usePaymentDispatch();

  const handleInitInscription = useCallback(async () => {
    const res = await addInscription();
    if (res) {
      window.location.replace(res);
    }
  }, [addInscription]);
  return (
    <>
      <Row>
        <Col>
          <h3>Métodos de Pago</h3>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <AddContainer>
            <Button isLoading={isInitializing} onClick={handleInitInscription}>
              Agregar método de pago
            </Button>
          </AddContainer>
        </Col>
      </Row>
    </>
  );
};

const AddContainer = styled.div`
  text-align: right;
`;

export default AddPaymentMethods;
