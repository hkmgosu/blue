import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPopupRepository, POPUP_REPOSITORY } from '../../commons/interfaces';
import createPopup from '../../models/backoffice/createPopup.model';
import { Authorize } from '../../commons/decorators/authorize.decorator';

@ApiTags('Popup')
@Controller('/api/pyme2c/backend/v1/popup')
export class PopupController {
  constructor(
    @Inject(POPUP_REPOSITORY)
    private readonly popupRepository: IPopupRepository,
  ) {}

  @Authorize('backoffice')
  @ApiResponse({ status: HttpStatus.OK, description: 'Get Popup' })
  @Get('')
  @ApiOperation({ summary: 'Get Popup' })
  async getPopup(@Res() res: any) {
    const popups = await this.popupRepository.get();
    return res.status(HttpStatus.OK).send(popups);
  }

  @Authorize()
  @ApiResponse({ status: HttpStatus.OK, description: 'Get Popup' })
  @Get('/find-one')
  @ApiOperation({ summary: 'Get Popup' })
  async getOnePopup(@Res() res: any) {
    const popup = await this.popupRepository.findOne();
    return res.status(HttpStatus.OK).send(popup);
  }

  @Authorize('backoffice')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create Popup' })
  @Post()
  @ApiOperation({ summary: 'Get Popup' })
  async createPopup(@Body() popup: createPopup, @Res() res: any) {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.popupRepository.create(popup));
  }
  
  @Authorize('backoffice')
  @ApiResponse({ status: HttpStatus.OK, description: 'Update Popup' })
  @Put('/:id')
  @ApiOperation({ summary: 'Update Popup' })
  async updatePopup(
    @Param('id') id: string,
    @Body() popup: createPopup,
    @Res() res: any,
  ) {
    return res
      .status(HttpStatus.OK)
      .send(await this.popupRepository.update(id, popup));
  }
}
