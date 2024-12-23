/**
 * @todo migrar esta logica a upload-file-section, Aqui es redundante
 */
import { useEffect } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import NewShippingFormShippingBack from 'components/new-shipping/form/shipping/back';
import { SendMassiveFileAndOrigin } from 'api/emissions/massive';
import { Button } from 'components/ui-bx/button';
import { useStep } from 'emission-lib/hooks/emission-state';
import {
  useMassiveError,
  useMassiveInputFile,
  useMassiveIsLoading,
  useMassiveIsSuccess,
  useMassivePackageDangerous,
  useMassiveTable,
} from 'emission-lib/hooks/massive';
import { useOrigin } from 'emission-lib/hooks/origin';
import { useEmitter } from 'emission-lib/hooks/emitter/use-emitter';

function NewMassiveShippingNext(): JSX.Element {
  const [step, setStep] = useStep();
  const [file] = useMassiveInputFile();
  const [loading, setLoading] = useMassiveIsLoading();
  const [isDangerous] = useMassivePackageDangerous();
  const [, setError] = useMassiveError();
  const [isSuccess, setSuccess] = useMassiveIsSuccess();
  const [origin] = useOrigin();
  const emitter = useEmitter();
  const [, setMassiveTable] = useMassiveTable();

  useEffect(() => {
    if (isSuccess) {
      setStep(step + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, setStep]);

  const handleClick = async (): Promise<void> => {
    if (isSuccess) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await SendMassiveFileAndOrigin({
        emitter: {
          pyme_id: emitter.pyme_id,
          email: emitter.email,
          phone: emitter.phone,
        },
        origin: `"${origin.address.commune.location_code}"`,
        file: file as File,
      });
      if (res) {
        setMassiveTable(res);
        setSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <Row className='justify-center'>
      <Col xl='12'>
        <Row className='xl:items-center'>
          <Col xl='6'>
            <NewShippingFormShippingBack />
          </Col>
          <Col xl='6'>
            <Row className='xl:justify-end'>
              <Col xl='5'>
                <Button
                  fullWidth
                  onClick={handleClick}
                  disabled={file && isDangerous ? isSuccess || loading : true}
                  isLoading={loading}
                >
                  Siguiente
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default NewMassiveShippingNext;
