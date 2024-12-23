import { Response } from 'express';
import {
  InvitationStatus,
  InvitationType,
} from './../commons/schemas/invitation.schema';
import { LegacyClientResult } from './../commons/interfaces/service/ILegacyService.interface';
import ILegacyService, {
  BaseClientRequest,
  LEGACY_SERVICE,
} from '../commons/interfaces/service/ILegacyService.interface';
import {
  Controller,
  HttpStatus,
  Res,
  Post,
  Body,
  Inject,
  Get,
  Param,
  Query,
  Put,
  ForbiddenException,
  BadRequestException,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import RegisterPymeModel from '../models/pyme/register-pyme.model';
import JoiToPymeModel from '../models/pyme/join-to-pyme.model';
import { Authorize } from '../commons/decorators/authorize.decorator';
import {
  IPymeRepository,
  PYME_REPOSITORY,
} from '../commons/interfaces/repository/IPymeRepository.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../commons/interfaces/repository/IUserRepository.interface';
import {
  AUTHENTICATION_SERVICE,
  IAuthenticationService,
  InfoUserResult,
  IPymeService,
  PYME_SERVICE,
} from '../commons/interfaces';
import { User } from '../commons/decorators';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { BillingInformation } from '../commons/schemas/pyme.schema';
import InviteCompanyModel from '../models/pyme/invite-company.model';
import {
  AnswerInvitationPymeEnum,
  AnswerInvitationPymeModel,
} from '../models/pyme/answer-invitation-pyme.model';
import { COMPANY_INVITATION_REPOSITORY } from '../commons/interfaces/repository/ICompanyInvitationRepository.interface';
import { CompanyInvitationRepository } from '../repository/companyInvitation.repository';
import InviteCompanyAdminModel from '../models/pyme/invite-company-admin.model';
import ResendInviteCompanyModel, {
  InvitationTypeEnum,
} from '../models/pyme/resend-invite-company.model';
import FindPymeModel from '../models/pyme/find-pyme.model';
import PymeBankInformation from '../models/pyme/pyme-bank-information.model';
import UpdatePymeModel from '../models/pyme/update-pyme.model';

@Authorize()
@ApiTags('Pyme')
@Controller('/api/pyme2c/backend/v1/pyme')
export class PymeControllerV2 {
  constructor(
    @Inject(PYME_SERVICE)
    private readonly pymeService: IPymeService,
    @Inject(PYME_REPOSITORY)
    private readonly pymeRepository: IPymeRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(COMPANY_INVITATION_REPOSITORY)
    private readonly companyInvitationRepository: CompanyInvitationRepository,
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    private readonly i18n: I18nRequestScopeService,
    @Inject(LEGACY_SERVICE)
    private readonly legacyClientService: ILegacyService,
  ) {}

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Get Pyme By Id' })
  @Get('/:id')
  @ApiOperation({ summary: 'Get Pyme By Id' })
  async getPyme(@Param('id') id: string, @Res() res: any) {
    return res
      .status(HttpStatus.OK)
      .send(await this.pymeRepository.getById(id));
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Register Business' })
  @Post('/register')
  @ApiOperation({ summary: 'Register Business' })
  async register(
    @User() user: InfoUserResult,
    @Body() request: RegisterPymeModel,
    @Res() res: any,
  ) {
    const { social_reason, email, rut, is_natural_person } = request;
    try {
      const existUser = await this.authenticationService.FindByUserId(user.sub);
      if (!existUser.isSuccess) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          is_success: false,
          error: 'Not created',
        });
      }
      if (request.rut) {
        const pymeRutExists = await this.pymeRepository.GetPymeByRut(
          request.rut,
        );
        if (
          pymeRutExists &&
          pymeRutExists.is_natural_person &&
          pymeRutExists.collaborators[0].user_id === user.sub
        ) {
          await this.pymeRepository.update(pymeRutExists.id, {
            is_natural_person: false,
            social_reason: social_reason,
          });
          return res.status(HttpStatus.OK).json({
            is_success: true,
            message: `Natural Person ${pymeRutExists.social_reason} updated to Company`,
            pyme: pymeRutExists,
          });
        }
        if (pymeRutExists) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            is_success: false,
            error: `La Empresa ${social_reason} ya se encuentra registrada con este rut.`,
            rut: true,
          });
        }
      }

      let registeredPyme;
      const clasification = await this.pymeService.ClasifyPyme(
        request.shipping_quantity,
        request.collaborator_quantity,
      );

      if (request.rut === '') {
        registeredPyme = await this.pymeRepository.RegisterPymeV2({
          social_reason,
          is_natural_person,
          email,
          collaborators: [
            {
              user_id: user.sub,
              status: 'ACCEPTED',
              is_admin: true,
            },
          ],
          shipping_average_weight: request.shipping_average_weight
            ? request.shipping_average_weight
            : '',
          shipping_type: request.shipping_type ? request.shipping_type : '',
          collaborator_quantity: request.collaborator_quantity,
          shipping_quantity: request.shipping_quantity,
          other_type: request.other_type ? request.other_type : '',
          business_clasification: clasification,
        });
      } else {
        registeredPyme = await this.pymeRepository.RegisterPymeV2({
          social_reason,
          is_natural_person,
          email,
          rut,
          collaborators: [
            {
              user_id: user.sub,
              status: 'ACCEPTED',
              is_admin: true,
            },
          ],
          shipping_average_weight: request.shipping_average_weight
            ? request.shipping_average_weight
            : '',
          shipping_type: request.shipping_type ? request.shipping_type : '',
          collaborator_quantity: request.collaborator_quantity,
          shipping_quantity: request.shipping_quantity,
          other_type: request.other_type ? request.other_type : '',
          business_clasification: clasification,
        });
      }

      await Promise.all([
        this.authenticationService.AddRole(existUser.user.id, 'pyme'),
        this.userRepository.AddRole(user.sub, 'pyme'),
        this.userRepository.AcceptPymeInvitation(
          existUser.user.id,
          registeredPyme._id,
        ),
        this.userRepository.AddDefaultPyme(
          existUser.user.id,
          registeredPyme._id,
        ),
      ]);

      return res.status(HttpStatus.CREATED).json({
        is_success: true,
        message: `Company ${registeredPyme.social_reason} was created`,
        pyme: registeredPyme,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        is_success: false,
        error: error.message.includes('E11000')
          ? `La Empresa ${social_reason} ya se encuentra registrada`
          : 'Ha ocurrido un error',
      });
    }
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Update Business' })
  @Put('/:id')
  @ApiOperation({ summary: 'Update Business' })
  async update(
    @Param('id') pymeId: string,
    @Body() request: UpdatePymeModel,
    @Res() res: any,
  ) {
    const data = await this.pymeRepository.update(pymeId, request);
    return res.status(HttpStatus.OK).json({ is_success: true, data });
  }

  @Authorize('pyme')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invite User to be Admin of the Company',
  })
  @Post('/admin-invite')
  @ApiOperation({ summary: 'Invite User to be Admin of the company' })
  async inviteAdminCompany(
    @Body() request: InviteCompanyAdminModel,
    @User() user: InfoUserResult,
    @Res() res: Response,
  ) {
    const companyResult = await this.pymeRepository.getById(request.pyme_id);

    if (!companyResult) {
      throw new BadRequestException('Empresa no encontrada');
    }

    if (!(await this.pymeRepository.IsAdmin(request.pyme_id, user.sub))) {
      throw new ForbiddenException('No puedes realizar esta acción.');
    }

    const invitationsPending = await this.companyInvitationRepository.findAllByPymeAndStatus(
      request.pyme_id,
      InvitationStatus.PENDING,
      InvitationType.ADMIN,
    );

    if (invitationsPending.length > 0) {
      throw new BadRequestException('Sólo puede haber una invitación activa.');
    }

    const userSearch = await this.authenticationService.FindByUsername(
      request.email,
    );
    if (!userSearch.isSuccess) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (
      !(await this.pymeRepository.UserExistInPyme(
        request.pyme_id,
        userSearch.data.id,
      ))
    ) {
      throw new BadRequestException('Usuario debe pertenecer a la empresa');
    }
    const foundInvitation = await this.companyInvitationRepository.findByPymeEmailAndStatus(
      request.pyme_id,
      request.email,
      InvitationStatus.PENDING,
      InvitationType.ADMIN,
    );
    if (foundInvitation) {
      return res.status(HttpStatus.OK).send({
        email: request.email,
        isSuccess: false,
        message: 'Sólo puede haber una invitación activa.',
      });
    }

    const sendRes = await this.pymeService.SendInvitationToAdminUser(
      request.pyme_id,
      companyResult.social_reason,
      request.email,
    );

    if (!sendRes) {
      throw new BadRequestException('Error al enviar invitación por correo');
    }
    return res.status(HttpStatus.OK).send({
      email: request.email,
      isSuccess: true,
    });
  }

  @Authorize('pyme')
  @ApiResponse({ status: HttpStatus.OK, description: 'Invite User to Company' })
  @Post('/invite')
  @ApiOperation({ summary: 'Invite User to Company' })
  async inviteToCompany(
    @Body() request: InviteCompanyModel,
    @User() user: InfoUserResult,
    @Res() res: Response,
  ) {
    const pymeResult = await this.pymeRepository.getById(request.pyme_id);
    if (!pymeResult) {
      throw new BadRequestException('Empresa no encontrada.');
    }

    if (
      !pymeResult.collaborators.find(
        (c) => c.user_id === user.sub && c.is_admin,
      )
    ) {
      throw new ForbiddenException();
    }

    const invitations: Promise<{
      email: string;
      isSuccess: boolean;
      message?: string;
    }>[] = request.email.map(async (email) => {
      const userResult = await this.authenticationService.FindByUsername(email);
      if (userResult.isSuccess) {
        const emailExistInPyme = pymeResult.collaborators.some(
          (collEmail) => collEmail.user_id === userResult.data.id,
        );
        if (emailExistInPyme) {
          return {
            email,
            isSuccess: false,
            message: 'Los invitados no pueden ser colaboradores activos.',
          };
        }
      }
      const foundInvitation = await this.companyInvitationRepository.findByPymeEmailAndStatus(
        request.pyme_id,
        email,
        InvitationStatus.PENDING,
        InvitationType.COLLABORATOR,
      );
      if (foundInvitation) {
        return {
          email,
          isSuccess: false,
          message: 'Invitación ya existente.',
        };
      } else {
        if (!userResult.isSuccess) {
          const result = await this.pymeService.SendInvitationUnRegisteredUser(
            pymeResult.id,
            pymeResult.social_reason,
            email,
          );
          if (result) {
            return {
              email,
              isSuccess: true,
            };
          }
        } else {
          const res = await this.pymeService.SendInvitationRegisteredUser(
            pymeResult.id,
            pymeResult.social_reason,
            email,
          );
          if (res) {
            return {
              email,
              isSuccess: true,
            };
          }
        }
      }
    });
    Promise.all(invitations)
      .then((resInvitations) => {
        const onlyFalse = resInvitations.every((resInvi) => !resInvi.isSuccess);
        const allFalseExist = resInvitations.every(
          (resInvi) =>
            !resInvi.isSuccess &&
            resInvi.message ===
              'Los invitados no pueden ser colaboradores activos.',
        );
        const allFalseExistInvitation = resInvitations.every(
          (resInvi) =>
            !resInvi.isSuccess &&
            resInvi.message === 'Invitación ya existente.',
        );
        if (resInvitations.length === 1 && !resInvitations[0].isSuccess) {
          res.status(HttpStatus.BAD_REQUEST).send(resInvitations);
        } else if (allFalseExist) {
          res.status(HttpStatus.BAD_REQUEST).send(resInvitations);
        } else if (allFalseExistInvitation) {
          res.status(HttpStatus.BAD_REQUEST).send(resInvitations);
        } else if (onlyFalse) {
          res.status(HttpStatus.BAD_REQUEST).send(resInvitations);
        } else {
          res.status(HttpStatus.OK).send(resInvitations);
        }
      })
      .catch((err) => {
        throw new ForbiddenException(err);
      });
  }

  @Authorize('pyme')
  @ApiOperation({ summary: 'Resend invitation to Company' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Resend invitation to Company',
  })
  @Post('/resend-invitation')
  async resendBusinessInvitation(
    @Body() request: ResendInviteCompanyModel,
    @Res() res: Response,
  ) {
    const invitation = await this.companyInvitationRepository.findByIdAndStatus(
      request.invitation_id,
      InvitationStatus.PENDING,
    );
    if (!invitation) {
      throw new ForbiddenException('Invitation not found');
    }

    const pymeResult = await this.pymeRepository.getById(invitation.pyme_id);
    if (!pymeResult) {
      throw new BadRequestException('Business not found');
    }

    const findUser = await this.authenticationService.FindByUsername(
      invitation.email,
    );
    if (!findUser.isSuccess) {
      const resendInvitationResult = await this.pymeService.ResendCompanyInvitationNotRegisteredUser(
        invitation.email,
      );
      if (resendInvitationResult) {
        return res.status(HttpStatus.OK).send({
          message: 'Invitation resent',
        });
      }
    }

    const findUserInPyme = pymeResult.collaborators.find(
      (coll) => coll.id === findUser.data,
    );
    if (findUserInPyme) {
      throw new BadRequestException(
        'Los invitados no pueden ser colaboradores activos.',
      );
    }
    const invitation_type =
      request.invitationType === InvitationTypeEnum.ADMIN ? 'ADMIN' : 'MEMBER';
    const resendInvitation = await this.pymeService.ResendCompanyInvitationRegisteredUser(
      invitation.pyme_name,
      invitation.email,
      invitation_type,
    );
    if (resendInvitation) {
      return res.status(HttpStatus.OK).send({
        message: 'Invitation resent',
      });
    }
  }

  @Authorize()
  @ApiOperation({ summary: 'Get all invitations by email and status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invitations found',
  })
  @Get('/invitations-by-email-and-status/:email/:status')
  async getAllInvitationsByEmailAndStatus(
    @Param('email') email: string,
    @Param('status') status: InvitationStatus,
    @Res() res: Response,
  ) {
    const invitations = await this.companyInvitationRepository.findAllByEmailAndStatus(
      email,
      status,
    );
    if (invitations.length === 0) {
      throw new ForbiddenException('Invitations not found');
    }
    return res.status(HttpStatus.OK).send({
      message: 'Invitations found',
      invitations,
    });
  }

  @Authorize('pyme')
  @ApiOperation({ summary: 'Get all invitations by pyme and status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invitations found',
  })
  @Get('/invitations-by-pyme/:status')
  async getAllInvitationsByPymeIdEmailAndStatus(
    @Param('status') status: InvitationStatus,
    @User() user: InfoUserResult,
    @Res() res: Response,
  ) {
    const pymes = await this.userRepository.FindPymesByUserId(user.sub);
    if (!pymes) {
      throw new ForbiddenException('Pymes not found');
    }
    const pymesId = pymes.map((pyme) => pyme._id);

    let resPymesInvitation = [];

    await Promise.all(
      pymesId.map(async (_id) => {
        const pymesInvitation = await this.companyInvitationRepository.findAllByPymeIdAndStatus(
          _id,
          status,
        );
        if (pymesInvitation) {
          resPymesInvitation = [...resPymesInvitation, ...pymesInvitation];
        }
      }),
    );

    if (resPymesInvitation.length === 0) {
      throw new ForbiddenException('Invitations not found');
    }
    return res.status(HttpStatus.OK).send({
      message: 'Invitations found',
      invitations: resPymesInvitation,
    });
  }

  @Authorize('pyme')
  @ApiOperation({ summary: 'Cancel invitation' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cancel invitation',
  })
  @Delete('/cancel-invitation/:invitationId')
  async cancelBusinessInvitation(
    @Param('invitationId') invitationId: string,
    @Res() res: Response,
  ) {
    const invitation = await this.companyInvitationRepository.deleteById(
      invitationId,
    );

    if (!invitation) {
      throw new ForbiddenException();
    }

    return res.status(HttpStatus.OK).send({
      message: 'Invitation canceled',
    });
  }

  @Authorize()
  @ApiResponse({ status: HttpStatus.OK, description: 'Answer Pyme Invitation' })
  @Post('/answer-pyme-invitation')
  @ApiOperation({ summary: 'Answer Pyme Invitation' })
  async answerToPymeInvitation(
    @Body() answerInvitationModel: AnswerInvitationPymeModel,
    @User() user: InfoUserResult,
    @Res() res: any,
  ) {
    const invitation = await this.pymeService.FindByStatus(
      answerInvitationModel.invitation_id,
      user.email,
      InvitationStatus.PENDING,
    );

    if (!invitation) {
      throw new NotFoundException();
    }

    switch (answerInvitationModel.answer) {
      case AnswerInvitationPymeEnum.OK:
        await this.pymeService.UpdateCompanyInvitationUser(
          answerInvitationModel.invitation_id,
          user.sub,
          user.email,
          InvitationStatus.ACCEPTED,
        );
        break;
      case AnswerInvitationPymeEnum.NOK:
        await this.pymeService.UpdateCompanyInvitationUser(
          answerInvitationModel.invitation_id,
          user.sub,
          user.email,
          InvitationStatus.REJECTED,
        );
        break;
      default:
        throw new BadRequestException();
    }
    return res.status(HttpStatus.OK).send();
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Join User to Pyme' })
  @Post('/join')
  @ApiOperation({ summary: 'Join User to Pyme' })
  async joinToPyme(
    @Body() request: JoiToPymeModel,
    @User() user: InfoUserResult,
    @Res() res: any,
  ) {
    const { social_reason } = request;
    const userId = user.sub;
    const existUser = await this.authenticationService.FindByUserId(userId);

    if (!existUser.isSuccess) {
      throw new BadRequestException('Usuario no existe');
    }

    const collaborators = [
      {
        user_id: user.sub,
        status: 'ACCEPTED',
      },
    ];

    const company = await this.pymeRepository.FindBySocialReason(social_reason);

    if (!company) {
      throw new BadRequestException('La empresa ingresada no existe');
    }

    const userAlreadyExistInPyme = await this.pymeRepository.UserExistInPyme(
      company.id,
      userId,
    );

    if (userAlreadyExistInPyme) {
      throw new BadRequestException('El usuario ya se encuentra como miembro');
    }

    const pymeWithNewCollaborator = await this.pymeRepository.JoinToPyme(
      social_reason,
      collaborators,
    );

    if (!pymeWithNewCollaborator) {
      throw new BadRequestException('Error al unirse a empresa');
    }

    await this.authenticationService.AddRole(existUser.user.id, 'pyme');
    await this.userRepository.AddRole(user.sub, 'pyme');

    await this.userRepository.AcceptPymeInvitation(
      existUser.user.id,
      pymeWithNewCollaborator._id,
    );

    return res.status(HttpStatus.OK).json({
      is_success: true,
      message: `Pyme ${pymeWithNewCollaborator.social_reason} was updated`,
      pyme: pymeWithNewCollaborator,
    });
  }

  @Delete('/user/:pyme_id')
  @ApiOperation({ summary: 'Autoremove user from Pyme' })
  async autoRemoveUserFromPyme(
    @Param('pyme_id') pymeId: string,
    @User() user: InfoUserResult,
    @Res() res: any,
  ) {
    const pyme = await this.pymeRepository.getById(pymeId);
    if (!pyme) {
      throw new NotFoundException();
    }

    if (await this.pymeRepository.IsAdmin(pymeId, user.sub)) {
      throw new BadRequestException(
        'Usuario administrador no puede eliminarse',
      );
    }

    await this.pymeRepository.RemoveCollaborator(pymeId, user.sub);

    await this.userRepository.RemovePymeFromUser(user.sub, pymeId);

    const userInstance = await this.userRepository.FindByUserId(user.sub);

    if (!userInstance) {
      throw new NotFoundException();
    }

    if (!userInstance.pymes.length) {
      await Promise.all([
        this.userRepository.AddDefaultPyme(user.sub, null),
        this.authenticationService.RemoveRole(user.sub, 'pyme'),
        this.userRepository.RemoveRole(user.sub, 'pyme'),
      ]);
    }

    const remainingPymes = userInstance.pymes;

    if (remainingPymes.length >= 1) {
      await this.userRepository.AddDefaultPyme(user.sub, remainingPymes[0]);
    }

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/:pyme_id/:user_id')
  @ApiOperation({ summary: 'Remove collaborator from pyme' })
  async removeCollaborator(
    @Param('pyme_id') pymeId: string,
    @Param('user_id') userId: string,
    @User() user: InfoUserResult,
    @Res() res: any,
  ) {
    const pyme = await this.pymeRepository.getById(pymeId);
    if (!pyme) {
      throw new NotFoundException();
    }

    if (!(await this.pymeRepository.IsAdmin(pymeId, user.sub))) {
      throw new BadRequestException('Usuario no es administrador');
    }

    if (await this.pymeRepository.IsAdmin(pymeId, userId)) {
      throw new BadRequestException(
        'Usuario administrador no puede eliminarse',
      );
    }

    await this.pymeRepository.RemoveCollaborator(pymeId, userId);

    await this.userRepository.RemovePymeFromUser(userId, pymeId);

    const userInstance = await this.userRepository.FindByUserId(userId);

    if (!userInstance) {
      throw new NotFoundException();
    }

    if (!userInstance.pymes.length) {
      await Promise.all([
        this.userRepository.AddDefaultPyme(userId, null),
        this.authenticationService.RemoveRole(userId, 'pyme'),
        this.userRepository.RemoveRole(userId, 'pyme'),
      ]);
    }

    const remainingPymes = userInstance.pymes;

    if (remainingPymes.length >= 1) {
      await this.userRepository.AddDefaultPyme(userId, remainingPymes[0]);
    }

    return res.status(HttpStatus.OK).send();
  }

  @Get(':id/collaborators')
  async getPymeUsers(
    @Param('id') pyme_id: string,
    @Query('status') status: 'ACCEPTED' | 'REJECTED' | 'PENDING',
  ) {
    return this.pymeService.GetPymeCollaborators(pyme_id, status);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'save pyme billing information',
  })
  @Put('/:id/billing')
  @ApiOperation({ summary: 'Save pyme billing information' })
  async saveBillingInformation(
    @Param('id') pymeId: string,
    @Body() billing: BillingInformation,
    @Res() res: any,
    @User() user: InfoUserResult,
  ) {
    const pyme = await this.pymeRepository.getById(pymeId);
    const pymeRut = await this.pymeRepository.GetPymeByRut(billing.rut);
    if (pymeRut && pyme.id !== pymeRut.id && billing.rut === pymeRut.rut) {
      throw new BadRequestException(
        await this.i18n.translate('account.billing_information.rut'),
      );
    }

    if (!pyme) {
      throw new NotFoundException(
        await this.i18n.translate('account.login.badCredentials'),
      );
    }

    if (!pyme.billing_information && billing.address === '') {
      throw new BadRequestException(
        await this.i18n.translate('account.billing_information.address'),
      );
    }

    if (billing.address === '' && pyme.billing_information) {
      billing.address = pyme.billing_information.address;
      billing.address_number = pyme.billing_information.address_number;
      billing.city_name = pyme.billing_information.city_name;
      billing.commune = pyme.billing_information.commune;
      billing.region = pyme.billing_information.region;
    }

    const collaborator = pyme.collaborators.find((collaboratorId) =>
      collaboratorId.user_id
        ? collaboratorId.user_id
        : collaboratorId.id === user.sub,
    );

    if (!collaborator) {
      throw new ForbiddenException('Collaborator not found');
    }

    let legacyId: string;
    let result: LegacyClientResult;
    const newLegacyClient: BaseClientRequest = this.pymeService.createClientRequest(
      pyme,
      billing,
      user,
    );

    if (pyme.has_billing_information) {
      legacyId = pyme.billing_information.legacy_id;
      result = await this.legacyClientService.UpdateClient({
        ...newLegacyClient,
        sucursal: pyme.billing_information?.office
          ? pyme.billing_information.office
          : '1',
        idUsuario: legacyId,
      });
    } else {
      legacyId = this.pymeService.generateLegacyId(
        pyme.social_reason.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      );
      result = await this.legacyClientService.CreateClient({
        ...newLegacyClient,
        tipoCliente: pyme.billing_information?.client_type
          ? pyme.billing_information.client_type
          : '85',
        idUsuario: legacyId,
      });
    }

    if (result.isSuccess) {
      const pymeUpdated = await this.pymeRepository.UpdatePymeBillingInformation(
        pymeId,
        {
          ...billing,
          legacy_id: legacyId,
          client_name: pyme.social_reason,
          contact_name: user.name,
          phone: billing.phone ? billing.phone : user.phone ? user.phone : '',
          email: billing.email,
          client_type: pyme.billing_information?.client_type
            ? pyme.billing_information.client_type
            : '85',
          current_account: pyme.billing_information?.current_account
            ? pyme.billing_information.current_account
            : null,
          office: pyme.billing_information?.office
            ? pyme.billing_information.office
            : null,
        },
      );

      if (!pymeUpdated) {
        throw new BadRequestException(
          await this.i18n.translate('account.login.badCredentials'),
        );
      }
      return res.status(HttpStatus.OK).json(pymeUpdated.billing_information);
    }

    throw new BadRequestException();
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Get Pyme By Id' })
  @Get(':id/billing')
  @ApiOperation({ summary: 'Verify if pyme has info' })
  async getPymeBillingInfo(@Param('id') pyme_id: string, @Res() res: any) {
    const pyme = await this.pymeRepository.getById(pyme_id);

    if (!pyme) {
      throw new NotFoundException(
        await this.i18n.translate('account.login.badCredentials'),
      );
    }

    return res.status(HttpStatus.OK).json(pyme.has_billing_information);
  }

  private generateLegacyId(socialReasonName: string): string {
    return `${socialReasonName
      .toUpperCase()
      .trim()
      .replace(' ', '')
      .substr(0, 8)}.${Math.floor(Math.random() * 900000) + 100000}`;
  }
  @Authorize('backoffice')
  @ApiResponse({ status: HttpStatus.OK, description: 'Find pyme' })
  @Post('/find')
  @ApiOperation({ summary: 'Find' })
  async findPymes(@Body() find: FindPymeModel, @Res() res: any) {
    return res
      .status(HttpStatus.OK)
      .json(await this.pymeRepository.findPyme(find.find));
  }

  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Update pyme bank information',
  })
  @Put('/:id/update-pyme-bank-info')
  @ApiOperation({ summary: 'Get Pyme By Id' })
  async updatePymeBankInformation(
    @Param('id') id: string,
    @Res() res: any,
    @Body() bankInformation: PymeBankInformation,
  ) {
    const pyme = await this.pymeRepository.getById(id);

    if (!pyme) {
      throw new NotFoundException();
    }

    pyme.bank_account_information = bankInformation;

    const updatedPyme = await this.pymeRepository.update(id, pyme);

    if (!updatedPyme) {
      throw new BadRequestException('Empresa no actualizada');
    }

    return res.status(HttpStatus.OK).send({
      isSuccess: true,
      pyme: updatedPyme.bank_account_information,
    });
  }
}
