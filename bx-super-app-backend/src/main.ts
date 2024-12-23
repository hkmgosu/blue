import './tracer';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
// import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        {
          protocol: 'amqps',
          hostname: configService.get<string>('RABBITMQ_CONNECTIONSTRING'),
          port: 5671,
          vhost: '/',
          username: configService.get<string>('RABBITMQ_QUEUE_USERNAME'),
          password: configService.get<string>('RABBITMQ_QUEUE_PASSWORD'),
        },
      ],
      queue: configService.get<string>('RABBITMQ_QUEUE'),
      queueOptions: {
        durable: false,
      },
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Super APP')
      .setDescription('Super APP Services')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    // fs.writeFileSync('spec/swagger-spec.json', JSON.stringify(document));
    SwaggerModule.setup('swagger', app, document);
  }
  app.set('trust proxy', 1);

  app.use(json({ limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 500,
    }),
  );
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
