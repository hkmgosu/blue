import { FC, Suspense } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import styles from 'components/authenticated/join-to-business/content.module.scss';
import JoinToBusinessFormSubmit from 'components/authenticated/join-to-business/form-submit';
import JoinToBusinessFormSocialReason from 'components/authenticated/join-to-business/form-social-reason';
import JoinToBusinessSubmit from 'components/authenticated/join-to-business/submit';
import JoinToBusinessGoBack from 'components/authenticated/join-to-business/go-back';
import JoinToBusinessSuccessModal from 'components/authenticated/join-to-business/success-modal';

const JoinToBusinessContent: FC = () => (
  <div className={styles.content}>
    <Row className=' justify-center'>
      <Col col='12' xl='9' xxl='6'>
        <JoinToBusinessFormSubmit>
          <Row className='mb-6'>
            <Col col='12' className='mb-6'>
              <Suspense fallback={<div />}>
                <JoinToBusinessFormSocialReason />
              </Suspense>
            </Col>
            <Col col='12' className='mb-6'>
              <p className={styles.required}>( * ) Campo obligatorio</p>
            </Col>
            <Col col='12' className='mb-6'>
              <Suspense fallback={<div />}>
                <JoinToBusinessSubmit />
              </Suspense>
            </Col>
            <Col col='12'>
              <JoinToBusinessGoBack />
            </Col>
          </Row>
        </JoinToBusinessFormSubmit>
      </Col>
    </Row>
    <JoinToBusinessSuccessModal />
  </div>
);

export default JoinToBusinessContent;
