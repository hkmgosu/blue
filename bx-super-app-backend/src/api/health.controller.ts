import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Response } from 'express';

@Controller('/api/pyme2c/backend/v1')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly mongoHealth: MongooseHealthIndicator,
  ) {}

  @Get('/health/liveness')
  liveness(@Res() res: Response) {
    return res.status(HttpStatus.OK).send();
  }

  @Get('/health/readiness')
  @HealthCheck()
  check() {
    console.log('readiness');
    return this.health.check([
      () => this.mongoHealth.pingCheck('Mongo Connection', { timeout: 1500 }),
    ]);
  }
}
