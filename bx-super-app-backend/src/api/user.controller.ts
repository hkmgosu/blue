import {
  FILE_STORAGE_SERVICE,
  IFileStorageService,
} from './../commons/interfaces/service/IFileStorageService.interface';
import { UploadPhoto as UploadPhotoModel } from './../models/account/upload-photo.model';
import {
  Controller,
  HttpStatus,
  Get,
  Inject,
  Res,
  Post,
  Body,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '../commons/decorators/authorize.decorator';
import { User } from '../commons/decorators/user.decorator';
import { PYME_REPOSITORY, USER_REPOSITORY } from '../commons/interfaces';
import {
  AUTHENTICATION_SERVICE,
  IAuthenticationService,
  InfoUserResult,
} from '../commons/interfaces/service/IAuthenticationService.interface';
import UserRepository from '../repository/user.repository';
import PymeRepository from '../repository/pyme.repository';
import EditDefaultPymeModel from '../models/user/edit-default-pyme.model';
import UserEdit from '../models/account/user-edit.model';
import ChangePassword from '../models/account/change-password.model';
import { Response } from 'express';
import { Types } from 'mongoose';
import { v4 as uuid } from 'uuid';
import UserFirstLogin from '../models/account/user-first-login';
import { COMPANY_INVITATION_REPOSITORY } from '../commons/interfaces/repository/ICompanyInvitationRepository.interface';
import { CompanyInvitationRepository } from '../repository/companyInvitation.repository';
import { InvitationStatus } from '../commons/schemas/invitation.schema';
@ApiTags('User')
@Controller('/api/pyme2c/backend/v1/user')
export class UserController {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PYME_REPOSITORY)
    private readonly pymeRepository: PymeRepository,
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    @Inject(FILE_STORAGE_SERVICE)
    private readonly fileStorageService: IFileStorageService,
    @Inject(COMPANY_INVITATION_REPOSITORY)
    private readonly companyInvitationRepository: CompanyInvitationRepository,
  ) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'User Info' })
  @Get()
  @Authorize()
  async getUserInfo(@User() user: InfoUserResult, @Res() res: any) {
    let userDb = await this.userRepository.FindByUserId(user.sub);

    if (userDb) {
      user.first_login = userDb.first_login;
      user.first_steps = userDb.first_steps;
    }

    if (!userDb) {
      const keycloakUser = await this.authenticationService.FindByUserId(
        user.sub,
      );
      const roles = await this.authenticationService.GetUserRoles(user.sub);
      let picture: string;
      try {
        if (JSON.parse(keycloakUser.user.attributes.profile_pic)) {
          picture = JSON.parse(keycloakUser.user.attributes.profile_pic).data
            .url;
        }
      } catch (error) {
        if (keycloakUser.user.attributes.profile_pic[0]) {
          picture = keycloakUser.user.attributes.profile_pic[0];
        }
      }
      const data = {
        user_id: keycloakUser.user.id,
        first_name: keycloakUser.user.firstName,
        last_name: keycloakUser.user.lastName,
        email: keycloakUser.user.username,
        roles: roles.data,
        pymes: [],
        username: keycloakUser.user.username,
        is_email_confirmed: keycloakUser.user.emailVerified,
        profile_pic: picture,
        first_login: userDb.first_login,
        first_steps: userDb.first_steps,
      };

      userDb = await this.userRepository.create(data);

      if (!userDb) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          is_success: false,
          error: 'The user does not exist',
        });
      }
    }

    let pic_array;
    if (userDb.profile_pic) {
      pic_array = userDb.profile_pic.split('/');
      if (pic_array[0] === 'profile') {
        user.profile_pic = await this.fileStorageService.GetUrlPath(
          userDb.profile_pic,
        );
      } else {
        user.profile_pic = userDb.profile_pic;
      }
    }

    const invitations = await this.companyInvitationRepository.findAllByEmailAndStatus(
      user.email,
      InvitationStatus.PENDING,
    );

    if (this.isInRole(userDb.roles, 'pyme')) {
      const pymes = await this.userRepository.FindPymesByUserId(user.sub);
      if (!pymes) {
        return;
      }

      const pymeCollaborators = pymes.map(async (pyme) => {
        const collaborators = await this.pymeRepository.FindCollaborators(
          pyme.id,
        );

        if (!collaborators) {
          return {
            id: pyme.id,
            social_reason: pyme.social_reason,
            collaborators: null,
          };
        }

        const acceptedCollaborators = collaborators.filter(
          (collab) => collab.status === InvitationStatus.ACCEPTED,
        );

        if (!acceptedCollaborators) {
          return {
            id: pyme.id,
            social_reason: pyme.social_reason,
            collaborators: null,
            has_billing_information: pyme.has_billing_information,
            billing_information: pyme.billing_information,
            is_natural_person: pyme.is_natural_person,
          };
        }

        const userPromises = acceptedCollaborators.map(async (collab) => {
          const [result, resultDB] = await Promise.all([
            this.authenticationService.FindByUserId(collab.user_id),
            this.userRepository.FindByUserId(collab.user_id),
          ]);

          const profilePicByUser =
            resultDB.profile_pic || result.user?.attributes?.profile_pic[0];
          let profilePic = '';

          if (profilePicByUser && profilePicByUser.includes('profile')) {
            profilePic = await this.fileStorageService.GetUrlPath(
              profilePicByUser,
            );
          } else {
            profilePic = profilePicByUser;
          }

          if (result.isSuccess) {
            return {
              ...result.user,
              phone: resultDB.phone,
              profile_pic: profilePic,
              is_admin: collab.is_admin,
            };
          }
        });

        return Promise.all(userPromises)
          .then((result) => ({
            id: pyme.id,
            social_reason: pyme.social_reason,
            collaborators: result,
            has_billing_information: pyme.has_billing_information,
            billing_information: pyme.billing_information,
            business_clasification: pyme.business_clasification
              ? pyme.business_clasification
              : '',
            created: pyme.created,
            rut: pyme.rut ? pyme.rut : '',
            is_natural_person: pyme.is_natural_person,
            bank_account_information: pyme.bank_account_information
              ? pyme.bank_account_information
              : null,
          }))
          .catch(() => ({
            id: pyme.id,
            social_reason: pyme.social_reason,
            collaborators: null,
            has_billing_information: pyme.has_billing_information,
            billing_information: pyme.billing_information,
            business_clasification: pyme.business_clasification
              ? pyme.business_clasification
              : '',
            created: pyme.created,
            rut: pyme.rut ? pyme.rut : '',
            is_natural_person: pyme.is_natural_person,
            bank_account_information: pyme.bank_account_information
              ? pyme.bank_account_information
              : null,
          }));
      });

      return Promise.all(pymeCollaborators)
        .then((result) => {
          return res.status(HttpStatus.OK).json({
            ...user,
            invitations,
            default_pyme: userDb.default_pyme,
            pymes: result,
            roles: userDb.roles,
          });
        })
        .catch(() => {
          return res.status(HttpStatus.OK).json({
            ...user,
            invitations,
            default_pyme: userDb.default_pyme,
            pymes: [],
            roles: userDb.roles,
          });
        });
    }
    return res.status(HttpStatus.OK).json({
      ...user,
      invitations,
      default_pyme: userDb.default_pyme,
      roles: userDb.roles,
    });
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Upload Photo' })
  @Authorize()
  @Put('/upload-photo')
  async uploadPhoto(
    @User() user: InfoUserResult,
    @Body() uploadPhotoRequest: UploadPhotoModel,
    @Res() res: any,
  ) {
    const userDb = await this.userRepository.FindByUserId(user.sub);

    if (!userDb) {
      throw new NotFoundException();
    }

    if (!uploadPhotoRequest.file && !uploadPhotoRequest.avatar) {
      throw new BadRequestException();
    }

    if (uploadPhotoRequest.avatar) {
      userDb.profile_pic = uploadPhotoRequest.avatar;
    } else if (uploadPhotoRequest.file) {
      const file = await this.fileStorageService.UploadBase64File(
        uploadPhotoRequest.file,
        'profile/photo',
        `${user.sub}-${uuid()}`,
      );

      userDb.profile_pic = file;
    }

    await this.userRepository.update(userDb._id, userDb);

    return res.status(HttpStatus.OK).send({ photo: userDb.profile_pic });
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Edit User' })
  @Authorize()
  @Put()
  async editUser(
    @User() user: InfoUserResult,
    @Body() req: UserEdit,
    @Res() res: Response,
  ) {
    try {
      const findUserKC = await this.authenticationService.FindByUserId(
        user.sub,
      );

      if (!findUserKC.isSuccess) {
        throw new BadRequestException('The user does not exist KeyCloak');
      }

      findUserKC.user.firstName = req.firstName;
      findUserKC.user.lastName = req.lastName;
      findUserKC.user.attributes = {
        phone:
          !req.phone && req.phone !== ''
            ? findUserKC.user.attributes.phone
            : req.phone,
      };

      const updateKC = await this.authenticationService.Update(
        findUserKC.user.id,
        findUserKC.user,
      );

      if (!updateKC.isSuccess) {
        throw new BadRequestException('The user does not update keycloak');
      }

      const findUserMongo = await this.userRepository.FindByUserId(user.sub);

      if (!findUserMongo) {
        throw new BadRequestException('The user does not exist MongoDb');
      }

      const updateMongo = await this.userRepository.update(findUserMongo._id, {
        first_name: req.firstName,
        last_name: req.lastName,
        phone: !req.phone && req.phone !== '' ? findUserMongo.phone : req.phone,
      });

      if (!updateMongo) {
        throw new BadRequestException('The user does not update MongoDb');
      }

      return res.status(HttpStatus.OK).json({
        is_success: true,
        error: null,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        is_success: false,
        error: error.message,
      });
    }
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Change Password' })
  @Authorize()
  @Put('change-password')
  async changePassword(
    @User() user: InfoUserResult,
    @Body() req: ChangePassword,
    @Res() res: Response,
  ) {
    try {
      const findUserKC = await this.authenticationService.FindByUserId(
        user.sub,
      );

      if (!findUserKC.isSuccess) {
        throw new BadRequestException('The user does not exist KeyCloak');
      }

      const result = await this.authenticationService.ResetPasswordChange(
        user.sub,
        req.username,
        req.new_password,
      );

      if (!result.isSuccess) {
        throw new BadRequestException(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Edit Default Pyme' })
  @Authorize()
  @Post('/edit-default-pyme')
  async editDefaultPyme(
    @User() user: InfoUserResult,
    @Body() request: EditDefaultPymeModel,
    @Res() res: Response,
  ) {
    const { pyme_id } = request;

    const pyme = await this.pymeRepository.getById(pyme_id);

    if (!pyme) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        is_success: false,
        error: 'The pyme does not exist',
      });
    }

    const pymeObjectId = this.parseToObjectId(pyme_id);

    const userEdited = await this.userRepository.AddDefaultPyme(
      user.sub,
      pymeObjectId,
    );

    if (!userEdited) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        is_success: false,
        error: 'The user does not exist',
      });
    }

    return res.status(HttpStatus.OK).json({
      is_success: true,
    });
  }

  private isInRole(roles: string[], role: string) {
    return roles.includes(role);
  }

  private parseToObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Edit User' })
  @Authorize()
  @Put('/first-login')
  async editUserFirstLogin(
    @User() user: InfoUserResult,
    @Body() req: UserFirstLogin,
    @Res() res: Response,
  ) {
    try {
      const findUserMongo = await this.userRepository.FindByUserId(user.sub);

      if (!findUserMongo) {
        throw new BadRequestException('The user does not exist MongoDb');
      }

      findUserMongo.first_login = !req.firstLogin
        ? req.firstLogin
        : findUserMongo.first_login;

      findUserMongo.first_steps = !req.firstSteps
        ? req.firstSteps
        : findUserMongo.first_steps;

      const updateMongo = await this.userRepository.update(
        findUserMongo._id,
        findUserMongo,
      );

      if (!updateMongo) {
        throw new BadRequestException('The user does not update MongoDb');
      }

      return res.status(HttpStatus.OK).json({
        is_success: true,
        error: null,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        is_success: false,
        error: error.message,
      });
    }
  }
}
