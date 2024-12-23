import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Row, Col } from '@bx-design/react-grid';

import { trackingSearchValidation } from 'utils/validations/tracking';
import { Card, CardBody } from 'components/ui-bx/card';
import { Feedback, Input } from 'components/ui-bx/forms';
import { Button } from 'components/ui-bx/button';
import tracking from 'images/tracking.png';
import styles from './tracing.module.scss';

type TrackingFormType = {
  os: string;
};

type PropTypes = {
  withoutPhoto?: boolean;
};

const Form: FC<PropTypes> = () => {
  const history = useHistory();

  function submitHandler(values: TrackingFormType): void {
    if (values.os) {
      history.push(`/tracking/${values.os}`);
    }
  }

  return (
    <Formik
      onSubmit={submitHandler}
      validationSchema={trackingSearchValidation}
      initialValues={{ os: '' }}
    >
      {({
        errors,
        values,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <Row>
          <Col col='12'>
            <h6 className={styles.title}>Realiza tu seguimiento en línea</h6>
          </Col>
          <Col col='12' lg='5' xxl='4'>
            <div className={styles.imgContainer}>
              <img className={styles.img} src={tracking} alt='Tracking' />
            </div>
          </Col>
          <Col col='12' lg='7' xxl='8'>
            <p className={styles.text}>Ingresa la orden de seguimiento (OS)</p>
            <form onSubmit={handleSubmit}>
              <Col col='12'>
                <Input
                  type='text'
                  id='os'
                  name='os'
                  value={values.os}
                  onChange={handleChange}
                  placeholder='123465789'
                  onBlur={handleBlur}
                />
                <Feedback
                  type={'invalid'}
                  isActive={Boolean(errors.os && touched.os)}
                >
                  {touched.os && errors.os}
                </Feedback>
              </Col>
              <br />
              <Col col='12'>
                <Button type='submit' fullWidth>
                  Buscar
                </Button>
              </Col>
            </form>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

const TracingDashboard: FC<PropTypes> = ({ withoutPhoto }) => {
  return (
    <div>
      <Row>
        <Col col='12' xl='12'>
          <Card>
            <CardBody>
              <Row className='items-center'>
                <Col col='12'>
                  <Form withoutPhoto={withoutPhoto} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TracingDashboard;
