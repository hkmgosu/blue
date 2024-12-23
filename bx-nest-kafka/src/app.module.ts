import { ShippingModule } from './shipping/shipping.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuracion';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      connectionName: 'super_app_db',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(
          'Trying to connect Db : ',
          config.get<string>('database.host'),
        );
        return {
          uri: config.get('database.host'),
          dbName: config.get('database.name'),
          keepAlive: true,
          keepAliveInitialDelay: 10000,
        };
      },
    }),
    ShippingModule,
  ],
})
export class AppModule {}
