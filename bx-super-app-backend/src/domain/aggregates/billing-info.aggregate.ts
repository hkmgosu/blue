import { AggregateRoot } from '@nestjs/cqrs';
import { PymeDoc } from 'src/commons/schemas/pyme.schema';
import { BillingInfoRequestedEvent } from '../events/billing-info-requested.event';

export default class BillingInfo extends AggregateRoot {
  constructor() {
    super();
  }

  pyme: PymeDoc;

  billingInfoRequested() {
    this.apply(new BillingInfoRequestedEvent(this.pyme.id));
  }
}
