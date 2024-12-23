import { FC, useEffect, useMemo, useState } from 'react';
import { Row, Col, Container } from '@bx-design/react-grid';
// import { BxTrash } from '@bx-design/react-icons';
import { compact } from 'lodash';
import { useMediaQuery } from 'react-responsive';

import { useAvatar } from 'contexts/avatar-context';
import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import Table from 'components/utils/table';
import type { CollaboratorType } from 'types/auth';
import { Checkbox } from 'components/ui-bx/forms';
import styles from './pyme-members.module.scss';
import RemoveModal from './remove-modal';
import { useAuth } from 'contexts/auth-context';
import { Card, CardBody } from 'components/ui-bx/card';
import { useParams } from 'react-router-dom';

type MemberType = CollaboratorType & {
  avatar: string;
};
type ParamType = {
  id: string;
};

const PymeMembers: FC = () => {
  const { id } = useParams<ParamType>();
  const isMobile = useMediaQuery({
    maxDeviceWidth: 680,
  });
  const [selectedUser, setSelectedUser] = useState('');
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [selectRemoveUser] = useState({
    pymeId: '',
    pymeName: '',
    userId: '',
    name: '',
  });
  const { user } = useAuth();
  const avatarImage = useAvatar();

  const defaultPyme = user?.pymes.find((p) => p.id === id);

  useEffect(() => {
    const loggedUser =
      defaultPyme?.collaborators &&
      defaultPyme?.collaborators.find((c) => c.id === user?.sub);
    if (loggedUser?.is_admin) {
      setIsUserAdmin(true);
    }
  }, [defaultPyme, user]);

  const members = useMemo<MemberType[]>(() => {
    return compact(
      (defaultPyme?.collaborators || []).map((member) => ({
        ...member,
        avatar: avatarImage.RandomAvatar(),
      }))
    );
  }, [avatarImage, defaultPyme?.collaborators]);

  const columns = useMemo(
    () => [
      {
        id: 'selection',
        Header: () => <></>,
        disableSortBy: true,
        Cell: ({ row: { original } }: { row: { original: MemberType } }) => {
          const handleChange = (): void => {
            if (!original.is_admin) {
              setSelectedUser(original.id);
            }
          };
          return (
            <Checkbox
              onChange={handleChange}
              checked={selectedUser === original.id}
              disabled={original.is_admin}
            />
          );
        },
      },
      {
        id: 'fullName',
        Header: 'Nombre',
        accessor: (row: MemberType) => (
          <div className={styles.ContentAvatar}>
            <img className={styles.TableAvatar} src={row.avatar} alt='Avatar' />
            <span>{row.firstName + ' ' + row.lastName}</span>
          </div>
        ),
      },
      {
        id: 'dateId',
        Header: 'Fecha de ingreso',
        accessor: (row: MemberType) => {
          return new Date(row.createdTimestamp).toLocaleDateString('es-ES');
        },
      },
      {
        Header: 'Email',
        accessor: 'username',
      },
      {
        Header: 'Teléfono',
        accessor: 'phone',
      },
      {
        id: 'rol',
        Header: 'Rol',
        accessor: 'is_admin',
        Cell: ({ value }: { value: boolean }) => {
          if (value) {
            return <span className={styles.BadgeAdmin}>Administrador</span>;
          }
          return <span className={styles.BadgeMember}>Integrante</span>;
        },
      },
      {
        id: 'actions',
        Header: '',
        // eslint-disable-next-line no-empty-pattern
        Cell: ({ row: {} }: { row: { original: MemberType } }) => {
          // const handleClick = (): void => {
          //   if (defaultPyme) {
          //     setSelectRemoveUser({
          //       pymeId: defaultPyme.id,
          //       pymeName: defaultPyme.social_reason,
          //       userId: original.id,
          //       name: `${original.firstName} ${original.lastName}`,
          //     });
          //     setRemoveModalOpen(true);
          //   }
          // };
          if (isUserAdmin) {
            // return (
            //   <button
            //     className={styles.ButtonRemove}
            //     onClick={handleClick}
            //     disabled={original.is_admin}
            //   >
            //     <BxTrash color='var(--bx-color-lblue-our)' />
            //   </button>
            // );
          }
          return <></>;
        },
      },
    ],
    [selectedUser, isUserAdmin]
  );

  return (
    <Page title='Miembros de la Empresa'>
      <AuthenticatedLayout>
        <main className={styles.Main}>
          <Container>
            <Row className='justify-start'>
              <Col col='12'>
                <h1 className={styles.Title}>Integrantes</h1>
              </Col>
            </Row>
            <Row>
              <Col col='12'>
                <div className={styles.TableContainer}>
                  {isMobile ? (
                    <>
                      <Card>
                        <CardBody>
                          {members.map((memb, membIndex) => {
                            // const handleClick = (): void => {
                            //   if (defaultPyme) {
                            //     setSelectRemoveUser({
                            //       pymeId: defaultPyme.id,
                            //       pymeName: defaultPyme.social_reason,
                            //       userId: memb.id,
                            //       name: `${memb.firstName} ${memb.lastName}`,
                            //     });
                            //     setRemoveModalOpen(true);
                            //   }
                            // };
                            return (
                              <div className={styles.MobileBox} key={memb.id}>
                                <div className={styles.MobileBoxMember}>
                                  <div className={styles.MobileAvatarBox}>
                                    <div className={styles.ContentAvatar}>
                                      <img
                                        className={styles.MobileAvatar}
                                        src={memb.avatar}
                                        alt='Avatar'
                                      />
                                    </div>
                                  </div>
                                  <div className={styles.MobileContent}>
                                    <div className={styles.MobileTitle}>
                                      {memb.firstName} {memb.lastName}
                                    </div>
                                    <div className={styles.MobileBadge}>
                                      {memb.is_admin ? (
                                        <span className={styles.BadgeAdmin}>
                                          Administrador
                                        </span>
                                      ) : (
                                        <span className={styles.BadgeMember}>
                                          Integrante
                                        </span>
                                      )}
                                    </div>
                                    <div className={styles.MobileEmail}>
                                      {memb.email}
                                    </div>
                                    {memb.phone && <div>{memb.phone}</div>}
                                  </div>
                                  <div>
                                    {/* {isUserAdmin && (
                                      <button
                                        className={styles.ButtonRemove}
                                        onClick={handleClick}
                                        disabled={memb.is_admin}
                                      >
                                        <BxTrash color='var(--bx-color-lblue-our)' />
                                      </button>
                                    )} */}
                                  </div>
                                </div>
                                {members.length !== membIndex + 1 && (
                                  <div className={styles.MobileLine} />
                                )}
                              </div>
                            );
                          })}
                        </CardBody>
                      </Card>
                    </>
                  ) : (
                    <Table
                      columns={columns}
                      data={members}
                      paginate
                      countTitle='Miembros'
                      withSearch
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
          <RemoveModal
            isOpen={removeModalOpen}
            selectRemoveUser={selectRemoveUser}
            handleModalClose={() => setRemoveModalOpen(false)}
          />
        </main>
      </AuthenticatedLayout>
    </Page>
  );
};

export default PymeMembers;
