import { Col, Row } from '@bx-design/react-grid';
import { useRef } from 'react';
import styles from './styles.module.scss';
import { Card, CardBody } from 'components/ui-bx/card';
import { BxUp } from '@bx-design/react-icons';
import { MDXComponentsMarkdown } from 'mdx/components';
import { termsAndConditions } from 'content/terms-and-conditions';

function TermsContent(): JSX.Element {
  const myRef = useRef<HTMLElement>(null);
  const handlerUp = (): void => {
    myRef.current?.parentElement?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main ref={myRef} className={styles.main}>
      <Row>
        <Col col='12'>
          <Card>
            <CardBody>
              <Row>
                <Col col='12' className='mb-4'>
                  <h2 className={styles.h2}>
                    Términos y condiciones del servicio
                  </h2>
                </Col>
                <Col col='12'>
                  <MDXComponentsMarkdown children={termsAndConditions} />
                </Col>
              </Row>
              <div className={styles.space}></div>
              <div
                onClick={handlerUp}
                className='flex justify-end cursor-pointer items-center text-bx-lblue font-bold'
              >
                <BxUp color='#2bb9ff' size={24} /> Volver arriba
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </main>
  );
}

export default TermsContent;
