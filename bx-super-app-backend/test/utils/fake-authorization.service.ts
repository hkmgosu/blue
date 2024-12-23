import User from '../../src/models/account/user.model';
import {
  DefaultResult,
  FakeIAuthenticationService,
  InfoUserResult,
} from '../../src/commons/interfaces';

export default class FakeAuthorizationService
  implements FakeIAuthenticationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async AddRole(_username: string, _role: string): Promise<any> {
    return {
      username: 'ppereze@ppereze.com',
      role: 'rol',
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async UserInfo(token: string): Promise<DefaultResult<InfoUserResult>> {
    return {
      data: {
        sub: '706643a6-00cd-48eb-966d-99ae0a2c7f8c',
        email_verified: true,
        roles: [
          'default',
          'pyme',
          'offline_access',
          'uma_authorization',
          'backoffice',
        ],
        name: 'Pedro Perez',
        preferred_username: 'ppereze@ppereze.com',
        given_name: 'Pedro',
        family_name: 'Perez',
        email: 'pperez@pperez.com',
        active: true,
      },
      isSuccess: true,
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async VerifyToken(token: string): Promise<boolean> {
    return true;
  }

  async FindByUserId(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user_id: string,
  ): Promise<{
    isSuccess: boolean;
    user?: User;
    error?: any;
  }> {
    return {
      isSuccess: true,
      user: {
        id: '706643a6-00cd-48eb-966d-99ae0a2c7f8c',
        username: 'pperez@pperez.com',
        enabled: true,
        totp: false,
        emailVerified: true,
        firstName: 'Pedro',
        lastName: 'Perez',
        attributes: { phone: '123456789' },
        email: 'pperez@pperez.com',
        notBefore: 0,
        requiredActions: [],
        roles: ['default', 'pyme', 'offline_access', 'uma_authorization'],
      },
    };
  }

  async FindByUsername(username: string): Promise<DefaultResult<User>> {
    const users: User[] = [
      {
        id: '06643a7-00cd-48eb-976d-99ae0a2c7f8c',
        username: 'someperson@someemail.com',
        enabled: true,
        totp: false,
        emailVerified: true,
        firstName: 'Pedro',
        lastName: 'Perez',
        attributes: { phone: '123456789' },
        email: 'someperson@someemail.com',
        notBefore: 0,
        requiredActions: [],
        roles: ['default', 'offline_access', 'uma_authorization'],
      },
      {
        id: '706643a6-00cd-48eb-966d-99ae0a2c7f8g',
        username: 'pperezG@pperezG.co',
        enabled: true,
        totp: false,
        emailVerified: true,
        firstName: 'Pedro',
        lastName: 'Perez',
        attributes: {
          phone: '123456789',
        },
        email: 'pperezG@pperezG.co',
        notBefore: 0,
        requiredActions: [],
        roles: ['offline_access', 'pyme', 'default', 'uma_authorization'],
      },
      {
        id: '706643a6-00cd-48eb-966d-99ae0a2c7f8c',
        username: 'pperez@pperez.co',
        enabled: true,
        totp: false,
        emailVerified: true,
        firstName: 'Pedro',
        lastName: 'Perez',
        attributes: {
          phone: '123456789',
        },
        email: 'pperez@pperez.co',
        notBefore: 0,
        requiredActions: [],
        roles: ['offline_access', 'pyme', 'default', 'uma_authorization'],
      },
    ];
    const foundUser = users.find(
      (userFound) => userFound.username === username,
    );
    if (foundUser) {
      return new Promise((resolve) => {
        return setTimeout(() => {
          resolve({
            data: foundUser,
            isSuccess: true,
          });
        }, 1000);
      });
    }
    return {
      data: null,
      isSuccess: false,
    };
  }
}
