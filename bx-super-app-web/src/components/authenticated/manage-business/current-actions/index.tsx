import { useState } from 'react';

import { usePyme } from 'contexts/pyme/pyme-context';
import ManageBusinessCurrentActionsItem from '../current-actions-item';
import ManageBusinessInviteModal from '../invite-modal';
import ManageBusinessAssignModal from '../assign-modal';
import ManageBusinessCurrentActionDelete from '../current-action-delete';

type Props = {
  pymeId: string;
  userId: string;
};

export default function ManageBusinessCurrentActions({
  pymeId,
  userId,
}: Props): JSX.Element {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const { pymeList } = usePyme();
  const pyme = pymeList?.find((pym) => pym.id === pymeId);
  const role = pyme?.collaborators?.find(
    (coll) => coll.id === userId
  )?.is_admin;

  if (role) {
    return (
      <>
        <ManageBusinessCurrentActionsItem
          title='Invita un nuevo integrante a tu equipo'
          description='Agrega nuevos integrantes a tu equipo de trabajo.'
          icon='INVITE'
          buttonText='Invitar'
          onClick={() => setInviteModalOpen(true)}
        />
        <ManageBusinessCurrentActionsItem
          title='Asigna un nuevo administrador'
          description='Al asignar a otra persona como administrador, pierdes este rol y se te asigna uno nuevo como Integrante.'
          icon='ASSIGN'
          buttonText='Asignar'
          onClick={() => setAssignModalOpen(true)}
        />
        <ManageBusinessInviteModal
          isOpen={inviteModalOpen}
          handleClose={() => setInviteModalOpen(false)}
          pymeId={pymeId}
        />
        <ManageBusinessAssignModal
          isOpen={assignModalOpen}
          handleClose={() => setAssignModalOpen(false)}
          pymeId={pymeId}
        />
      </>
    );
  }
  return <ManageBusinessCurrentActionDelete pymeId={pymeId} userId={userId} />;
}
