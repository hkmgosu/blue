import { ReactNode } from 'react';
import { Row, Col } from '@bx-design/react-grid';

type Props = {
  children: ReactNode;
};

function NewShippingLayoutStep({ children }: Props): JSX.Element {
  return (
    <Row className='justify-center'>
      <Col col='12'>
        <Row>{children}</Row>
      </Col>
    </Row>
  );
}

export default NewShippingLayoutStep;
