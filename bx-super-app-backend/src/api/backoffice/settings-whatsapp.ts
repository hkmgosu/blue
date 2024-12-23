import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateWhatsappRequest } from '../../models/backoffice/update-whatsapp.model';
import { Authorize } from '../../commons/decorators/authorize.decorator';
import {
  ISettingsRepository,
  SETTINGS_REPOSITORY,
} from '../../commons/interfaces/repository/backoffice/ISettingsRepository.interface';

@ApiTags('Settings')
@Controller('/api/pyme2c/backend/v1/settings/whatsapp-link')
export class SettingsWhatsappController {
  constructor(
    @Inject(SETTINGS_REPOSITORY)
    private readonly settingsRepository: ISettingsRepository,
  ) {}

  @Authorize()
  @ApiResponse({ status: HttpStatus.OK, description: 'Get Whatsapp Link' })
  @Get('')
  @ApiOperation({ summary: 'Get Whatsapp Link' })
  async getLink(@Res() res: any) {
    const wahtsappInfo = await this.settingsRepository.getWhatsappLink();
    return res.status(HttpStatus.OK).send(wahtsappInfo);
  }

  @Authorize('backoffice')
  @ApiResponse({ status: HttpStatus.OK, description: 'Update Whatsapp Link' })
  @Put('')
  @ApiOperation({ summary: 'Update Whatsapp Link' })
  async updateLink(@Res() res: any, @Body() req: UpdateWhatsappRequest) {
    const response = await this.settingsRepository.updateWhatsappLink(req);
    return res.status(HttpStatus.OK).send(response);
  }
}
