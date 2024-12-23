import { useRef } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import styles from './styles.module.scss';
import { Card, CardBody } from 'components/ui-bx/card';
import { BxUp } from '@bx-design/react-icons';
import {
  frequentQuestion,
  NumberComponent,
  BulletComponent,
} from 'content/frequent-question';
import { MDXComponentsMarkdown } from 'mdx/components';

function FrequentQuestionContent(): JSX.Element {
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
                  <h2 className={styles.h2}>Preguntas frecuentes</h2>
                </Col>
                <Col col='12'>
                  <MDXComponentsMarkdown
                    children={frequentQuestion}
                    options={{
                      overrides: {
                        NumberComponent,
                        BulletComponent,
                      },
                    }}
                  />
                </Col>
              </Row>
              <div className={styles.space}></div>
              <div
                onClick={handlerUp}
                className='flex justify-end cursor-pointer items-center text-bx-lblue font-bold'
              >
                <BxUp size={24} color='#2bb9ff' /> Volver arriba
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </main>
  );
}

export default FrequentQuestionContent;
