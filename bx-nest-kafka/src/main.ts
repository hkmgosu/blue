import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const configService = app.get(ConfigService);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: configService.get('kafka.brokers'),
  //       // ssl: {
  //       //   rejectUnauthorized: true,
  //       // },
  //       // sasl: {
  //       //   mechanism: 'plain',
  //       //   username: configService.get('kafka.username'),
  //       //   password: configService.get('kafka.password'),
  //       // },
  //       retry: {
  //         initialRetryTime: 2000,
  //         retries: 6,
  //       },
  //     },
  //     consumer: {
  //       groupId: configService.get('kafka.groupId'),
  //       sessionTimeout: 30000,
  //       readUncommitted: true,
  //       heartbeatInterval: 3000,
  //     },
  //     subscribe: {
  //       fromBeginning: true,
  //     },
  //     run: {
  //       autoCommit: true,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  // Logger.log(`microservices is running`);
  await app.listen(configService.get<number>('port'));
  Logger.log(`server on ${configService.get<number>('port')}`);
}
bootstrap();
