import { ConfirmPymeEnum } from './../commons/schemas/pyme.schema';
import {
  IPymeRepository,
  PYME_REPOSITORY,
} from './../commons/interfaces/repository/IPymeRepository.interface';
import {
  Controller,
  Post,
  Inject,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import ClientUpdatedModel from '../models/legacy/client-updated.model';
import LoggerService from '../services/logger.service';
import { CLIENT_RETRY_REPOSITORY } from '../commons/interfaces/repository/IClientRetryRepository.interface';
import ClientRetryRepository from '../repository/client-retry.repository';
import { OperationEnum } from '../commons/schemas/client-retry.schema';

export type operationType = 'REQUEST_NEW_CUS' | 'REQUEST_UPD_CUS';
@Controller('/api/pyme2c/backend/v1/legacy')
export class LegacyController {
  constructor(
    @Inject(PYME_REPOSITORY) private readonly pymeRepository: IPymeRepository,
    private readonly loggerService: LoggerService,
    @Inject(CLIENT_RETRY_REPOSITORY)
    private readonly clientRetryRepository: ClientRetryRepository,
  ) {}
  @Post('/client-integration')
  async ClientIntegration(
    @Res() res: any,
    @Body() clientUpdateModel: ClientUpdatedModel,
  ) {
    try {
      this.loggerService.log(clientUpdateModel);
      const client = clientUpdateModel?.payload?.request;
      const operation = clientUpdateModel.operation;

      if (!client) {
        this.loggerService.warn(
          `No client in object: ${JSON.stringify(client)}`,
          LegacyController.name,
        );
        return res.status(HttpStatus.OK).send();
      }

      const customerResponse = clientUpdateModel?.payload?.response;
      const error = customerResponse?.error;
      const pyme = await this.pymeRepository.GetPymeByRut(
        `${client.codigoCliente}-${client.dvCliente}`,
      );

      if (!pyme) {
        this.loggerService.warn(
          `Pyme Not Found with rut : ${client.codigoCliente}-${client.dvCliente}`,
          LegacyController.name,
        );
        return res.status(HttpStatus.OK).send();
      }

      if (error.codigo === 0 || error.codigo === 20001) {
        await this.pymeRepository.UpdateConfirmPymeBilling(
          pyme.id,
          ConfirmPymeEnum.CONFIRMED,
          customerResponse.cuentaCorriente,
          customerResponse.sucursal,
          customerResponse.tipoCliente,
        );
        const find = await this.clientRetryRepository.findAndDelete(pyme.id);
        if (find) {
          this.loggerService.log(
            'Element removed from clientretries: ',
            JSON.stringify(find),
          );
        }
        this.loggerService.log(
          `Pyme updated Successfully with request: ${JSON.stringify(
            clientUpdateModel,
          )}`,
          LegacyController.name,
        );
      } else {
        let op: OperationEnum;
        if (operation === 'REQUEST_NEW_CUS') {
          op = OperationEnum.CREATE;
        } else if (operation === 'REQUEST_UPD_CUS') {
          op = OperationEnum.UPDATE;
        }
        const retryExists = await this.clientRetryRepository.find(pyme.id, op);
        if (!retryExists) {
          await this.clientRetryRepository.create(pyme.id, op);
        }
        await this.pymeRepository.UpdateConfirmPymeBilling(
          pyme.id,
          ConfirmPymeEnum.FAILED,
        );
        throw new Error(
          `Fail Pyme update with request: ${JSON.stringify(clientUpdateModel)}`,
        );
      }
    } catch (e) {
      this.loggerService.error(e, e.stack, LegacyController.name);
    }

    return res.status(HttpStatus.OK).send();
  }
}
