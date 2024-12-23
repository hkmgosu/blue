import { BillingInformation } from './../../../commons/schemas/pyme.schema';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IPymeRepository, PYME_REPOSITORY } from 'src/commons/interfaces';
import { BillingInfoRequestedCommand } from '../billing-info-requested.command';
import LoggerService from '../../../services/logger.service';
import { ClientProxy } from '@nestjs/microservices';
import BLUE_BILLING from '../../../utils/bluex-billing';

@CommandHandler(BillingInfoRequestedCommand)
export class BillingInfoRequestedCommandHandler
  implements ICommandHandler<BillingInfoRequestedCommand> {
  constructor(
    @Inject(PYME_REPOSITORY)
    private readonly pymeRepository: IPymeRepository,
    private readonly loggerService: LoggerService,
    @Inject('RABBIT_CLIENT') private readonly client: ClientProxy,
  ) {}
  async execute(command: BillingInfoRequestedCommand): Promise<any> {
    this.loggerService.log(
      'BillingInfoRequested with emission',
      BillingInfoRequestedCommand.name,
    );
    this.loggerService.log(command.emissionData);
    const pyme = await this.pymeRepository.getById(command.emissionData.pymeId);

    let payload: any;
    if (!pyme.billing_information) {
      const billing_info: BillingInformation = {
        address: BLUE_BILLING.address,
        address_number: BLUE_BILLING.address_number,
        city_name: BLUE_BILLING.city_name,
        rut: BLUE_BILLING.rut,
        postal_code: BLUE_BILLING.postal_code,
        legacy_id: BLUE_BILLING.legacy_id,
        contact_name: BLUE_BILLING.contact_name,
        phone: BLUE_BILLING.phone,
        email: BLUE_BILLING.email,
        commune: BLUE_BILLING.commune,
        region: BLUE_BILLING.region,
      };
      payload = {
        pyme: pyme,
        pymeBillingInfo: billing_info,
        emissionId: command.emissionData.emissionId,
      };
    } else {
      payload = {
        pyme,
        pymeBillingInfo: pyme.billing_information,
        emissionId: command.emissionData.emissionId,
      };
    }

    this.client.emit('pyme-billing-info', payload);

    this.loggerService.log(
      'Billing info Command created successfully',
      BillingInfoRequestedCommandHandler.name,
    );

    return pyme;
  }
}
