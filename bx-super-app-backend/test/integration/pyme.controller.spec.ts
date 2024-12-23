import { NOTIFICATION_SERVICE } from './../../src/commons/interfaces/service/INotificationService.interface';
import { CompanyInvitationRepository } from '../../src/repository/companyInvitation.repository';
import { COMPANY_INVITATION_REPOSITORY } from '../../src/commons/interfaces/repository/ICompanyInvitationRepository.interface';
import BillingInformationModel from '../../src/models/pyme/billing-info.model';
import { LEGACY_SERVICE } from './../../src/commons/interfaces/service/ILegacyService.interface';
import { HttpModule, INestApplication, HttpStatus } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import LoggerService from '../../src/services/logger.service';
import {
  AUTHENTICATION_SERVICE,
  PYME_REPOSITORY,
  PYME_SERVICE,
  USER_REPOSITORY,
} from '../../src/commons/interfaces';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import FakeAuthorizationService from '../utils/fake-authorization.service';
import { UserSchema } from '../../src/commons/schemas/user.schema';
import UserRepository from '../../src/repository/user.repository';
import PymeRepository from '../../src/repository/pyme.repository';
import { PymeSchema } from '../../src/commons/schemas/pyme.schema';
import { ValidatePymeSchema } from '../../src/commons/schemas/validate-pyme.schema';
import { Types } from 'mongoose';
import { PymeControllerV2 } from '../../src/api/pymev2.controller';
import PymeService from '../../src/services/pyme/pyme.service';
import { ConfigService } from '@nestjs/config';
import FakeLegacyClientService from '../../test/utils/fake-legacy-client.service';
import {
  CompanyInvitationSchema,
  InvitationStatus,
  InvitationType,
} from '../../src/commons/schemas/invitation.schema';
import FakeNotificationService from '../../test/utils/fake-notification.service';
import { InvitationTypeEnum } from '../../src/models/pyme/resend-invite-company.model';

describe('Pyme Controller', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let pymeRepository: PymeRepository;
  let userRepository: UserRepository;
  let companyInvitationRepository: CompanyInvitationRepository;

  const fakeHeader = {
    Authorization: 'Bearer fake',
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

  const fakePymeOne: fakePymeType = {
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

  const fakePyme: fakePymeType = {
    social_reason: 'Fake Stefanini',
    collaborators: [
      {
        user_id: '706643a6-00cd-48eb-966d-99ae0a2c7f8c',
        status: 'ACCEPTED',
        is_admin: true,
      },
      {
        user_id: '706643a6-00cd-48eb-966d-99ae0a2c7f8g',
        status: 'ACCEPTED',
        is_admin: false,
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

  let pymeId: string;

  type userType = {
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
  };

  const fakeUserOne: userType = {
    roles: ['offline_access', 'pyme', 'default', 'uma_authorization'],
    user_id: '706643a6-00cd-48eb-966d-99ae0a2c7f8g',
    email: 'pperezG@pperezG.co',
    username: 'pperezG@pperezG.co',
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

  const fakeUser: userType = {
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

  const fakeUser3: userType = {
    roles: ['offline_access', 'default', 'uma_authorization'],
    user_id: '706643a7-00cd-48eb-976d-99ae0a2c7f8c',
    email: 'someperson@someemail.com',
    username: 'someperson@someemail.com',
    first_name: 'Some',
    is_email_confirmed: true,
    last_name: 'Person',
    phone: '123456789',
    pymes_object: [],
    email_confirmation_code: '456123',
    security_stamp: '435634',
    created: new Date(),
    security_stamp_updated: new Date(),
  };

  let pymeInvitationIdMember: string;
  let pymeInvitationIdAdmin: string;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const moduleRef = await Test.createTestingModule({
      controllers: [PymeControllerV2],
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
          provide: PYME_REPOSITORY,
          useClass: PymeRepository,
        },
        {
          provide: PYME_SERVICE,
          useClass: PymeService,
        },
        {
          provide: LEGACY_SERVICE,
          useClass: FakeLegacyClientService,
        },
        {
          provide: COMPANY_INVITATION_REPOSITORY,
          useClass: CompanyInvitationRepository,
        },
        { provide: NOTIFICATION_SERVICE, useClass: FakeNotificationService },
        LoggerService,
        ConfigService,
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(USER_REPOSITORY);
    pymeRepository = moduleRef.get<PymeRepository>(PYME_REPOSITORY);
    companyInvitationRepository = moduleRef.get<CompanyInvitationRepository>(
      COMPANY_INVITATION_REPOSITORY,
    );

    app = moduleRef.createNestApplication();

    await app.init();
  });

  beforeAll(async () => {
    const pymeOne = await pymeRepository.RegisterPyme(fakePymeOne);
    const pyme = await pymeRepository.RegisterPyme(fakePyme);
    await userRepository.create([
      {
        ...fakeUser,
        pymes: [Types.ObjectId(pyme._id)],
      },
      {
        ...fakeUserOne,
        pymes: [Types.ObjectId(pymeOne._id)],
      },
      { ...fakeUser3, pymes: [] },
    ]);
    pymeId = pyme._id;
    const invitationBAMember = await companyInvitationRepository.addInvitation(
      pyme.id,
      pyme.social_reason,
      'someperson@someemail.com',
      InvitationStatus.PENDING,
      InvitationType.COLLABORATOR,
    );
    pymeInvitationIdMember = invitationBAMember.id;
  });

  describe('Get pyme info', () => {
    test('Should return 200 and info of a pyme', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/pyme2c/backend/v1/pyme/${pymeId}`)
        .set(fakeHeader)
        .expect(HttpStatus.OK);
      expect(res.body).toBeTruthy();
    });
  });

  describe('Get pyme info', () => {
    test('Fail to bring info of a pyme', async () => {
      await request(app.getHttpServer())
        .get(`/api/pyme2c/backend/v1/pyme/${pymeId}`)
        .set({})
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('Register pyme', () => {
    test('Should return 201', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/register')
        .set(fakeHeader)
        .send({
          user_id: fakeUser.user_id,
          collaborator_quantity: '51_TO_400',
          other_type: '',
          rut: '99535120-K',
          shipping_average: '12',
          shipping_quantity: '10_TO_49',
          shipping_type: 'TECHNOLOGY',
          social_reason: 'LOS PANCHITOS',
        })
        .expect(HttpStatus.CREATED);
      expect(res.body);
    });
  });

  describe('Register pyme', () => {
    test('Fail register pyme', async () => {
      await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/register')
        .set({})
        .send({ social_reason: 'fail' })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('Join user to pyme', () => {
    test('Should return 200', async () => {
      await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/join')
        .set(fakeHeader)
        .send({ social_reason: 'Fake Stefanini One' })
        .expect(HttpStatus.OK);
    });
    test('Should return 400', async () => {
      await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/join')
        .set(fakeHeader)
        .send({ social_reason: 'Fake Stefanini One' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
  describe('Join user to pyme', () => {
    test('Should fail registering a user', async () => {
      await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/join')
        .set(fakeHeader)
        .send({ social_reason: 'Fake' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Get users on a pyme', () => {
    test('Get users of a pyme', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/pyme2c/backend/v1/pyme/${pymeId}/collaborators`)
        .set(fakeHeader)
        .expect(HttpStatus.OK);
      expect(res.body).toBeTruthy();
    });
  });

  describe('Get users on a pyme', () => {
    test('fAIL GETTING users of a pyme', async () => {
      await request(app.getHttpServer())
        .get(`/api/pyme2c/backend/v1/pyme/${pymeId}/collaborators`)
        .set({})
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('Update pyme billing info', () => {
    test('Should return 200 and pyme updated', async () => {
      const req: BillingInformationModel = {
        rut: '18087062-9',
        commune: {
          code: '123456789',
          name: 'UnaCOmuna',
          base_post: 'SCL',
        },
        address: 'bxDirection',
        address_number: '676',
        postal_code: '900025',
        city_name: '1',
        email: 'test@test.cl',
        phone: '123456789',
        region: {
          name: 'Región Metropolitana de Santiago',
          region_iso_3166: 'CL-RM',
          region_number: '1',
        },
        client_type: '85',
        current_account: '',
        office: '1',
      };

      await request(app.getHttpServer())
        .put(`/api/pyme2c/backend/v1/pyme/${pymeId}/billing`)
        .set(fakeHeader)
        .send(req)
        .expect(HttpStatus.OK);
    });
  });

  describe('Get pyme billing boolean info', () => {
    test('Get pyme billing info boolean', async () => {
      await request(app.getHttpServer())
        .get(`/api/pyme2c/backend/v1/pyme/${pymeId}/billing`)
        .set(fakeHeader)
        .expect(HttpStatus.OK);
    });
  });

  describe('Send invitation to pyme', () => {
    test('Should return res invitation data array', async () => {
      const resInvitation = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/invite')
        .set(fakeHeader)
        .send({
          pyme_id: pymeId,
          email: ['otheremail@gmail.com'],
        });
      expect(resInvitation.status).toBe(200);
      expect(resInvitation.body[0].email).toBe('otheremail@gmail.com');
      expect(resInvitation.body[0].isSuccess).toBe(true);
    });
    test('Should return res invitation data array with isSuccess false', async () => {
      const resInvitation = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/invite')
        .set(fakeHeader)
        .send({
          pyme_id: pymeId,
          email: ['otheremail@gmail.com'],
        });
      expect(resInvitation.status).toBe(400);
      expect(resInvitation.body[0].email).toBe('otheremail@gmail.com');
      expect(resInvitation.body[0].isSuccess).toBe(false);
    });
    test('2 invitations should return res invitation data array', async () => {
      const resInvitation = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/invite')
        .set(fakeHeader)
        .send({
          pyme_id: pymeId,
          email: ['magicemail@gmail.com', 'magicemail@hotmail.com'],
        });
      expect(resInvitation.status).toBe(200);
      expect(resInvitation.body).toStrictEqual([
        {
          email: 'magicemail@gmail.com',
          isSuccess: true,
        },
        {
          email: 'magicemail@hotmail.com',
          isSuccess: true,
        },
      ]);
      expect(resInvitation.body[0].isSuccess).toBe(true);
      expect(resInvitation.body[1].isSuccess).toBe(true);
    });
    test('2 invitations should return status 400 and body invitation data array with isSuccess false', async () => {
      const resInvitation = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/invite')
        .set(fakeHeader)
        .send({
          pyme_id: pymeId,
          email: ['magicemail@gmail.com', 'magicemail@hotmail.com'],
        });
      expect(resInvitation.status).toBe(400);
      expect(resInvitation.body).toStrictEqual([
        {
          email: 'magicemail@gmail.com',
          isSuccess: false,
          message: 'Invitación ya existente.',
        },
        {
          email: 'magicemail@hotmail.com',
          isSuccess: false,
          message: 'Invitación ya existente.',
        },
      ]);
      expect(resInvitation.body[0].isSuccess).toBe(false);
      expect(resInvitation.body[1].isSuccess).toBe(false);
    });
    test('Should return status 400 and body invitation data array with isSuccess false', async () => {
      const resInvitation = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/invite')
        .set(fakeHeader)
        .send({
          pyme_id: pymeId,
          email: ['pperez@pperez.co'],
        });
      expect(resInvitation.status).toBe(400);
      expect(resInvitation.body).toStrictEqual([
        {
          email: 'pperez@pperez.co',
          isSuccess: false,
          message: 'Los invitados no pueden ser colaboradores activos.',
        },
      ]);
      expect(resInvitation.body[0].isSuccess).toBe(false);
    });
  });

  describe('Send invitation assign admin to pyme', () => {
    test('Should return res invitation data', async () => {
      const resInvitation = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/admin-invite')
        .set(fakeHeader)
        .send({
          pyme_id: pymeId,
          email: 'pperezG@pperezG.co',
        });
      expect(resInvitation.status).toBe(200);
      expect(resInvitation.body.email).toBe('pperezG@pperezG.co');
      expect(resInvitation.body.isSuccess).toBe(true);
    });
    test('Should return res status 400', async () => {
      const resInvitation = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/admin-invite')
        .set(fakeHeader)
        .send({
          pyme_id: pymeId,
          email: 'pperezG@pperezG.co',
        });
      expect(resInvitation.status).toBe(400);
      expect(resInvitation.body.message).toBe(
        'Sólo puede haber una invitación activa.',
      );
    });
  });

  describe('Get all invitations by email and status', () => {
    test('Get all invitations ', async () => {
      const invitationsFound = await request(app.getHttpServer())
        .get(
          `/api/pyme2c/backend/v1/pyme/invitations-by-email-and-status/pperezG@pperezG.co/${InvitationStatus.PENDING}`,
        )
        .set(fakeHeader)
        .expect(HttpStatus.OK);
      pymeInvitationIdAdmin = invitationsFound.body.invitations[0]._id;
      expect(invitationsFound.body.message).toBe('Invitations found');
    });
  });

  describe('Get all invitations by pyme and status', () => {
    test('Get all invitations ', async () => {
      const invitationsFound = await request(app.getHttpServer())
        .get(
          `/api/pyme2c/backend/v1/pyme/invitations-by-pyme/${InvitationStatus.PENDING}`,
        )
        .set(fakeHeader)
        .expect(HttpStatus.OK);

      expect(invitationsFound.body.message).toBe('Invitations found');
    });
  });

  describe('Resend invitation', () => {
    test('Post resend member invitation and get body message', async () => {
      const invitationResend = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/resend-invitation')
        .set(fakeHeader)
        .send({
          invitation_id: pymeInvitationIdMember,
          invitationType: InvitationTypeEnum.MEMBER,
        })
        .expect(HttpStatus.OK);
      expect((invitationResend.body as { message: string }).message).toBe(
        'Invitation resent',
      );
    });
    test('Post resend admin invitation and get body message', async () => {
      const invitationResend = await request(app.getHttpServer())
        .post('/api/pyme2c/backend/v1/pyme/resend-invitation')
        .set(fakeHeader)
        .send({
          invitation_id: pymeInvitationIdAdmin,
          invitationType: InvitationTypeEnum.ADMIN,
        })
        .expect(HttpStatus.OK);
      expect((invitationResend.body as { message: string }).message).toBe(
        'Invitation resent',
      );
    });
  });

  describe('Cancel invitation', () => {
    test('Delete member invitation and get body message', async () => {
      const invitationDeleted = await request(app.getHttpServer())
        .delete(
          `/api/pyme2c/backend/v1/pyme/cancel-invitation/${pymeInvitationIdMember}`,
        )
        .set(fakeHeader)
        .expect(HttpStatus.OK);
      expect((invitationDeleted.body as { message: string }).message).toBe(
        'Invitation canceled',
      );
    });
    test('Delete admin invitation and get body message', async () => {
      const invitationDeleted = await request(app.getHttpServer())
        .delete(
          `/api/pyme2c/backend/v1/pyme/cancel-invitation/${pymeInvitationIdAdmin}`,
        )
        .set(fakeHeader)
        .expect(HttpStatus.OK);
      expect((invitationDeleted.body as { message: string }).message).toBe(
        'Invitation canceled',
      );
    });
  });

  afterAll(async (done) => {
    await mongod.stop();
    await app.close();
    done();
  });
});
