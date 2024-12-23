import { FC, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Col, Row } from '@bx-design/react-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { useLocation } from 'react-router-dom';

import { usePaymentDispatch, usePaymentState } from 'contexts/payment-context';
import { Button } from 'components/ui-bx/button';
import { Spinner } from 'components/ui-bx/spinner';

const Cards: FC = () => {
  const { registered_cards, loadingCards, isRemovingInscription } =
    usePaymentState();
  const { confirm, setCards, deleteCard } = usePaymentDispatch();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const tbkToken = queryParams.get('token');

  useEffect(() => {
    if (tbkToken) {
      confirm(tbkToken);
    }
  }, [confirm, tbkToken]);

  useEffect(() => {
    if (!registered_cards && !tbkToken) {
      setCards();
    }
  }, [registered_cards, setCards, tbkToken]);

  const handleDelete = useCallback(
    (id: string) => {
      deleteCard(id);
    },
    [deleteCard]
  );

  return (
    <Row>
      <Col>
        <h5>Mis métodos de pago</h5>
        <hr />
        <ContainerPaymentMethods>
          {loadingCards ? (
            <>
              <Spinner />
            </>
          ) : registered_cards ? (
            registered_cards?.length > 0 ? (
              registered_cards?.map((card) => (
                <Method key={card.id}>
                  <Card>
                    {card.cardType === 'VISA' ? (
                      <FontAwesomeIcon size='lg' icon={faCcVisa} />
                    ) : (
                      <FontAwesomeIcon size='lg' icon={faCcMastercard} />
                    )}
                    <Number>Tarjeta {card.cardNumber}</Number>
                  </Card>
                  <Manage>
                    <Button
                      animationHover={false}
                      isLoading={isRemovingInscription}
                      onClick={() => handleDelete(card.id)}
                    >
                      Eliminar
                    </Button>
                  </Manage>
                </Method>
              ))
            ) : (
              <b>No hay tarjetas asociadas</b>
            )
          ) : null}
        </ContainerPaymentMethods>
      </Col>
    </Row>
  );
};

const ContainerPaymentMethods = styled.div`
  margin: 0 16px;
`;

const Method = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

const Card = styled.div``;

const Manage = styled.div``;

const Number = styled.span`
  margin-left: 8px;
`;

export default Cards;
