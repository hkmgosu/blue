import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { Shipping, ShippingSchema } from '../schemas/shipping.schema';
import LoggerService from '../logger/logger.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Shipping.name, schema: ShippingSchema }],
      'super_app_db',
    ),
    ConfigModule,
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
            // ssl: {
            //   rejectUnauthorized: true,
            // },
            // sasl: {
            //   mechanism: 'plain',
            //   username: configService.get('kafka.username'),
            //   password: configService.get('kafka.password'),
            // },
            retry: {
              initialRetryTime: 2000,
              retries: 6,
            },
          },
        },
      },
    ]),
  ],
  controllers: [ShippingController],
  providers: [LoggerService],
})
export class ShippingModule {}
