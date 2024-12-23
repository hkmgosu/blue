import { Row, Col } from '@bx-design/react-grid';

import NewShippingFormShippingBack from 'components/new-shipping/form/shipping/back';
import { Button } from 'components/ui-bx/button';
import {
  useMultiSelectedTab,
  useNextModalOpen,
  useStep,
} from 'emission-lib/hooks/emission-state';
import {
  useShippings,
  useShippingSelected,
  useShippingsIds,
} from 'emission-lib/hooks/shipping';
import { useEmissionDtoIsValid } from 'emission-lib/hooks/dto';
import NewShippingLayoutAddShipping from '../add-shipping';
import { useMultiEmissionIsValid } from 'emission-lib/hooks/errors';

type Props = {
  isMassive?: boolean;
};

function NewShippingLayoutCurrentItemNextMulti({
  isMassive,
}: Props): JSX.Element {
  const [, setStep] = useStep();
  const shippingIds = useShippingsIds();
  const isValidComplete = useEmissionDtoIsValid();
  const [, setIsOpen] = useNextModalOpen();
  const [shippingAtoms] = useShippings();
  const [selected, setSelected] = useShippingSelected();
  const [isValid] = useMultiEmissionIsValid();
  const [tab, selecTab] = useMultiSelectedTab();

  const goNextShipping = (): void => {
    const currentId = shippingIds.indexOf(selected);
    if (isValid) {
      if (
        shippingIds.indexOf(selected) < shippingAtoms.length &&
        shippingIds[currentId + 1] !== undefined &&
        isValid
      ) {
        setSelected(shippingIds[currentId + 1]);
      } else {
        setSelected(shippingIds[0]);
      }
    } else {
      if (tab === 1) {
        selecTab(2);
        window.scrollTo(0, 0);
      }
      if (tab === 2) {
        selecTab(1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleClick = (): void => {
    window.scrollTo(0, 0);
    if (!isMassive) {
      setIsOpen(true);
    } else {
      setStep(4);
    }
  };

  return (
    <>
      <Row className='justify-center'>
        <Col xl='12'>
          <Row className='xl:items-center'>
            <Col xl='2'>
              <NewShippingFormShippingBack />
            </Col>
            <Col xl='4'>
              <NewShippingLayoutAddShipping />
            </Col>
            <Col xl='3'>
              <Row className='xl:justify-end'>
                <Col xl='12'>
                  <Button
                    onClick={goNextShipping}
                    fullWidth
                    disabled={isValid && isValidComplete && tab === 2}
                  >
                    Siguiente
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xl='3'>
              <Button
                fullWidth
                disabled={!isValidComplete}
                onClick={handleClick}
              >
                Finalizar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default NewShippingLayoutCurrentItemNextMulti;
