import ILegacyService, {
  CreateClientRequest,
  LegacyClientResult,
  UpdateClientRequest,
} from '../../src/commons/interfaces/service/ILegacyService.interface';
export default class FakeLegacyClientService implements ILegacyService {
  async CreateClient(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: CreateClientRequest,
  ): Promise<LegacyClientResult> {
    return { isSuccess: true };
  }
  async UpdateClient(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: UpdateClientRequest,
  ): Promise<LegacyClientResult> {
    return { isSuccess: true };
  }
}
