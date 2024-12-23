import {
  ClientRetryDoc,
  OperationEnum,
} from '../../schemas/client-retry.schema';

export const CLIENT_RETRY_REPOSITORY = 'CLIENT_RETRY_REPOSITORY';

export type OperationType = 'create' | 'update';
export interface IClientRetryRepository {
  create(pyme_id: string, operation: OperationEnum): Promise<ClientRetryDoc>;
  get(): Promise<ClientRetryDoc[]>;
  findAndDelete(pyme_id: string): Promise<ClientRetryDoc>;
  find(pyme_id: string, operation: OperationEnum): Promise<ClientRetryDoc>;
}
