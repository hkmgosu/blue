import { Col, Row } from '@bx-design/react-grid';
import { useRef } from 'react';
import styles from './styles.module.scss';
import { Card, CardBody } from 'components/ui-bx/card';
import { MDXComponentsMarkdown } from 'mdx/components';
import { privacyPolicies } from 'content/privacy-policies';

function PoliciesContent(): JSX.Element {
  const myRef = useRef<HTMLElement>(null);

  return (
    <main ref={myRef} className={styles.main}>
      <Row className='my-12'>
        <Col col='12'>
          <Card>
            <CardBody>
              <Row>
                <Col col='12' className='mb-4'>
                  <h2 className={styles.h2}>Políticas de Privacidad</h2>
                </Col>
                <Col col='12'>
                  <MDXComponentsMarkdown children={privacyPolicies} />
                </Col>
              </Row>
              <div className={styles.space}></div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </main>
  );
}

export default PoliciesContent;
