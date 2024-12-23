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

import { PopupSchema } from '../../../src/commons/schemas/backoffice/popup.schema';
import {
  AUTHENTICATION_SERVICE,
  POPUP_REPOSITORY,
  USER_REPOSITORY,
} from '../../../src/commons/interfaces';
import PopupRepository from '../../../src/repository/backoffice/popup.repository';
import { PopupController } from '../../../src/api';
import { UserSchema } from '../../../src/commons/schemas/user.schema';
import { PymeSchema } from '../../../src/commons/schemas/pyme.schema';
import { ValidatePymeSchema } from '../../../src/commons/schemas/validate-pyme.schema';

describe('Pyme Controller', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  const fakeHeader = {
    Authorization: 'Bearer fake',
  };

  let popupRepository: PopupRepository;
  let popupId: string;
  type fakePopupType = {
    title: string;
    description: string;
    image?: string;
    show: boolean;
    type?: string;
    backgroundColor: string;
    titleColor: string;
    textColor: string;
  };
  const fakePopup: fakePopupType = {
    title: 'Titulo Fake 1',
    description: 'Lorem ipsum dolor sit amet',
    image: 'src/img',
    show: true,
    type: 'Success',
    backgroundColor: 'fffff',
    titleColor: 'fffff',
    textColor: 'fffff',
  };

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const moduleRef = await Test.createTestingModule({
      controllers: [PopupController],
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
          { name: 'Popup', schema: PopupSchema },
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
          provide: POPUP_REPOSITORY,
          useClass: PopupRepository,
        },
        LoggerService,
        ConfigService,
      ],
    }).compile();

    popupRepository = moduleRef.get<PopupRepository>(POPUP_REPOSITORY);

    app = moduleRef.createNestApplication();

    await app.init();
  });

  beforeAll(async () => {
    const popUp = await popupRepository.create(fakePopup);

    popupId = popUp.id;
  });

  describe('Get pyme info', () => {
    test('Should return 200', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/pyme2c/backend/v1/popup`)
        .set(fakeHeader)
        .expect(HttpStatus.OK);
      expect(res.body).toBeTruthy();
    });
  });

  describe('Get pyme info', () => {
    test('Should return 200', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/pyme2c/backend/v1/popup/find-one`)
        .set(fakeHeader)
        .expect(HttpStatus.OK);
      expect(res.body).toBeTruthy();
    });
  });

  describe('Create popup', () => {
    test('Should return 201', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/popup')
        .set(fakeHeader)
        .send({
          title: 'Titulo',
          description: 'Descripcion',
          image: '',
          show: true,
          type: 'Success',
          backgroundColor: '#fffff',
          titleColor: 'fffff',
          textColor: 'fffff',
        })
        .expect(HttpStatus.CREATED);
      expect(res.body);
    });
  });

  describe('Update Popup', () => {
    test('Should return 200', async () => {
      await request(app.getHttpServer())
        .put(`/api/pyme2c/backend/v1/popup/${popupId}`)
        .set(fakeHeader)
        .send({
          title: 'Nuevo Popup',
          description: 'Nueva Descripcion',
          show: true,
          type: 'Error',
          backgroundColor: '#fffff',
          titleColor: '#fffff',
          textColor: '#fffff',
        })
        .expect(HttpStatus.OK);
    });
  });

  afterAll(async (done) => {
    await mongod.stop();
    await app.close();
    done();
  });
});
