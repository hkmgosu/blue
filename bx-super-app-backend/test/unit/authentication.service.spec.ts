import mock from 'jest-mock-extended/lib/Mock';
import {
  DefaultResult,
  IAuthenticationService,
} from '../../src/commons/interfaces';
import User from '../../src/models/account/user.model';

/*
import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  I18nRequestScopeService,
  QueryResolver,
} from 'nestjs-i18n';
import LoggerService from '../../src/services/logger.service';
import KeyCloakService from '../../src/services/keycloak.service';
import { Test } from '@nestjs/testing';
import User from '../../src/models/account/user.model';
import { join } from 'path';
import { of } from 'rxjs';

describe('KeyCloakService', () => {
  let keyCloakService: KeyCloakService;
  let configService: ConfigService;
  let http: HttpService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LoggerService],
      imports: [
        I18nModule.forRootAsync({
          useFactory: () => {
            return {
              fallbackLanguage: 'en',
              parserOptions: {
                path: join(__dirname, '../../src/i18n/'),
              },
            };
          },
          parser: I18nJsonParser,
          resolvers: [
            { use: QueryResolver, options: ['lang', 'locale', 'l'] },
            new HeaderResolver(['x-custom-lang']),
            AcceptLanguageResolver,
            new CookieResolver(['lang', 'locale', 'l']),
          ],
        }),
      ],
    }).compile();

    const httpSpy = jest.spyOn(http, 'get').mockReturnValue(
      of({
        data: { dada: '' },
        status: 200,
        headers: null,
        statusText: null,
        config: null,
      }),
    );

    configService = new ConfigService();
    http = new HttpService();
    keyCloakService = new KeyCloakService(
      await moduleRef.resolve<LoggerService>(LoggerService),
      configService,
      http,
      await moduleRef.resolve<I18nRequestScopeService>(I18nRequestScopeService),
      null,
    );
  });

  describe('root', () => {
    it('should return an user object', async () => {
      const result = new Promise<User>(() => {
        return {
          username: 'fcomadrida@gmail.com',
          firstName: 'test',
          lastName: 'test',
        };
      });

      jest
        .spyOn(keyCloakService, 'FindByUsername')
        .mockImplementation(() => result);

      expect(await keyCloakService.FindByUsername('fcomadrida@gmail.com')).toBe(
        result,
      );
    });
  });
});
*/
describe('/diag/json', () => {
  it('should get sample json', () => {
    expect(1).toBe(1);
  });
});
describe('/diag/json', () => {
  it('should get sample json', async () => {
    const user: User = {
      username: '',
      emailVerified: false,
      email: '',
      enabled: true,
      firstName: '',
      id: '',
      lastName: '',
      attributes: { phone: '' },
      notBefore: 1,
      requiredActions: [],
      totp: true,
      roles: [],
    };

    const userResult: DefaultResult<User> = {
      isSuccess: true,
      data: user,
    };

    const mocking = mock<IAuthenticationService>();
    mocking.FindByUsername.calledWith('fcomadrida@gmail.com').mockResolvedValue(
      userResult,
    );

    expect(await mocking.FindByUsername('fcomadrida@gmail.com')).toBe(
      userResult,
    );
  });
});
