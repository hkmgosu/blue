import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { useLocation } from 'react-router-dom';
import { BxDotsVertical, BxMoney, BxX } from '@bx-design/react-icons';

import { usePaymentDispatch, usePaymentState } from 'contexts/payment-context';
import { useAuth } from 'contexts/auth-context';
import { Card, CardBody, CardHeader } from 'components/ui-bx/card';
import { Spinner } from 'components/ui-bx/spinner';
import CreditCardInput from 'components/payment/credit-card/credit-card';
import SettingIcon from 'components/icons/settings';
import { ShowAlert } from 'components/ui-bx/alert';
import styles from './credit-card.module.scss';

const CreditCard: FC = () => {
  const { registered_cards, loadingCards, isRemovingInscription, showError } =
    usePaymentState();

  const [openMenu, setOpenMenu] = useState(false);
  const { setCards, deleteCard, addInscription, confirm, closeError } =
    usePaymentDispatch();
  const { user } = useAuth();
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
    if (!registered_cards) {
      setCards();
    }
  }, [registered_cards, setCards]);

  const firstCard = useMemo(
    () => registered_cards && registered_cards[0],
    [registered_cards]
  );

  const handleRemoveCard = (): void => {
    const isSelete = window.confirm('¿Seguro que desea eliminar la tarjeta?');

    if (isSelete && firstCard?.id) {
      deleteCard(firstCard?.id);
    }
  };

  const handleInitInscription = useCallback(async () => {
    const res = await addInscription();
    if (res) {
      window.location.replace(res);
    }
  }, [addInscription]);

  return (
    <Card marginBottom>
      <div className={styles.alerContainer}>
        <ShowAlert variant='danger' isOpen={showError} handleClose={closeError}>
          Error al inscribir tarjeta
        </ShowAlert>
      </div>
      <CardHeader>
        <div className={styles.cardHeaderContent}>
          <h6 className={styles.textName}>
            <span className='inline-flex justify-center items-center mr-2'>
              <BxMoney />
            </span>
            Métodos de Pago
          </h6>
          {!loadingCards && !firstCard && (
            <div className={styles.relative}>
              <button
                className={styles.circleButton}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <BxDotsVertical />
              </button>
              {openMenu && (
                <div className={styles.absolute}>
                  <div className={styles.menuHeader}>Métodos de Pago</div>
                  <div className={styles.menu} onClick={handleInitInscription}>
                    <span className={styles.iconContent}>
                      <SettingIcon />
                    </span>{' '}
                    Ir a Oneclick para configurar tu tarjeta
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      {loadingCards && (
        <div className={styles.fakeContent}>
          <Spinner variant='secondary' />
        </div>
      )}
      {!loadingCards && !firstCard && (
        <Row className='justify-center items-center'>
          <Col col='6'>
            <div className={styles.fakeContent}>
              No hay tarjetas registradas
            </div>
          </Col>
        </Row>
      )}
      {!loadingCards && firstCard && (
        <CardBody>
          <Row className='justify-center items-center'>
            <Col col='12' xl='6'>
              <div className={styles.creditCardContent}>
                <CreditCardInput
                  number={firstCard.cardNumber}
                  name={user?.name || ''}
                />
              </div>
            </Col>
            <Col col='12' xl='6'>
              <div
                className={styles.deleteCardContent}
                onClick={handleRemoveCard}
              >
                {isRemovingInscription ? (
                  <>
                    <Spinner variant='secondary' />
                    <div className={styles.text}>Eliminando tarjeta</div>
                  </>
                ) : (
                  <>
                    <BxX size={18} />
                    <div className={styles.text}>Eliminar tarjeta</div>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </CardBody>
      )}
    </Card>
  );
};

export default CreditCard;
