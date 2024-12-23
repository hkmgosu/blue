import { useAuth } from 'contexts/auth-context';
import DashboardInvitationsCollaboratorModal from './collaborator-modal';

export default function DashboardInvitations(): JSX.Element {
  const { user } = useAuth();

  const collaboratorInvitation = user?.invitations;

  return (
    <>
      {collaboratorInvitation && collaboratorInvitation.length > 0 && (
        <DashboardInvitationsCollaboratorModal isOpen={true} />
      )}
    </>
  );
}
