import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ClientRetryDoc,
  OperationEnum,
} from '../commons/schemas/client-retry.schema';
import { IClientRetryRepository } from '../commons/interfaces/repository/IClientRetryRepository.interface';

@Injectable()
export default class ClientRetryRepository implements IClientRetryRepository {
  constructor(
    @InjectModel('ClientRetry')
    private readonly clientRetryModel: Model<ClientRetryDoc>,
  ) {}
  async create(
    pyme_id: string,
    operation: OperationEnum,
  ): Promise<ClientRetryDoc> {
    return this.clientRetryModel.create({ pyme_id, operation });
  }
  async get(): Promise<ClientRetryDoc[]> {
    return this.clientRetryModel.find().exec();
  }

  async find(pyme_id: string, operation: OperationEnum) {
    return await this.clientRetryModel.findOne({
      pyme_id: pyme_id,
      operation: operation,
    });
  }

  async findAndDelete(pyme_id: string): Promise<ClientRetryDoc> {
    return this.clientRetryModel.findOneAndDelete({ pyme_id }).exec();
  }
}
