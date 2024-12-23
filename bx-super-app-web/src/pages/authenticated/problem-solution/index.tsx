import { Row, Col } from '@bx-design/react-grid';
import { BxLogOut } from '@bx-design/react-icons';
import ProblemSolutionView from 'components/authenticated/compensation/problem-solution';
import { Page } from 'components/layout';
import AuthenticatedLayout from 'components/layout/authenticated-layout';

import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

export default function ProblemSolutionPage(): JSX.Element {
  const history = useHistory();

  return (
    <Page title='Solucion de problemas | BlueEnvío by BlueExpress'>
      <AuthenticatedLayout>
        <div className={styles.TipsMain}>
          <Row className='mb-2 lg:mb-6'>
            <Col lg='2'>
              <Row className='justify-start items-center'>
                <div className={styles.outContainer}>
                  <BxLogOut size={16} />
                  <div
                    className={styles.outText}
                    onClick={() => history.push('/dashboard')}
                  >
                    Salir
                  </div>
                </div>
              </Row>
            </Col>
            <Col lg='2'></Col>
          </Row>
          <Row>
            <Col col='12'>
              <ProblemSolutionView />
            </Col>
          </Row>
        </div>
      </AuthenticatedLayout>
    </Page>
  );
}
