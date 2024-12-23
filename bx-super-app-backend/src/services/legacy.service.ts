import { ConfigService } from '@nestjs/config';
import { Injectable, HttpService, Inject } from '@nestjs/common';
import ILegacyClientService, {
  CreateClientRequest,
  LegacyClientResult,
  UpdateClientRequest,
} from '../commons/interfaces/service/ILegacyService.interface';
import LoggerService from './logger.service';

@Injectable()
export class LegacyClientService implements ILegacyClientService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject('LoggerService') private readonly logger: LoggerService,
  ) {}
  async CreateClient(
    request: CreateClientRequest,
  ): Promise<LegacyClientResult> {
    this.logger.log(
      `create client for legacy body: ${request}`,
      LegacyClientService.name,
    );
    this.logger.log(
      `legacy url ${this.getUrlPath('async/create')}`,
      LegacyClientService.name,
    );

    const result = await this.httpService
      .post<boolean>(this.getUrlPath('async/create'), request)
      .toPromise();

    return {
      isSuccess: result.data,
    };
  }
  async UpdateClient(
    request: UpdateClientRequest,
  ): Promise<LegacyClientResult> {
    const result = await this.httpService
      .post<boolean>(this.getUrlPath('async/update'), request)
      .toPromise();

    return {
      isSuccess: result.data,
    };
  }

  private getUrlPath(path: string) {
    return `${this.configService.get('LEGACY_CLIENT_URL')}/${path}`;
  }
}
