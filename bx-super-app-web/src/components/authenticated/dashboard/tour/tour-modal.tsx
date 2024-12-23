import { FC, useCallback, useEffect, useState } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import { userUpdateFirstLoginApi } from 'api/user';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import TourCarouselModal from './tour-carousel';
import FirstLayer from './tour-components/first-layer';
import SecondLayer from './tour-components/second-layer';
import ThirdLayer from './tour-components/third-layer';
import { Button } from 'components/ui-bx/button';
import bgMain from 'images/tour/backgroundmain.png';
import bg1 from 'images/tour/background2tour.png';
import bg2 from 'images/tour/background3tour.png';
import styles from './tour-modal.module.scss';

type TourModalProps = {
  isOpen: boolean;
  toggle: () => void;
};

const TourModal: FC<TourModalProps> = ({ isOpen, toggle }) => {
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(0);
  const [image, setImage] = useState(bgMain);
  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const handleClick = async (): Promise<void> => {
    const firstLogin = false;
    setLoading(true);
    try {
      await userUpdateFirstLoginApi({
        firstLogin: firstLogin,
      }).then(() => {
        setLoading(false);
        toggle();
      });
    } catch (error) {
      toggle();
    }
  };

  useEffect(() => {
    if (show === 2) {
      setImage(bg2);
    }
    if (show === 1) {
      setImage(bg1);
    }
    if (show === 0) {
      setImage(bgMain);
    }
  }, [show]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {}}
      backdrop='static'
      centered
      keyboard={false}
      size='lg'
    >
      <div>
        <img className={styles.img} src={image} alt='' />
      </div>
      <ModalBody>
        <Row>
          <Col col='12' ref={measuredRef}>
            <TourCarouselModal width={width} handleButtonActive={setShow}>
              <div>
                <FirstLayer />
              </div>
              <div>
                <SecondLayer />
              </div>
              <div>
                <ThirdLayer />
              </div>
            </TourCarouselModal>
          </Col>
        </Row>
        <Row>
          <Col col='12' xl='12'>
            {!show ? (
              <button className={styles.outLink} onClick={toggle}>
                Salir del tour
              </button>
            ) : (
              <div className={styles.buttonContainer}>
                <Button onClick={handleClick} isLoading={loading}>
                  Comenzar
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default TourModal;
