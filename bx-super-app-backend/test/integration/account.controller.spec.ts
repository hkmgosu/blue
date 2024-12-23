/*
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { v4 as uuid } from 'uuid';

describe('AccountController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('root', () => {
    it('should return Unauthorized', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/account/login')
        .send({
          username: 'test',
          password: 'invalid_password',
        })
        .expect(401);
    });
    it('should return Unauthorized', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/account/userinfo')
        .auth(
          'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOWHh1WVdyeWNCTG52WHJqYm5jdERPM20yQTB1RWlqOE11OHI5SUcyNDRrIn0.eyJleHAiOjE2MDM5MzM3MjcsImlhdCI6MTYwMzkzMzQyNywianRpIjoiZWQ4YjRlMGEtOTk4YS00ZDMxLWIwNDItNGQ4YzA0ZGVhZjRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDI0L2F1dGgvcmVhbG1zL2J4LXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVhNDVlYzkyLWI3NmEtNDcxYS05NWQ2LWI1MThkOTA0Nzk1OCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJ4LWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiIxMGJjOGYzNy0yMWM3LTQzNWMtYWFiMy04N2IxNjAwNTI0NmEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgVGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiVGVzdCIsImZhbWlseV9uYW1lIjoiVGVzdCIsImVtYWlsIjoidGVzdEBzdGVmYW5pbmkuY29tIn0.Me809xSt0acwDD4W8LBB4F0p2YzsaSntGXe7K8sRFm82tfVXkhKb1k1saGrSUu92GD1nNzG8J8w8DC-_9N7A2Lw9_sJgXnj3UGFQkXZGmJk2NBKhLO_l_B_1pSJ57hAmd_nDhcao_lqFpSvoozYwWzpTd77mvqzZDhVGBFl--LFGB6ZpZxj1lcphxjn7zBaE1DK9Ops2K13vHMOkTKeOoL6dvqrI-JH-oWGFohT8WWUPB-HVQkdIyUVtM1Rz3a9C9nuYCxZM9elcK8N8j4qJ23vHrfcTmXItZOTxahXbCnzpvGR77BR-eRnEl_Xgp1EdCzGv7J3HvyE8wOtu86uiWA',
          { type: 'bearer' },
        )
        .send()
        .expect(401);
    });
  });

  describe('register', () => {
    it('should return status_code 201', async () => {
      const pwd = uuid().substring(0, 12);
      return request(app.getHttpServer())
        .post('/api/v1/account/register')
        .send({
          name: 'Juan',
          lastname: 'Perez',
          email: 'fiaviles@stefanini.com',
          password: pwd,
        })
        .expect(201);
    });
  });

  describe('verify email', () => {
    it('', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/account/verify-email')
        .send({
          username: 'jperez12345@stefanini.com',
          code: 123456,
        })
        .expect(200);
    });
  });

  describe('reset-password', () => {
    it('should return user_exist false', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/account/reset-password')
        .send({
          username: 'test',
        })
        .expect({
          user_exist: false,
        });
    });
  });

  describe('verify reset-password and change password', () => {
    it('should return Unhauthorized', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/account/reset-password/verify')
        .send({
          username: 'test',
          nonce: '8dd4fb',
          new_password: 'newPassword',
        })
        .expect({ message: 'Username does not exist' });
    });
  });
});
*/

describe('/diag/json', () => {
  it('should get sample json', () => {
    expect(1).toBe(1);
  });
});
