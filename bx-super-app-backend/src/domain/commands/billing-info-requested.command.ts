import { ICommand } from '@nestjs/cqrs';

export class BillingInfoRequestedCommand implements ICommand {
  constructor(public readonly emissionData: any) {}
}
