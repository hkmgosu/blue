import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './commons/seeders/seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(AppModule)
    .then((appContext) => {
      const seeder = appContext.get(SeederService);
      seeder
        .seed()
        .catch((error) => {
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
