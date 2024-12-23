import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import LoggerService from 'src/services/logger.service';
import { BillingInfoRequestedEvent } from '../billing-info-requested.event';

@EventsHandler(BillingInfoRequestedEvent)
export class BillingInfoRequestedEventHandler
  implements IEventHandler<BillingInfoRequestedEvent> {
  constructor(private readonly loggerService: LoggerService) {}

  async handle(event: BillingInfoRequestedEvent) {
    this.loggerService.log(
      `Message sent correctly: : ${event.pymeId}`,
      BillingInfoRequestedEventHandler.name,
    );
  }
}
