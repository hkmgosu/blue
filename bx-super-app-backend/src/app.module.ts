import { S3Service } from './services/s3.service';
import { FILE_STORAGE_SERVICE } from './commons/interfaces/service/IFileStorageService.interface';
import { LEGACY_SERVICE } from './commons/interfaces/service/ILegacyService.interface';
import { LegacyClientService } from './services/legacy.service';
import { NotificationService } from './services/notification.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exception.filter';
import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import LoggerService from './services/logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import configuration from './config/dotenv.config';
import { SeederService } from './commons/seeders/seeder.service';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import KeycloakService from './services/keycloak.service';
import UserRepository from './repository/user.repository';
import PymeService from './services/pyme/pyme.service';
import PymeRepository from './repository/pyme.repository';
import { PymeSchema } from './commons/schemas/pyme.schema';
import { ValidatePymeSchema } from './commons/schemas/validate-pyme.schema';
import { CompanyInvitationSchema } from './commons/schemas/invitation.schema';
import {
  AUTHENTICATION_SERVICE,
  NOTIFICATION_SERVICE,
  POPUP_REPOSITORY,
  PYME_REPOSITORY,
  PYME_SERVICE,
  USER_REPOSITORY,
} from './commons/interfaces';
import { UserSchema } from './commons/schemas/user.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventHandlers } from './domain/events/handlers';
import { CommandHandlers } from './domain/commands/handlers';
import { BackendMSControllers } from './api';
import ClientRetryRepository from './repository/client-retry.repository';
import { CLIENT_RETRY_REPOSITORY } from './commons/interfaces/repository/IClientRetryRepository.interface';
import { ClientRetrySchema } from './commons/schemas/client-retry.schema';
import { COMPANY_INVITATION_REPOSITORY } from './commons/interfaces/repository/ICompanyInvitationRepository.interface';
import { CompanyInvitationRepository } from './repository/companyInvitation.repository';
import PopupRepository from './repository/backoffice/popup.repository';
import { PopupSchema } from './commons/schemas/backoffice/popup.schema';
import { SETTINGS_REPOSITORY } from './commons/interfaces/repository/backoffice/ISettingsRepository.interface';
import SettingsRepository from './repository/backoffice/settings.repository';
import { SettingsSchema } from './commons/schemas/backoffice/settings.schema';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TerminusModule,
    CqrsModule,
    HttpModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoConnection'),
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Pyme', schema: PymeSchema },
      { name: 'ValidatePyme', schema: ValidatePymeSchema },
      { name: 'ClientRetry', schema: ClientRetrySchema },
      { name: 'CompanyInvitation', schema: CompanyInvitationSchema },
      { name: 'Popup', schema: PopupSchema },
      { name: 'Settings', schema: SettingsSchema },
    ]),
    I18nModule.forRootAsync({
      useFactory: () => {
        return {
          fallbackLanguage: 'en',
          parserOptions: {
            path: join(__dirname, '/i18n/'),
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
    ClientsModule.registerAsync([
      {
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              {
                protocol: 'amqps',
                hostname: configService.get<string>(
                  'RABBITMQ_CONNECTIONSTRING',
                ),
                port: 5671,
                vhost: '/',
                username: configService.get<string>('RABBITMQ_QUEUE_USERNAME'),
                password: configService.get<string>('RABBITMQ_QUEUE_PASSWORD'),
              },
            ],
            queue: configService.get<string>('RABBITMQ_EMISSION_QUEUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        imports: [ConfigModule],
        name: 'RABBIT_CLIENT',
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: BackendMSControllers,
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationService,
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
      provide: AUTHENTICATION_SERVICE,
      useClass: KeycloakService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: LEGACY_SERVICE,
      useClass: LegacyClientService,
    },
    {
      provide: FILE_STORAGE_SERVICE,
      useClass: S3Service,
    },
    {
      provide: CLIENT_RETRY_REPOSITORY,
      useClass: ClientRetryRepository,
    },
    {
      provide: COMPANY_INVITATION_REPOSITORY,
      useClass: CompanyInvitationRepository,
    },
    {
      provide: POPUP_REPOSITORY,
      useClass: PopupRepository,
    },
    {
      provide: SETTINGS_REPOSITORY,
      useClass: SettingsRepository,
    },
    LoggerService,
    SeederService,
    ...EventHandlers,
    ...CommandHandlers,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly http: HttpService) {}
  onModuleInit() {
    this.http.axiosRef.interceptors.response.use(undefined, (error) => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (!expectedError) {
        return Promise.reject(error);
      }

      return error.response;
    });
  }
}
