import { Col } from '@bx-design/react-grid';

import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import UploadFileSection from 'components/new-shipping/layout/massive/upload-file-section';
import Next from 'components/new-shipping/layout/massive/next-massive';
import NewShippingMassiveAssistedFileLoad from './assisted/fileLoad';

function NewShippingMassiveStep2(): JSX.Element {
  return (
    <NewShippingLayoutStep>
      <NewShippingMassiveAssistedFileLoad />
      <Col col='12' className='mb-2 xl:mb-12'>
        <UploadFileSection />
      </Col>
      <Col col='12' className='mb-2 xl:mb-12'>
        <Next />
      </Col>
    </NewShippingLayoutStep>
  );
}

export default NewShippingMassiveStep2;
