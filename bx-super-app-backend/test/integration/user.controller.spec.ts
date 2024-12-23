import { CompanyInvitationRepository } from '../../src/repository/companyInvitation.repository';
import { COMPANY_INVITATION_REPOSITORY } from '../../src/commons/interfaces/repository/ICompanyInvitationRepository.interface';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import LoggerService from '../../src/services/logger.service';
import {
  AUTHENTICATION_SERVICE,
  PYME_REPOSITORY,
  USER_REPOSITORY,
} from '../../src/commons/interfaces';
import { FILE_STORAGE_SERVICE } from '../../src/commons/interfaces/service/IFileStorageService.interface';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { Types } from 'mongoose';
import FakeAuthorizationService from '../utils/fake-authorization.service';
import { S3Service as FakeS3Service } from '../utils/fake-s3.service';
import { UserController } from '../../src/api/user.controller';
import { UserSchema } from '../../src/commons/schemas/user.schema';
import UserRepository from '../../src/repository/user.repository';
import PymeRepository from '../../src/repository/pyme.repository';
import { PymeSchema } from '../../src/commons/schemas/pyme.schema';
import { ValidatePymeSchema } from '../../src/commons/schemas/validate-pyme.schema';
import { CompanyInvitationSchema } from '../../src/commons/schemas/invitation.schema';

describe('User Controller', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let pymeRepository: PymeRepository;
  let userRepository: UserRepository;
  let pyme_id: string;

  const fakeHeader = {
    Authorization: 'Bearer fake',
  };

  const failHeader = {
    Authorization: '',
  };

  type fakePymeType = {
    social_reason: string;
    email?: string;
    collaborators: Array<{
      user_id: string;
      status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
      is_admin: boolean;
    }>;
    billing_information: any;
    rut?: string;
    has_billing_information: boolean;
    shipping_average_weight?: string;
    shipping_type?: string;
    collaborator_quantity: string;
    shipping_quantity: string;
    other_type?: string;
    business_clasification: string;
  };

  const fakePyme: fakePymeType = {
    social_reason: 'Fake Stefanini One',
    rut: '17871104-0',
    collaborators: [
      {
        user_id: '706643a6-00cd-48eb-966d-99ae0a2c7f8g',
        status: 'ACCEPTED',
        is_admin: true,
      },
    ],
    billing_information: {},
    has_billing_information: false,
    shipping_average_weight: '',
    shipping_type: '',
    collaborator_quantity: '11_TO_50',
    shipping_quantity: '50_TO_100',
    other_type: '',
    business_clasification: '',
  };

  const fakeUser: {
    user_id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    roles?: Array<string>;
    pymes?: Types.ObjectId[];
    is_email_confirmed: boolean;
    pymes_object?: Array<void>;
    created?: Date;
    security_stamp: string;
    security_stamp_updated: Date;
    email_confirmation_code: string | number;
  } = {
    roles: ['offline_access', 'pyme', 'default', 'uma_authorization'],
    user_id: '706643a6-00cd-48eb-966d-99ae0a2c7f8c',
    email: 'pperez@pperez.co',
    username: 'pperez@pperez.co',
    first_name: 'Pedro',
    is_email_confirmed: true,
    last_name: 'Perez',
    phone: '123456789',
    pymes_object: [],
    email_confirmation_code: '456321',
    security_stamp: '435846',
    created: new Date(),
    security_stamp_updated: new Date(),
  };

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const mongoUri = await mongod.getUri();
            return {
              uri: mongoUri,
            };
          },
        }),
        MongooseModule.forFeature([
          { name: 'User', schema: UserSchema },
          { name: 'Pyme', schema: PymeSchema },
          { name: 'ValidatePyme', schema: ValidatePymeSchema },
          { name: 'CompanyInvitation', schema: CompanyInvitationSchema },
        ]),
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
          provide: PYME_REPOSITORY,
          useClass: PymeRepository,
        },
        {
          provide: FILE_STORAGE_SERVICE,
          useClass: FakeS3Service,
        },
        {
          provide: COMPANY_INVITATION_REPOSITORY,
          useClass: CompanyInvitationRepository,
        },
        LoggerService,
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(USER_REPOSITORY);
    pymeRepository = moduleRef.get<PymeRepository>(PYME_REPOSITORY);

    app = moduleRef.createNestApplication();

    await app.init();
  });

  beforeAll(async () => {
    const pyme = await pymeRepository.RegisterPyme(fakePyme);

    pyme_id = pyme._id;
    await userRepository.create({
      ...fakeUser,
      pymes: [Types.ObjectId(pyme._id)],
    });

    await userRepository.AddDefaultPyme(fakeUser.user_id, pyme._id);
  });

  describe('Get user info', () => {
    test('Should return 200 and info of a user', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/pyme2c/backend/v1/user')
        .set(fakeHeader)
        .expect(HttpStatus.OK);
      expect(res.body).toBeTruthy();
    });
  });

  describe('DOnt Get user info', () => {
    test('Should return 401', async () => {
      await request(app.getHttpServer())
        .get('/api/pyme2c/backend/v1/user')
        .set(failHeader)
        .expect(401);
    });
  });

  describe('Edit Default Pyme', () => {
    test('Should return 200 and success', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/user/edit-default-pyme')
        .set(fakeHeader)
        .send({
          pyme_id: pyme_id,
        })
        .expect(HttpStatus.OK);

      expect(res.body.is_success).toBeTruthy();
    });
  });

  describe('Dont Edit Default Pyme', () => {
    test('Should return 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/user/edit-default-pyme')
        .set(fakeHeader)
        .send({
          pyme_id: '5ff47797214de037ba1e1e32',
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(res.body.is_success).toBeFalsy();
    });
  });

  afterAll(async (done) => {
    await mongod.stop();
    await app.close();
    done();
  });
});
