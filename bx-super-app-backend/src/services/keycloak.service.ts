import { HttpService, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { stringify } from 'querystring';

import { generateNonce } from '../commons/helpers/generateNonce';
import LoggerService from './logger.service';
import { I18nRequestScopeService } from 'nestjs-i18n';
import User from '../models/account/user.model';
import {
  CreateUserResult,
  DefaultResult,
  IAuthenticationService,
  InfoUserResult,
  LoginResult,
  ResetPasswordChangeResult,
  ResetPasswordResult,
} from '../commons/interfaces';
import * as jwt from 'jsonwebtoken';
@Injectable()
class KeycloakService implements IAuthenticationService {
  private readonly realmName: string = this.config.get('KEYCLOAK_REALM');
  constructor(
    @Inject('LoggerService') private readonly logger: LoggerService,
    @Inject('ConfigService') private readonly config: ConfigService,
    @Inject('HttpService') private readonly http: HttpService,
    @Inject('I18nRequestScopeService')
    private readonly i18n: I18nRequestScopeService,
  ) {}

  private urlPath = {
    userExist: `/auth/admin/realms/${this.realmName}/users`,
    login: `/auth/realms/${this.realmName}/protocol/openid-connect/token`,
    userInfo: `/auth/realms/${this.realmName}/protocol/openid-connect/userinfo`,
    adminUserInfo: `/auth/admin/realms/${this.realmName}/users/`,
    instrospect: `/auth/realms/${this.realmName}/protocol/openid-connect/token/introspect`,
    resetPassword: `/auth/admin/realms/${this.realmName}/users/`,
    bruteForceStatus: `/auth/admin/realms/${this.realmName}/attack-detection/brute-force/users/`,
    userEndpoint: `/auth/admin/realms/${this.realmName}/users`,
    roleEndpoint: `/auth/admin/realms/${this.realmName}/roles`,
  };

  async CreateUser(
    name: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<CreateUserResult> {
    this.logger.log(
      `Start Creating user with usernamename: ${email} `,
      KeycloakService.name,
    );
    const data = {
      firstName: name,
      lastName: lastname,
      email: email,
      emailVerified: false,
      username: email,
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
      enabled: true,
    };
    const res = await this.http
      .post(
        this.generateUrlRequest(this.urlPath.userEndpoint),
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${await this.getAdminToken()}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .toPromise();
    switch (res.status) {
      case HttpStatus.CREATED:
        return { isSuccess: true, error: null };
      case HttpStatus.BAD_REQUEST:
        return {
          isSuccess: false,
          error: res.data,
        };
      case HttpStatus.CONFLICT:
        return {
          isSuccess: false,
          error: await this.i18n.translate(
            'account.errors.username-already-exists',
          ),
        };
      default:
        return { isSuccess: false, error: res.data };
    }
  }

  async ConfirmEmail(user: User) {
    user.emailVerified = true;
    const idx = user.requiredActions.indexOf('VERIFY_EMAIL');

    if (idx >= 0) {
      user.requiredActions.splice(idx, 1);
    }
    const result = await this.Update(user.id, user);

    return result;
  }

  private async getAvailableRole(role: string) {
    const access_token = await this.getAdminToken();
    const result = await this.http
      .get(this.generateUrlRequest(`${this.urlPath.roleEndpoint}/${role}`), {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .toPromise();

    return result;
  }

  async AddRole(userId: string, role: string) {
    const access_token = await this.getAdminToken();

    const getRoleInfo = await this.getAvailableRole(role);

    if (getRoleInfo.status !== HttpStatus.OK) {
      return { isSuccess: false, error: getRoleInfo.data };
    }

    const result = await this.http
      .post(
        this.generateUrlRequest(
          `${this.urlPath.userEndpoint}/${userId}/role-mappings/realm`,
        ),
        [getRoleInfo.data],
        { headers: { Authorization: `Bearer ${access_token}` } },
      )
      .toPromise();

    switch (result.status) {
      case HttpStatus.NO_CONTENT:
        return { isSuccess: true, error: null };
      default:
        return { isSuccess: false, error: result.data };
    }
  }
  async RemoveRole(userId: string, role: string) {
    const access_token = await this.getAdminToken();

    const getRoleInfo = await this.getAvailableRole(role);

    if (getRoleInfo.status !== HttpStatus.OK) {
      return { isSuccess: false, error: getRoleInfo.data };
    }

    const result = await this.http
      .request({
        url: this.generateUrlRequest(
          `${this.urlPath.userEndpoint}/${userId}/role-mappings/realm`,
        ),
        method: 'DELETE',
        data: [getRoleInfo.data],
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .toPromise();

    switch (result.status) {
      case HttpStatus.NO_CONTENT:
        return { isSuccess: true, error: false };
      default:
        return { isSuccess: false, error: result.data };
    }
  }

  async FindByUsername(username: string): Promise<DefaultResult<User>> {
    try {
      return { isSuccess: true, data: await this.getByUsername(username) };
    } catch (e) {
      return {
        isSuccess: false,
        errorCode: HttpStatus.NOT_FOUND,
        data: e.message,
      };
    }
  }

  async Update(id: string, user: User): Promise<CreateUserResult> {
    const access_token = await this.getAdminToken();
    const res = await this.http
      .put(
        this.generateUrlRequest(`${this.urlPath.userEndpoint}/${id}`),
        user,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/json',
          },
        },
      )
      .toPromise();

    switch (res.status) {
      case HttpStatus.NO_CONTENT:
        return { isSuccess: true, error: null };
      default:
        return { isSuccess: false, error: res.data };
    }
  }

  async Login(
    username: string,
    password: string,
  ): Promise<DefaultResult<LoginResult>> {
    this.logger.log(
      `User try login with name: ${username}`,
      KeycloakService.name,
    );
    return await this.sendLoginRequest(username, password);
  }

  async Logout(user_id: string): Promise<any> {
    const access_token = await this.getAdminToken();
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    const url = this.generateUrlRequest(
      `${this.urlPath.userEndpoint}/${user_id}/logout`,
    );
    const result = await this.http
      .post(
        url,
        {},
        {
          headers: headers,
        },
      )
      .toPromise();
    switch (result.status) {
      case HttpStatus.NO_CONTENT:
        return true;
      default:
        return false;
    }
  }

  async LoginWithAuthorizationCode(
    code: string,
    redirect_uri?: string,
  ): Promise<DefaultResult> {
    const requestLogin = {
      client_id: this.config.get('KEYCLOAK_CLIENT_ID'),
      client_secret: this.config.get('KEYCLOAK_CLIENT_SECRET'),
      grant_type: 'authorization_code',
      scope: 'openid roles',
      code: code,
      redirect_uri: redirect_uri
        ? redirect_uri
        : this.config.get('REDIRECT_URI'),
    };

    const res = await this.http
      .post(
        this.generateUrlRequest(this.urlPath.login),
        stringify(requestLogin),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      )
      .toPromise();
    switch (res.status) {
      case HttpStatus.OK:
        return { isSuccess: true, data: res.data };
      case HttpStatus.BAD_REQUEST:
        this.logger.warn(stringify(res.data), KeycloakService.name);
        return { isSuccess: false, data: res.data };
      default:
        this.logger.log(stringify(res.data, KeycloakService.name));
        return { isSuccess: false, data: res.data, errorCode: res.status };
    }
  }

  async RefreshToken(refreshToken: string): Promise<DefaultResult> {
    const requestLogin = {
      client_id: this.config.get('KEYCLOAK_CLIENT_ID'),
      client_secret: this.config.get('KEYCLOAK_CLIENT_SECRET'),
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };

    const res = await this.http
      .post(
        this.config.get<string>('KEYCLOAK_URL').concat(this.urlPath.login),
        stringify(requestLogin),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      )
      .toPromise();

    switch (res.status) {
      case HttpStatus.OK:
        return { isSuccess: true, data: res.data };
      default:
        this.logger.warn(stringify(res.data, KeycloakService.name));
        return {
          isSuccess: false,
          errorCode: HttpStatus.UNAUTHORIZED,
          data: res.data,
        };
    }
  }

  async ResetPassword(username: string): Promise<ResetPasswordResult> {
    this.logger.log(
      `User generate reset password code with username: ${username}`,
      KeycloakService.name,
    );

    return await this.sendResetPasswordRequest(username);
  }

  async ResetPasswordChange(
    user_id: string,
    username: string,
    new_password: string,
  ): Promise<ResetPasswordChangeResult> {
    this.logger.log(
      `User reset password with name ${username}`,
      KeycloakService.name,
    );

    return await this.sendResetPasswordChange(user_id, new_password);
  }

  private getPublicKey(): string {
    const publicKey = this.config.get('KEYCLOAK_JWT_PUBLIC_KEY');
    return `-----BEGIN PUBLIC KEY-----
${publicKey}
-----END PUBLIC KEY-----`;
  }

  private validateToken(token: string) {
    return jwt.verify(token, this.getPublicKey());
  }

  async UserInfo(token: string): Promise<DefaultResult<InfoUserResult>> {
    try {
      const userInfo = this.validateToken(token);
      return {
        isSuccess: true,
        data: {
          email: userInfo['email'],
          email_verified: userInfo['email_verified'],
          family_name: userInfo['family_name'],
          given_name: userInfo['given_name'],
          name: userInfo['name'],
          preferred_username: userInfo['preferred_username'],
          roles: userInfo['roles'],
          phone: userInfo['phone'],
          profile_pic: userInfo['profile_pic'],
          sub: userInfo['sub'],
        },
      };
    } catch (e) {
      return { isSuccess: false, data: e.message };
    }
  }

  private async getUserInfo(token: string): Promise<InfoUserResult> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await this.http
      .get<InfoUserResult>(this.generateUrlRequest(this.urlPath.userInfo), {
        headers: headers,
      })
      .toPromise();

    if (result.status >= HttpStatus.BAD_REQUEST) {
      throw new Error();
    }

    return result.data;
  }

  async GetUserInfoByAdmin(username: string): Promise<any> {
    const access_token = await this.getAdminToken();
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    const result = await this.http
      .get(this.generateUrlRequest(`${this.urlPath.adminUserInfo}`), {
        params: { username: username },
        headers: headers,
      })
      .toPromise();

    return result.data;
  }

  private async getAdminToken(): Promise<string> {
    const requestLogin = {
      client_id: this.config.get('KEYCLOAK_CLIENT_ID_ADMIN'),
      grant_type: 'password',
      username: this.config.get('KEYCLOAK_USERNAME_ADMIN'),
      password: this.config.get('KEYCLOAK_PASSWORD_ADMIN'),
      scope: 'openid roles',
    };

    const res = await this.http
      .post(
        this.generateUrlRequest(this.urlPath.login),
        stringify(requestLogin),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      )
      .toPromise();
    const { access_token } = res.data;
    return access_token;
  }

  async GetUserRoles(userId: string) {
    const access_token = await this.getAdminToken();

    const result = await this.http
      .get(
        this.generateUrlRequest(
          `${this.urlPath.userEndpoint}/${userId}/role-mappings/realm`,
        ),
        { headers: { Authorization: `Bearer ${access_token}` } },
      )
      .toPromise();

    switch (result.status) {
      case HttpStatus.OK:
        return { isSuccess: true, data: result.data?.map((role) => role.name) };
      default:
        return { isSuccess: false, error: result.data };
    }
  }

  async GetUserBruteForce(uid: string): Promise<any> {
    const access_token = await this.getAdminToken();
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    const result = await this.http
      .get(`${this.generateUrlRequest(this.urlPath.bruteForceStatus)}${uid}`, {
        headers: headers,
      })
      .toPromise();
    return result.data;
  }

  async DeleteUserBruteForce(uid: string): Promise<DefaultResult> {
    const access_token = await this.getAdminToken();
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    const result = await this.http
      .delete(
        `${this.generateUrlRequest(this.urlPath.bruteForceStatus)}${uid}`,
        {
          headers: headers,
        },
      )
      .toPromise();

    switch (result.status) {
      case HttpStatus.NO_CONTENT:
        return { isSuccess: true };
      default:
        return { isSuccess: false, data: result.data };
    }
  }

  async FindByUserId(
    user_id: string,
  ): Promise<{
    isSuccess: boolean;
    user?: User;
    error?: any;
  }> {
    const access_token = await this.getAdminToken();

    const result = await this.http
      .get<User>(
        this.generateUrlRequest(`${this.urlPath.userEndpoint}/${user_id}`),
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .toPromise();

    if (!result.data) {
      return {
        isSuccess: false,
        error: await this.i18n.translate('keycloak.error.user-not-exist'),
      };
    }

    switch (result.status) {
      case HttpStatus.OK:
        return { isSuccess: true, user: result.data };
      default:
        return { isSuccess: false, error: result.data };
    }
  }

  async verifyToken(token: string): Promise<InfoUserResult> {
    const credentialsBase64 = Buffer.from(
      this.config.get('KEYCLOAK_CLIENT_ID') +
        ':' +
        this.config.get('KEYCLOAK_CLIENT_SECRET'),
    ).toString('base64');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentialsBase64}`,
    };

    const result = await this.http
      .post<InfoUserResult>(
        this.generateUrlRequest(this.urlPath.instrospect),
        stringify({ token: token }),
        {
          headers: headers,
        },
      )
      .toPromise();

    return result.data;
  }

  private async sendLoginRequest(
    username: string,
    password: string,
  ): Promise<DefaultResult> {
    const requestLogin = {
      client_id: this.config.get('KEYCLOAK_CLIENT_ID'),
      client_secret: this.config.get('KEYCLOAK_CLIENT_SECRET'),
      grant_type: 'password',
      username: username,
      password: password,
      scope: 'openid roles',
    };

    const res = await this.http
      .post(
        this.generateUrlRequest(this.urlPath.login),
        stringify(requestLogin),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      )
      .toPromise();

    switch (res.status) {
      case HttpStatus.OK:
        return { isSuccess: true, data: res.data };
      case HttpStatus.BAD_REQUEST:
        this.logger.warn(stringify(res.data), KeycloakService.name);
        return {
          isSuccess: false,
          data: res.data,
          errorCode: HttpStatus.BAD_REQUEST,
          error: res.data,
        };
      case HttpStatus.UNAUTHORIZED:
        this.logger.warn(stringify(res.data, KeycloakService.name));
        return { isSuccess: false, errorCode: HttpStatus.UNAUTHORIZED };
      default:
        return { isSuccess: false, errorCode: res.status, data: res.data };
    }
  }

  private async sendResetPasswordChange(
    user_id: string,
    new_password: string,
  ): Promise<ResetPasswordChangeResult> {
    const requestResetPassword = {
      type: 'password',
      temporary: false,
      value: new_password,
    };

    const access_token = await this.getAdminToken();

    const res = await this.http
      .put(
        this.generateUrlRequest(
          `${this.urlPath.resetPassword}${user_id}/reset-password`,
        ),
        JSON.stringify(requestResetPassword),
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .toPromise();

    switch (res.status) {
      case HttpStatus.NO_CONTENT:
        return {
          isSuccess: true,
          message: 'Password has updated',
        };
      case HttpStatus.UNAUTHORIZED:
        this.logger.log(stringify(res.data, KeycloakService.name));
        return {
          isSuccess: false,
          error: res.data,
        };
      case HttpStatus.BAD_REQUEST:
        this.logger.log(stringify(res.data, KeycloakService.name));
        return {
          isSuccess: false,
          error: res.data,
          message: 'No puedes repetir la contraseña anterior.',
        };
      default:
        return {
          isSuccess: false,
          error: res.data,
        };
    }
  }

  private async sendResetPasswordRequest(
    username: string,
  ): Promise<ResetPasswordResult> {
    const access_token = await this.getAdminToken();

    const user = await this.getByUsername(username);

    if (!user) {
      return {
        user_exist: false,
      };
    }

    const nonce = generateNonce();

    return {
      user_exist: true,
      user_id: user.id,
      username: user.username,
      token: access_token,
      nonce,
    };
  }

  private generateUrlRequest(path: string): string {
    return `${this.config.get<string>('KEYCLOAK_URL')}${path}`;
  }

  private async getByUsername(username: string) {
    const access_token = await this.getAdminToken();

    const result = await this.http
      .get<User[]>(this.generateUrlRequest(`${this.urlPath.userEndpoint}`), {
        params: {
          username: username,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .toPromise();

    if (!result.data[0]) {
      throw new Error(
        await this.i18n.translate('keycloak.error.user-not-exist'),
      );
    }

    return result.data[0];
  }
}

export default KeycloakService;
