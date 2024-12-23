import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import CreateClientRetryModel from '../models/pyme/create-client-retry.model';
import { CLIENT_RETRY_REPOSITORY } from '../commons/interfaces/repository/IClientRetryRepository.interface';
import ClientRetryRepository from '../repository/client-retry.repository';
import ILegacyClientService, {
  BaseClientRequest,
  LEGACY_SERVICE,
} from '../commons/interfaces/service/ILegacyService.interface';

import { PYME_REPOSITORY, PYME_SERVICE } from '../commons/interfaces';
import PymeRepository from '../repository/pyme.repository';
import PymeService from '../services/pyme/pyme.service';
import { OperationEnum } from '../commons/schemas/client-retry.schema';
import { LoggerService } from '../services';

@ApiTags('Jobs Controller')
@Controller('/jobs')
export class JobsController {
  constructor(
    @Inject(CLIENT_RETRY_REPOSITORY)
    private readonly clientRetryRepository: ClientRetryRepository,
    @Inject(LEGACY_SERVICE)
    private readonly legacyClientService: ILegacyClientService,
    @Inject(PYME_REPOSITORY) private readonly pymeRepository: PymeRepository,
    @Inject(PYME_SERVICE) private readonly pymeService: PymeService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post()
  async createRetry(@Body() req: CreateClientRetryModel) {
    return this.clientRetryRepository.create(req.pyme_id, req.operation);
  }
  @Post('retry')
  async retryClients(@Res() res: any) {
    try {
      const retries = this.clientRetryRepository.get();
      const retriesPromises = (await retries).map(async (retry) => {
        const pyme = await this.pymeRepository.getById(retry.pyme_id);
        if (!pyme) {
          this.loggerService.log(`pyme with id: ${retry.pyme_id} not found`);
        } else {
          const newLegacyClient: BaseClientRequest = this.pymeService.createClientRequest(
            pyme,
            pyme.billing_information,
          );
          switch (retry.operation) {
            case OperationEnum.CREATE:
              return this.legacyClientService.CreateClient({
                ...newLegacyClient,
                tipoCliente: '85',
                idUsuario: pyme.billing_information.legacy_id,
              });
            case OperationEnum.UPDATE:
              return this.legacyClientService.UpdateClient({
                ...newLegacyClient,
                sucursal: '1',
                idUsuario: pyme.billing_information.legacy_id,
              });
          }
        }
      });
      Promise.all(retriesPromises)
        .then((resp) => {
          return res.status(HttpStatus.CREATED).json(resp);
        })
        .catch((err) => {
          throw new BadRequestException(err);
        });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
