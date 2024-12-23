import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import parse from 'html-react-parser';
import { BxX } from '@bx-design/react-icons';

import { useQueryClient } from 'react-query';
import styles from './popup.module.scss';
import globoalert from 'images/globoalert.png';
import danger from 'images/popup/danger.png';
import info from 'images/popup/info.png';
import success from 'images/popup/success.png';
import { usePopup } from 'hooks/popup/use-popup';

const Popup: FC = () => {
  const queryClient = useQueryClient();
  const { popup } = usePopup();

  const handleClick = (): void => {
    queryClient.setQueryData('popup', { ...popup, show: false });
  };

  return (
    <>
      {popup && popup.show && (
        <div
          className={styles.container}
          style={{
            backgroundColor: popup.backgroundColor,
            borderColor: popup.titleColor,
          }}
        >
          <Row className='items-center justify-center'>
            <Col col='1' lg='1' className='order-1'>
              <div className={styles.imgContainer}>
                {popup.type === 'Buenas noticias' && (
                  <img src={success} alt='Alert' className={styles.img} />
                )}
                {popup.type === 'Alerta - precaución' && (
                  <img src={globoalert} alt='Alert' className={styles.img} />
                )}
                {popup.type === 'Éxito' && (
                  <img src={info} alt='Alert' className={styles.img} />
                )}
                {popup.type === 'Problema' && (
                  <img src={danger} alt='Alert' className={styles.img} />
                )}
              </div>
            </Col>
            <Col col='7' lg='3' className='order-2 mb-2 lg:mb-0'>
              <div
                className={styles.title}
                style={{
                  color: popup.titleColor,
                }}
              >
                {popup && popup.title}
              </div>
            </Col>
            <Col col='10' lg='7' className='order-4 lg:order-3'>
              <div
                className={styles.text}
                style={{
                  color: popup.textColor,
                }}
              >
                {parse(popup.description)}
              </div>
            </Col>
            <Col
              col='2'
              lg='1'
              className={`${styles.message} order-3 lg:order-4`}
            >
              <div className={styles.close} onClick={handleClick}>
                <BxX size={16} color={popup.titleColor} />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Popup;
