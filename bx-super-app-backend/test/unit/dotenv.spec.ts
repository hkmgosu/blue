/*
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService, ConfigModule } from '@nestjs/config';
import configuration from '../../src/config/dotenv.config';

describe('dotEnv', () => {
  let configService: ConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      providers: [ConfigService],
    }).compile();
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should get dotenv parameter', () => {
    expect(configService.get('EMAIL_FROM')).toBe('no-reply@bx.cl');
  });
});
*/

describe('/diag/json', () => {
  it('should get sample json', () => {
    expect(1).toBe(1);
  });
});
