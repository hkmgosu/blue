import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Row, Col } from '@bx-design/react-grid';

import { trackingSearchValidation } from 'utils/validations/tracking';
import { Card, CardBody } from 'components/ui-bx/card';
import { Feedback, Input, Label } from 'components/ui-bx/forms';
import { Button } from 'components/ui-bx/button';
import styles from './trackingForm.module.scss';

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
        <Row className='items-center'>
          <Col col='12'>
            <Row>
              <h6 className={styles.title}>Realiza tu seguimiento en línea</h6>
            </Row>
            <form onSubmit={handleSubmit}>
              <Label htmlFor='os'>
                Ingresa la orden de seguimiento (<b>OS</b>)
              </Label>
              <Row className='justify-between'>
                <Col col='12' xl='5'>
                  <br />
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
                <Col col='12' xl='5'>
                  <br />
                  <Button type='submit' fullWidth>
                    Buscar
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

const TrackingForm: FC<PropTypes> = ({ withoutPhoto }) => {
  return (
    <div>
      <Row>
        <Col col='12' xl='12'>
          <Card>
            <CardBody padding='dashboard'>
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

export default TrackingForm;
