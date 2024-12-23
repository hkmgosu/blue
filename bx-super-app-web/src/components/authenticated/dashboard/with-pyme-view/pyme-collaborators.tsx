import { FC } from 'react';
import { Col, Row } from '@bx-design/react-grid';
import { compact } from 'lodash';
import { BxPersonCircle } from '@bx-design/react-icons';
// import { useAuth } from 'contexts/auth-context';
import { Card, CardBody } from 'components/ui-bx/card';
import { CollaboratorType } from 'types/auth';
import { usePyme } from 'contexts/pyme/pyme-context';
import styles from 'components/authenticated/dashboard/no-pyme-view/shippings.module.scss';
import stylesCollaborators from './pyme-collaborators.module.scss';
import icon from 'images/icon-colaboradores.png';
import { useEffect } from 'react';
import { useState } from 'react';

type Props = {
  onClick: () => void;
};

const DashboardPymeCollaborators: FC<Props> = ({ onClick }) => {
  const { defaultPyme } = usePyme();
  const [colaborators, setColaborators] = useState<CollaboratorType[]>();

  useEffect(() => {
    if (defaultPyme?.collaborators && defaultPyme.collaborators.length > 2) {
      setColaborators(defaultPyme?.collaborators?.slice(2));
    } else {
      setColaborators(defaultPyme?.collaborators);
    }
  }, [defaultPyme]);

  return (
    <div className={stylesCollaborators.card}>
      <Card>
        <CardBody padding='dashboard'>
          <div className={styles.cardHeightTracking}>
            <Row>
              <Col col='12' xl='12' className='mb-6'>
                <div className={styles.header}>
                  <div className={styles.headerImage}>
                    <img src={icon} alt='list' />
                  </div>
                  <h5 className={styles.title}>Colaboradores de la empresa</h5>
                </div>
              </Col>
              {compact(colaborators || []).map((c) => (
                <Members
                  key={c.email}
                  memberData={c}
                  onClick={onClick}
                  pymeName={defaultPyme ? defaultPyme?.social_reason : ''}
                />
              ))}
            </Row>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

type MembersProps = {
  memberData: CollaboratorType;
  onClick: () => void;
  pymeName: string;
};

const Members: FC<MembersProps> = ({ memberData, pymeName }) => {
  // const { user } = useAuth();

  return (
    <div className={stylesCollaborators.containerMember}>
      <div className={stylesCollaborators.contentIcon}>
        <BxPersonCircle color='var(--bx-color-orange)' size='1.2rem' />
      </div>
      <div className={stylesCollaborators.name}>
        <div>
          {memberData.firstName} {memberData.lastName}
        </div>
        <div className={stylesCollaborators.bold}>{pymeName}</div>
      </div>

      {/* {user && user.sub === memberData.id && (
        <div onClick={onClick} className={stylesCollaborators.icon}>
          <BxTrash />
        </div>
      )} */}
      <hr />
    </div>
  );
};

export default DashboardPymeCollaborators;
