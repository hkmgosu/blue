import {
  CompanyInvitation,
  InvitationStatus,
  InvitationType,
} from './../../schemas/invitation.schema';

export const COMPANY_INVITATION_REPOSITORY = 'COMPANY_INVITATION_REPOSITORY';

export interface ICompanyInvitationRepository {
  findById(invitation_id: string): Promise<CompanyInvitation>;
  findByIdAndStatus(
    invitation_id: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation>;
  deleteById(invitation_id: string): Promise<CompanyInvitation>;
  addInvitation(
    pyme_id: string,
    pyme_name: string,
    email: string,
    status: InvitationStatus,
    invitationType: InvitationType,
  ): Promise<CompanyInvitation>;
  updateInvitation(
    pyme_id: string,
    email: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation>;
  findByStatus(
    pyme_id: string,
    email: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation>;
  findAllByEmailAndStatus(
    email: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation[]>;
  findAllByPymeAndStatus(
    pyme_id: string,
    status: InvitationStatus,
    type: InvitationType,
  ): Promise<CompanyInvitation[]>;
}
