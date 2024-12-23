import { useCallback } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/terms/modal-terms.module.scss';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'components/ui-bx/modal';
import { MDXComponentsMarkdown } from 'mdx/components';
import { termsAndConditions } from 'content/terms-and-conditions';
import { Button } from 'components/ui-bx/button';
import { useModalTerms } from 'emission-lib/hooks/emission-state';
import { useTerms } from 'emission-lib/hooks/terms';

function NewShippingLayoutModalTerms(): JSX.Element {
  const [bxModalTerms, setBxModalTerms] = useModalTerms();
  const [, setBxTerms] = useTerms();

  const handleAccept = useCallback(() => {
    setBxTerms(true);
    setBxModalTerms(false);
  }, [setBxTerms, setBxModalTerms]);

  return (
    <Modal
      isOpen={bxModalTerms}
      centered
      scrollable
      toggle={() => setBxModalTerms(false)}
      size='xl'
    >
      <ModalHeader closeButton={() => setBxModalTerms(false)}>
        <h2 className={styles.h2}>Términos y condiciones del servicio</h2>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col col='12'>
            <MDXComponentsMarkdown children={termsAndConditions} />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleAccept}>
          Acepto los términos y condiciones
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewShippingLayoutModalTerms;
