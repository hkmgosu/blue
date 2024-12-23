import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { BillingInfoRequestedCommand } from '../domain/commands/billing-info-requested.command';

@Controller()
export class QueueController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern('billing-info-request-event')
  async billingInfoRequestEvent(payload: any) {
    await this.commandBus.execute(new BillingInfoRequestedCommand(payload));
    return;
  }
}
