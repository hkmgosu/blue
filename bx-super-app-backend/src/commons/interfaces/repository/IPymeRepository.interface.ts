import {
  BillingInformation,
  ConfirmPymeEnum,
} from './../../schemas/pyme.schema';
import { ICrudRepository } from './ICrudRepository.interface';
import { ValidatePymeDoc } from '../../schemas/validate-pyme.schema';
import { Collaborators, PymeDoc } from '../../schemas/pyme.schema';

export const PYME_REPOSITORY = 'PYME_REPOSITORY';

export interface IPymeRepository extends ICrudRepository<PymeDoc> {
  AddCollaborators(
    id: string,
    collaborators: Array<{
      user_id: string;
      status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
    }>,
  ): Promise<PymeDoc>;
  UpdateConfirmPymeBilling(
    pyme_id: string,
    status: ConfirmPymeEnum,
    current_account?: string,
    office?: string,
    customerType?: string,
  ): Promise<PymeDoc>;
  FindCollaborators(pyme_id: string): Promise<Array<Collaborators>>;
  GetPymeByRut(rut: string): Promise<PymeDoc>;
  GetUserPymeInvitationByEmail(user_email: string): Promise<PymeDoc[]>;
  GetVerifiedPyme(pyme_rut: string): Promise<ValidatePymeDoc>;
  IsAdmin(pyme_id: string, user_id: string): Promise<boolean>;
  FindBySocialReason(social_reason: string): Promise<PymeDoc>;
  JoinToPyme(social_reason: string, collaborators: any): Promise<PymeDoc>;
  RegisterPymeV2(pymeInput: {
    social_reason: string;
    email?: string;
    collaborators: Array<{
      user_id: string;
      status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
      is_admin: boolean;
    }>;
    rut?: string;
    shipping_average_weight?: string;
    shipping_type?: string;
    collaborator_quantity: string;
    shipping_quantity: string;
    other_type?: string;
    business_clasification: string;
    is_natural_person: boolean;
  }): Promise<PymeDoc>;
  RegisterPyme(pymeInput: {
    social_reason: string;
    email?: string;
    collaborators: Array<{
      user_id: string;
      status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
      is_admin: boolean;
    }>;
    rut?: string;
    is_natural_person?: boolean;
  }): Promise<PymeDoc>;
  RemoveCollaborator(pymeId: string, userId: string): Promise<PymeDoc>;
  SaveVerifiedPyme(pyme_rut: string, pyme: any): Promise<ValidatePymeDoc>;
  UpdatePymeCollaboratorStatus(
    pyme_id: string,
    user_email: string,
    new_status: string,
  ): Promise<PymeDoc>;
  UpdatePymeCollaborators(
    rut: string,
    collaborators: { firstName: string; lastName: string; email: string }[],
  ): Promise<PymeDoc>;
  UpdatePymeBillingInformation(
    pyme_id: string,
    billing_information: BillingInformation,
  ): Promise<PymeDoc>;
  UserExistInPyme(companyId: string, userId: string): Promise<boolean>;
  ResetAdmin(companyId: string, userId: string): Promise<PymeDoc>;
  findPyme(find: string): Promise<PymeDoc[]>;
}
