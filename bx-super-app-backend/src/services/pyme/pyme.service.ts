import {
  COMPANY_INVITATION_REPOSITORY,
  ICompanyInvitationRepository,
} from './../../commons/interfaces/repository/ICompanyInvitationRepository.interface';
import {
  INotificationService,
  NOTIFICATION_SERVICE,
} from './../../commons/interfaces/service/INotificationService.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import User from '../../models/account/user.model';
import {
  AUTHENTICATION_SERVICE,
  IAuthenticationService,
  InfoUserResult,
  IPymeRepository,
  IPymeService,
  IUserRepository,
  PYME_REPOSITORY,
  USER_REPOSITORY,
} from '../../commons/interfaces';

import { BillingInformation, PymeDoc } from '../../commons/schemas/pyme.schema';
import { BaseClientRequest } from '../../commons/interfaces/service/ILegacyService.interface';
import {
  CompanyInvitation,
  InvitationStatus,
  InvitationType,
} from '../../commons/schemas/invitation.schema';
import { Types } from 'mongoose';
import BLUE_BILLING from '../../utils/bluex-billing';
import {
  ColaboratorQuantity,
  ShippingQuantity,
} from '../../models/pyme/register-pyme.model';

const shipping = {
  BEGINNER: 1,
  '10_TO_49': 2,
  '50_TO_100': 3,
  '101_TO_300': 4,
  '301_TO_500': 5,
  '501_TO_1000': 6,
  '1001_TO_5000': 7,
  MORE_5000: 8,
};

const collaborator = {
  '0_TO_10': 1,
  '11_TO_50': 2,
  '51_TO_400': 3,
  '401_TO_1000': 4,
  MORE_1000: 5,
};

@Injectable()
class PymeService implements IPymeService {
  constructor(
    @Inject('ConfigService') private readonly config: ConfigService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PYME_REPOSITORY)
    private readonly pymeRepository: IPymeRepository,
    @Inject(COMPANY_INVITATION_REPOSITORY)
    private readonly companyInvitationRepository: ICompanyInvitationRepository,
  ) {}

  private async findInvitationById(invitation_id: string) {
    return this.companyInvitationRepository.findById(invitation_id);
  }

  async ClasifyPyme(
    shippingQuantity: ShippingQuantity,
    collaboratorNumber: ColaboratorQuantity,
  ): Promise<string> {
    const shippingNum = shipping[shippingQuantity];
    const collaboratorNum = collaborator[collaboratorNumber];

    if (collaboratorNum > 3 || shippingNum > 4) {
      return 'CREDIT_LINE';
    } else {
      return 'PREPAID';
    }
  }

  async FindByStatus(
    invitation_id: string,
    email: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation> {
    return this.companyInvitationRepository.findByStatus(
      invitation_id,
      email,
      status,
    );
  }
  async UpdateCompanyInvitationUser(
    invitation_id: string,
    user_id: string,
    email: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation> {
    const invitation = await this.findInvitationById(invitation_id);

    if (!invitation) {
      throw new Error('No invitation found error');
    }

    if (status === InvitationStatus.ACCEPTED) {
      switch (invitation.invitationType) {
        case InvitationType.ADMIN:
          await this.pymeRepository.ResetAdmin(invitation.pyme_id, user_id);
          break;
        case InvitationType.COLLABORATOR:
          await this.authenticationService.AddRole(user_id, 'pyme');
          await this.userRepository.AddRole(user_id, 'pyme');
          await this.userRepository.AcceptPymeInvitation(
            user_id,
            invitation.pyme_id,
          );
          await this.userRepository.AddDefaultPyme(
            user_id,
            new Types.ObjectId(invitation.pyme_id),
          );
          await this.pymeRepository.AddCollaborators(invitation.pyme_id, [
            {
              user_id: user_id,
              status: 'ACCEPTED',
            },
          ]);
          break;
        default:
          throw new Error('Invitation Type Not Found');
      }
    }
    return this.companyInvitationRepository.updateInvitation(
      invitation_id,
      email,
      status,
    );
  }

  async SendInvitationToAdminUser(
    company_id: string,
    company_name: string,
    email: string,
  ) {
    await this.addInvitationCompanyToUser(
      company_id,
      company_name,
      email,
      InvitationType.ADMIN,
    );
    const resSendEmail = await this.notificationService.SendEmail({
      to: [{ email: email }],
      templateId: '19',
      params: {
        PYME: company_name,
      },
    });
    if (resSendEmail) {
      return true;
    } else {
      return false;
    }
  }

  async ResendCompanyInvitationRegisteredUser(
    invitation_pyme_name: string,
    invitation_email: string,
    invitation_type: 'MEMBER' | 'ADMIN',
  ): Promise<boolean> {
    if (invitation_type === 'MEMBER') {
      await this.notificationService.SendEmail({
        to: [{ email: invitation_email }],
        templateId: '17',
        params: {
          PYME: invitation_pyme_name,
        },
      });
    }
    if (invitation_type === 'ADMIN') {
      await this.notificationService.SendEmail({
        to: [{ email: invitation_email }],
        templateId: '19',
        params: {
          PYME: invitation_pyme_name,
        },
      });
    }
    return true;
  }

  async ResendCompanyInvitationNotRegisteredUser(
    invitation_email: string,
  ): Promise<boolean> {
    await this.notificationService.SendEmail({
      to: [{ email: invitation_email }],
      templateId: '18',
    });
    return true;
  }

  async SendInvitationUnRegisteredUser(
    company_id: string,
    company_name: string,
    email: string,
  ): Promise<boolean> {
    await this.addInvitationCompanyToUser(company_id, company_name, email);
    await this.notificationService.SendEmail({
      to: [{ email: email }],
      templateId: '18',
    });

    return true;
  }
  async SendInvitationRegisteredUser(
    company_id: string,
    company_name: string,
    email: string,
  ): Promise<boolean> {
    await this.addInvitationCompanyToUser(
      company_id,
      company_name,
      email,
      InvitationType.COLLABORATOR,
    );

    await this.notificationService.SendEmail({
      to: [{ email: email }],
      templateId: '17',
      params: {
        PYME: company_name,
      },
    });

    return true;
  }

  private async addInvitationCompanyToUser(
    company_id: string,
    company_name: string,
    email: string,
    invitationType: InvitationType = InvitationType.COLLABORATOR,
  ) {
    await this.companyInvitationRepository.addInvitation(
      company_id,
      company_name,
      email,
      InvitationStatus.PENDING,
      invitationType,
    );
  }

  async GetPymeCollaborators(
    pyme_id: string,
    status: 'ACCEPTED' | 'REJECTED' | 'PENDING',
  ): Promise<Array<User>> {
    const collaborators = await this.pymeRepository.FindCollaborators(pyme_id);
    const acceptedCollabs = collaborators.filter(
      (collab) => collab.status === status,
    );
    const userPromises = acceptedCollabs.map(async (collab) => {
      const result = await this.authenticationService.FindByUserId(
        collab.user_id,
      );
      if (result.isSuccess) {
        return result.user;
      }
    });
    return Promise.all(userPromises).then((res) => {
      return res;
    });
  }

  createClientRequest(
    pyme: PymeDoc,
    billing: BillingInformation,
    user?: InfoUserResult,
  ): BaseClientRequest {
    return {
      calle: (billing?.address ? billing.address : BLUE_BILLING.address)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .substr(0, 20),
      numero: (billing?.address_number
        ? billing.address_number
        : BLUE_BILLING.address_number
      ).substr(0, 6),
      codigoCliente: billing.rut.split('-')[0].substr(0, 9),
      dvCliente: billing.rut.split('-')[1],
      ciudad: (billing?.city_name ? billing.city_name : BLUE_BILLING.city_name)
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .substr(0, 20),
      comuna: (billing?.commune?.name
        ? billing.commune.name
        : BLUE_BILLING.commune.name
      )
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .substr(0, 20),
      codigoCiudad: billing?.commune?.base_post
        ? billing.commune.base_post
        : BLUE_BILLING.commune.base_post,
      codigoComuna: (billing?.commune?.code
        ? billing.commune.code
        : BLUE_BILLING.commune.code
      ).toLocaleUpperCase(),
      codigoPostal: (billing?.postal_code
        ? billing.postal_code
        : BLUE_BILLING.postal_code
      ).substr(0, 8),
      email: billing.email.substr(0, 50),
      nombreCliente: pyme.social_reason
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .substr(0, 50),
      nombreContacto: (user ? user.name : billing.contact_name)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .substr(0, 50),
      fonoContacto: (billing?.phone
        ? billing.phone
        : user?.phone
        ? user.phone
        : BLUE_BILLING.phone
      )
        .normalize('NFD')
        .replace(/[^0-9]/g, '')
        .substr(0, 20),
    };
  }

  generateLegacyId(socialReasonName: string): string {
    return `${socialReasonName
      .toUpperCase()
      .trim()
      .replace(' ', '')
      .substr(0, 8)}.${Math.floor(Math.random() * 900000) + 100000}`;
  }
}

export default PymeService;
