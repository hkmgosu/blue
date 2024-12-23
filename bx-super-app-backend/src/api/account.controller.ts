import {
  FILE_STORAGE_SERVICE,
  IFileStorageService,
} from './../commons/interfaces/service/IFileStorageService.interface';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Delete,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  Inject,
  HttpException,
  UnauthorizedException,
  NotAcceptableException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import LoginModel from '../models/account/login.model';
import ResetPasswordModel from '../models/account/reset-password.model';
import VerifyChangePasswordModel from '../models/account/verify-change-password.model';
import ResetPasswordVerifyModel from '../models/account/reset-password-verify.model';
import UserIdModel from '../models/account/brute-force.model';
import GetUserModel from '../models/account/get-user.model';
import CodeLoginModel from '../models/account/code-login.model';
import RefreshTokenModel from '../models/account/refresh-token.model';
import { I18nRequestScopeService } from 'nestjs-i18n';
import RegisterModel from '../models/account/register.model';
import LoggerService from '../services/logger.service';
import {
  AUTHENTICATION_SERVICE,
  IAuthenticationService,
  InfoUserResult,
  INotificationService,
  IPymeRepository,
  IUserRepository,
  NOTIFICATION_SERVICE,
  PYME_REPOSITORY,
  USER_REPOSITORY,
} from '../commons/interfaces';
import { User, Authorize, Hostname } from '../commons/decorators';
import { Origin } from '../commons/decorators/origin.decorator';
import LogoutModel from '../models/account/logout.model';
import { v4 as uuid } from 'uuid';
@ApiTags('Account')
@Controller('/api/pyme2c/backend/v1/account')
export class AccountController {
  constructor(
    private readonly logger: LoggerService,
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nRequestScopeService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PYME_REPOSITORY)
    private readonly pymeRepository: IPymeRepository,
    @Inject(FILE_STORAGE_SERVICE)
    private readonly fileStorageService: IFileStorageService,
  ) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'User Login Success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation Error',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Post('login')
  async login(@Body() request: LoginModel, @Res() res: any) {
    const { username, password } = request;

    const userinfo = await this.authenticationService.GetUserInfoByAdmin(
      request.username,
    );
    this.logger.log('userinfo' + userinfo);
    if (userinfo.length === 0) {
      throw new BadRequestException(
        await this.i18n.translate('account.login.badCredentials'),
      );
    }

    const log = await this.authenticationService.Login(username, password);
    this.logger.log('authenticationService' + log);
    if (log.isSuccess) {
      await this.authenticationService.DeleteUserBruteForce(userinfo[0].id);
      return res.status(HttpStatus.OK).json(log.data);
    } else {
      if (
        log.error &&
        log.error.error_description === 'Account is not fully set up'
      ) {
        throw new NotAcceptableException(
          await this.i18n.translate('account.login.emailNotConfirmed'),
        );
      }
      if (userinfo) {
        const bruteForceInfo = await this.authenticationService.GetUserBruteForce(
          userinfo[0].id,
        );
        this.logger.log('bruteForceInfo' + bruteForceInfo);
        return res.status(HttpStatus.UNAUTHORIZED).json(bruteForceInfo);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json();
      }
    }
  }
  @ApiOperation({ summary: 'Logout user' })
  @Post('logout')
  async logout(@Body() request: LogoutModel, @Res() res: any) {
    const { user_id } = request;
    const result = await this.authenticationService.Logout(user_id);
    if (result) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json(result);
    }
  }
  @Post('code-login')
  @ApiOperation({ summary: 'Login with code' })
  async codeLogin(@Body() request: CodeLoginModel, @Res() res: any) {
    const result = await this.authenticationService.LoginWithAuthorizationCode(
      request.code,
      request.redirect_uri,
    );
    this.logger.log('result' + result, AccountController.name);
    if (!result.isSuccess) {
      throw new HttpException(result.data, result.errorCode);
    }
    const userInfoResult = await this.authenticationService.UserInfo(
      result.data.access_token,
    );
    this.logger.log('userInfoResult' + userInfoResult, AccountController.name);

    if (!userInfoResult.isSuccess) {
      throw new UnauthorizedException(userInfoResult.data);
    }

    const user = userInfoResult.data;
    let picture: string;
    try {
      if (JSON.parse(user.profile_pic)) {
        picture = JSON.parse(user.profile_pic).data.url;
      }
    } catch (error) {
      if (user.profile_pic) {
        picture = user.profile_pic;
      }
    }

    const userInstance = await this.userRepository.FindByUserId(user.sub);
    this.logger.log('userInstance' + userInstance, AccountController.name);
    if (!userInstance) {
      const newUser = await this.userRepository.CreateUser(
        user.sub,
        user.email,
        user.given_name,
        user.family_name,
        user.roles,
        picture,
      );
      if (!newUser) {
        throw new NotFoundException();
      }
      await this.setInvitationsToUser(user.sub, newUser.email);
    }

    return res.status(HttpStatus.OK).json(result.data);
  }
  @ApiResponse({ status: HttpStatus.OK, description: 'Refresh Token' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Token invalid' })
  @Post('refresh-token')
  async refreshToken(@Body() request: RefreshTokenModel, @Res() res: any) {
    const { refresh_token } = request;

    const result = await this.authenticationService.RefreshToken(refresh_token);

    if (!result.isSuccess) {
      throw new HttpException(result.data, result.errorCode);
    }

    return res.status(HttpStatus.OK).json(result.data);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'User Info' })
  @Get('confirm-email/:username/:code')
  async VerifyEmail(
    @Param('username') username: string,
    @Param('code') code: number,
    @Res() res: any,
  ) {
    const userResult = await this.authenticationService.FindByUsername(
      username,
    );

    if (!userResult.isSuccess) {
      throw new NotFoundException();
    }

    const user = userResult.data;

    if (user.emailVerified) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }

    if (!(await this.userRepository.IsConfirmEmailCode(username, code))) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }

    const result = await this.authenticationService.ConfirmEmail(user);

    if (!userResult.isSuccess) {
      return res.status(HttpStatus.BAD_REQUEST).send(result.error);
    }

    await this.userRepository.ConfirmEmail(user.username);

    return res.status(HttpStatus.OK).send();
  }

  @Post('confirm-email/:username/send-code')
  async SendCode(@Param('username') username: string) {
    const userResult = await this.authenticationService.FindByUsername(
      username,
    );

    if (!userResult.isSuccess) {
      throw new BadRequestException(
        await this.i18n.t('account.errors.user-not-exist'),
      );
    }

    const user = userResult.data;

    const result = await this.userRepository.GenerateEmailConfirmCode(
      user.id,
      user.username,
    );

    await this.notificationService.SendEmail({
      to: [{ email: username }],
      subject: 'Codigo de confirmación',
      htmlContent: `$Codigo: <b>${result}</b>`,
    });
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'User Info' })
  @Get('userinfo')
  @Authorize()
  async getUserInfo(@User() user: InfoUserResult) {
    return user;
  }

  @Post('admin/userinfo')
  @ApiOperation({ summary: 'Get User Info with Admin Token' })
  async getUserInfoByAdmin(@Body() request: GetUserModel, @Res() res: any) {
    const { username } = request;
    return res
      .status(HttpStatus.OK)
      .json(await this.authenticationService.GetUserInfoByAdmin(username));
  }

  @Post('reset-password/generate-code')
  @ApiOperation({ summary: 'User Reset Password' })
  async resetPassword(
    @Body() request: ResetPasswordModel,
    @Res() res: any,
    @Origin() origin: string,
  ) {
    try {
      const { username } = request;

      const result = await this.authenticationService.ResetPassword(username);

      if (!result.user_exist) {
        throw new NotFoundException(
          await this.i18n.t('account.errors.user-not-exist'),
        );
      }
      await this.userRepository.GenerateResetPasswordCode(
        result.user_id,
        result.username,
        result.nonce,
      );

      const findUser = await this.authenticationService.FindByUsername(
        username,
      );

      const urlResetPassword = `${origin}/password-reset/new?username=${result.username}&code=${result.nonce}`;
      await this.notificationService.SendEmail({
        to: [
          {
            email: username,
          },
        ],
        templateId: '4',
        params: {
          USERNAME: findUser.data.firstName,
          RESET_PASSWORD_URL: urlResetPassword,
        },
      });

      return res.status(HttpStatus.OK).json(result);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('reset-password/verify-code')
  @ApiOperation({ summary: 'Verify code for Reset Password' })
  async resetPasswordVerify(
    @Body() request: ResetPasswordVerifyModel,
    @Res() res: any,
  ) {
    const { username, nonce } = request;

    const user = await this.userRepository.VerifyResetPasswordCode(
      username,
      nonce,
    );

    if (!user) {
      this.logger.warn(
        await this.i18n.translate('keycloak.error.verify-code'),
        AccountController.name,
      );
      throw new BadRequestException(
        await this.i18n.translate('keycloak.error.verify-code'),
      );
    }

    return res.status(HttpStatus.OK).send().json({ is_success: true });
  }

  @Post('reset-password/change-password')
  @ApiOperation({ summary: 'Verify Reset Password and Change Password' })
  async changeResetPassword(
    @Body() request: VerifyChangePasswordModel,
    @Res() res: any,
  ) {
    const { username, nonce, new_password } = request;

    const user = await this.userRepository.VerifyResetPasswordCode(
      username,
      nonce,
    );

    if (!user) {
      throw new NotFoundException(
        await this.i18n.translate('keycloak.error.verify-code'),
      );
    }

    const result = await this.authenticationService.ResetPasswordChange(
      user.user_id,
      username,
      new_password,
    );

    if (!result.isSuccess) {
      this.logger.warn(JSON.stringify(result), AccountController.name);
      throw new BadRequestException(result);
    }

    await this.userRepository.DeleteResetPassword(username);
    await this.authenticationService.DeleteUserBruteForce(user.user_id);

    if (!user.is_email_confirmed) {
      const keycloakUser = await this.authenticationService.FindByUserId(
        user.user_id,
      );
      await this.authenticationService.ConfirmEmail(keycloakUser.user);
      await this.userRepository.ConfirmEmail(user.username);
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('register')
  async Register(
    @Body() request: RegisterModel,
    @Res() res: any,
    @Hostname() hostname: string,
    @Origin() origin: string,
  ) {
    this.logger.log(
      `register body ${JSON.stringify(request)}`,
      AccountController.name,
    );
    const result = await this.authenticationService.CreateUser(
      request.name,
      request.lastname,
      request.email,
      request.password,
    );

    if (!result.isSuccess) {
      this.logger.warn(result.error, AccountController.name);
      throw new BadRequestException(result.error);
    }

    const userResult = await this.authenticationService.FindByUsername(
      request.email,
    );

    if (!userResult.isSuccess) {
      throw new NotFoundException();
    }

    const user = userResult.data;
    const roles = await this.authenticationService.GetUserRoles(user.id);

    if (roles.isSuccess) {
      user.roles = roles.data;
    }

    let profile_pic = '';

    if (request.avatar) {
      profile_pic = request.avatar;
    } else if (request.file) {
      const file = await this.fileStorageService.UploadBase64File(
        request.file,
        'profile/photo',
        `${user.id}-${uuid()}`,
      );
      profile_pic = file;
    }

    const newUser = await this.userRepository.CreateUser(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.roles,
      profile_pic,
    );

    if (!newUser) {
      throw new NotFoundException();
    }

    const code = await this.userRepository.GenerateEmailConfirmCode(
      user.id,
      user.username,
    );

    const confirmCodeUrl = `${origin}/confirmed-email/new?username=${user.username}&code=${code}`;

    const welcomeTo = await this.i18n.translate('account.register.welcome-to');

    await this.notificationService.SendEmail({
      to: [{ email: user.username }],
      templateId: '1',
      params: {
        USERNAME: user.firstName,
        CONFIRM_CODE_URL: confirmCodeUrl,
        welcome: welcomeTo,
      },
    });

    await this.setInvitationsToUser(user.id, user.username);

    return res.status(HttpStatus.CREATED).send();
  }

  @Get('bruteforce/:uid')
  @ApiOperation({ summary: 'Get Brute Force Info' })
  async getUserBruteForceInfo(@Param() request: UserIdModel, @Res() res: any) {
    const { uid } = request;
    return res
      .status(HttpStatus.OK)
      .json(await this.authenticationService.GetUserBruteForce(uid));
  }

  @Delete('bruteforce/:uid')
  @ApiOperation({ summary: 'Reset Brute Force/Unlock User' })
  async resetUserBruteForceInfo(
    @Param() request: UserIdModel,
    @Res() res: any,
  ) {
    const { uid } = request;
    return res
      .status(HttpStatus.OK)
      .json(await this.authenticationService.DeleteUserBruteForce(uid));
  }

  private async setInvitationsToUser(user_id: string, username: string) {
    const haveInvitations = await this.pymeRepository.GetUserPymeInvitationByEmail(
      username,
    );

    if (haveInvitations.length > 0) {
      await Promise.all(
        haveInvitations.map(async (pymeInvitation) => {
          await this.pymeRepository.UpdatePymeCollaboratorStatus(
            pymeInvitation._id,
            username,
            'ACCEPTED',
          );

          await this.userRepository.AcceptPymeInvitation(
            user_id,
            pymeInvitation._id,
          );
        }),
      );

      await this.authenticationService.AddRole(user_id, 'pyme');
      await this.userRepository.AddRole(user_id, 'pyme');
    }
  }
}
