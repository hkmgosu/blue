import {
  BillingInformation,
  PymeDoc,
} from '../../../commons/schemas/pyme.schema';
import { CompanyInvitation } from 'src/commons/schemas/invitation.schema';
import { InvitationStatus } from './../../schemas/invitation.schema';
import User from '../../../models/account/user.model';
import VerifiedPyme from '../../../models/pyme/validate-pyme.model';
import { InfoUserResult } from './IAuthenticationService.interface';
import { BaseClientRequest } from './ILegacyService.interface';
import {
  ColaboratorQuantity,
  ShippingQuantity,
} from '../../../models/pyme/register-pyme.model';

export type UsersResult = Array<User>;

export type ValidatePymeRutResult = VerifiedPyme;

export const PYME_SERVICE = 'PYME_SERVICE';

export interface IPymeService {
  SendInvitationUnRegisteredUser(
    company_id: string,
    company_name: string,
    email: string,
  ): Promise<boolean>;
  SendInvitationRegisteredUser(
    company_id: string,
    company_name: string,
    email: string,
  ): Promise<boolean>;
  GetPymeCollaborators?(
    pyme_id: string,
    status: 'ACCEPTED' | 'REJECTED' | 'PENDING',
  ): Promise<UsersResult>;
  createClientRequest(
    pyme: PymeDoc,
    billing: BillingInformation,
    user?: InfoUserResult,
  ): BaseClientRequest;
  SendInvitationToAdminUser(
    company_id: string,
    company_name: string,
    email: string,
  ): Promise<boolean>;
  UpdateCompanyInvitationUser(
    invitation_id: string,
    email: string,
    user_id: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation>;
  FindByStatus(
    invitation_id: string,
    email: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation>;
  ResendCompanyInvitationRegisteredUser(
    invitation_pyme_name: string,
    invitation_email: string,
    invitation_type: 'MEMBER' | 'ADMIN',
  ): Promise<boolean>;
  ResendCompanyInvitationNotRegisteredUser(
    invitation_email: string,
  ): Promise<boolean>;
  generateLegacyId(social_reason: string): string;
  ClasifyPyme(
    shippingQuantity: ShippingQuantity,
    collaboratorNumber: ColaboratorQuantity,
  ): Promise<string>;
}
