import { FC, useState } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import ConfirmMemberDeleteModal from 'pages/authenticated/dashboard/confirm-delete-modal';
import DashboardPymeCollaborators from 'components/authenticated/dashboard/with-pyme-view/pyme-collaborators';
import AppraisalDashboard from './with-pyme-view/appraisal';
import TrackingCardDashboard from './with-pyme-view/trackingCard';

const WithPyme: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const showConfirmModal = (): void => {
    setShowModal(true);
  };

  return (
    <Row>
      <Col col='12' lg='4'>
        <AppraisalDashboard />
        <br />
      </Col>
      <Col col='12' lg='4'>
        <TrackingCardDashboard />
      </Col>
      <Col col='12' lg='4'>
        <DashboardPymeCollaborators onClick={showConfirmModal} />
        <ConfirmMemberDeleteModal
          isOpen={showModal}
          toggle={() => setShowModal(false)}
        />
      </Col>
    </Row>
  );
};

export default WithPyme;
