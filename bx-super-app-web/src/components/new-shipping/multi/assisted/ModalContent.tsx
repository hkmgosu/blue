import { Col, Row } from '@bx-design/react-grid';
import { Card, CardBody } from 'components/ui-bx/card';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import AssistedButtons from './buttons';
import styles from './index.module.scss';
import { useMediaQuery } from 'react-responsive';
import Fade from 'components/ui-bx/utils/fade';
import cx from 'clsx';

export type TextsType = {
  step: number;
  title: string;
  text: string;
};
type Props = {
  isOpen: boolean;
  texts: TextsType[];
  imagesList: JSX.Element[];
  step: number;
  setStep: (step: number) => void;
  totalSteps: number;
  assistModalOpen: boolean;
  setAssistModalOpen: (isOpen: boolean) => void;
  shippingStep?: number;
  imagesLeft?: number[];
  imagesSmall?: number[];
};

function ModalContent({
  isOpen,
  texts,
  imagesList,
  step,
  setStep,
  totalSteps,
  setAssistModalOpen,
  imagesLeft,
}: // imagesSmall,
Props): JSX.Element {
  function TextBody(): JSX.Element {
    const s = texts.find((t) => t.step === step);
    return (
      <Fade in appear unmountOnExit>
        <h4 className={styles.title}>{s?.title}</h4>
        <p className={styles.justify}>{s?.text}</p>
      </Fade>
    );
  }

  function ImageBody(): JSX.Element {
    return imagesList[step - 1];
  }
  const isMobile = useMediaQuery({
    maxDeviceWidth: 680,
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => setAssistModalOpen(false)}
      transparent
      centered
      size={'xl'}
      scrollable
    >
      <ModalBody>
        <Row className='items-center'>
          {!isMobile && (
            <Col
              col='6'
              className={cx(imagesLeft?.includes(step) ? 'order-1' : 'order-2')}
            >
              <Card>
                <CardBody>
                  <div className={styles.centered}>
                    <ImageBody />
                  </div>
                </CardBody>
              </Card>
            </Col>
          )}

          <Col col={isMobile ? '12' : '6'}>
            <Card>
              <CardBody padding='dashboard'>
                {isMobile && <ImageBody />}
                <TextBody />
                <small>
                  {step} de {totalSteps}
                </small>
                <br />
                <Row className='items-center mt-4'>
                  <AssistedButtons
                    step={step}
                    totalSteps={totalSteps}
                    setStep={setStep}
                    setAssistModalOpen={setAssistModalOpen}
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default ModalContent;
