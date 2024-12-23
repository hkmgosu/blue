import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import NoPymeAppraisalDashboard from './with-pyme-view/appraisal';
import NoPymeTrackingDashboard from './with-pyme-view/trackingCard';
import NoPymeCompanyDashboard from './no-pyme-view/company';

const Dashboard: FC = () => {
  return (
    <Row>
      <Col col='12' lg='4'>
        <div className='mb-6'>
          <NoPymeAppraisalDashboard />
        </div>
      </Col>
      <Col col='12' lg='4'>
        <div className='mb-6'>
          <NoPymeTrackingDashboard />
        </div>
      </Col>
      <Col col='12' lg='4'>
        <NoPymeCompanyDashboard />
      </Col>
    </Row>
  );
};

export default Dashboard;
