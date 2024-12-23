import { HttpModule, INestApplication, HttpStatus } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import LoggerService from '../../../src/services/logger.service';

import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import FakeAuthorizationService from '../../utils/fake-authorization.service';
import UserRepository from '../../../src/repository/user.repository';
import { ConfigService } from '@nestjs/config';

import {
  AUTHENTICATION_SERVICE,
  USER_REPOSITORY,
} from '../../../src/commons/interfaces';
import { SettingsWhatsappController } from '../../../src/api';
import { UserSchema } from '../../../src/commons/schemas/user.schema';
import { SettingsSchema } from '../../../src/commons/schemas/backoffice/settings.schema';
import { SETTINGS_REPOSITORY } from '../../../src/commons/interfaces/repository/backoffice/ISettingsRepository.interface';
import SettingsRepository from '../../../src/repository/backoffice/settings.repository';
import { fakeSettings, FAKE_WHATSAPP_LINK } from '../../utils/fake-settings';
import { PymeSchema } from '../../../src/commons/schemas/pyme.schema';
import { ValidatePymeSchema } from '../../../src/commons/schemas/validate-pyme.schema';

describe('Settings Controller', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  const fakeHeader = {
    Authorization: 'Bearer fake',
  };

  let settingsRepository: SettingsRepository;
  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const moduleRef = await Test.createTestingModule({
      controllers: [SettingsWhatsappController],
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const mongoUri = await mongod.getUri();
            return {
              uri: mongoUri,
              useFindAndModify: false,
            };
          },
        }),
        MongooseModule.forFeature([
          { name: 'User', schema: UserSchema },
          { name: 'Pyme', schema: PymeSchema },
          { name: 'ValidatePyme', schema: ValidatePymeSchema },
          { name: 'Settings', schema: SettingsSchema },
        ]),
        I18nModule.forRootAsync({
          useFactory: () => {
            return {
              fallbackLanguage: 'en',
              parserOptions: {
                path: join(__dirname, '../../../src/i18n/'),
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
        HttpModule,
      ],
      providers: [
        {
          provide: AUTHENTICATION_SERVICE,
          useClass: FakeAuthorizationService,
        },
        {
          provide: USER_REPOSITORY,
          useClass: UserRepository,
        },
        {
          provide: SETTINGS_REPOSITORY,
          useClass: SettingsRepository,
        },
        LoggerService,
        ConfigService,
      ],
    }).compile();

    settingsRepository = moduleRef.get<SettingsRepository>(SETTINGS_REPOSITORY);

    app = moduleRef.createNestApplication();

    await app.init();
  });

  beforeAll(async () => {
    await settingsRepository.create(fakeSettings);
  });

  describe('Get Whatsapp Link', () => {
    test('Should return 200', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/pyme2c/backend/v1/settings/whatsapp-link`)
        .set(fakeHeader)
        .expect(HttpStatus.OK);
      expect(res.body.url).toBe(FAKE_WHATSAPP_LINK);
    });
  });

  describe('Update Whatsapp Link', () => {
    test('Should return 200', async () => {
      const new_link = 'http://new-fake-whatsapp-link.com';
      const res = await request(app.getHttpServer())
        .put(`/api/pyme2c/backend/v1/settings/whatsapp-link`)
        .set(fakeHeader)
        .send({ url: new_link })
        .expect(HttpStatus.OK);
      expect(res.body.whatsapp_info.url).toBe(new_link);
    });
  });

  afterAll(async (done) => {
    await mongod.stop();
    await app.close();
    done();
  });
});
